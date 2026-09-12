# Cosmorolex Watches

A complete storefront plus admin product manager.

## Run locally
1. Install Node.js 20 or newer.
2. In this folder run:
   ```bash
   npm install
   npm start
   ```
3. Open:
   - Storefront: http://localhost:3000
   - Admin: http://localhost:3000/admin

## Admin login
Development default:
- Username: `admin`
- Password: `change-this-password`

For production, set `ADMIN_USER` and `ADMIN_PASSWORD` environment variables.

## Product management
The admin page lets you upload up to 8 JPG, PNG, WEBP, or GIF product images, set pricing, stock, brand, reference, category, description, and delete products. Uploaded images are stored in `uploads/`; product records are stored in `data/products.json`.

The supplied Cosmorolex logo is in `public/assets/cosmorolex-logo-icon.png`.
