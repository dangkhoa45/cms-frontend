import { cookies } from "next/headers";
import { getSiteBySlug, backendApi } from "@/libs/api";
import { notFound } from "next/navigation";
import { Container, Grid, Typography } from "@mui/material";
import { ProductCard } from "@/components/landing/ProductCard";

export default async function SiteProductsPage(props: {
  params: Promise<{ siteSlug: string }>;
}) {
  const { siteSlug } = await props.params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const site = await getSiteBySlug(siteSlug, cookieHeader).catch(() => null);

  if (!site) {
    notFound();
  }

  const productsData = await backendApi.public.products
    .list(site.id, { page: 1, limit: 12 }, cookieHeader)
    .catch(() => null);

  if (!productsData) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {productsData.data.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} siteSlug={siteSlug} />
          </Grid>
        ))}
      </Grid>
      {productsData.data.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ py: 8 }}
        >
          No products available.
        </Typography>
      )}
    </Container>
  );
}
