import React from 'react';

export const responsive = (name, title) => (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">{title}</span>
            {rowData[name]}
        </React.Fragment>
    );
};