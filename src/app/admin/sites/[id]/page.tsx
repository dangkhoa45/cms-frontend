'use client';

import { useRouter, useParams } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import { useSWRWithAuth } from '@/hooks/useSWRWithAuth';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import type { Site } from '@/types/api';
import { apiRoutes } from '@/config/api';

export default function EditSitePage() {
  const router = useRouter();
  const params = useParams();
  const siteId = params.id as string;

  const { data, error, isLoading, mutate } = useSWRWithAuth<Site>(
    apiRoutes.admin.sites.detail(siteId)
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error?.message || 'Site not found'}
        onRetry={() => mutate()}
      />
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Edit Site</Typography>
        <Button onClick={() => router.push('/admin/sites')}>Back to List</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1"><strong>Name:</strong> {data.name}</Typography>
        <Typography variant="body1"><strong>Slug:</strong> {data.slug}</Typography>
        <Typography variant="body1"><strong>Template:</strong> {data.template}</Typography>
        <Typography variant="body1"><strong>Domain:</strong> {data.domain || 'N/A'}</Typography>
      </Box>
      {/* Add form for editing site here */}
    </Box>
  );
}

