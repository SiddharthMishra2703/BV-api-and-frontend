import React from 'react'
import './css/Home.css'

export default function HomeFirst() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide mx-auto font-monospace" data-bs-ride="false">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/image/student.jpg" className="d-block w-100 image" alt="Student" />
          <div className="carousel-caption d-none d-md-block my-2 mx-auto">
            <h2 className='display-3 text-light mb-3'>You Have Arrived <br/> BlogVilla!</h2>
            <p>Share your Knowledge and Information with other people.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/image/reading-new.jpg" className="d-block w-100 image" alt="Working" />
          <div className="carousel-caption d-none d-md-block my-2 mx-auto">
            <h2 className='display-3 text-light mb-3'>Get Knowledge From Other People</h2>
            <p>Read and see what other people are writing and share your knowledge.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/image/community.jpg" className="d-block w-100 image" alt="..." />
          <div className="carousel-caption d-none d-md-block my-2 mx-auto">
            <h2 className='display-3 text-light mb-3'>Join Our Community</h2>
            <p>Connect with the people that have same interest and expand your knowledge.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

  )
}
