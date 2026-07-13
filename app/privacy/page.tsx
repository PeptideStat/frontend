import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const title = "Privacy Policy";
const description = `How ${siteConfig.name} collects, uses and protects personal information, plus your rights under the GDPR and CCPA/CPRA.`;

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/privacy",
});

const EFFECTIVE_DATE = "July 13, 2026";

export default function PrivacyPage() {
  const email = siteConfig.contactEmail;

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-soft">
        Effective date: {EFFECTIVE_DATE}
      </p>

      <div className="mt-6 space-y-4 leading-7 text-ink-soft">
        <p>
          {siteConfig.name} (&quot;{siteConfig.name}&quot;, &quot;we&quot;,
          &quot;us&quot; or &quot;our&quot;) publishes evidence-based peptide
          guides at peptidestat.com (the &quot;Site&quot;). This Privacy Policy
          explains what information we collect, how we use it and the rights you
          have over it. Enhanced analytics starts automatically unless you have
          disabled it through the &quot;Analytics settings&quot; control in the footer.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          1. Who we are
        </h2>
        <p>
          {siteConfig.name} operates the Site as an independent publisher of
          educational content. For privacy enquiries, contact us at{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent hover:text-accent-bright"
          >
            {email}
          </a>
          .
        </p>
        <p>
          For visitors located in the European Economic Area (&quot;EEA&quot;),
          United Kingdom or Switzerland, {siteConfig.name} is the
          &quot;controller&quot; of personal data collected through the Site
          within the meaning of the EU and UK General Data Protection
          Regulation (&quot;GDPR&quot;).
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          2. Information we collect
        </h2>
        <p>
          We are deliberately conservative about the data we collect. As of the
          effective date:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="font-semibold text-ink">
              Account or contact data:
            </strong>{" "}
            None. The Site does not offer user accounts, comments or newsletter
            sign-ups.
          </li>
          <li>
            <strong className="font-semibold text-ink">Server logs:</strong>{" "}
            Our hosting provider records standard technical information about
            each request (IP address, user agent, referrer, timestamp,
            requested URL, response status) for the purposes of security, abuse
            prevention and aggregate traffic reporting. These logs are retained
            for a short period determined by the hosting provider.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Aggregate analytics:
            </strong>{" "}
            We use Vercel Web Analytics to measure aggregate page views and
            outbound affiliate-link events. An affiliate event can include the
            page path, CTA placement, partner, campaign and product label. We do
            not send names, email addresses, account identifiers or health
            information in these events.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Enhanced analytics:
            </strong>{" "}
            We load TraceDart automatically to understand sessions, returning
            visits, active time, scroll depth, referral and UTM context,
            client-side route changes and affiliate clicks. TraceDart uses a
            first-party visitor token and hashed browser fingerprint components.
            Its technical signals can include
            browser/device characteristics, display and rendering information,
            locale, storage and media capabilities, browser permission states,
            network context, IP-derived location, ASN/ISP and VPN, proxy, Tor or
            datacenter indicators. A
            visited URL can reveal which peptide content interested a visitor,
            but we do not intentionally send calculator inputs, email addresses,
            account identifiers or self-reported health information as event
            properties.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Cookies and local storage:
            </strong>{" "}
            The Site does not set advertising or social-media tracking cookies.
            Vercel Web Analytics is designed to operate without third-party
            cookies. Unless you disable it, TraceDart sets a first-party visitor
            token (including the <code>_td_vid</code> cookie) and uses browser
            storage to recognize a visitor and session. We store your analytics
            preference locally in your browser. Essential storage required for the
            underlying web framework (Next.js) to function may also be present.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Affiliate clickthroughs:
            </strong>{" "}
            When you click an outbound affiliate link, Vercel records the
            aggregate event described above; TraceDart also records it unless
            you disabled enhanced analytics. The destination site (e.g. Ascension
            Peptides) may receive an identifier indicating that the visit
            originated from {siteConfig.name} and may set its own cookies under
            its own privacy policy.
          </li>
        </ul>
        <p>
          If we add accounts, comments, newsletter sign-ups or materially
          different data-collecting features in the future, we will update this
          policy and, where required by law, ask for your consent before
          activating them.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          3. How we use information and lawful basis (GDPR)
        </h2>
        <p>
          Where the GDPR applies, our lawful basis for processing under
          Article 6 is as follows:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="font-semibold text-ink">
              Operating and securing the Site (server logs):
            </strong>{" "}
            Legitimate interests (Art. 6(1)(f)) in providing a working, secure
            website and preventing abuse.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Responding to your enquiries (e.g. email you send us):
            </strong>{" "}
            Legitimate interests (Art. 6(1)(f)) in answering your message, or
            performance of a request you made (Art. 6(1)(b)).
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Measuring aggregate site and referral performance with Vercel:
            </strong>{" "}
            Legitimate interests (Art. 6(1)(f)) in understanding which pages and
            clearly disclosed partner placements are useful, while limiting the
            event data to non-identifying labels.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              TraceDart enhanced analytics:
            </strong>{" "}
            Legitimate interests (Art. 6(1)(f)) in understanding how visitors
            navigate the Site and which disclosed referral placements are useful.
            TraceDart loads automatically unless you have opted out. You can
            object and disable it at any time through the &quot;Analytics settings&quot;
            control in the footer.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Complying with legal obligations:
            </strong>{" "}
            Legal obligation (Art. 6(1)(c)) where applicable.
          </li>
        </ul>
        <p>
          We do not engage in automated decision-making or profiling that
          produces legal or similarly significant effects.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          4. How we share information
        </h2>
        <p>
          We do not sell, rent or trade your personal information. We share
          data only with:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="font-semibold text-ink">
              Service providers
            </strong>{" "}
            including Vercel, which hosts the Site and provides aggregate
            analytics, and TraceDart, which provides enhanced analytics. These
            providers process data to operate their
            services under appropriate contractual terms;
          </li>
          <li>
            <strong className="font-semibold text-ink">Authorities</strong>{" "}
            where required by applicable law, court order or to protect our
            rights; and
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Affiliate partners
            </strong>{" "}
            to the extent you choose to click an outbound affiliate link, after
            which the partner&apos;s own privacy policy governs.
          </li>
        </ul>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          5. Data retention
        </h2>
        <p>
          We retain server logs and analytics according to our service
          providers&apos; configured retention periods, and any correspondence you
          send us for as long as needed to respond and to maintain a reasonable
          record of the exchange. TraceDart supports visitor-level export and
          deletion; contact us if you want us to locate and act on a record. We
          delete personal data when it is no longer needed for the purpose for
          which it was collected, unless retention is required by law.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          6. International transfers
        </h2>
        <p>
          The Site is operated using infrastructure that may be located outside
          your country of residence, including in the United States. Where
          personal data is transferred from the EEA, UK or Switzerland to a
          country that has not received an adequacy decision, we rely on
          appropriate safeguards (such as the European Commission&apos;s
          Standard Contractual Clauses) where they apply to our service
          providers.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          7. Security
        </h2>
        <p>
          We use commercially reasonable technical and organisational measures
          to protect the limited personal data we process. No method of
          transmission or storage over the internet is completely secure,
          however, and we cannot guarantee absolute security.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          8. Your rights under the GDPR (EEA, UK and Switzerland)
        </h2>
        <p>
          If you are in the EEA, UK or Switzerland, you have the following
          rights with respect to your personal data:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="font-semibold text-ink">Right of access</strong>{" "}
            to confirm whether we process your data and obtain a copy;
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to rectification
            </strong>{" "}
            of inaccurate or incomplete data;
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to erasure
            </strong>{" "}
            (&quot;right to be forgotten&quot;) in the circumstances set out in
            the GDPR;
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to restriction
            </strong>{" "}
            of processing in certain cases;
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to data portability
            </strong>{" "}
            for data you provided and that we process by automated means on the
            basis of consent or contract;
          </li>
          <li>
            <strong className="font-semibold text-ink">Right to object</strong>{" "}
            to processing based on legitimate interests; and
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to withdraw consent
            </strong>{" "}
            at any time, where processing is based on consent (without
            affecting the lawfulness of prior processing).
          </li>
        </ul>
        <p>
          You also have the right to lodge a complaint with your local
          supervisory authority. To exercise any of these rights, email{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent hover:text-accent-bright"
          >
            {email}
          </a>
          . You can also object to and disable enhanced analytics at any time
          using &quot;Analytics settings&quot; in the footer. Disabling analytics clears
          TraceDart&apos;s local visitor and session identifiers from that browser
          and prevents the script from loading on later visits from that browser.
          We will respond within the timeframes required by the GDPR.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          9. Your rights under the CCPA / CPRA (California residents)
        </h2>
        <p>
          If you are a California resident, the California Consumer Privacy
          Act, as amended by the California Privacy Rights Act
          (&quot;CCPA/CPRA&quot;), gives you the following rights:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong className="font-semibold text-ink">Right to know</strong>{" "}
            what personal information we collect, use, disclose and (if
            applicable) sell or share;
          </li>
          <li>
            <strong className="font-semibold text-ink">Right to delete</strong>{" "}
            personal information we have collected from you, subject to legal
            exceptions;
          </li>
          <li>
            <strong className="font-semibold text-ink">Right to correct</strong>{" "}
            inaccurate personal information;
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to opt out of the sale or sharing
            </strong>{" "}
            of personal information; and
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Right to non-discrimination
            </strong>{" "}
            for exercising any of the above rights.
          </li>
        </ul>
        <p>
          We do not sell or share (as those terms are defined under the
          CCPA/CPRA) personal information, and we do not use or disclose
          sensitive personal information for purposes that require a right to
          limit. To exercise any of these rights, email{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent hover:text-accent-bright"
          >
            {email}
          </a>
          .
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          10. Children&apos;s privacy
        </h2>
        <p>
          The Site is intended for adults and is not directed at children under
          16 (or under 13 where local law sets that threshold). We do not
          knowingly collect personal information from children. If you believe a
          child has provided personal information to us, please contact{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent hover:text-accent-bright"
          >
            {email}
          </a>{" "}
          and we will delete it.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          11. Third-party links
        </h2>
        <p>
          The Site contains links to third-party websites, including affiliate
          partners and study databases. We are not responsible for the privacy
          practices of those websites; please review their policies before
          sharing personal information. For more on how affiliate links and
          regulated content are handled, see our{" "}
          <Link
            href="/disclaimer"
            className="font-medium text-accent hover:text-accent-bright"
          >
            Disclaimer
          </Link>
          .
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          12. Changes to this policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes
          will be reflected by updating the effective date at the top of this
          page. Where required by law, we will provide additional notice.
        </p>

        <h2 className="pt-4 text-xl font-semibold tracking-tight text-ink">
          13. Contact
        </h2>
        <p>
          Questions, requests or complaints about this Privacy Policy or our
          handling of personal data can be sent to{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent hover:text-accent-bright"
          >
            {email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
