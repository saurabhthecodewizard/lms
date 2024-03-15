import { DataGrid, GridColDef, GridEventListener, GridRowIdGetter, GridToolbar } from "@mui/x-data-grid"

interface AcadiaDataGridProps {
    columns: GridColDef[];
    rows: any[];
    loading?: boolean;
    onRowClick?: GridEventListener<"rowClick"> | undefined;
    getRowId?: GridRowIdGetter<any> | undefined
}

const AcadiaDataGrid: React.FC<AcadiaDataGridProps> = (props) => {
    const { rows, columns, loading = false, onRowClick, getRowId } = props;
    return (
        <DataGrid
            columns={columns}
            rows={rows}
            loading={loading}
            slots={{
                toolbar: GridToolbar,
            }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            pagination
            checkboxSelection={false}
            sx={{
                boxShadow: 2,
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold'
                },
                '& .MuiDataGrid-cell:focus': {
                    outline: 'none'
                },
                '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none'
                },
                '& .MuiInput-input': {
                    color: '#f97316'
                },
                '& .MuiSvgIcon-root': {
                    color: '#f97316'
                },
                '& .MuiTablePagination-displayedRows': {
                    color: '#f97316'
                },
                '& .MuiTablePagination-selectLabel': {
                    color: '#f97316'
                },
                '& .MuiSelect-select': {
                    color: '#f97316'
                },
            }}
            density="comfortable"
            className='text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-900 p-4'
            onRowClick={onRowClick}
            getRowId={getRowId}
        />
    )
}

export default AcadiaDataGrid;