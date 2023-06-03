import React, { useReducer } from 'react'
import Comments from './Comments';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



function DelButton(props) {
  const navigate = useNavigate();
  if (props.blog === 1) {
    return <button type="button" onClick={async (e) => {
      const stop = window.confirm("Deleting Your Blog");
      if (!stop) {
        return 0;
      }

      e.preventDefault();

      const blogId = props.blogId;
      const token = document.cookie;
      try {

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
          window.alert("Blog not deleted");
          console.log("Blog not deleted");
        } else {
          window.alert("Blog deleted successfuly");
          console.log("Blog deleted successfuly");

          navigate('/dashboard');
        }

      } catch (err) {
        console.log(err);
        navigate('/dashboard');
      }
    }} className="btn btn-outline-danger btn-sm mx-2">
      <i className="zmdi zmdi-delete"></i>
    </button>
  }
}

export default function Blogs() {
  const navigate = useNavigate();
  const [change, forceUpdate] = useReducer(x => x + 1, 0);
  const url = window.location.href;
  const blogId = url.slice(-24);
  const [userData, setUserData] = useState({});
  const getData = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API + '/blog/' + blogId, {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
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
    }
  }
  useEffect(() => {
    getData();
  }, [change]);
  const blog = userData;


  // For Recommendation Blogs
  const [userBlogs, setUserBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API + '/blog', {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        // credentials: "include"
      });

      const data = await res.json();
      setUserBlogs(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBlogs();
  }, []);


  const [impData, setImpData] = useState({});
  const getImpData = async () => {
    const token = document.cookie;
    try {
      const res = await fetch(process.env.REACT_APP_API + '/authenticate', {
        method: "POST",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          blogId
        })
        // credentials: "include"
      });

      const data = await res.json();
      setImpData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      setImpData({ error: "unauthorized" })
    }
  }
  useEffect(() => {
    getImpData();
  }, []);
  // console.log(impData);
  const show = () => {
    if (blog.content)
      document.getElementById("content").innerHTML = blog.content;
  }


  function CmtDelButton(props) {
    if (props.render) {
      return <button type="button" onClick={async (e) => {
        const stop = window.confirm("Deleting Your Comment");
        if (!stop) {
          return 0;
        }

        e.preventDefault();

        const commentId = props.commentId;
        try {

          const res = await fetch(process.env.REACT_APP_API + '/commentDelete', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              commentId
            })
          });

          const data = res.json();

          if (res.status === 422 || !data) {
            window.alert("Cannot delete comment");
          } else {
            forceUpdate();
            console.log("Comment deleted successfuly");
          }

        } catch (err) {
          console.log(err);
          // navigate('/dashboard');
        }
        // window.location.reload();
      }} className="btn btn-outline-danger btn-sm mx-2">
        <i className="zmdi zmdi-delete"></i>
      </button>
    }
  }


  return (
    <>
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-8'>
            <div className="card shadow my-5" >
              <div className="card-body">
                <h4 className="card-title">{blog.title}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{blog.topic}</h6>
                <p id='content' className="card-text">{show()}</p>
                <hr />

                <div className='d-flex bd-highlight mb-3'>

                  {/* Blog Like button */}
                  <div className='p-2 bd-highlight'>
                    <button type="button" onClick={async (e) => {
                      if (impData.error && impData.error === "unauthorized") {
                        const stop = window.confirm("You Have To Register");
                        if (!stop) {
                          return 0;
                        } else {
                          navigate("/register");
                        }
                      }

                      e.preventDefault();

                      const blogId = blog._id;
                      try {
                        const token = document.cookie;
                        const res = await fetch(process.env.REACT_APP_API + '/like', {
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
                          window.alert("Invalid Blog");
                          console.log("Invalid Blog");
                        } else {
                          console.log("like/dislike successful");
                          forceUpdate();
                          // navigate('/dashboard');
                        }

                      } catch (err) {
                        console.log(err);
                        //   navigate('/login');
                      }
                    //   window.location.reload();
                    }} className="btn btn-outline-danger btn-sm">
                      <i className="zmdi zmdi-favorite"></i>
                      <span>        {blog.likes}</span>
                    </button>
                  </div>

                  {/* Blog delete botton */}
                  <div className='ms-auto p-2 bd-highlight'>
                    <DelButton blog={impData.blog} blogId={blog._id} />
                  </div>
                </div>

              </div>
            </div>

            <Comments onSubmit={forceUpdate} blogId={blog._id} auth={impData.error}/>

            {/* All Comments section */}
            <div>

              {blog.comments && blog.comments.map((item) => (

                <div className="card shadow" >
                  <div className="container-fluid card-body">
                    <div className='row'>
                      <div className='col-10 col-md-11'>
                        <p className="fw-bold card-title">{item.userName}</p>
                      </div>
                      <div className='col-2 col-md-1'>
                        {/* button yaha dalegi */}
                        <CmtDelButton render={impData.userId == item.userId} commentId={item._id} />
                        {/* {console.log(impData.userId == item.userId)} */}
                      </div>
                    </div>
                    <p className="card-text">{item.comment}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <h4 className='text-center my-5'>New Recommendation For You</h4>
            {userBlogs.sort((a, b) => {
              return b.likes - a.likes;
            })
              .slice(0, 3)
              .map((item) => (

                <div className="card shadow mx-auto" >
                  <div className="card-body">
                    <h5 className="card-title">{item.title ? item.title.slice(0, 40) : ""}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.topic}</h6>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: item.content.slice(0, 20) + " ..." }} />
                    {/* <p className="card-text">content...</p> */}
                    <Link to={"/blogs/" + item._id} onClick={(e) => e.forceUpdate()} className="btn btn-sm btn-outline-primary rounded-pill">Read More</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}