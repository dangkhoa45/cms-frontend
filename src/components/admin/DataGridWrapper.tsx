'use client';

import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataGridWrapperProps extends Omit<DataGridProps, 'rows' | 'columns'> {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
  paginationState?: {
    page: number;
    pageSize: number;
    total: number;
  };
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export function DataGridWrapper({
  rows,
  columns,
  loading = false,
  paginationState,
  onPageChange,
  onPageSizeChange,
  ...props
}: DataGridWrapperProps) {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        paginationMode="server"
        rowCount={paginationState?.total || 0}
        paginationModel={{
          page: paginationState ? paginationState.page - 1 : 0,
          pageSize: paginationState?.pageSize || 10,
        }}
        onPaginationModelChange={(model) => {
          onPageChange?.(model.page + 1);
          onPageSizeChange?.(model.pageSize);
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        {...props}
      />
    </Box>
  );
}

