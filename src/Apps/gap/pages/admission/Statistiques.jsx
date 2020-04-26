import React, { useEffect } from 'react'
import LoadingPoint from '../../../../components/LoadingPoint'


const Statistiques = ({sendTitle}) => {
    useEffect(() => {
        sendTitle("Statistiques patients")
    })
    return (
        <div className="Statistiques row p-5 text-center d-flex flex-column justify-content-center align-items-center">
            <h6 className="lead">Page en consruction (12%)</h6>
            <LoadingPoint />
        </div>
    )
}

export default Statistiques