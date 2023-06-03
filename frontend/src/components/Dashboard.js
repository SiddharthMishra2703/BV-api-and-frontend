import React, {useReducer} from 'react'
import './css/Dashboard.css'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Dashboard() {

  const navigate = useNavigate();
  const [change, forceUpdate] = useReducer(x => x + 1, 0);
  const [userData, setUserData] = useState({});
  const callDashboardPage = async () => {
    const token = document.cookie;
    try {
      const res = await fetch(process.env.REACT_APP_API + '/daashboard', {
        method: "POST",
        // method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token
        })
        // credentials: "include"
      });

      const data = await res.json();
      setUserData(data);


      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  useEffect(() => {
    callDashboardPage();
  }, [change]);

  return (

    <div className="container">
      <form method="GET">
        <div className="card shadow text-center" >
          <div className="card-header">
            User Information
          </div>
          <div className="card-body">
            <h1 className="card-title fw-bolder">Welcome {userData.name} !</h1>
            <p className="card-text fs-5">{userData.work}</p>
            <hr />
            <div className="row my-4">
              <div className="col-6 fs-5 fw-bolder">Your ID</div>
              <div className="col-6 fs-5 text-danger">{userData._id}</div>
            </div>
            <div className="row my-4">
              <div className="col-6 fs-5 fw-bolder">Name</div>
              <div className="col-6 fs-5 text-danger">{userData.name}</div>
            </div>
            <div className="row my-4">
              <div className="col-6 fs-5 fw-bolder">Email Address</div>
              <div className="col-6 fs-5 text-danger">{userData.email}</div>
            </div>
            <div className="row my-4">
              <div className="col-6 fs-5 fw-bolder">Phone</div>
              <div className="col-6 fs-5 text-danger">{userData.phone}</div>
            </div>
            <div className="row my-4">
              <div className="col-6 fs-5 fw-bolder">Work</div>
              <div className="col-6 fs-5 text-danger">{userData.work}</div>
            </div>
            <hr />
            <h2 className="card-title">Your Blogs</h2>

            <div className="row my-4">
              <div className="col-md-4 fs-5">
                <h4>Title</h4>
              </div>
              <div className="col-md-4 fs-5">
                <h4>Topic</h4>
              </div>
              <div className="col-md-4 fs-5">
                <h4>Link</h4>
              </div>
            </div>

            {userData.blogs && userData.blogs.map((blog) => (
              <div className="row my-3">
                <div className="col-md-4 fs-5">
                  {blog.title}
                </div>
                <div className="col-md-4 fs-5">
                  {blog.topic}
                </div>
                <div className="col-md-3 fs-5">
                  <Link to={"/blogs/" + blog._id} className="btn btn-sm btn-outline-primary">Go To Blog</Link>
                </div>
                
                <div className="col-md-1 fs-5">

                  <button type="button" onClick={ () => {navigate('/editBlog/' + blog._id);}} className="btn btn-outline-primary btn-sm">
                    <i className="zmdi zmdi-edit"></i>
                  </button>

                  <button type="button" onClick={async (e) => {
                    const stop = window.confirm("Deleting Your Blog");
                    if(! stop){
                        return 0;
                    }

                    e.preventDefault();

                    const blogId = blog._id;
                    try {
                        const token = document.cookie;
                      const res = await fetch(process.env.REACT_APP_API + '/blogDelete', {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          blogId,
                          token
                        })
                      });

                      const data = await res.json();

                      if (res.status === 422 || !data) {
                        window.alert("Can not delete blog");
                        console.log("Can not delete blog");
                      } else {
                        forceUpdate();
                        window.alert("Blog deleted successfuly");
                        console.log("Blog deleted successfuly");
                        // navigate('/dashboard');
                      }

                    } catch (err) {
                      console.log(err);
                      navigate('/dashboard');
                    }
                    // window.location.reload();
                  }} className="btn btn-outline-danger btn-sm mx-2">
                    <i className="zmdi zmdi-delete"></i>
                  </button>

                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="row text-center my-3">
            <div className="col-md-3 mx-auto my-4">
              <Link className="btn btn-outline-primary" to="/writeblog">Write A Blog</Link>
            </div>
            <div className="col-md-3 mx-auto my-4">
              <Link className="btn btn-outline-primary" to="/blogs">Read Now</Link>
            </div>
            <div className="col-md-3 mx-auto my-4">
              <Link className="btn btn-outline-danger" to="/logout">Log out</Link>
            </div>
            <div className="col-md-3 mx-auto my-4">
              <button type="button" onClick={async (e) => {
                const stop = window.confirm("Deleting Your Account");
                if(! stop){
                    return 0;
                }

                e.preventDefault();

                const userId = userData._id;
                try {

                  const res = await fetch(process.env.REACT_APP_API + '/userDelete', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      userId
                    })
                  });

                  const data = await res.json();

                  if (res.status === 422 || !data) {
                    window.alert("try again");
                    console.log("user not deleted");
                  } else {
                    window.alert("Account Deleted");
                    console.log("user deleted");

                    navigate('/home');
                  }

                } catch (err) {
                  console.log(err);
                  navigate('/home');
                }
                // window.location.reload();
              }} className="btn btn-outline-danger btn-md mx-2">
                <i className="zmdi zmdi-delete"></i> Delete User
              </button>
            </div>
          </div>
          <div className="card-footer text-muted">
            I Hope You Have A Good Time
          </div>
        </div>
      </form>

    </div>

  )
}
