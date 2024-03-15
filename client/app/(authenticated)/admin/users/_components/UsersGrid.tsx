import * as React from 'react';
import Box from '@mui/material/Box';
import { GridColDef } from "@mui/x-data-grid"
import AcadiaDataGrid from '@/components/common/AcadiaDataGrid';
import { Avatar } from '@mui/material';
import { useFetchAllUsersQuery } from '@/redux/features/users/user.api';

const columns: GridColDef[] = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    flex: 1,
    renderCell: (params: any) => {
      if (!(params.value)) {
        return <Avatar>{params.row.firstName.charAt(0)}</Avatar>
      }
      return <Avatar alt="O" src={params.value.url} />
    }
  },
  { field: '_id', headerName: 'ID', type: 'number' },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
  },
];

const UsersGrid: React.FC = () => {
  const { data, isLoading, isFetching } = useFetchAllUsersQuery();
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <AcadiaDataGrid
        rows={data?.users ?? []}
        loading={isLoading || isFetching}
        columns={columns}
        getRowId={(row) => row._id}
      />
    </Box>
  )
}

export default UsersGrid;