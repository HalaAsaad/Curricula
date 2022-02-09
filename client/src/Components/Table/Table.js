import React from 'react';
import { DataTable } from 'primereact/datatable';
import Spinner from '../Spinner/Spinner';

function Table({
    value,
    children,
    loading,
    ...rest
}) {
  
    //#endregion Functions
    return (
        <>
        <div className="card datatable-responsive-demo">
            {loading ?
            <Spinner style={{left: 'calc(50% - 20px)'}} /> :
            <DataTable 
            className="p-datatable-sm p-datatable-responsive-demo"
            stripedRows
            value={value}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
            rows={10} 
            // rowsPerPageOptions={[10,20,50]}
            emptyMessage="No items found"
            {...rest}
            >
                {children}
            </DataTable>}
        </div>
        </>
    );
}
export default Table;
