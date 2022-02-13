import Axios from '../../Axios';
import React, { useState, useEffect, useContext } from 'react';
import Table from '../../Components/Table/Table';
import { Column } from 'primereact/column';
import API from '../../Config/API';
import { StateContext } from '../../Context/TableContext';
import { responsive } from '../../Components/Table/column/body/responsive';
import { activeBody } from '../../Components/Table/column/body/activeBody';
import { crudBody } from '../../Components/Table/column/body/crudBody';
import EditDialog from '../../Components/Dialogs/EditDialog';
import DeleteDialog from '../../Components/Dialogs/DeleteDialog';

function Subjects() {
    //#region state
    const context = useContext(StateContext);
    const { Rows, SortField, IsDesc, InputPage, GlobalFilter} = context;
    const [Subjects, setSubjects] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [OpenEdit, setOpenEdit] = useState(false);
    const [OpenDelete, setOpenDelete] = useState(false);
    const [selectedData, setselectedData] = useState({});
    const [Edited, setEdited] = useState(false);
    //#endregion state

    //#region useEffect
    useEffect(() => {
        let command = {
            pageNumber: InputPage,
            pageSize: Rows,
            sortfield: SortField,
            sortValue: IsDesc,
            searchQuery: GlobalFilter
        };
       Axios.post(API.getSubjects, command)
       .then(function (response) {
        setLoading(false);
        setSubjects(response.data.items);
        setTotalRecords(response.data.totalItems)
        })
        .catch(function (error) {
            console.log(error);
            setLoading(false);
        });
    }, [InputPage, Rows, SortField, IsDesc, GlobalFilter, Edited]);
    //#endregion useEffect

    //#region columns
    const columns = [
        {field: 'name', header: 'Name',  body: responsive('name', 'Name') },
        {field: 'description', header: 'Description', body: responsive('description', 'Description')},
        {field: 'active', header: 'Active',body: activeBody('active', 'Active')},
        {field: '', header: 'Actions', sortable: false, body: crudBody([
            {
                className:'pi pi-pencil',
                style: {color:'#00b569'},
                onClick: () => setOpenEdit(true)
            },
            {
                className:'pi pi-trash',
            // style: {color:'#eb7900'}
            onClick: () => setOpenDelete(true)
            }
        ], 'Actions')}
    ];
    const dynamicColumns = columns.map((col,i) => {
        return <Column key={i} field={col.field} header={col.header} body={col.body} sortable {...col} />;
    });
    //#endregion columns
    
    //#region fields
    const inputFields = [
        {
            name: 'name',
            labelTitle: 'Name',
            varient: 'text'
        },
        {
            name: 'description',
            labelTitle: 'Description',
            varient: 'text'
        },
        {
            name: 'active',
            labelTitle: 'Active',
            varient: 'inputswitch'
        },
        
    ];
    //#endregion fields
    return (
        <div className='container-page'>
            <Table 
            Title="Subjects"
            value={Subjects}
            loading={Loading}
            totalRecords={totalRecords}
            selectionMode="single"
            selection={selectedData} 
            onSelectionChange={e => setselectedData(e.value)} 
            dataKey="id" 
            responsiveLayout="scroll"
            Search
            onSearch={() => {}}
            New
            onNew={() => {
                setselectedData({});
                setOpenEdit(true);
            }}
            Refresh
            onRefresh={() => setEdited(!Edited)}
            >
             {dynamicColumns}
            </Table>

            <EditDialog 
            header='Edit'
            Edited={Edited}
            setEdited={setEdited}
            openDialog={OpenEdit}
            setOpenDialog={setOpenEdit}
            fields={inputFields}
            selectedData={selectedData}
            setSelectedData={setselectedData}
            url={selectedData?._id ? `${API.updateSubject}/${selectedData?._id}` : API.saveSubject}
            method={selectedData?._id ? 'PATCH' : 'POST'}
            />

            <DeleteDialog 
            Edited={Edited}
            setEdited={setEdited}
            openDialog={OpenDelete}
            setOpenDialog={setOpenDelete}
            url={`${API.deleteSubject}/${selectedData?._id}`}
            setSelectedData={setselectedData}
            />
        </div>
    );
}
export default Subjects;