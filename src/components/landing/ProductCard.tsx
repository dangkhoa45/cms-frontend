'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Link from 'next/link';
import type { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
  siteSlug: string;
}

export function ProductCard({ product, siteSlug }: ProductCardProps) {
  const imageUrl = product.images?.[0] || '/placeholder-product.jpg';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, flexGrow: 1 }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            component={Link}
            href={`/${siteSlug}/products/${product.id}`}
            variant="contained"
            size="small"
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

