---
name: Precision Corporate Core
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#44474e'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#4a5f82'
  primary: '#011b3a'
  on-primary: '#ffffff'
  primary-container: '#1a3050'
  on-primary-container: '#8398be'
  inverse-primary: '#b2c7ef'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626263'
  tertiary: '#171b1d'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c3032'
  on-tertiary-container: '#94989a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b2c7ef'
  on-primary-fixed: '#021b3b'
  on-primary-fixed-variant: '#324769'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#181c1e'
  on-tertiary-fixed-variant: '#434749'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: monospace
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-padding: 80px
---

## Brand & Style

This design system is built for **AKA Yazılım** to project an image of absolute reliability, technical precision, and corporate authority. The aesthetic rejects fleeting UI trends like glassmorphism and glossy gradients in favor of a "Structured Modernism" approach. 

The system centers on high-contrast layouts, generous whitespace, and a rigid adherence to a mathematical grid. By utilizing solid surfaces and deep, meaningful colors, the interface communicates stability. It is designed for professional users who value efficiency and clarity over visual noise. The emotional response should be one of trust—software that works as precisely as it is built.

## Colors

The palette is strictly controlled to maintain a serious tone. 

- **Primary Navy (#1a3050):** Reserved for primary actions, navigation headers, and authoritative branding elements. It is the "anchor" of the design.
- **Secondary Slate (#707070):** Used for supporting information, icons, and secondary button states. It provides a sophisticated bridge between the dark navy and the stark white background.
- **Surface & Background:** The primary canvas is pure white (#FFFFFF). To create hierarchy without shadows, a very light gray-blue tertiary (#f4f7f9) is used for container backgrounds or section alternate-fills.
- **Functional Accents:** Success, warning, and error states should use desaturated versions of green and red to remain harmonious with the corporate palette, avoiding neon or overly bright tones.

## Typography

We employ **Inter** for its exceptional legibility and neutral, systematic character. The typographic scale is designed for high-density information environments.

- **Headlines:** Use Bold (700) or SemiBold (600) weights with tighter letter spacing to create a compact, "built" look. 
- **Body Text:** Standardized at 16px for optimal reading. Line heights are kept generous (1.5x) to ensure the interface feels airy despite the serious color palette.
- **Labels:** Small caps or uppercase with increased letter spacing are used for metadata and utility labels to distinguish them clearly from body text.
- **Technical Content:** Monospaced fonts are used at 11% frequency for data values, IDs, and code snippets, reinforcing the software-centric nature of the brand.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** system. This provides the structure necessary for a corporate tool.

- **Grid:** On desktop, the content is centered within a 1280px container. 
- **Rhythm:** We use an 8px base unit for all padding and margins. Vertical rhythm is enforced with large "Section Padding" (80px) to prevent the UI from feeling cluttered.
- **Whitespace:** Emphasize "Generous Whitespace." Every module must have room to breathe, ensuring that the high-contrast navy elements draw the eye without overwhelming the user.

## Elevation & Depth

To maintain a flat, professional aesthetic, depth is created through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Surfaces:** Use #FFFFFF for the base and #f4f7f9 for secondary containers (like sidebars or footers).
- **Outlines:** Instead of drop shadows, use 1px solid borders in a light gray (#E5E7EB) for card definition. 
- **Shadows:** When elevation is absolutely necessary (e.g., active dropdowns or modals), use a single, very soft "Industrial Shadow": `0 4px 6px -1px rgba(26, 48, 80, 0.05), 0 2px 4px -1px rgba(26, 48, 80, 0.03)`. The tint is slightly navy to maintain brand cohesion.

## Shapes

The shape language is "Soft-Geometric." 

- **Radius:** A consistent **4px (0.25rem)** corner radius is applied to buttons, inputs, and cards. This is just enough to take the "edge" off the brutalism while remaining strictly professional.
- **Large Components:** Larger containers like modals may use an 8px radius, but never exceed this. 
- **Consistency:** Avoid pill-shaped buttons or circular elements, as these detract from the "Serious/Corporate" objective.

## Components

### Buttons
- **Primary:** Solid #1a3050 background with White text. No gradients. 4px radius.
- **Secondary:** Ghost style with #707070 border and text. 
- **Hover States:** Primary shifts to a slightly darker navy; secondary gains a very light gray background fill.

### Input Fields
- **Default State:** 1px solid border (#707070 at 30% opacity), white background.
- **Focus State:** 2px solid #1a3050. No outer glow.
- **Labels:** Always placed above the field in Label-MD typography.

### Cards
- White background with a 1px solid border (#E5E7EB). No shadow in the default state.
- Internal padding should be a minimum of 24px.

### Navigation
- Top navigation bar should be solid White with a subtle 1px bottom border. 
- Active links use the Primary Navy with a 2px bottom bar indicator.

### Status Indicators
- Small, solid circular dots (8px) using technical colors (Red #C0392B, Green #27AE60) for status lists, paired with monospace text for values.