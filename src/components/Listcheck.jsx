import React from 'react'

export const Check = ({ text, click, selected }) => {
    return (
        <div className={`row Check p-1 ${selected && "checked"}`} onClick={()=>click()}>
            <div className="col-1 p-1 justify-content-center case">
                <div className="p-2 bg-light"></div>
            </div>
            <div className="col-10 d-flex align-items-center">
                <span className="font-weight-normal ">{text}</span>
            </div>
        </div>
    )
}


const Listcheck = ({list, activeCheck}) => {
    return (
        <div className="Listcheck p-3">
            {
                list.map(({ text, value }) => (
                    <Check text={text} key={value} click={()=>activeCheck(value) }/>
                ))
            }
        </div>
    )
}

export default Listcheck