import React, { useEffect } from 'react'
import LoadingPoint from '../../../components/LoadingPoint'
import Information from '../../../containers/Information'


const Services = ({sendTitle}) => {
    useEffect(() => {
        sendTitle("Services")
    })
    return (
        <div className="Services row p-5 text-center d-flex flex-column justify-content-center align-items-center">
            <h6 className="lead">Page en consruction (1%)</h6>
            <LoadingPoint />
            {/* <Information  /> */}
        </div>
    )
}

export default Services