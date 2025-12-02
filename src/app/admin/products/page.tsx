'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { GridColDef } from '@mui/x-data-grid';
import { useSWRWithAuth } from '@/hooks/useSWRWithAuth';
import { DataGridWrapper } from '@/components/admin/DataGridWrapper';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { PaginatedResponse, Product } from '@/types/api';
import { apiRoutes } from '@/config/api';

export default function AdminProductsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading, mutate } = useSWRWithAuth<PaginatedResponse<Product>>(
    `${apiRoutes.admin.products.list}?page=${page}&limit=${pageSize}`
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200, flex: 1 },
    { field: 'description', headerName: 'Description', width: 300, flex: 1 },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => router.push(`/admin/products/${params.row.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error.message || 'Failed to load products'}
        onRetry={() => mutate()}
      />
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Products</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/admin/products/new')}
          >
            New Product
          </Button>
        </Box>
        <EmptyState
          title="No products found"
          message="Get started by creating your first product."
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push('/admin/products/new')}
        >
          New Product
        </Button>
      </Box>
      <DataGridWrapper
        rows={data.data}
        columns={columns}
        loading={isLoading}
        paginationState={{
          page,
          pageSize,
          total: data.meta.total,
        }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Box>
  );
}

