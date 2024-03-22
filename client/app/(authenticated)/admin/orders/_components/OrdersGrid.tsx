import AcadiaDataGrid from '@/components/common/AcadiaDataGrid';
import { useFetchAllOrdersQuery } from '@/redux/features/orders/order.api';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React from 'react'

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', type: 'number', flex: 1, },
    {
        field: 'createdAt',
        headerName: 'Purchase Date',
        flex: 1,
        valueGetter: ({ value }) => value && moment(new Date(value)).format('LL'),
    },
    {
        field: 'userFullName',
        headerName: 'User',
        flex: 1,
    },
    {
        field: 'courseName',
        headerName: 'Course Name',
        flex: 1,
    },
    {
        field: 'price',
        headerName: 'Price',
        valueGetter: ({ value }) => '€' + value,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
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