import React, {useState, useEffect} from 'react';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';


import { login, clearErrors } from '../../action/userAction';




const Login = ({history}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const alert = useAlert();
  const dispatch = useDispatch();

  const {isAuthenticated, error, loading} = useSelector(state => state.auth);

  useEffect(()=>{
    if(isAuthenticated) {
      history.pushState('/')
    }
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
      
    }
  }, [dispatch, alert, isAuthenticated, error, history])


  return (
    <>
    {loading ? <Loader/> : (
      <>
        <MetaData title = {'Login'}/>
        <form className = 'form'>
          <h1> Login </h1>
          <div class="form-group">
            <label for="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              value=""
            />
          </div>

          <div class="form-group">
            <label for="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              value=""
            />
          </div>

          <a href="#" class="float-right mb-4">Forgot Password?</a>
  
            <button
              id="login_button"
              type="submit"
              class="btn btn-block py-3"
            >
              LOGIN
            </button>

            <a href="#" class="float-right mt-3">New User?</a>



        </form>
      </>
    )}
    </>
  )
}

export default Login
