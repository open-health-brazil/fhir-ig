---
name: Interop Saúde BR
description: Community pt-BR documentation for FHIR R4, BR Core and RNDS, printed as a carbonless health form.
colors:
  form-ink: "#b3352a"
  form-ink-deep: "#7e241c"
  data-ink: "#18171c"
  body-ink: "#37363c"
  muted-ink: "#5c5a54"
  paper: "#fbfaf6"
  paper-2: "#f4f2ea"
  via2: "#f6eaa8"
  via2-ink: "#5e4c08"
  stamp-ok: "#2b6a3d"
  stamp-draft: "#855600"
  stamp-retired: "#9c2a1f"
  carbon-form-ink: "#f0846e"
  carbon-data-ink: "#f4f1e8"
  carbon-body-ink: "#d2cec2"
  carbon-muted-ink: "#a19d93"
  carbon-paper: "#1a1922"
  carbon-paper-2: "#21202b"
  carbon-via2: "#37311a"
  carbon-via2-ink: "#f1df8c"
  carbon-stamp-ok: "#86cf9f"
  carbon-stamp-draft: "#e7b75a"
  carbon-stamp-retired: "#ff9a8a"
typography:
  display:
    fontFamily: "Archivo Variable, Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "clamp(2.75rem, 1.5rem + 5vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo Variable, Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 116"
  title:
    fontFamily: "Archivo Variable, Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 100"
  subtitle:
    fontFamily: "Archivo Variable, Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 96"
  body:
    fontFamily: "Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Archivo Variable, Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.07em"
    fontVariation: "'wdth' 78"
  stamp:
    fontFamily: "Archivo Variable, Atkinson Hyperlegible Next Variable, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.1em"
    fontVariation: "'wdth' 80"
  mono:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    fontFeature: "'tnum' 1"
rounded:
  none: "0"
spacing:
  field-y: "0.5rem"
  field-x: "0.875rem"
  cell-x: "0.75rem"
  block: "1.25rem"
  card-x: "1.5rem"
  section: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.data-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  button-primary-hover:
    backgroundColor: "{colors.form-ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.data-ink}"
    rounded: "{rounded.none}"
  button-secondary-hover:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.data-ink}"
  field-block-head:
    backgroundColor: "{colors.data-ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "0.625rem 0.875rem"
  field-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.data-ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.875rem 0.625rem"
  field-cell-via2:
    backgroundColor: "{colors.via2}"
    textColor: "{colors.via2-ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.875rem 0.625rem"
  table-header:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.form-ink}"
    typography: "{typography.label}"
    padding: "0.5rem 0.75rem"
  stamp:
    textColor: "{colors.stamp-ok}"
    typography: "{typography.stamp}"
    rounded: "{rounded.none}"
    padding: "0.1rem 0.4rem"
  sidebar-item-current:
    backgroundColor: "{colors.data-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
---

<!-- Prose is in English because this format requires exact English section headings, "The ... Rule." names and Do/Don't leads. Light-mode (1ª via) tokens are listed plain; dark-mode (carbon paper) tokens carry the carbon- prefix. Runtime source of truth: src/styles/tokens.css. -->

# Design System: Interop Saúde BR

## Overview

**Creative North Star: "Formulário em vias"**

The site is printed as the Brazilian health form that FHIR replaces: a TISS guide or a carbonless requisition with labelled fields, one red dropout "form ink" for the printed structure and black "data ink" for whatever was filled in. BR Core and RNDS are two copies of the same document: BR Core is the white first copy (1ª via); everything RNDS sits on the canary second copy (2ª via). Dark mode is the carbon sheet: navy-black paper, salmon form ink, cream data ink.

Density is that of a form, not a brochure: 1px rules everywhere, square corners, condensed caps labels above every value, a numbered index on the left and a perforated stub (canhoto) on the right. Reading happens in one calm column of Atkinson Hyperlegible Next at a generous 1.7 line height; the drama is reserved for the wide, heavy Archivo titles and the overlapping sheets of the home hero.

Every colour and font is a custom property in `src/styles/tokens.css`; theme and components only reference variables, so the whole identity can be swapped for the gov.br Design System without touching components. The world deliberately does not imitate a government site.

**Key Characteristics:**
- Three inks: form ink (structure and location), data ink (content), canary 2ª via (RNDS).
- Zero radius on every surface, control, badge and code frame.
- 1px rules in form ink; softer hairlines are form ink mixed down, never grey.
- Field labels in condensed Archivo caps over every value.
- Status printed as a tilted, outlined stamp.
- Numbered sidebar and document number that match each other.

## Colors

A warm paper with one red structural ink, a near-black content ink and a canary second copy; dark mode inverts it into carbon paper.

### Primary
- **Dropout Form Red** (form-ink; carbon: Carbon Salmon, carbon-form-ink): the printed form. Rules and borders, field labels, table headers, list markers, link underlines, anchor links, the current table-of-contents entry, focus outlines and `accent-color`. It marks structure and the reader's position, never body content.
- **Deep Form Red** (form-ink-deep): Starlight's high accent, used only where Starlight draws accent text internally.

### Secondary
- **Canary Second Copy** (via2, with via2-ink as its text; carbon: carbon-via2 / carbon-via2-ink): the 2ª via. Backgrounds of RNDS profile cards, RNDS table headers and columns, legacy-URI fields, the RNDS hero sheet, caution asides and text selection. In the sidebar, the current item's number is printed in via2 on the data-ink bar.

### Tertiary
- **Stamp inks** (stamp-ok green, stamp-draft ochre, stamp-retired red; carbon equivalents): only for status stamps and for the matching aside borders and titles (tip uses stamp-ok, danger uses stamp-retired).

### Neutral
- **Warm Paper** (paper; carbon: carbon-paper): page, header, sidebar and card ground.
- **Second Sheet** (paper-2; carbon: carbon-paper-2): table header ground, code block ground, hover fill for links, link cards and pagination.
- **Data Ink** (data-ink; carbon: carbon-data-ink): headings, strong text, filled-in values, link text, primary button and field-block title bars.
- **Body Ink** (body-ink; carbon: carbon-body-ink): running prose, tagline, sidebar links at rest.
- **Muted Ink** (muted-ink; carbon: carbon-muted-ink): captions under tables and examples, figcaptions, link-card descriptions.
- **Hairlines** (derived, not primitives): `hair` is form ink at 38% and `hair-soft` form ink at 18%, mixed over transparent. They draw inner field dividers and table row rules.

### Named Rules
**The Three Inks Rule.** Form ink draws structure and location, data ink carries content, canary marks RNDS. A new element picks exactly one role before it picks a colour.

**The Second Copy Rule.** Anything that is specific to RNDS (profile, column, legacy URI, hero sheet) sits on via2 with via2-ink text. BR Core material never does.

**The One Source Rule.** No colour or font literal outside `src/styles/tokens.css`; components reference `--isb-*` or `--sl-*` variables only.

## Typography

**Display Font:** Archivo Variable with the width axis (falls back to the body face)
**Body Font:** Atkinson Hyperlegible Next Variable
**Label/Mono Font:** JetBrains Mono Variable for code, canonical URLs, sidebar numbers and the document number

**Character:** A wide, heavy grotesque for titles and the same family squeezed to 78% width for printed field labels, over a face designed for legibility. The width axis, not a second family, separates "printed form" from "headline".

### Hierarchy
- **Display** (800, clamp 2.75rem to 5.5rem, 0.95, width 118%): the home hero title only.
- **Headline** (800, clamp 2.5rem to 4rem, 0.98, width 116%, balanced wrap): the page title on every doc page.
- **Title** (750, 1.5rem, width 100%): h2, opened by a full form-ink rule above it with 3rem top margin.
- **Subtitle** (700, 1.25rem, width 96%): h3. Card and pagination titles use the same family at 700 to 750.
- **Body** (400, 1rem, 1.7): prose in Starlight's 45rem column; tagline at 44ch.
- **Label** (650, 0.6875rem, 0.07em, uppercase, width 78%): every field label, table header, aside title, TOC heading and the "Anterior" / "Próximo" label of the previous/next links. Colour is form ink, or via2-ink on the second copy.
- **Stamp** (700, 0.6875 to 0.75rem, 0.1em, uppercase, width 78 to 80%): status stamps, badges and the "Não oficial" stamp.
- **Mono** (400, 0.8125rem; tabular numerals on tables, code and kbd): values inside field blocks, profile element paths, the sidebar and document numbers.

### Named Rules
**The Width Axis Rule.** Hierarchy in Archivo is set by `font-stretch`: about 78% for labels and stamps, 90 to 105% for navigation and card titles, 116 to 118% for page and hero titles. Do not add another display family.

**The Labelled Field Rule.** A value shown as data (canonical URL, status, version, resource type) sits under a Label in form ink. Labels name fields; they never float above a heading as decoration.

## Layout

Starlight's three-column frame, re-ruled as a form. The header is a row of cells separated by soft vertical rules (brand, search, actions) above a form-ink bottom rule; the "não oficial" banner sits above it with a dashed bottom rule. The left sidebar is a numbered index (counters printed in mono form ink, e.g. 2.7.1) behind a form-ink right rule. From 72rem the right table of contents becomes the stub: a 4px-by-10px column of perforation dots in hairline ink down its left edge instead of a border.

Each page title is followed by a strip of fields (Trilha, Seção, Documento, Atualizado em) under a form-ink rule, separated by hairlines; the Documento number matches the sidebar counter. Below 40rem the strip becomes a two-column grid.

Field blocks use an auto-fit grid (minimum 9rem for profiles, 14rem for terminology) with "wide" fields spanning the row. Spacing rhythm: fields pad 0.5rem by 0.875rem (0.625rem at the bottom), table cells 0.5rem by 0.75rem, cards 1.25rem by 1.5rem, blocks separate by 1.25rem, h2 sections by 3rem. Card grids drop their gap to 0 and divide cells with soft rules, switching from vertical to horizontal dividers below 50rem. The responsive breakpoints are 40rem, 50rem and 72rem.

## Elevation & Depth

Flat. Depth is drawn with rules and paper tone (paper vs paper-2 vs via2), not shadows; Starlight's card, pagination, menu-button and code-frame shadows are all removed. The single exception is the home hero, where the white BR Core sheet casts a soft shadow onto the canary RNDS sheet beneath it, because two physical copies overlap.

### Shadow Vocabulary
- **Copy lift** (`box-shadow: 0 0.75rem 1.5rem -0.75rem color-mix(in srgb, var(--isb-data-ink) 35%, transparent)`): only on the top sheet of an overlapping pair of copies.

### Named Rules
**The Flat Form Rule.** Surfaces are flat at rest and on hover; hover changes fill to paper-2, never adds a shadow or lift.

## Shapes

Every corner is square (0 radius): buttons, cards, asides, code frames, search dialog, selects, kbd, badges. Borders are 1px solid form ink for an outer frame, 1px hairline for inner dividers, 1px dashed form ink for horizontal rules and the banner edge, and 1px dotted form ink as the search field's underline. Stamps are the only 1.5px stroke and the only rotated shapes (-2deg); the RNDS hero sheet is rotated 0.75deg. Inline code is square with a 9% form-ink tint.

## Components

### Buttons
Printed and flat.
- **Shape:** square (0).
- **Primary:** data-ink fill, paper text, Archivo 700 at 95% width, 0.01em tracking.
- **Hover / Focus:** primary fills with form ink; secondary fills with paper-2; background and colour transition 160ms on `cubic-bezier(0.16, 1, 0.3, 1)`. Focus is a 2px form-ink outline at 2px offset sitewide. Transitions drop under reduced motion.
- **Secondary:** paper ground, 1px form-ink frame, data-ink text.

### Chips
- **Style:** badges are stamps, not pills: transparent ground, 1.5px border in `currentColor`, condensed caps.

### Cards / Containers
- **Corner Style:** square (0).
- **Background:** paper; the card grid has one outer form-ink frame and soft inner dividers.
- **Shadow Strategy:** none (see Elevation).
- **Border:** decorative card icons are hidden; titles in Archivo 750 at 105% width.
- **Internal Padding:** 1.25rem 1.5rem 1.5rem.
- **Link cards:** a ruled list rather than boxes: soft bottom rule per row, paper-2 on hover, form-ink arrow that slides 0.25rem.

### Navigation
- **Sidebar:** top-level groups in Archivo 700 caps at 90% width; links in body ink with a mono form-ink counter; hover fills paper-2; the current page is a full data-ink bar with paper text and a canary number.
- **Right TOC (stub):** label heading, body-ink links; current entry turns form ink, bold, with a 1px form-ink left rule.
- **Search:** below the header, a borderless field with a dotted form-ink underline that turns solid on hover; kbd hint in a square hairline box.
- **Previous / next:** two fields side by side in one form-ink frame, split by a soft rule.
- **Mobile:** square ruled menu button; "Nesta página" bar with form-ink bottom rule.

### Field Block (signature)
The profile header and terminology card. A 1px form-ink frame; a data-ink title bar (0.625rem by 0.875rem) holding the name in Archivo 700 and, on the right, a label naming the copy ("1ª via · BR Core", "2ª via · RNDS", or "CodeSystem") printed in canary. Below, an auto-fit grid of labelled cells divided by hairlines; values in data ink, code values in mono. RNDS profiles print the whole card on via2 with via2-ink labels and values; terminology cards put only their legacy-URI field on via2.

### Status Stamp (signature)
Outlined in 1.5px `currentColor`, condensed caps, tilted -2deg. Green for ativo, ochre for rascunho, red with strike-through for descontinuado. The "Não oficial" stamp in the banner uses the same form in form ink.

### Form Tables
Profile, identifier and markdown tables: one form-ink outer frame, label-style headers on paper-2 with a form-ink bottom rule, hairline cell rules. Profile tables use 0.8125rem text, sticky headers, a 36rem scroll height, paper-2 striping on even rows, 50% opacity for prohibited rows and a right-edge shade that appears only while columns are hidden. RNDS tables and columns switch header and frame to via2 / via2-ink. Captions follow in muted ink at 0.8125rem.

### Asides
Observation fields: square frame, paper ground, label-style title. Note uses hairline + form ink, tip stamp-ok, danger stamp-retired, caution is printed on via2.

### Code Frames
Expressive Code with 0 radius, hairline border, paper-2 code ground, paper tab bar, form-ink active-tab indicator, no shadow. Each validated example is followed by a muted 0.8125rem note.

### Hero Copies (home)
Two overlapping sheets inside a 30rem figure: the white BR Core sheet on top with the copy-lift shadow, the canary RNDS sheet offset 1.75rem, tucked 0.75rem under and rotated 0.75deg; it slides in once (700ms, 150ms delay, same ease) and stays still under reduced motion. Each sheet has a label head row and labelled mono fields.

## Do's and Don'ts

### Do:
- **Do** add every new colour or font to `src/styles/tokens.css` as a variable, in both the dark (carbon) and light (1ª via) blocks, and reference it from components.
- **Do** frame grouped data in 1px form ink and divide inside it with hairlines (form ink at 38% or 18%).
- **Do** put RNDS-specific material on via2 with via2-ink text, and label which copy a block belongs to.
- **Do** show status as a stamp: 1.5px `currentColor` outline, condensed caps, -2deg.
- **Do** set Archivo hierarchy with the width axis: about 78% for labels, 116 to 118% for page and hero titles.
- **Do** keep hover as a paper-2 fill or a form-ink colour shift, with 160ms transitions that drop under reduced motion.

### Don't:
- **Don't** round anything; radius is 0 on every surface and control.
- **Don't** use shadows for elevation; the copy-lift shadow belongs only to overlapping sheets.
- **Don't** use form ink for body text or large fills; it is for structure and location only.
- **Don't** render badges or status as filled, rounded pills.
- **Don't** put BR Core material on the canary copy.
- **Don't** use gov.br colours, the brasão or Ministério da Saúde marks, or anything that reads as an official government page.
