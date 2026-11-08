# UNIQUE ALL IN ONE — Crystal & Jewelry Store

Professional storefront for [UNIQUE ALL IN ONE](https://www.instagram.com/unique.all.in.one/) with an admin panel for uploading product photos.

## Quick start

```bash
cd website
npm install
npm run seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default username: `admin`
- Default password: `unique2026` (stored as a bcrypt hash in `.env.local`)

### Security notes

- Password is verified with **bcrypt** (`ADMIN_PASSWORD_HASH`)
- Login is **rate-limited** (5 attempts / 15 min, then lockout)
- Sessions use **httpOnly + SameSite=strict** cookies (8h expiry)
- Admin write APIs require **same-origin** requests
- Change the password before deploying:

```bash
npm run hash-password -- "your-strong-password"
# paste the printed ADMIN_PASSWORD_HASH into .env.local
# (\$ escapes are required so dotenv does not break the hash)
```

## Features

- Branded crystal / jewelry storefront
- Collection with category filters
- Product pages with multi-image galleries
- Admin login at `/admin`
- Upload one or many product images
- Create, edit, feature, and delete products
