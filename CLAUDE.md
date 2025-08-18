# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **National Design System (NDS)** Jekyll site for the Saudi Digital Government Authority (هيئة الحكومة الرقمية). It's a bilingual (Arabic/English) design system documentation and component showcase site built with Jekyll.

## Development Commands

### Jekyll Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

### Local Development
- The site runs on Jekyll 4.4.1 with Minima theme
- Default port: localhost:4000
- Built files are generated in `_site/` directory

## Architecture & Structure

### Core Layout System
- **Layouts**: `_layouts/` contains the main template structure
  - `default.html`: Base layout with RTL/Arabic support
  - `page.html` & `home.html`: Specific page templates
- **Includes**: `_includes/` contains reusable components
  - Navigation, header, footer, and hero components

### CSS Architecture
The design system uses a modular CSS approach:
- `nds-vars.css`: Design tokens and CSS custom properties
- `nds-base.css`: Fluid typography system with clamp() functions
- `nds-button.css`: Complete button component system
- Component-specific stylesheets for each UI element

### Content Structure
- **Markdown Pages**: Top-level `.md` files define site pages
- **Arabic Language**: Primary language is Arabic (RTL layout)
- **Design Components**: `button.md` contains comprehensive button documentation and examples

### Button Component System
The NDS button system includes:
- **6 Main Types**: Primary, Neutral, Secondary Solid, Secondary Outline, Subtle, Transparent
- **States**: Default, Hover, Active, Disabled, Loading
- **Variants**: Standard and On-Color versions for colored backgrounds
- **Destructive Actions**: All button types support destructive styling
- **Sizes**: Small (24px), Medium (32px), Large (40px), Full width
- **Icon Support**: Lead icons, trail icons, icon-only, and menu buttons

### Assets Organization
- **CSS**: `/assets/css/` - Modular CSS files
- **Fonts**: `/assets/fonts/` - Arabic (IBM Plex Sans Arabic) and icon fonts
- **Images**: `/assets/img/` - SVG graphics and brand assets
- **JavaScript**: `/assets/js/` - Navigation and interaction scripts

## Configuration Notes

### Jekyll Config (`_config.yml`)
- **RTL Support**: Default direction is RTL with Arabic language
- **Brand Assets**: DGA logo with specific dimensions configured
- **Build Settings**: Uses kramdown markdown and rouge highlighter
- **No Plugins**: Currently running without Jekyll plugins

### Language & Accessibility
- **Primary Language**: Arabic (ar) with RTL text direction
- **Accessibility**: Proper ARIA labels on interactive components
- **Font Support**: IBM Plex Sans Arabic for proper Arabic typography

## Working with Components

### Button Implementation
- Use class pattern: `nds-btn nds-btn-{type} nds-btn-{size}`
- Always include `<span class="label">` for button text
- Add `nds-btn-oncolor` for colored backgrounds
- Use `nds-btn-destructive` for destructive actions
- Include proper ARIA labels for icon-only buttons

### Adding New Components
1. Create CSS file in `/assets/css/`
2. Add demonstration page in root directory
3. Follow existing naming conventions (`nds-` prefix)
4. Include all states, sizes, and variants
5. Provide copy-paste code examples

### Typography System
The CSS uses a fluid typography system with clamp() functions that scale responsively:
- Display sizes: 2xl, xl, lg, md, sm, xs
- Text sizes: xl, lg, md, sm, xs, 2xs
- All with corresponding line heights and margin bottom values