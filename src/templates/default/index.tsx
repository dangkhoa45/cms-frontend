import { Container, Typography, Box } from "@mui/material";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import type { Site } from "@/types/api";

interface DefaultTemplateProps {
  siteSlug: string;
  site: Site;
}

export default async function DefaultTemplate({
  siteSlug,
  site,
}: DefaultTemplateProps) {
  return (
    <>
      <Header siteName={site.name} headerConfig={site.config?.header} />
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom>
            Welcome to {site.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is the default template. Please configure a custom template for
            this site.
          </Typography>
        </Container>
      </Box>
      <Footer footerConfig={site.config?.footer} />
    </>
  );
}
