import React from 'react'
import { Link } from 'react-router-dom';


export default function HomeSecond() {
    return (
        <>
            <div className="card mx-10" style={{backgroundColor: "whitesmoke"}}>
            {/* <div className="card mx-10"> */}
                <div className="mx-auto mt-5">
                    <h1 className='card-title fw-bolder'>What We Got For You</h1>
                    <p className='text-mute'>Don't Know Where To Start From Don't Worry We Got You</p>
                </div>
                <div className="card shadow my-4 mx-auto w-50" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/image/writing2.jpeg" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body ">
                                <h5 className="card-title">Write What You See</h5>
                                <p className="card-text">You can share your knowledge from what you see in your life which grabs your reader's attention. Cheak it out now! </p>
                                <p className="card-text"><Link className="btn btn-primary btn-sm rounded-pill" to="/writeBlog">Get Started Now</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow my-4 mx-auto w-50" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/image/reading2.jpeg" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body ">
                                <h5 className="card-title">Read from other's blog</h5>
                                <p className="card-text">You can find topics form your intrest and cheak out what other's are writing form their knowledge.</p>
                                <p className="card-text"><Link className="btn btn-primary btn-sm rounded-pill" to="/blogs">Read Now</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow my-4 mx-auto w-50" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/image/connect-card.webp" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body ">
                                <h5 className="card-title">Connect With People</h5>
                                <p className="card-text">You can write a blog about beautiful things what you see in your life which grabs your reader's attention. Cheak it out now! </p>
                                <p className="card-text"><Link className="btn btn-primary btn-sm rounded-pill" to="/register">Register Now</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
