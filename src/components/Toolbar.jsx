import React from 'react'
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';

function Toolbar() {
    return (
        <div className="gn-layout-toolbar">
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active"><i><FontAwesomeIcon icon={faHouse} /></i>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/looting" activeClassName="active"><i><FontAwesomeIcon icon={faBolt} /></i>Looting</NavLink>
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
