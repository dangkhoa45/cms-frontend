'use client';

import { Box, Grid, Paper, Typography } from '@mui/material';
import { useSWRWithAuth } from '@/hooks/useSWRWithAuth';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import type { PaginatedResponse, Product, Post, Site } from '@/types/api';
import { apiRoutes } from '@/config/api';

export default function AdminDashboardPage() {
  const { data: productsData, error: productsError, isLoading: productsLoading } =
    useSWRWithAuth<PaginatedResponse<Product>>(
      `${apiRoutes.admin.products.list}?limit=5`
    );
  const { data: postsData, error: postsError, isLoading: postsLoading } =
    useSWRWithAuth<PaginatedResponse<Post>>(
      `${apiRoutes.admin.posts.list}?limit=5`
    );
  const { data: sitesData, error: sitesError, isLoading: sitesLoading } =
    useSWRWithAuth<{ data: Site[] }>(apiRoutes.admin.sites.list);

  if (productsLoading || postsLoading || sitesLoading) {
    return <LoadingState />;
  }

  if (productsError || postsError || sitesError) {
    return <ErrorState message="Failed to load dashboard data" />;
  }

  const productsCount = productsData?.meta?.total || 0;
  const postsCount = postsData?.meta?.total || 0;
  const sitesCount = sitesData?.data?.length || 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Total Sites
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              {sitesCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Total Products
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              {productsCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Total Posts
            </Typography>
            <Typography variant="h3" sx={{ mt: 1 }}>
              {postsCount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

