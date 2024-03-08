// Header.jsx
import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <footer className="gn-layout-footer">
            <ul className="gn-layout-footer-channel">
                <li>
                    <a className="btn-kakao" href="https://open.kakao.com/o/g10WY6vf" target="_blank">
                        <b>
                            <i className="icon">
                                <FontAwesomeIcon icon={faComment} />
                            </i>
                            카카오톡 오픈 채팅<small>(비번: 191191)</small>
                        </b>
                    </a>
                </li>
                <li>
                    <a className="btn-discord" href="https://discord.gg/officialfidelion" target="_blank">
                        <b>
                            <i className="icon">
                                <FontAwesomeIcon icon={faDiscord} />
                            </i>
                            공식 디스코드
                        </b>
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
