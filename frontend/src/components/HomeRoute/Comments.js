import React from 'react'
import { useState } from 'react'
import {useNavigate } from "react-router-dom";


export default function Comments(props) {
    const navigate = useNavigate();
    console.log(props);
    const [text, setText] = useState({
        comment: ""
    });

    let name, value;
    const handleOnChnage = (e) => {
        // console.log("Clicked");
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setText({ ...text, [name]: value });
    }

    return (
        <div className="card shadow mt-5 mb-3">
            <div className="card-body">
                <h4 className="card-title">Comments</h4>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={text.comment} name='comment' onChange={handleOnChnage}  placeholder="Add a comment..." />
                    <button className="btn btn-outline-primary" onClick={async (e) => {
                        if(props.auth && props.auth === "unauthorized"){
                            const stop = window.confirm("You Have To Register");
                            if(! stop){
                                return 0;
                            }else{
                                navigate("/register");
                            }
                        }

                        e.preventDefault();

                        const blogId = props.blogId;
                        const comment = text.comment;
                        try {
                            const token = document.cookie;
                            const res = await fetch(process.env.REACT_APP_API + '/comment', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    comment,
                                    blogId,
                                    token
                                })
                            });

                            const data = await res.json();

                            if (res.status === 422 || !data) {
                                window.alert("comment not added");
                                console.log("comment not added");
                            } else {
                                // window.alert("Blog saved successfuly");
                                console.log("comment added successfuly");
                                props.onSubmit();
                                text.comment = "";
                                // navigate('/dashboard');
                            }

                        } catch (err) {
                            console.log(err);
                            //   navigate('/login');
                        }
                        // window.location.reload();
                    }} type="button" id="button-addon2">Post</button>
                </div>
                {/* <input type="text" className="form-control" placeholder="Add a comment..." /> */}
            </div>
        </div>
    )
}
