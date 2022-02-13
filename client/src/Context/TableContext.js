import React, { useState } from 'react';

export const StateContext = React.createContext();
const StateProvider = (props) => {
    const [Rows, setRows] = useState(10);
    const [InputPage, setInputPage] = useState(1);
    const [IsDesc, setIsDesc] = useState(false);
    const [SortField, setSortField] = useState(null);
    const [GlobalFilter, setGlobalFilter] = useState('');
    return (
    <StateContext.Provider
    value={{
        Rows:Rows,
        setRows:setRows,
        InputPage:InputPage,
        setInputPage:setInputPage,
        IsDesc:IsDesc,
        setIsDesc:setIsDesc,
        SortField:SortField,
        setSortField:setSortField,
        GlobalFilter:GlobalFilter,
        setGlobalFilter:setGlobalFilter
    }}
    >
        {props.children}
    </StateContext.Provider>
    );
}
export default StateProvider;