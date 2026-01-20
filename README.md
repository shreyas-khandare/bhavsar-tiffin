# Bhavsar Tiffin – Home-made Tiffin Service Platform

A production-focused full-stack web application for managing daily tiffin orders and train delivery requests. Includes customer-facing landing pages, WhatsApp-based inquiry flow, and a protected admin dashboard for lead management.

---

## Features

### Customer Facing
- Daily/Weekly/Monthly tiffin plans
- Train delivery pre-booking system
- WhatsApp order dispatch
- Mobile-friendly responsive UI

### Admin Dashboard
- Secure JWT-based login
- Lead storage in MongoDB Atlas
- Status pipeline: `new → contacted → trial → confirmed → dropped`
- CSV export for leads
- Admin-only route protection
- Stored hashed passwords (bcrypt)

---

## Tech Stack

**Frontend**
- Next.js 16 (App Router)
- React 19
- TailwindCSS 4
- Framer Motion (small UI animations)
- Next/Image optimization

**Backend**
- Next.js API Routes (Edge-compatible)
- MongoDB Atlas
- JWT Authentication
- bcryptjs for password hashing

**Other**
- HTTPS cookie auth
- Vercel deployment ready

---

## Folder Structure (Simplified)

```
/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   └── dashboard/
│   ├── api/
│   │   ├── admin/
│   │   └── leads/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
├── lib/
│   └── mongodb.js
├── public/
├── .env.local (not committed)
├── next.config.mjs
├── package.json
└── README.md
```

---

## Environment Variables

Application expects these vars:

```
MONGO_URI=your_mongodb_atlas_string
ADMIN_EMAIL=admin_email@example.com
JWT_SECRET=long_random_secret_key
NODE_ENV=production
```

Note:
`.env.local` must **not** be committed to Git.

---

## Local Development Setup

### 1. Install dependencies
```
npm install
```

### 2. Configure `.env.local`
```
MONGO_URI="mongodb+srv://..."
ADMIN_EMAIL="owner@example.com"
JWT_SECRET="something_random_and_long"
```

### 3. Run dev server
```
npm run dev
```
App → http://localhost:3000  
Admin → http://localhost:3000/admin/login

---

## Production Deployment (Vercel)

1. Push repo to GitHub
2. Import repo in Vercel
3. Add environment variables
4. Deploy

MongoDB Atlas required for production storage.

---

## Authentication Reference

Admin login flow:
- Admin enters credentials
- Password checked via bcrypt hash
- JWT issued via HTTP-only cookie
- Dashboard requires valid token + UI cookie
- Logout clears both cookies

---

## Lead Storage Format

Leads in MongoDB store:
```
{
  name,
  phone,
  area,
  meal,
  weekend,
  startDate,
  notes,
  status,
  createdAt
}
```

Train delivery leads do not persist; they trigger WhatsApp dispatch only.

---

## Future Improvements (Optional)

- Stripe/UPI billing plans
- Order scheduling
- Inventory tracking
- Delivery partner app
- Push notifications
- Mobile app wrapper

---

## License

Private / All rights reserved (client-owned)


