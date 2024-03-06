import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="gn-layout-toolbar">
            <ul>
                <li>
                    <Link to="/">루팅</Link>
                </li>
                <li>
                    <Link to="/level">레벨</Link>
                </li>
                <li>
                    <Link to="/stats">스탯</Link>
                </li>
                <li>
                    <Link to="/roi">ROI</Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer
