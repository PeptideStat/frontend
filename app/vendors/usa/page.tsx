import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RegionalVendorDirectory } from "@/components/RegionalVendorDirectory";
import { vendors } from "@/data/marketplace";
import {
  breadcrumbJsonLd,
  buildMetadata,
  collectionPageJsonLd,
} from "@/lib/seo";
import { marketplaceUpdatedAt } from "@/lib/marketReport";

const title = "Legit US Peptide Vendors Compared (2026): COAs & Prices";
const description =
  "Compare tracked US research-peptide vendors by current prices, public COA documentation, batch records, country served and discount-code status.";
const path = "/vendors/usa";

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function UsaVendorsPage() {
  const regionalVendors = vendors.filter((vendor) => vendor.market === "us");

  return (
    <>
      <JsonLd
        data={collectionPageJsonLd({
          name: title,
          description,
          path,
          dateModified: marketplaceUpdatedAt,
          items: regionalVendors.map((vendor) => ({
            name: vendor.name,
            path: `/vendors/${vendor.id}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Vendor directory", path: "/vendors" },
          { name: "US peptide vendors", path },
        ])}
      />
      <RegionalVendorDirectory
        market="us"
        eyebrow="United States vendor directory"
        heading="Legit US peptide vendors compared."
        description="A source-led comparison of US research-peptide listings, public testing documents, batch references and active partner-code status. Legit means the paper trail is inspectable; it is not a human-use endorsement."
        deliveryNote="US listings are separated from UAE/GCC listings so domestic fulfillment and USD pricing are not mixed with regional import variables."
      />
    </>
  );
}
