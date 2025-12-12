# Wedding Logo Sizing - Root Cause Analysis & Fix

## Problem
The wedding logo was appearing too large on all platforms despite multiple reduction attempts. Logo sizes were reduced from 600px to 300px (50% reduction) with progressive reductions for mobile breakpoints (down to 130px at 360px), but the logo continued to display at oversized dimensions.

## Root Cause
**CSS Cascade Conflict**: The universal `img` selector with `max-width: 100% !important;` was overriding the `.wedding-logo` class sizing rules.

### The Conflict:
```css
/* Universal rule (coming FIRST in stylesheet) */
img {
    max-width: 100% !important;  /* ← OVERRIDING logo sizing */
    width: auto !important;
}

/* Logo-specific rule (coming AFTER in stylesheet) */
.wedding-logo {
    max-width: 300px !important;  /* ← Being overridden! */
    width: 300px !important;
    height: auto !important;
}
```

Even though `.wedding-logo` has `!important` flags, both selectors have `!important`, making them equal specificity. The **universal `img` rule wins because it comes first** and the browser can't tell which to apply.

## Solution
**Modified the universal `img` selector to exclude logo and QR code:**

```css
/* FIXED: Universal rule now excludes special elements */
img:not(.wedding-logo):not(.qr-code) {
    max-width: 100% !important;
    width: auto !important;
}

/* Now .wedding-logo sizing works correctly */
.wedding-logo {
    max-width: 300px !important;  /* ← NOW RESPECTED */
    width: 300px !important;
}
```

Using `:not()` pseudo-class prevents the universal rule from applying to `.wedding-logo` and `.qr-code` elements, allowing their specific sizing to take effect.

## Logo Sizing Breakdown (Post-Fix)
- **Desktop (1024px+)**: 300px
- **Tablets (1024px)**: 288px
- **Tablets (900px)**: 275px
- **Tablets (768px)**: 260px
- **Mobile (600px)**: 175px
- **Mobile (480px)**: 140px
- **Mobile (360px)**: 130px

## Prevention for Future
1. **Use `:not()` selectors** for universal rules to exclude components with specific sizing
2. **Document CSS rule precedence** in code comments
3. **Test responsive breakpoints** after any CSS changes
4. **Avoid conflicting `!important` flags** - if possible, increase specificity instead
5. **Consider using CSS custom properties (CSS variables)** for consistent sizing across components

## Commit
```
Commit: 393776b
Message: Fix critical logo sizing issue: Exclude .wedding-logo and .qr-code from universal img selector
```

## Testing Checklist
- [x] Desktop browser - Logo displays at 300px ✓
- [x] Tablet (768px) - Logo displays at 260px ✓
- [x] Mobile (480px) - Logo displays at 140px ✓
- [x] Mobile (360px) - Logo displays at 130px ✓
- [x] Other images still responsive (max-width: 100%) ✓
- [x] QR code unaffected (max-width: 80px base) ✓

## Key Learning
**CSS specificity with `!important` is equal, so order matters.** When multiple selectors have the same specificity and both use `!important`, the one appearing first in the stylesheet applies. Using `:not()` to refine universal selectors is more effective than trying to override them later in the cascade.
