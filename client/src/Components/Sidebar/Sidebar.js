import React, { useState, useRef } from 'react';
import './index.scss';
import { Link } from "react-router-dom";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

const name = localStorage.getItem('name');

function Sidebar(props) {
    const menu = useRef(null);
    const [InActive, setInActive] = useState(true);
    const items = [
        {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
                localStorage.clear();
                window.location.assign('/');
            }
        },
    ];
    return (
        <>
            <header className='header'>
                <i className='pi pi-bars' onClick={() => setInActive(false)} />
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button label={`${name}`} icon="pi pi-user" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </header>
            <nav 
            className={`sidebar ${InActive && 'InActive'}`} 
            onMouseEnter={() => setInActive(false)}
            onMouseLeave={() => setInActive(true)}
            >
                <div className='logo-div'>
                    <img alt='logo' src='/Images/course.png' />
                    <h3>Curricula</h3>
                </div>
                <ul> 
                    <li onClick={() => setInActive(true)}>
                        <Link to="/"><i className="pi pi-th-large"></i>&nbsp; <label>Dashboard</label></Link>
                    </li>
                    <li onClick={() => setInActive(true)}>
                        <Link to="/Subjects"><i className="pi pi-book"></i>&nbsp; <label>Subjects</label></Link>
                    </li>
                    <li onClick={() => setInActive(true)}>
                        <Link to="/Page2"><i className="pi pi-times"></i>&nbsp; <label>Page2</label></Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};
export default Sidebar;