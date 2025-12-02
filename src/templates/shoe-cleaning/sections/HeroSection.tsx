import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';

interface HeroSectionProps {
  siteSlug: string;
}

export function HeroSection({ siteSlug }: HeroSectionProps) {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 12,
        textAlign: 'center',
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
          sx={{ bgcolor: 'background.paper', color: 'primary.main' }}
        >
          View Services
        </Button>
      </Container>
    </Box>
  );
}

