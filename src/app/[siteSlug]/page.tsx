import { notFound } from "next/navigation";
import ShoeCleaningTemplate from "@/templates/shoe-cleaning/index";
import PetshopTemplate from "@/templates/petshop/index";
import DefaultTemplate from "@/templates/default/index";
import { getSiteBySlug } from "@/libs/api";
import type { Site } from "@/types/api";

function RenderTemplate({ site }: { site: Site }) {
  const siteSlug = site.slug;

  switch (site.template) {
    case "shoe-cleaning":
      return <ShoeCleaningTemplate siteSlug={siteSlug} site={site} />;
    case "petshop":
      return <PetshopTemplate siteSlug={siteSlug} site={site} />;
    default:
      return <DefaultTemplate siteSlug={siteSlug} site={site} />;
  }
}

export default async function SiteHomePage(props: {
  params: Promise<{ siteSlug: string }>;
}) {
  const { siteSlug } = await props.params;

  let site: Site | null = null;

  try {
    site = await getSiteBySlug(siteSlug);
  } catch (err) {
    return notFound();
  }

  return <RenderTemplate site={site} />;
}
