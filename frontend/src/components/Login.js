import React, { useState , useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';

export default function Login() {

  const {dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Details");
    } else {
      dispatch({type:"USER" , payload:true});

      window.alert("Login Successfully");
      navigate('/dashboard');
    }

  }

  return (
    <>
      <div className="container-sm my-auto shadow rounded" style={{backgroundColor:"white"}}>
        <div className="text-center mt-5">
          <h1 className='fw-bolder'>Login Here !</h1>
        </div>
        <div className="row g-0">
          <div className="col-md-5">
            <img className="img-fluid rounded-start" src="/image/login.webp" alt="" />
          </div>
          <div className="col-md-7">
            <form method='POST'>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-email"></i></span>
                <input type="text" className="form-control" placeholder="Email Address" aria-describedby="addon-wrapping" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-lock"></i></span>
                <input type="Password" className="form-control" placeholder="Password" aria-describedby="addon-wrapping" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <Link className='link-secondary' to="/register">I'm new here! Create New Account.</Link>
              <div className="input-group flex-nowrap my-5">
                <button type="submit" className="btn btn-outline-primary " onClick={loginUser}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
