import { useLanguage } from '../../contexts/LanguageContext'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faBolt, faSliders, faChartSimple, faUserPlus } from '@fortawesome/free-solid-svg-icons'

function Toolbar() {
    const { language } = useLanguage()

    return (
        <div className="gn-layout-toolbar">
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                        <i>
                            <FontAwesomeIcon icon={faCircleDollarToSlot} />
                        </i>
                        Token/NFT
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
                <li>
                    <NavLink to="/level" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                        <i>
                            <FontAwesomeIcon icon={faSliders} />
                        </i>
                        Level
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                        <i>
                            <FontAwesomeIcon icon={faChartSimple} />
                        </i>
                        Stats
                    </NavLink>
                </li>
                {language !== 'en' && (
                    <li>
                        <NavLink to="/guide" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                            <i>
                                <FontAwesomeIcon icon={faUserPlus} />
                            </i>
                            뉴비
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Toolbar
