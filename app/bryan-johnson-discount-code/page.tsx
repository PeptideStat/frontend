import type { Metadata } from "next";
import Link from "next/link";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { externalLinkRel } from "@/lib/externalLinks";

const title = "Bryan Johnson Discount Code: $25 Off Blueprint";
const description =
  "Use the Bryan Johnson Blueprint recommendation links for eligible $25 off offers on Peptide Shampoo, Peptide Hair Serum, and the 302 Laser Cap.";

const protocolHref = "/peptides/bryan-johnson-hair-protocol";

const products = [
  {
    name: "Blueprint Peptide Shampoo",
    label: "Hair protocol step 1",
    image:
      "https://blueprint.bryanjohnson.com/cdn/shop/files/Blueprint_Peptide_Shampoo_Scalp_Stimulating_Hair_Care_Bottle.webp?v=1769456711&width=700",
    alt: "Blueprint Peptide Shampoo bottle",
    href: "https://blueprint.bryanjohnson.com/STEVESLAYO?q=hair-peptide-shampoo",
    cta: "Get $25 off shampoo",
    description:
      "Rinse-off scalp treatment with peptides, caffeine, adenosine, copper tripeptide, niacinamide, panthenol, and gentle cleansers.",
  },
  {
    name: "Blueprint Peptide Hair Serum",
    label: "Hair protocol step 2",
    image:
      "https://blueprint.bryanjohnson.com/cdn/shop/files/Blueprint_Peptide_Serum_Daily_Rejuvenating_Hair_Treatment.webp?v=1769456710&width=700",
    alt: "Blueprint Peptide Hair Serum bottle",
    href: "https://blueprint.bryanjohnson.com/STEVESLAYO?q=hair-peptide-serum",
    cta: "Get $25 off serum",
    description:
      "Leave-on peptide serum with a stronger scalp-contact story, plus PDRN, NMN, caffeine, adenosine, copper tripeptide, and antioxidants.",
  },
  {
    name: "Blueprint 302 Laser Cap",
    label: "Hair protocol device",
    image:
      "https://blueprint.bryanjohnson.com/cdn/shop/files/ChatGPT_Image_Jan_21_2026_10_23_09_PM_1_1.webp?v=1770397387&width=900",
    alt: "Blueprint 302 Laser Cap",
    href: "https://blueprint.bryanjohnson.com/STEVESLAYO?q=laser-cap",
    cta: "View laser cap offer",
    description:
      "Low-level laser therapy device used in the Blueprint hair protocol for short daily sessions on dry hair and scalp.",
  },
] as const;

const faqs = [
  {
    question: "What is the Bryan Johnson discount code?",
    answer:
      "The offer works through recommendation links rather than a manual code. Click a product button and check whether the $25 off offer appears at checkout.",
  },
  {
    question: "How do I get $25 off Blueprint?",
    answer:
      "Open the product through one of the links on this page, add it to cart, and verify the discount before paying. Eligibility can depend on cart, region, account, and current Blueprint checkout terms.",
  },
  {
    question: "Does the discount work on the Blueprint Peptide Hair Serum?",
    answer:
      "The serum button uses the dedicated recommendation link for the Peptide Hair Serum. Check the final checkout screen to confirm the $25 off offer is active.",
  },
  {
    question: "Does the discount work on the 302 Laser Cap?",
    answer:
      "The laser cap button uses the dedicated recommendation link for the 302 Laser Cap. Confirm the final price at checkout before ordering.",
  },
  {
    question: "Is there a Bryan Johnson hair protocol guide?",
    answer:
      "Yes. PeptideStat has a product-by-product Bryan Johnson hair protocol guide covering the shampoo, serum, laser cap, minoxidil, ingredient roles, and supporting research.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/bryan-johnson-discount-code",
});

function ProductOfferCard({ product }: { product: (typeof products)[number] }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-surface-2 shadow-card">
      <div className="grid gap-5 p-5 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
        <div className="relative mx-auto flex h-48 w-full max-w-44 items-center justify-center rounded-lg border border-line bg-white p-4">
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            $25 off
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            className="max-h-36 w-auto max-w-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {product.label}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {product.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {product.description}
          </p>
          <a
            href={product.href}
            target="_blank"
            rel={externalLinkRel(product.href, { sponsored: true })}
            data-affiliate-placement="blueprint-offer-card"
            className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            {product.cta}
          </a>
        </div>
      </div>
    </article>
  );
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function webpageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl("/bryan-johnson-discount-code"),
    mainEntityOfPage: absoluteUrl("/bryan-johnson-discount-code"),
  };
}

export default function BryanJohnsonDiscountCodePage() {
  return (
    <>
      <JsonLd data={webpageJsonLd()} />
      <JsonLd data={faqJsonLd()} />

      <section className="border-b border-line bg-canvas">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Blueprint recommendation offer
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Bryan Johnson Discount Code
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Use the product buttons below for eligible $25 off Blueprint offers.
            There is usually no code to type; the recommendation link carries
            the offer into checkout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://blueprint.bryanjohnson.com/STEVESLAYO?q=hair-peptide-serum"
              target="_blank"
              rel={externalLinkRel(
                "https://blueprint.bryanjohnson.com/STEVESLAYO?q=hair-peptide-serum",
                { sponsored: true },
              )}
              data-affiliate-placement="blueprint-offer-hero"
              data-affiliate-product="hair-peptide-serum"
              className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              Get $25 off serum
            </a>
            <Link
              href={protocolHref}
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent-bright"
            >
              See the hair protocol
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-5 text-muted-soft">
            PeptideStat may earn from qualifying purchases. Check the final
            checkout screen before ordering because discount eligibility can
            change.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-5 px-5 py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Current offers
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
            Blueprint products with $25 off links
          </h2>
        </div>
        {products.map((product) => (
          <ProductOfferCard key={product.name} product={product} />
        ))}
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            How to use the Bryan Johnson Blueprint discount
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            <li className="rounded-xl border border-line bg-surface-2 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Step 1
              </span>
              <p className="mt-2 font-semibold text-ink">Choose the product</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Use the button for shampoo, serum, or the laser cap.
              </p>
            </li>
            <li className="rounded-xl border border-line bg-surface-2 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Step 2
              </span>
              <p className="mt-2 font-semibold text-ink">Add to cart</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                The recommendation link should carry the offer automatically.
              </p>
            </li>
            <li className="rounded-xl border border-line bg-surface-2 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                Step 3
              </span>
              <p className="mt-2 font-semibold text-ink">Verify checkout</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Confirm the $25 off line before you pay.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-ink">FAQ</h2>
        <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface-2">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-ink">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">
                {faq.question === "Is there a Bryan Johnson hair protocol guide?" ? (
                  <>
                    Yes. Read the{" "}
                    <Link
                      href={protocolHref}
                      className="font-semibold text-accent-bright underline underline-offset-4"
                    >
                      Bryan Johnson hair protocol
                    </Link>{" "}
                    guide for the shampoo, serum, laser cap, minoxidil,
                    ingredient roles, and supporting research.
                  </>
                ) : (
                  faq.answer
                )}
              </p>
            </details>
          ))}
        </div>
      </section>

      <DisclaimerBanner />
    </>
  );
}
