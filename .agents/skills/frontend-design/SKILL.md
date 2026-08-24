---
name: frontend-design
description: Guidelines and best practices for creating stunning, premium, modern frontend designs with rich aesthetics, glassmorphism, responsive layout, fluid typography, HSL-tailored colors, and smooth micro-animations. Avoid default/basic styling.
license: MIT
metadata:
  author: antigravity
  version: "1.0.0"
---

# Frontend Design Guidelines

This skill defines the requirements for creating visually outstanding, premium, and highly interactive user interfaces. Use this skill when asked to build, modify, or iterate on web application frontends.

## 1. Core Visual Principles

### 1.1 Rich Aesthetics
Never build minimum viable/plain interfaces unless explicitly requested. The user should be wowed at first glance.
- **Backgrounds:** Use rich gradients, subtle mesh patterns, or glowing radial backdrops rather than solid white/black.
- **Glassmorphism:** Use translucent backgrounds with backdrop filters for modern panels:
  ```css
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  ```
- **Shadows:** Use multi-layered soft shadows instead of single harsh black borders:
  ```css
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  ```

### 1.2 Color Systems (HSL Tailored)
Avoid standard primary colors (e.g. `#ff0000`, `blue`). Design custom palettes using HSL variables for dark/light mode adaptability.
- **Brand Colors:** Use modern shades like Indigo-violet, Teal-emerald, Rose-gold, or Cyberpunk-neon.
- **Interactive States:** Provide distinct focus, active, and hover states with smooth transitions.

### 1.3 Typography
Ditch system defaults. Load and use premium typography (e.g. Outfit, Inter, Playfair Display, Space Grotesk) from Google Fonts.
- **Fluid Sizing:** Use `clamp()` for responsive text scaling.
- **Hierarchy:** Ensure clean line heights (`1.5` for body, `1.2` for headings) and letter spacing.

## 2. Micro-Animations and Interaction

Every interaction should feel tactile and alive.
- **Transitions:** Use `cubic-bezier(0.4, 0, 0.2, 1)` for transitions instead of linear.
- **Hover States:** Scale elements slightly, shift gradients, or lift cards:
  ```css
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  ```

## 3. Implementation Workflow

1. **Design Tokens:** Define CSS variables in `:root` (colors, radii, spacing).
2. **Layout Structure:** Build semantic HTML5 layouts with Flexbox and Grid. Always make them fully mobile-responsive.
3. **No Placeholders:** Generate custom imagery/assets using the `generate_image` tool instead of empty placeholders.
