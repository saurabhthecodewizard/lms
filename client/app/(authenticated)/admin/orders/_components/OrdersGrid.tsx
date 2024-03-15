import AcadiaDataGrid from '@/components/common/AcadiaDataGrid';
import { useFetchAllOrdersQuery } from '@/redux/features/orders/order.api';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React from 'react'

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', type: 'number' },
    {
        field: 'createdAt',
        headerName: 'Purchase Date',
        flex: 1,
        valueGetter: ({ value }) => value && moment(new Date(value)).format('LL'),
    },
    {
        field: 'user',
        headerName: 'User',
        flex: 1,
        valueGetter: ({ value }) => value.name,
    },
    {
        field: 'course',
        headerName: 'Course Name',
        flex: 1,
        valueGetter: ({ value }) => value.name,
    },
];

const OrdersGrid = () => {
    const { data, isLoading, isFetching } = useFetchAllOrdersQuery();
    return (
        <Box sx={{ height: 600, width: '100%' }}>
            <AcadiaDataGrid
                rows={data?.orders ?? []}
                loading={isLoading || isFetching}
                columns={columns}
                getRowId={(row) => row._id}
            />
        </Box>
    )
}

export default OrdersGrid;