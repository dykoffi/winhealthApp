import React, { useEffect } from 'react'


const Services = ({sendTitle}) => {
    useEffect(() => {
        sendTitle("Services")
    })
    return (
        <div className="Services row p-5">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae recusandae asperiores, voluptate illo et, hic exercitationem fuga tempore minima fugiat facilis a neque aperiam iste repudiandae maxime sunt, consequuntur aspernatur?</p>
        </div>
    )
}

export default Services