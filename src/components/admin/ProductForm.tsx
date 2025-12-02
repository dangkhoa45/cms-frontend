'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useSWRWithAuth } from '@/hooks/useSWRWithAuth';
import type { Site } from '@/types/api';
import { apiRoutes } from '@/config/api';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  images: z.string().optional(),
  siteId: z.string().min(1, 'Site is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductFormSubmitPayload = Omit<ProductFormData, 'images'> & {
  images: string[];
};

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormSubmitPayload) => Promise<void>;
  submitLabel?: string;
}

export function ProductForm({
  initialData,
  onSubmit,
  submitLabel = 'Submit',
}: ProductFormProps) {
  const { data: sitesResponse } = useSWRWithAuth<{ data: Site[] }>(
    apiRoutes.admin.sites.list
  );
  const sites = sitesResponse?.data || [];

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      images: initialData?.images || '',
      siteId: initialData?.siteId || '',
    },
  });

  const onSubmitForm = async (data: ProductFormData) => {
    // Convert images string to array
    const submitData: ProductFormSubmitPayload = {
      ...data,
      images: data.images
        ? data.images.split(',').map((img) => img.trim()).filter(Boolean)
        : [],
    };
    await onSubmit(submitData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Product Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                required
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Price"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
                required
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="siteId"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.siteId} required>
                <InputLabel>Site</InputLabel>
                <Select {...field} label="Site">
                  {sites.map((site) => (
                    <MenuItem key={site.id} value={site.id}>
                      {site.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.siteId && (
                  <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, ml: 1.75 }}>
                    {errors.siteId.message}
                  </Box>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Images (comma-separated URLs)"
                fullWidth
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                helperText="Enter image URLs separated by commas"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

