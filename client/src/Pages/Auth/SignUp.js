import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import Axios from '../../Axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import API from '../../Config/API';
import './index.scss';
import { Link } from 'react-router-dom';
import { Toast } from 'primereact/toast';

const SignUp = () => {
  //#region state
  const toast = useRef(null);
  const [Data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [Loading, setLoading] = useState(false);
  //#endregion state
  //#region useEffect
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        Axios.post( API.Signup , Data)
          .then(function (response) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('userId', response.data.userId);
            setLoading(false);
            window.location.assign('/');
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log('data',error.response.data);
              toast.current.show({severity:'error', summary: 'Error Message', detail: error.response.data.message, life: 3000});
              setLoading(false);
            } else if (error.request) {
              // The request was made but no response was received
              console.log('error.request', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [Data]);
  //#endregion useEffect
  //#region function
  const handleClick = () => {
    setLoading(true);
    Axios.post( API.Signup , Data)
      .then(function (response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('userId', response.data.userId);
        setLoading(false);
        window.location.assign('/');
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log('data',error.response.data);
          toast.current.show({severity:'error', summary: 'Error Message', detail: error.response.data.message, life: 3000});
          setLoading(false);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('error.request', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
       
      });
  };
  const onChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  //#endregion function 
    
 return (
   <>
    <Toast ref={toast} />
    <div className="form-demo">
        <div className='logo-div'>
          <img alt='logo' src='/Images/course.png' />
          <h2>Curricula</h2>
        </div>
        <div className="p-fluid card">
            <div className="field">
              <span className="p-float-label">
              <InputText 
                className='mr-2'
                value={Data.name} 
                name='name'
                onChange={onChange} />
                <label htmlFor="inputtext">Name</label>
              </span>
          </div>
          <div className="field">
              <span className="p-float-label">
                  <InputText 
                  className='mr-2'
                  value={Data.email} 
                  name='email'
                  onChange={onChange} />
                  <label htmlFor="inputtext">Email</label>
              </span>
          </div>
          <div className="field">
              <span className="p-float-label">
                  <Password 
                  className='mr-2'
                  value={Data.password} 
                  name='password'
                  onChange={onChange} />
                  <label htmlFor="inputtext">Password</label>
              </span>
          </div>
          {Loading ? 
          <ProgressSpinner /> :
          <Button label="Sign up" onClick={handleClick} className='mr-2 mb-5' />}
          <Link to={'/'}>Have an account? Login</Link>
        </div>
    </div>
    </>
 )   
};
export default SignUp;
