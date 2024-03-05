import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="gn-layout-toolbar">
            <ul>
                <li>
                    <Link to="/">DEX Stats</Link>
                </li>
                <li>
                    <Link to="/level">Fame Level</Link>
                </li>
                <li>
                    <Link to="/roi">ROI</Link>
                </li>
                <li>
                    <Link to="/guide">초보자 가이드</Link>
                </li>
            </ul>
        </div>
    )
}

export default Footer
