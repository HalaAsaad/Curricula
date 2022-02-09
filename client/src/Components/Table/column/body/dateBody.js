import React from 'react';

export const dateBody = (name, title) => (rowData) => {
    var startTime = new Date(rowData[name]); 
    var endTime = new Date();
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    let val = '';
    if(resultInMinutes >= 60 && resultInMinutes % 60 === 0) {
        val = resultInMinutes / 60 + ' Hours ' + resultInMinutes % 60 + ' Minutes';
    } else if (resultInMinutes < 60) {
        val = resultInMinutes + ' Minutes';
    } else if (resultInMinutes > 60 && resultInMinutes % 60 !== 0) {
        val = (resultInMinutes / 60).toFixed() + ' Hours ' + resultInMinutes % 60 + ' Minutes';
    }
    return (
        <React.Fragment>
            <span className="p-column-title">{title}</span>
            {/* {new Date(rowData[name]).toDateString()} */}
            {val} Ago
        </React.Fragment>
    );
};