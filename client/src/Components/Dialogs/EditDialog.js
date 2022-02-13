import React, { useRef }  from 'react';
import { Dialog } from 'primereact/dialog';
import DialogFooter from './DialogFooter';
import InputField from '../InputRender/InputRender';
import Axios from '../../Axios';
import { Toast } from 'primereact/toast';

function EditDialog({ 
    openDialog, 
    setOpenDialog, 
    header, 
    fields, 
    selectedData, 
    setSelectedData, 
    url, 
    method,
    Edited,
    setEdited 
    }) {
        const toast = useRef(null);
    //#region functions
    const onChange = (e) => {
        const { value, name } = e.target;
        setSelectedData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const onCancel = () => {
        setOpenDialog(false);
        setSelectedData({});
    };
    const onSave = () => {
        switch (method) {
            case 'PATCH':
                Axios.patch(url, selectedData)
                .then((res) => {
                    setEdited(!Edited);
                    toast.current.show({severity:'success', summary: 'Success Message', detail: 'update successfuly', life: 3000});
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
                })
                break;
            case 'POST':
                Axios.post(url, selectedData)
                .then((res) => {
                    setEdited(!Edited);
                    toast.current.show({severity:'success', summary: 'Success Message', detail: 'added successfuly', life: 3000});
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
                })
                break;
            default:
                break;
        }
        setOpenDialog(false);
        setSelectedData({});
    };
    //#endregion functions
    return(
        <>
        <Toast ref={toast} />
        <Dialog 
        header={header} 
        visible={openDialog} 
        style={{ width: '50vw' }} 
        footer={<DialogFooter onSave={onSave} onCancel={onCancel} />} 
        onHide={onCancel}
        >
            <div className='p-fluid grid' style={{marginTop:'15px'}}>
                {fields.map((field, i) => (
                    <React.Fragment key={i}>
                        {field?.IsGroup ?
                            <>
                                {field?.inputs.map((ele, inx) => 
                                        <div className="col-6">
                                        <InputField 
                                        key={inx}
                                        {...field}
                                        key={i}
                                        labelTitle={ele.labelTitle}
                                        value={selectedData[ele.name]}
                                        name={ele.name}
                                        varient={ele.varient}
                                        onChange={onChange}
                                        />
                                    </div>
                                )}
                            </> : 
                            <div className="col-12">
                                <InputField 
                                {...field}
                                key={i}
                                labelTitle={field.labelTitle}
                                value={selectedData[field.name]}
                                name={field.name}
                                varient={field.varient}
                                onChange={onChange}
                                />
                            </div>
                        }
                    </React.Fragment>
                )
                )}
            </div>
        </Dialog>
        </>
    );
}
export default EditDialog;