# StudioSpace — Creative Studio Booking Platform

StudioSpace is a peer-to-peer marketplace where photographers, filmmakers, podcasters and musicians discover and book creative studios by the hour, and hosts list and manage their spaces.

**Live site:** https://studiospace-client-nu.vercel.app
**Server repo:** https://github.com/IFTI737/studiospace-server
**Live API:** https://studiospace-server-iota.vercel.app

## Examiner test credentials
- **Email:** examiner@studiospace.app
- **Password:** Examiner123

## Features
- **Explore & filter studios** by category (Photo Studio, Film Stage, Podcast Lounge, Music Suite, Workshop), search by name or location, and sort by price, rating or newest.
- **Book by the hour** from a modal with live price calculation. Bookings start as `Pending`, and hosts can confirm, decline or complete them.
- **Double-booking prevention:** the server checks for time overlap against existing bookings in MongoDB before saving and shows a clear error on a clash.
- **Full host CRUD:** add a studio with imgbb image upload, gallery and amenity tags; update with a pre-filled form; delete with a confirmation modal.
- **Secure auth** with Better Auth (email/password + Google), sessions in HTTPOnly cookies, and JWT-protected API routes that reply `401 Unauthorized` without a valid token.
- **Private routes** (dashboard, add studio, listings, bookings, saved) that survive page reloads without kicking a logged-in user to login.
- **My Profile page** to update your name and profile photo (imgbb upload), and change your password (Google users can add one).
- **Reviews and ratings** with the average recalculated in MongoDB.
- **Saved studios wishlist** (heart icon) and **PDF invoice** download for confirmed bookings.
- **Light / dark theme toggle**, Swiper hero slider, branded loaders, skeletons, empty states, toasts and a custom 404 page. Responsive on mobile, tablet and desktop.

## Tech stack
| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Swiper, Sonner, next-themes, jsPDF |
| Auth | Better Auth, MongoDB adapter, JWT plugin, Google OAuth |
| Backend | Express 5, MongoDB, jose |
| Hosting | Vercel |

## Local setup
```bash
git clone https://github.com/IFTI737/studiospace-client.git
cd studiospace-client
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Required environment variables:
```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMGBB_KEY=
```

Start the server too (see the server repo), then open http://localhost:3000.
