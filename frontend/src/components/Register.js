import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  });

  let name, value;
  const handleInput = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword
      })
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registeration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");

      navigate('/login');
    }
  }

  return (
    <>
      <div className="container-sm mb-5 shadow rounded" style={{backgroundColor:"white"}}>
        <div className="text-center my-5">
          <h1 className='fw-bolder'>Register Now !</h1>
        </div>
        <div className="row g-0">
          <div className="col-md-5">
            <img className='img-fluid rounded-start' src="/image/register.png" alt="" />
          </div>
          <div className="col-md-7">
            <form method="POST">
              <div className="input-group flex-nowrap mb-5">
                <span className="input-group-text" ><i className="zmdi zmdi-account"></i></span>
                <input type="text" className="form-control" value={user.name} onChange={handleInput} placeholder="Name" aria-describedby="addon-wrapping" name='name' />
              </div>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-email"></i></span>
                <input type="text" className="form-control" value={user.email} onChange={handleInput} placeholder="Email Address" aria-describedby="addon-wrapping" name='email' />
              </div>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-phone"></i></span>
                <input type="number" className="form-control" value={user.phone} onChange={handleInput} placeholder="Phone Number" aria-describedby="addon-wrapping" name='phone' />
              </div>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-calendar-note"></i></span>
                <input type="text" className="form-control" value={user.work} onChange={handleInput} placeholder="Work" aria-describedby="addon-wrapping" name='work' />
              </div>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-lock"></i></span>
                <input type="Password" className="form-control" value={user.password} onChange={handleInput} placeholder="Password" aria-describedby="addon-wrapping" name='password' />
              </div>

              <div className="input-group flex-nowrap my-5">
                <span className="input-group-text" ><i className="zmdi zmdi-lock"></i></span>
                <input type="Pasword" className="form-control" value={user.cpassword} onChange={handleInput} placeholder="Confirm Password" aria-describedby="addon-wrapping" name='cpassword' />
              </div>

              <Link className='link-secondary' to="/login">I already have an account</Link>
              <div className="input-group flex-nowrap my-5">
                <button type="submit" className="btn btn-outline-primary " onClick={PostData} value="Register">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
