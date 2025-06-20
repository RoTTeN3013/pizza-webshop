import React from 'react'

const PageTitle = ({title, image}) => {
  return (
    <div className="header d-flex justify-content-center align-items-center wow animate__animated animate__fadeIn">
        <img src={`/images/pizzas/${image}.jpg`} alt="" className="header_image" />
        <div className="page_title d-flex justify-content-center align-items-center wow animate__animated animate__fadeInUp" style={{animationDuration: "2s"}}>
            <h2 className="text-uppercase">{title}</h2>
        </div>
    </div>
  )
}

export default PageTitle