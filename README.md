# Zorko Darwha

Local order hub for Zorko — a 100% vegetarian cafe in Darwha, Yavatmal, Maharashtra.

- Static HTML/Tailwind frontend, deployed on Vercel: https://zorkodarwha.vercel.app/
- Menu content managed via [Sanity.io](https://www.sanity.io/) headless CMS
  - Project ID: `aghzsrff`
  - Dataset: `production`
- WhatsApp-based order request flow (no login, no app)

## Sanity schema

Menu items live under a `menuItem` document type with these fields:

| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `category` | string | must match an existing category (Burger, Fries, Wraps, Pizza, etc.) or a new one |
| `price` | number | required |
| `description` | string | required |
| `image` | image | required |
| `isBestSeller` | boolean | shows the "Best Seller" ribbon |
| `subtitle` | string | optional |
| `order` | number | optional, controls sort order within a category |
