import React, { useRef } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import Axios from '../../Axios';
import { Toast } from 'primereact/toast';

function DeleteDialog({ 
    openDialog, 
    setOpenDialog, 
    Edited,
    setEdited,
    url,
    setSelectedData
    }) {
        const toast = useRef(null);
     //#region functions
     const onCancel = () => {
        setOpenDialog(false);
        setSelectedData({});
    };
    const onSave = () => {
        setOpenDialog(false);
        Axios.delete(url)
        .then((res) => {
            setEdited(!Edited);
            toast.current.show({severity:'success', summary: 'Success Message', detail: 'delete successfuly', life: 3000});
        })
        .catch((error) => {
            if (error.response) {
                // Request made and server responded
                toast.current.show({severity:'error', summary: 'Error Message', detail: error.response.data.message, life: 3000});
              } else if (error.request) {
                // The request was made but no response was received
                console.log('error.request', error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
        });
        setSelectedData({});
    };
    //#endregion functions
    return(
        <>
        <Toast ref={toast} />
        <div>
            <ConfirmDialog 
            visible={openDialog} 
            onHide={onCancel} 
            message="Do you want to delete this record?"
            header="Confirmation" 
            icon="pi pi-exclamation-triangle" 
            acceptClassName='p-button-danger'
            accept={onSave} 
            reject={onCancel} />
        </div>
        </>
    );
}
export default DeleteDialog;