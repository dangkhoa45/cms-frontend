'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Alert } from '@mui/material';
import { ProductForm } from '@/components/admin/ProductForm';
import { useState } from 'react';
import { createProductAction } from '../actions';
import type { CreateProductDto } from '@/types/api';

export default function NewProductPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CreateProductDto) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await createProductAction(data);

      if (!result.success) {
        throw new Error(result.error || 'Failed to create product');
      }

      // Redirect to products list
      router.push('/admin/products');
      router.refresh(); // Refresh to show new product
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <ProductForm
        onSubmit={handleSubmit}
        submitLabel={isSubmitting ? 'Creating...' : 'Create Product'}
      />
    </Box>
  );
}

