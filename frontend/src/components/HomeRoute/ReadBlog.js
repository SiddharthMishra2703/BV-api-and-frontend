import React from 'react'
import Comments from './Comments';
// import DelButton from "./DelButton";
// import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



function DelButton(props) {
  if (props.blog === 1) {
    return <button type="button" onClick={async (e) => {

      e.preventDefault();

      const blogId = props.blogId;
      try {

        const res = await fetch('/blogDelete', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            blogId
          })
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
          window.alert("Invalid Blog");
          console.log("Invalid Blog");
        } else {
          window.alert("Blog saved successfuly");
          console.log("Blog saved successfuly");

          // navigate('/dashboard');
        }

      } catch (err) {
        console.log(err);
        // navigate('/dashboard');
      }
      window.location.reload();
    }} className="btn btn-outline-danger btn-sm mx-2">
      <i className="zmdi zmdi-delete"></i>
    </button>
  }
}

export default function Blogs() {
  const url = window.location.href;
  const blogId = url.slice(-24);
  const [userData, setUserData] = useState({});
  const getData = async () => {
    try {
      const res = await fetch('/blog/' + blogId, {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
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
  }, []);
  const blog = userData;


  const [impData, setImpData] = useState({});
  const getImpData = async () => {
    try {
      const res = await fetch('/authenticate/' + blogId, {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setImpData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
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


  function CmtDelButton(props){
    if(props.render){
      return <button type="button" onClick={async (e) => {

        e.preventDefault();

        const commentId = props.commentId;
        try {

          const res = await fetch('/commentDelete', {
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
            window.alert("connot Delete comment");
          } else {
            window.confirm("Deleting Your Comment");

            // navigate('/dashboard');
          }

        } catch (err) {
          console.log(err);
          // navigate('/dashboard');
        }
        window.location.reload();
      }} className="btn btn-outline-danger btn-sm mx-2">
        <i className="zmdi zmdi-delete"></i>
      </button>
    }
  }


  return (
    <>
      <div className='row'>
        <div className='col-8'>
          <div className="card shadow mx-3 my-5" >
            <div className="card-body">
              <h4 className="card-title">{blog.title}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{blog.topic}</h6>
              <p id='content' className="card-text">{show()}</p>
              <hr />

              <div className='d-flex bd-highlight mb-3'>

                {/* Blog Like button */}
                <div className='p-2 bd-highlight'>
                  <button type="button" onClick={async (e) => {

                    e.preventDefault();

                    const blogId = blog._id;
                    try {

                      const res = await fetch('/like', {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          blogId
                        })
                      });

                      const data = await res.json();

                      if (res.status === 422 || !data) {
                        window.alert("Invalid Blog");
                        console.log("Invalid Blog");
                      } else {
                        window.alert("Blog saved successfuly");
                        console.log("Blog saved successfuly");

                        // navigate('/dashboard');
                      }

                    } catch (err) {
                      console.log(err);
                      //   navigate('/login');
                    }
                    window.location.reload();
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

          <Comments blogId={blog._id} />

          {/* All Comments section */}
          <div>

            {blog.comments && blog.comments.map((item) => (

              <div className="card shadow mx-3" >
                <div className="card-body">
                  <div className='row'>
                    <div className='col-11'>
                      <p className="fw-bold card-title">{item.userName}</p>
                    </div>
                    <div className='col-1'>
                      {/* button yaha dalegi */}
                      <CmtDelButton render={impData.userId == item.userId} commentId={item._id}/>
                      {/* {console.log(impData.userId == item.userId)} */}
                    </div>
                  </div>
                  <p className="card-text">{item.comment}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
        <div className="col-4">
          <h4 className='text-center my-5'>Recommendation For You</h4>
          {blog.blogs && blog.blogs.map((item)=>(
          
          <div className="card shadow my-5" >
            <div className="card-body">
              <h5 className="card-title">{item.title ? item.title.slice(0, 40) : ""}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{item.topic}</h6>
              {/* <p className="card-text" dangerouslySetInnerHTML={{ __html: item.content.slice(0, 40) + " ..." }} /> */}
              <Link to={"/blogs/" + item._id} className="btn btn-sm btn-outline-primary rounded-pill">Read More</Link>
            </div>
          </div>))}
        </div>
      </div>
    </>
  )
}