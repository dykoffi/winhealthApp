import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavHead = ({ user }) => {

    return (
        <div className="row p-4 text-light">
            <div className="col-12 text-center ">
                <i className={`mdi-social-person mdi-5x`}></i>
            </div>
            <div className="col-12 text-center">
                <h6>{user.nom + " " + user.prenoms}</h6>
                <small>{user.poste + "  -  " + user.profil}</small>
            </div>
        </div>
    )
}
NavHead.prototype = {
    user: PropTypes.object.isRequired
}

export const NavItem = ({ icon, text, links, active, actif, deplied, deply }) => (
    <div className="row Navitem">
        <div className="col-12 pl-4">
            <div className={`row text-light head p-2 ${actif && 'actifItem'}`} onClick={() => deply()}>
                <div className="col-9">  <span className="d-flex align-items-center font-weight-normal"><i className={`mdi-${icon} mr-3 `}></i> {text} </span></div>
                <div className="col-3 text-center">
                   {deplied ? <i className="mdi-navigation-expand-more"></i> : <i className="mdi-navigation-chevron-right"></i>}
                </div>
            </div>
            {
                deplied && (
                    <ul itemType="" className="text-light">
                        {
                            links.map(({ label, path }, i) => (
                                <NavLink key={i} exact activeClassName="actifLink" to={path}><li onClick={() => active()} className="" key={i}><small className="">{label}</small></li></NavLink>
                            ))
                        }
                    </ul>
                )
            }

        </div>
    </div>
)
NavItem.prototype = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    links: PropTypes.array
}

const ListItem = ({ children }) => (
    <div className="row">
        <div className="col-12">
            {children}
        </div>
    </div>
)


const Navbar = ({ user, fonctions }) => {
    const [actif, setactif] = useState(0)
    const [deplied, setdeplied] = useState(0)

    function toggleDepliedItem(index) {
        deplied === index ? setdeplied(null) : setdeplied(index)
    }
    function active(index) {
        setactif(index)
    }

    return (
        <div className="row page bg-dark Navbar">
            <div className="col-12">
                <NavHead user={user} />
                {fonctions &&
                    (<ListItem>
                        {fonctions.map(({ title, icon, links }, index) => (
                            <NavItem actif={actif === index} deplied={deplied === index} key={index} icon={icon} text={title} links={links} deply={() => toggleDepliedItem(index)} active={() => active(index)} />
                        ))}
                    </ListItem>)
                }
            </div>
        </div>
    )
}
Navbar.prototype = {
    user: PropTypes.object.isRequired,
    functions: PropTypes.array.isRequired
}

export default Navbar