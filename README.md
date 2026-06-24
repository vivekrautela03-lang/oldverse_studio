# The OldVerse

Premium cinematic website for The OldVerse, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lenis smooth scroll

## Routes

- `/home`
- `/films`
- `/about`
- `/team`
- `/contact`

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/home](http://localhost:3000/home)

## Environment Variables

Optional production contact-form delivery uses Resend:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=theoldverse@gmail.com
CONTACT_FROM_EMAIL=The OldVerse <hello@your-domain.com>
```

If Resend variables are not configured, the contact form still validates and returns a success response, but it will not send email.

## Notes

- The hero video is served from `public/videos/hero-section.mp4`.
- Ambient background audio is generated in-browser and starts only after user interaction.
- Legacy files from the previous workspace prototype remain in the root and are not used by the Next.js app.
