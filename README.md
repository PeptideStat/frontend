This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

## Referral QA

Validate the 53 direct Ascension destinations and referral URL contract without
network access:

```bash
npm run audit:ascension:config
```

Run the live four-page catalog and stock comparison:

```bash
npm run audit:ascension
```

After a production build, verify every prerendered sponsored anchor has an
analytics placement label:

```bash
npm run audit:affiliate-markup
```

See [the attribution runbook](docs/affiliate-attribution-runbook.md) for the
TraceDart/Vercel-to-Ascension dashboard reconciliation check.

## TraceDart

The TraceDart browser site key is intentionally embedded in `app/layout.tsx`,
matching TraceDart's public script installation model. In TraceDart, allow only
`https://www.peptidestat.com` and `https://peptidestat.com` as production site
origins. If the key is rotated, update the constant and redeploy.

TraceDart loads automatically after the app becomes interactive unless the
visitor previously opted out. The footer exposes a persistent analytics
settings control that can disable tracking and clear local TraceDart identity.

The site records `affiliate_click` with `partner`, `placement`, `product`,
`campaign`, and `source_path`. It also records `virtual_pageview` for Next.js
client navigations because the current TraceDart browser script only creates an
automatic pageview on a full page load.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
