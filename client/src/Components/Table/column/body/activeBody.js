import React from 'react';

export const activeBody = (name, title) => (rowData) => {
    let label = rowData[name] === true ? 'Yes' : 'No';
    let color = rowData[name] === true ? '#00b569' : 'rgb(253 104 104)';
    return (
        <React.Fragment>
            <span className="p-column-title">{title}</span>
            <label style={{ color : color }} >{label}</label>
        </React.Fragment>
    );
};