import { cookies } from "next/headers";
import { backendApi } from "@/libs/api";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ProductCard } from "@/components/landing/ProductCard";
import Link from "next/link";
import type { Site } from "@/types/api";

interface ShoeCleaningTemplateProps {
  siteSlug: string;
  site: Site;
}

export default async function ShoeCleaningTemplate({
  siteSlug,
  site,
}: ShoeCleaningTemplateProps) {
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
            bgcolor: "primary.main",
            color: "primary.contrastText",
            py: 12,
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom>
              Professional Shoe Cleaning Services
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Restore your shoes to their original beauty
            </Typography>
            <Button
              component={Link}
              href={`/${siteSlug}/products`}
              variant="contained"
              size="large"
              sx={{ bgcolor: "background.paper", color: "primary.main" }}
            >
              View Services
            </Button>
          </Container>
        </Box>

        {/* Products Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Our Services
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Choose from our range of professional shoe cleaning services
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
              No services available at the moment.
            </Typography>
          )}
        </Container>

        {/* Features Section */}
        <Box sx={{ bgcolor: "background.default", py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Why Choose Us?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Professional Quality
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We use premium cleaning products and techniques to ensure
                    the best results.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Fast Service
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quick turnaround times without compromising on quality.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Satisfaction Guaranteed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We stand behind our work with a satisfaction guarantee.
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
