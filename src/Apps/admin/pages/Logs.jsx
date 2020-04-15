import React, { useEffect } from 'react'


const Logs = ({ sendTitle }) => {
    useEffect(() => {
        sendTitle("Logs")
    })
    return (
        <div className="Logs row p-5">
            <div className="col-12">
                <p>Creez , modifier, supprimez et attibuer des roles et des accèss à des utilisateurs</p>
            </div>
        </div>
    )
}

export default Logs