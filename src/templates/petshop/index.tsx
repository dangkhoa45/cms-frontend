import { cookies } from "next/headers";
import { backendApi } from "@/libs/api";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ProductCard } from "@/components/landing/ProductCard";
import Link from "next/link";
import type { Site } from "@/types/api";

interface PetshopTemplateProps {
  siteSlug: string;
  site: Site;
}

export default async function PetshopTemplate({
  siteSlug,
  site,
}: PetshopTemplateProps) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const productsData = await backendApi.public.products.list(
    site.id,
    { page: 1, limit: 6 },
    cookieHeader
  );

  return (
    <>
      <Header siteName={site.name} headerConfig={site.config?.header} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: 12,
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to {site.name}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Everything your pet needs in one place
            </Typography>
            <Button
              component={Link}
              href={`/${siteSlug}/products`}
              variant="contained"
              size="large"
              sx={{ bgcolor: "white", color: "primary.main" }}
            >
              Shop Now
            </Button>
          </Container>
        </Box>

        {/* Products Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Featured Products
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Discover our selection of premium pet products
          </Typography>
          <Grid container spacing={4}>
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
              sx={{ py: 4 }}
            >
              No products available at the moment.
            </Typography>
          )}
        </Container>

        {/* About Section */}
        <Box sx={{ bgcolor: "background.default", py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  About Our Pet Shop
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We are passionate about providing the best products and
                  services for your beloved pets. Our team of experts carefully
                  selects each product to ensure quality and safety.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Visit us today and see why pet owners trust us with their
                  furry friends&#39; needs.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: 300,
                    bgcolor: "grey.200",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Image Placeholder
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer footerConfig={site.config?.footer} />
    </>
  );
}
