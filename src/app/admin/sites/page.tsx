'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useSWRWithAuth } from '@/hooks/useSWRWithAuth';
import { DataGridWrapper } from '@/components/admin/DataGridWrapper';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import type { Site } from '@/types/api';
import { apiRoutes } from '@/config/api';

export default function AdminSitesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading, mutate } = useSWRWithAuth<{ data: Site[] }>(
    apiRoutes.admin.sites.list
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'slug', headerName: 'Slug', width: 150 },
    { field: 'name', headerName: 'Name', width: 200, flex: 1 },
    { field: 'template', headerName: 'Template', width: 150 },
    { field: 'domain', headerName: 'Domain', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => router.push(`/admin/sites/${params.row.id}`)}
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
        message={error.message || 'Failed to load sites'}
        onRetry={() => mutate()}
      />
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Sites
        </Typography>
        <EmptyState
          title="No sites found"
          message="No sites have been created yet."
        />
      </Box>
    );
  }

  // Convert to paginated format for DataGrid
  const paginatedData = {
    data: data.data.slice((page - 1) * pageSize, page * pageSize),
    meta: {
      page,
      limit: pageSize,
      total: data.data.length,
      totalPages: Math.ceil(data.data.length / pageSize),
    },
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sites
      </Typography>
      <DataGridWrapper
        rows={paginatedData.data}
        columns={columns}
        loading={isLoading}
        paginationState={{
          page,
          pageSize,
          total: paginatedData.meta.total,
        }}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Box>
  );
}

