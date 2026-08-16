# Vertex — Digital Agency & Corporate Template

Modern multi-page corporate website template for digital agencies, consultancies and technology studios. Built with semantic HTML5, modern CSS3 and Vanilla JavaScript.

## Pages
- `index.html` — hero, trust logos, services, animated statistics, case studies, testimonial and CTA
- `services.html` — service breakdown and interactive process tabs
- `about.html` — mission, team grid with bios modal and office locations
- `contact.html` — validated contact form, map placeholder and office cards

## Structure
```text
vertex-digital-agency/
├── index.html
├── services.html
├── about.html
├── contact.html
├── css/styles.css
├── js/main.js
├── assets/README.md
└── README.md
```

## Rebranding
Edit the variables at the top of `css/styles.css`:
```css
:root {
  --bg:#f7f8f4;
  --surface:#fff;
  --ink:#10130f;
  --muted:#687064;
  --accent:#b9ef38;
  --display:"Space Grotesk",sans-serif;
  --body:"DM Sans",sans-serif;
}
```
Change `--accent` for the brand color, typography variables for fonts, and `--radius`, `--space`, and `--max` for layout styling.

## Adding content
**Services:** duplicate a `.service-list article` in `services.html`.

**Team members:** duplicate a `.person` article in `about.html` and update `data-title`, `data-role`, `data-copy`, initials and avatar class. The modal reads these attributes automatically.

**Case studies:** duplicate a `.case` article in `index.html` and provide `data-title`, `data-kicker`, `data-copy`, and `data-metric`. Replace the CSS artwork with optimized WebP/AVIF screenshots for production.

## JavaScript
`main.js` handles mobile navigation, IntersectionObserver statistics, process tabs, team/case-study modals, and native contact-form validation.

## Production checklist
Replace demo copy, emails, office details, links and project data. Connect the form to a real backend. Use properly licensed, optimized imagery.

## Marketplace tips
Show desktop and mobile previews, emphasize zero dependencies, demonstrate the case-study modal and highlight the easy CSS-variable rebranding system.
