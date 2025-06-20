import React from 'react'

const ConfirmModal = ({status, message, onConfirm, onClose}) => {
  return (
    <div className={`${status} d-flex justify-content-center align-items-center modal_container`}>
        <div className="modal-panel">
            <div className="modal-panel-header d-flex justify-content-start align-tems-center">
                <p className="p-0 m-0 fs-4">Információ</p>
            </div>
            <div className="modal-panel-body d-flex justify-content-start">
                <p className="p-0 m-0 fs-6">{message}</p>
            </div>
            <div className="modal-panel-footer d-flex justify-content-end gap-2">
                <button onClick={onConfirm} className="btn btn-dark">Ok</button>
                <button  onClick={onClose} className="btn btn-dark">Vissza</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal