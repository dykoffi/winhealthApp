import React, { useEffect } from 'react'
import LoadingPoint from '../../../components/LoadingPoint'


const Logs = ({ sendTitle }) => {
    useEffect(() => {
        sendTitle("Logs")
    })
    return (
        <div className="Logs row p-5 text-center d-flex flex-column justify-content-center align-items-center">
            <h6 className="lead">Page en consruction (47%)</h6>
            <LoadingPoint />
        </div>
    )
}

export default Logs