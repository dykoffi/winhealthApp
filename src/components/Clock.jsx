import React, { useState, useEffect } from 'react'
import moment from 'moment'

const Clock = () => {
    moment.locale('fr')
    const [jour] = useState(moment().format('LL'))
    const [time, settime] = useState(moment().format('LTS'))

    useEffect(() => {
        const interval = setInterval(() => {
            settime(moment().format('LTS'))
        }, 1000);

        return function unmount() {
            clearInterval(interval)
        }
    }, [])
    
    return (
        <div className="row m-4 white grey-text p-2 ombre">
            <div className="col-2 text-center">
                <i className="mdi-image-timer mdi-2x"></i>
            </div>
            <div className="col-10 text-right">
                <div className="lead">{jour}</div>
                <div className=""><h6>{time}</h6></div>
            </div>
        </div>
    )
}

export default Clock