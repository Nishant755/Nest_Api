# UI/UX & Frontend Design System Guidelines

This document outlines the visual system, user experience guidelines, and design tokens for building premium, state-of-the-art frontend experiences.

---

## 1. Color Palette (HSL System)
Use HSL color tokens to easily support seamless transitions between light and dark modes.

| Variable | Usage | Light Value | Dark Value |
| :--- | :--- | :--- | :--- |
| `--background` | Base page background | `hsl(0, 0%, 100%)` | `hsl(240, 10%, 3.9%)` |
| `--foreground` | Main text color | `hsl(240, 10%, 3.9%)` | `hsl(0, 0%, 98%)` |
| `--card` | Panel/Card background | `hsl(0, 0%, 98%)` | `hsl(240, 10%, 10%)` |
| `--primary` | Buttons, highlighted text | `hsl(262.1, 83.3%, 57.8%)` | `hsl(263.4, 70%, 50.4%)` |
| `--accent` | Subtle hovers & dynamic borders | `hsl(240, 4.8%, 95.9%)` | `hsl(240, 3.7%, 15.9%)` |
| `--border` | Dividers & outlines | `hsl(240, 5.9%, 90%)` | `hsl(240, 3.7%, 15.9%)` |

---

## 2. Typography & Hierarchy
Load **Outfit** for headings and **Inter** for body text.

- **Main Headings (`h1`):** `font-family: 'Outfit', sans-serif; font-weight: 700; tracking: -0.02em;`
- **Subheadings (`h2`, `h3`):** `font-family: 'Outfit', sans-serif; font-weight: 600;`
- **Body Copy (`p`, `span`):** `font-family: 'Inter', sans-serif; line-height: 1.6;`

Use fluid font sizing for responsive headers:
```css
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
}
```

---

## 3. Micro-Interactions & Styling

### 3.1 Glassmorphism Panel
For dashboard cards and overlays, use soft blurs and glowing borders:
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}
```

### 3.2 Transitions
Every button hover, card lift, or color transition should utilize a smooth bezier curve:
```css
.interactive-el {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.interactive-el:hover {
  transform: translateY(-2px);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
}
```

---

## 4. UI Best Practices
1. **Interactive Indicators:** Ensure distinct states (`:hover`, `:focus-visible`, `:active`, `:disabled`).
2. **Grid & Layouts:** Use CSS Grid for complex layouts, falling back to Flexbox for linear content.
3. **No Bad Defaults:** Avoid generic HTML buttons, form borders, and browser scrollbars. Apply rounded corners (`border-radius: 8px` or `12px`) and custom scrollbar styling.
