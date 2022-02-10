import './App.scss';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import ArrayRoutes from './Router';
import { useClearCache } from 'react-clear-cache';
import Sidebar from './Components/Sidebar/Sidebar';

const token = localStorage.getItem('token');

function App() {
  // let [searchParams, setSearchParams] = useSearchParams();
  // let user = searchParams.get("user");
  let location = useLocation();
  
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  useEffect(() => {
    if(!isLatestVersion) {
      emptyCacheStorage();
      console.log('Version updated!')
    }
  }, [isLatestVersion, emptyCacheStorage])
  
  return (
    <div className="App">
      {token && location.pathname !== '/signup' && <Sidebar />}
      <div className='pages-container'>
        <Routes>
          {ArrayRoutes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} {...route} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
