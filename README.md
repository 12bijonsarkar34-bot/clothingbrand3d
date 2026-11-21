# Ricq — considered essentials

A complete Next.js App Router storefront for Ricq, using Tailwind CSS, GSAP ScrollTrigger, React Three Fiber and Drei.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Use `npm run build` for a production build.

## Storefront features

- Persistent navigation and footer across the Home, Shop, Product, Cart, Checkout, About and Contact routes.
- Product catalog content lives in `src/data/products.json`; add/edit items there to manage the store catalog.
- Cart selections are stored in browser localStorage and persist across refreshes.
- Scroll-scrubbed assembly video and runway films use the existing `public/` assets.
- The 3D product viewer loads `public/models/dress1.glb` and supports drag rotation.
- SEO metadata, `public/robots.txt` and `public/sitemap.xml` included.

## Notes

The checkout is a front-end order request flow. It prepares a customer/order message for WhatsApp after submission; production payments, order storage and fulfilment should be connected to a secure backend/payment provider. Update the WhatsApp contact link, customer support email, and canonical domain (`ricq.in`) to match the live business details before launch.
