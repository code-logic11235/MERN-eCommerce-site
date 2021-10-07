import React, {useState, useEffect} from 'react';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { Link } from 'react-router-dom';
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
      history.push('/')
    }
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
      
    }
  }, [dispatch, alert, isAuthenticated, error, history])

  function submitHandler(e){
    e.preventDefault();
    dispatch(login(email,password));

  }

  return (
    <>
    {loading ? <Loader/> : (
      <>
        <MetaData title = {'Login'}/>
        <div className = 'login-container'>
          <form className = 'form' onSubmit = {(e)=>{submitHandler(e)}}>
            <h1> Login </h1>
            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value= {email}
                onChange = {(e)=>{setEmail(e.target.value)}}
              />
            </div>

            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange = {(e)=>{setPassword(e.target.value)}}
                
              />
            </div>

            <Link to="/password/forgot" >Forgot Password?</Link>
    
              <button
                className="login-submit"
                type="submit"
                // onClick = {(e)=>{e.preventDefault(); console.log(password, email)}}
              >
                LOGIN
              </button>

              <Link to="/register" >New User?</Link>



          </form>

        </div>
      </>
    )}
    </>
  )
}

export default Login
