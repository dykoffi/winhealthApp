import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ label, name, type, icon, helptext, placeholder, value, feedback, change }) => (
    <div className="Input p-2 row">
        <label htmlFor={name} className="font-weight-bold text-capitalize">{label}</label>
        <div className="col-12">
            <div className="row">
                {
                    icon && (
                        <div className="col-2 p-2 text-center bg-dark white-text">
                            <i className={`mdi-${icon}`}></i>
                        </div>
                    )
                }
                <input
                    className="white border-0 p-2 col-10"
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    value={value}
                    onChange={(ev) => change(ev)}
                    autoComplete="off"
                />
                <div>
                    <small>{helptext}</small>
                </div>
            </div>
        </div>
    </div>
)

Input.prototype = {
    name: PropTypes.string.isRequired,
    helptext: PropTypes.string.isRequired,
    type: PropTypes.string
}

Input.defaultProps = {
    type: "text"
}

export default Input