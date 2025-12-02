import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

interface HeroSectionProps {
  siteSlug: string;
  siteName: string;
}

export function HeroSection({ siteSlug, siteName }: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 12,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to {siteName}
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
          Everything your pet needs in one place
        </Typography>
        <Button
          component={Link}
          href={`/${siteSlug}/products`}
          variant="contained"
          size="large"
          sx={{ bgcolor: 'white', color: 'primary.main' }}
        >
          Shop Now
        </Button>
      </Container>
    </Box>
  );
}

