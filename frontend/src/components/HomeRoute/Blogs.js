import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
// import SearchBlogs from './SearchBlogs';
import SearchBlogE from './SearchBlogsE';


export default function Blogs() {

    const [userData, setUserData] = useState([]);



    const getData = async () => {
        try {
            const res = await fetch(process.env.URLL, {
                mode: "no-cors",
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                }
                //credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if (!res.status === 200) {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    const sorting = (val) => {
        if (userData) {
            if (val == 1) {
                userData.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                });
            }
            else if (val == 2) {
                userData.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date);
                });
            }
            else if (val == 3) {
                userData.sort((a, b) => {
                    return b.likes - a.likes;
                });
            }
            else if (val == 4) {
                userData.sort((a, b) => {
                    return b.content.length - a.content.length;
                });
            }
            else if (val == 5) {
                userData.sort((a, b) => {
                    return a.content.length - b.content.length;
                });
            }
            // console.log(userData);
            setUserData([...userData])
        }
    }
    return (

        <div className='container my-3'>
            <h1 className='text-center fw-bolder'>Blogs Archive</h1>
            <p className="text-muted text-center">Choose a Blog to read full content</p>
            <div className='text-center'>
                {/* <SearchBlogs /> */}
{/*<SearchBlogE placeholder="Enter Blog Name..." />*/}
            </div>

            <div className="d-flex flex-row-reverse">
                <div className='p-2'>
                    <select id="value" className="shadow-sm form-select" name='topic' aria-label="Default select example" onChange={() => sorting(document.getElementById("value").value)} >
                        <option selected>Sort Blogs:</option>
                        <option value={1}>New Blogs</option>
                        <option value={2}>Oldest Blogs</option>
                        <option value={3}>Most Liked</option>
                        <option value={4}>Longest</option>
                        <option value={5}>Smallest</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {userData.map((item) => (
                    <div className="col-md-6">
                        <div className="card shadow mx-auto my-5" >
                            <div className="card-body">
                                <h5 className="card-title">{item.title ? item.title.slice(0, 40) : ""}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.topic}</h6>
                                {/* <p className="card-text">{item.content ? item.content.slice(0, 40) : ""}...</p> */}
                                <p className="card-text" dangerouslySetInnerHTML={{ __html: item.content.slice(0,20) + " ..." }} />
                                <Link to={"/blogs/" + item._id} className="btn btn-sm btn-outline-primary rounded-pill">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
