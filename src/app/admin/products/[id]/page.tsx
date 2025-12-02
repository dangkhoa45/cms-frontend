'use client';

import { useRouter, useParams } from 'next/navigation';
import { Box, Typography, Alert, Button } from '@mui/material';
import { ProductForm } from '@/components/admin/ProductForm';
import { useSWRWithAuth } from '@/hooks/useSWRWithAuth';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useState } from 'react';
import type { Product, UpdateProductDto } from '@/types/api';
import { apiRoutes } from '@/config/api';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [error, setError] = useState<string | null>(null);

  const { data, error: fetchError, isLoading, mutate } = useSWRWithAuth<Product>(
    apiRoutes.admin.products.detail(productId)
  );

  const handleSubmit = async (formData: UpdateProductDto) => {
    setError(null);

    try {
      const { updateProductAction } = await import('../actions');
      const result = await updateProductAction(productId, formData);

      if (!result.success) {
        throw new Error(result.error || 'Failed to update product');
      }

      // Revalidate and redirect
      await mutate();
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (fetchError || !data) {
    return (
      <ErrorState
        message={fetchError?.message || 'Product not found'}
        onRetry={() => mutate()}
      />
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Edit Product</Typography>
        <Button onClick={() => router.push('/admin/products')}>Back to List</Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <ProductForm
        initialData={{
          name: data.name,
          description: data.description,
          price: data.price,
          images: data.images.join(', '),
          siteId: data.siteId,
        }}
        onSubmit={handleSubmit}
        submitLabel="Update Product"
      />
    </Box>
  );
}

