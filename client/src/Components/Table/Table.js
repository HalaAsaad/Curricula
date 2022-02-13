import React, { useContext, useRef, useEffect, useState }  from 'react';
import { DataTable } from 'primereact/datatable';
import { StateContext } from '../../Context/TableContext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

function Table({
    value,
    children,
    loading,
    totalRecords,
    Title,
    Search,
    onSearch,
    New,
    onNew,
    Refresh,
    onRefresh,
    ...rest
}) {
    //#region Variablies
    const context = useContext(StateContext);
    const ContextRef = useRef(context);
    const [first, setfirst] = useState(0);
    //#endregion Variablies

    //#region useEffect
    useEffect(() => {
        const context = ContextRef.current;
        context.setSortField(null);
        context.setRows(10);
        context.setInputPage(1);
        context.setIsDesc(false);
        context.setGlobalFilter('');
     }, []);
     //#endregion useEffect

    //#region Functions
    const onPage = (event) => {
        setTimeout(() => {
            const startIndex = event.first;
            setfirst(startIndex);
            context.setRows(event.rows);
            context.setInputPage(event.page+1);
            if(startIndex % context.Rows === 0 ) {
                context.setIsDesc(false);
                context.setSortField(null);
                context.setGlobalFilter('');
            }
        }, 250);
    };
    const onSort = (e) => {
        context.setSortField(e.sortField);
        if(e.sortOrder === 1) {
            context.setIsDesc(true);
        } else if(e.sortOrder === -1) {
            context.setIsDesc(false);
        }
    }
    //#endregion Functions
    
    //#region header
    const header = (
        <header>
            <h3>{Title}</h3>
            <div className='actions'>
                {Search && 
                    <Button 
                    icon="pi pi-search" 
                    className="p-button-rounded p-button-outlined"  
                    tooltip="search" 
                    tooltipOptions={{position: 'bottom'}}
                    onClick={onSearch} 
                    />}
                {New && 
                    <Button 
                    icon="pi pi-plus" 
                    className="p-button-rounded p-button-success p-button-outlined" 
                    tooltip="add new" 
                    tooltipOptions={{position: 'bottom'}} 
                    onClick={onNew}
                    />}
                {Refresh && 
                    <Button 
                    icon="pi pi-refresh" 
                    className="p-button-rounded p-button-info p-button-outlined" 
                    tooltip="refresh" 
                    tooltipOptions={{position: 'bottom'}} 
                    onClick={onRefresh}
                    />}
            </div>
        </header>
    );
    //#endregion header
    return (
        <>
        <div className="card datatable-responsive-demo">
            {loading ?
            <div style={{display: 'flex'}}><ProgressSpinner /></div> :
            <>
                {header}
                <DataTable 
                className="p-datatable-sm p-datatable-responsive-demo"
                stripedRows
                value={value}
                paginator
                rowHover
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                rows={context.Rows} 
                rowsPerPageOptions={[10,20,50]}
                first={first}
                totalRecords={totalRecords}
                emptyMessage="No items found"
                onPage={onPage}
                sortField={context.SortField} 
                sortOrder={context.IsDesc === false ? -1 : 1} 
                onSort={onSort}
                
                {...rest}
                >
                    {children}
                </DataTable>
            </>}
        </div>
        </>
    );
}
export default Table;
