import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const title = "Disclaimer";
const description = `Editorial, medical, affiliate and liability disclaimers for ${siteConfig.name}.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/disclaimer",
});

const EFFECTIVE_DATE = "May 16, 2026";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-muted-soft">
        Effective date: {EFFECTIVE_DATE}
      </p>

      <div className="mt-6 space-y-4 leading-7 text-ink-soft">
        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          1. Educational content only
        </h2>
        <p>
          The content on {siteConfig.name} is provided for informational and
          educational purposes only. We translate published research, regulatory
          filings and manufacturer data into readable guides so that visitors
          can make informed decisions when speaking to a qualified healthcare
          professional. Nothing on this site constitutes medical advice,
          diagnosis or treatment.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          2. No professional relationship
        </h2>
        <p>
          Reading {siteConfig.name} does not create a physician-patient,
          pharmacist-patient or any other professional relationship between you
          and {siteConfig.name} or any of its contributors. The content is not a
          substitute for individualised medical advice from a licensed clinician
          who knows your medical history.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          3. Research compounds and regulatory status
        </h2>
        <p>
          Many of the peptides discussed on {siteConfig.name} are research
          compounds that are not approved by the U.S. Food and Drug
          Administration (FDA) or comparable regulators in other jurisdictions
          for human use. Where compounds are approved (for example, semaglutide
          and tirzepatide), approval is limited to specific indications, dosages
          and prescribers. {siteConfig.name} does not endorse, promote or
          facilitate the use of any compound outside of its approved indications
          or applicable law in your jurisdiction.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          4. Affiliate disclosure
        </h2>
        <p>
          {siteConfig.name} participates in affiliate programs. When you click
          an affiliate link and complete a purchase, we may earn a commission at
          no additional cost to you. Affiliate relationships never influence our
          editorial judgement; recommendations are based on independent research
          and the underlying evidence. This disclosure is made in accordance
          with the U.S. Federal Trade Commission&apos;s 16 CFR Part 255
          guidelines.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          5. External links
        </h2>
        <p>
          {siteConfig.name} contains links to third-party websites, including
          study databases, manufacturers and affiliate partners. We do not
          control and are not responsible for the content, accuracy, privacy
          practices or availability of any external site. Inclusion of a link
          does not imply endorsement.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          6. Accuracy and currency of content
        </h2>
        <p>
          We make reasonable efforts to ensure the information on{" "}
          {siteConfig.name} is accurate at the time of publication and to update
          articles as new evidence emerges. However, peptide research evolves
          rapidly. We make no warranty, express or implied, that any information
          is complete, current or free of error. Always verify safety-critical
          information against primary sources and a qualified clinician.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          7. No warranty
        </h2>
        <p>
          The content is provided &quot;as is&quot; and &quot;as available&quot;,
          without warranties of any kind, whether express, implied or statutory,
          including warranties of merchantability, fitness for a particular
          purpose, accuracy and non-infringement.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          8. Limitation of liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, {siteConfig.name}{" "}
          and its contributors shall not be liable for any direct, indirect,
          incidental, consequential, special or exemplary damages arising out of
          or in connection with your access to, use of, or reliance on the
          content of this site, even if advised of the possibility of such
          damages. Some jurisdictions do not allow the exclusion of certain
          warranties or liability; in those jurisdictions, our liability is
          limited to the greatest extent permitted by law.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          9. Changes to this disclaimer
        </h2>
        <p>
          We may update this disclaimer from time to time. Material changes will
          be reflected by updating the effective date at the top of this page.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          10. Contact
        </h2>
        <p>
          Questions about this disclaimer can be sent to{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-accent hover:text-accent-bright"
          >
            {siteConfig.contactEmail}
          </a>
          . For details on how we handle personal data, see our{" "}
          <Link
            href="/privacy"
            className="font-medium text-accent hover:text-accent-bright"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
