#!/bin/sh
# Validates examples with the official HL7 FHIR validator against the pinned BR Core
# and the vendored RNDS profiles. Uses local Java when present, otherwise Docker.
# Usage: validate-examples.sh [file ...]   (default: every examples/**/*.json)
# Runs without a terminology server (-tx n/a): no public Brazilian one exists and
# most terminologia CodeSystems are content=not-present, so code checks are warnings.
set -eu

ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"

HOME_DIR=.fhir-cache/validator-home
JAR=.fhir-cache/validator_cli.jar
OUTPUT=${VALIDATION_OUTPUT:-validation.json}

node scripts/fetch-packages.ts
node scripts/prepare-validator-cache.ts "$HOME_DIR/.fhir/packages"

if [ ! -f "$JAR" ]; then
  curl -fsSL -o "$JAR" https://github.com/hapifhir/org.hl7.fhir.core/releases/latest/download/validator_cli.jar
fi

FHIR_VERSION=$(node -p "require('./fhir-packages.json').fhirVersion")
BR_CORE=$(node -p "const p=require('./fhir-packages.json').packages.find(p=>p.id==='br.gov.saude.br-core.fhir');p.id+'#'+p.version")
if [ "$#" -gt 0 ]; then
  EXAMPLES="$*"
else
  EXAMPLES=$(find examples -name '*.json' | sort)
fi

set -- -jar "$JAR" $EXAMPLES -version "$FHIR_VERSION" -ig "$BR_CORE" -ig rnds.vendor#1.0.0 -tx n/a -output "$OUTPUT"

if command -v java >/dev/null 2>&1; then
  java -Duser.home="$HOME_DIR" "$@"
else
  docker run --rm -u "$(id -u):$(id -g)" -v "$ROOT:/work" -w /work \
    eclipse-temurin:21-jre java -Duser.home="/work/$HOME_DIR" "$@"
fi

node scripts/check-validation.ts "$OUTPUT"
