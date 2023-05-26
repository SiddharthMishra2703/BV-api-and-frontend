import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Contact.css'

export default function Contact() {

    const navigate = useNavigate();

    function onSubmit() {
        window.alert("Your Message has been Submitted!")
        navigate("/Dashboard")
    }

    return (
        <>
            <div className="text-center my-5">
                <h2 className='fw-bolder'style={{color:"#0062cc"}}>Let's get in touch</h2>
            </div>
            <div className="row mx-auto">
                <div className="col-sm-4 mb-3">
                    <div className="card rounded-pill text-center shadow bgcolor">
                        <div className="card-body ">
                            <h5 className="card-title">Our Phone</h5>
                            <p className="card-text">9568744321</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="card rounded-pill text-center shadow bgcolor">
                        <div className="card-body">
                            <h5 className="card-title">Our Email</h5>
                            <p className="card-text">blogsvilla2023@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 mb-3">
                    <div className="card rounded-pill text-center shadow bgcolor">
                        <div className="card-body">
                            <h5 className="card-title">Our Address</h5>
                            <p className="card-text">Vivekanada Institue of Professional Studies</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container shadow rounded contact-form bgcolor">
                <form method="post">
                    <h2 className='fw-bolder'>Contact Us</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" name="txtName" className="form-control" placeholder="Your Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="txtEmail" className="form-control" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="txtPhone" className="form-control" placeholder="Your Phone" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <textarea name="txtMsg" className="form-control" placeholder="Your Message *" style={{ width: "100%", height: "150px" }}></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" name="btnSubmit" onClick={onSubmit} className="btn btn-outline-primary rounded-pill" />
                        </div>
                    </div>
                </form>
            </div>    
        </>
    )
}



