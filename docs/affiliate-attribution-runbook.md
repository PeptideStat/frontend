# Affiliate attribution runbook

Use this after deployment and after any partner-program or coupon change. The
goal is to reconcile one visitor journey across PeptideStat and Ascension
without treating a page view as a referral click.

## What is recorded

PeptideStat sends an `affiliate_click` custom event to Vercel Web Analytics and
TraceDart with five non-identifying labels:

- `source_path`: the PeptideStat page where the click occurred
- `placement`: the CTA position, such as `article-sidebar` or `marketplace-card`
- `product`: the linked compound or `catalog`
- `campaign`: the campaign value already attached to the partner URL
- `partner`: the destination partner

Ascension separately records partner-link visits, conversions and commissions.
The two systems should be reconciled by timestamp and campaign; they will not
have identical user identifiers.

TraceDart also records `virtual_pageview` when the Next.js App Router changes
the path without a full reload. Treat it as route coverage, not as an additional
hard-load pageview.

## TraceDart setup

1. Create the PeptideStat site in TraceDart and add
   `https://www.peptidestat.com` and `https://peptidestat.com` to allowed
   origins.
2. The public browser site key is embedded in `app/layout.tsx`. If TraceDart
   rotates it, update `TRACEDART_BROWSER_KEY` and redeploy.
3. In **Events & Goals**, create an event goal matching
   `affiliate_click` exactly.
4. Keep `virtual_pageview` as an analysis event, not a conversion goal.
5. Deploy and open a clean test browser. TraceDart should load automatically;
   no analytics acceptance step is required.

## Clean-click check

1. Deploy the current build and note the exact time.
2. Open a new private browser window with extensions disabled.
3. Visit one PeptideStat landing page and click a single sponsored CTA.
4. Confirm the destination is the intended product, not the generic shop.
5. Confirm the destination path contains `/ref/PEPTIDESDEFINED/` and retains
   the CTA's `campaign` query value.
6. Confirm the current audience discount is applied or that `PEPTIDESDE` is
   accepted at checkout. Do not assume the referral identifier and displayed
   coupon are interchangeable.
7. In Vercel Web Analytics, confirm one `affiliate_click` event with the same
   source, placement, product and campaign.
8. In TraceDart **Events & Goals**, confirm one `affiliate_click` event with the
   same properties and the expected page URL.
9. In the Ascension partner dashboard, confirm the visit appears against that
   campaign.

A completed checkout is not required for the clean-click check. A true
conversion test requires a legitimate third-party purchase or a test order
coordinated with Ascension; self-orders may not earn commission and should not
be used to judge attribution.

## Weekly reconciliation

Track these five numbers by campaign and placement:

- Outbound CTR = PeptideStat affiliate clicks / landing-page sessions
- TraceDart coverage = TraceDart unique visitors / Vercel unique visitors
- Partner receipt rate = Ascension recorded visits / PeptideStat affiliate clicks
- Partner conversion rate = Ascension conversions / Ascension recorded visits
- Earnings per click = cleared commission / PeptideStat affiliate clicks

Large gaps point to different problems: low outbound CTR is usually a
PeptideStat offer or placement issue; a low receipt rate is an attribution or
link issue; a low partner conversion rate is usually the destination offer,
checkout, price, stock or audience fit.

## Catalog and stock monitoring

The scheduled `Ascension catalog audit` workflow runs each Monday. It compares
all four category pages with `data/ascensionLinks.ts` and the stock snapshot in
`data/ascensionAvailability.json`. The workflow fails when a destination
disappears, a new product is not mapped, or a known product changes stock state.
After confirming a legitimate stock change, update the snapshot date and
`outOfStock` list so later runs alert only on newer changes.
