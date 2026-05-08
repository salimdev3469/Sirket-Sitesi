# AKA Yazılım Corporate Website

Production-ready Next.js website implementation for AKA Yazılım.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Firebase Admin SDK (Firestore for contact submissions)
- Admin panel with protected content editing
- Deploy target: Render

## Project Structure

```txt
/src
  /app
    /api/contact
    /projects
  /components
    /layout
    /sections
    /ui
  /lib
    firebase.ts
    validations.ts
  /services
    contactService.ts
  /types
  /styles
/public
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and set Firebase credentials.

3. Start development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Firebase Notes

- `FIREBASE_PRIVATE_KEY` must include escaped newlines (`\\n`) in `.env.local`.
- `FIREBASE_STORAGE_BUCKET` should be set to your Firebase Storage bucket name if it differs from the default (`PROJECT_ID.firebasestorage.app` on newer projects, `PROJECT_ID.appspot.com` on older projects).
- Contact form submissions are written to Firestore collection defined by `FIREBASE_CONTACT_COLLECTION`.

## Render Deployment

- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Required env vars:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`
  - `FIREBASE_STORAGE_BUCKET` (recommended)
  - `FIREBASE_CONTACT_COLLECTION` (optional)
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`

## Admin Panel

- Login route: `/admin/login`
- Panel route: `/admin`
- The admin panel reads and writes the `site_content/main` Firestore document.
