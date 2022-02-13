import React from 'react';

export const crudBody = (icons, title) => (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">{title}</span>
           {icons.map(({style, className, onClick}, i) => <i key={i} className={className} style={{cursor:'pointer', marginRight:'10px', ...style}} onClick={onClick} />)}
        </React.Fragment>
    );
};