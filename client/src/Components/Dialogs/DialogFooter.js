import { Button } from 'primereact/button';
import React from 'react';

function DialogFooter({ onSave, onCancel }) {
    return(
        <>
        <div>
            <Button label="No" icon="pi pi-times" onClick={onCancel} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={onSave} autoFocus />
        </div>
        </>
    );
}
export default DialogFooter;