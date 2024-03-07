import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBolt } from '@fortawesome/free-solid-svg-icons'

function Toolbar() {
    return (
        <div className="gn-layout-toolbar">
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                        <i>
                            <FontAwesomeIcon icon={faHouse} />
                        </i>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/looting" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                        <i>
                            <FontAwesomeIcon icon={faBolt} />
                        </i>
                        Looting
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to="/level" activeClassName="active"><i><FontAwesomeIcon icon={faSliders} /></i>Lv/Stats</NavLink>
                </li>
                <li>
                    <NavLink to="/roi" activeClassName="active"><i><FontAwesomeIcon icon={faMoneyBillTransfer} /></i>ROI</NavLink>
                </li> */}
            </ul>
        </div>
    )
}

export default Toolbar
