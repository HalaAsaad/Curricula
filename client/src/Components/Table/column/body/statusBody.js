import React from 'react';

const colors = {
    pending: {color:'#805b36', bgColor:'#ffd8b2'},
    done: {color:'#256029', bgColor:'#c8e6c9'},
    canceled: {color:'#c63737', bgColor:'#ffcdd2'},
    preparing: {color:'#694382', bgColor:'#eccfff'},
    ready: {color:'23547b', bgColor:'#83e5f0'},
    rejected : {color:'23547b', bgColor:'rgb(245 136 249)'},
    'accepted by merchant' : {color:'23547b', bgColor:'rgb(235 218 116)'}
};
export const statusBody = (name, title, onClick, label, style) => (rowData) => {
    return (
        <div className='statusBody'>
            <span className="p-column-title">{title}</span>
            <span
            onClick={onClick} 
            style={{
                backgroundColor: colors[rowData[name]] ? colors[rowData[name]].bgColor : '#AAB7BF', 
                color: colors[rowData[name]] ? colors[rowData[name]].color : '#495057' ,
                ...style
               }} 
            className={'badge'}>
                <label style={style}>{rowData[name]} {label}</label>
            </span>
        </div>
    );
};