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

const title = "Research Peptide Vendors UAE & GCC: COAs, Prices & Delivery";
const description =
  "Compare tracked UAE and GCC research-peptide vendors by AED price, public batch documentation, delivery region, cold-chain limits and referral status.";
const path = "/vendors/uae";

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function UaeVendorsPage() {
  const regionalVendors = vendors.filter(
    (vendor) => vendor.market === "uae-gcc",
  );

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
          { name: "UAE and GCC peptide vendors", path },
        ])}
      />
      <RegionalVendorDirectory
        market="uae-gcc"
        eyebrow="UAE and GCC vendor directory"
        heading="Research peptide vendors in the UAE & GCC."
        description="A regional, AED-denominated directory of research-peptide listings, public batch records and delivery terms. Coverage is intentionally limited to vendors for which PeptideStat has entered source-linked market data."
        deliveryNote="UAE cooled delivery and GCC standard shipping are different services. Check the destination, courier terms, customs responsibility and temperature-control limits before relying on a regional listing."
      />
    </>
  );
}
