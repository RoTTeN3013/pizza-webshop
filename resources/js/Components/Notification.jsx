import React from 'react'

const Notification = ({status, message}) => {
  return (
    <div className={`${status} d-flex justify-content-center align-items-center notification_container `}>
        <p className="text-white fs-5 p-0 m-0"> <i className="fa fa-circle-info"></i> {message}</p>
    </div>
  )
}

export default Notification