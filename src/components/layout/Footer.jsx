import { useLanguage } from '../../contexts/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    const { language } = useLanguage();

    return (
        <footer className="gn-layout-footer">
            <ul className="gn-layout-footer-channel">
                {language !== 'en' && (
                    <li>
                        <a className="btn-kakao" href="https://open.kakao.com/o/g10WY6vf" target="_blank" rel="noreferrer">
                            <b>
                                카카오톡 오픈 채팅
                                <small>비밀번호: 191191</small>
                            </b>
                        </a>
                    </li>
                )}
                {language !== 'en' && (
                    <li>
                        <a className="btn-discord" href="https://cafe.naver.com/fidelion" target="_blank">
                            <b>네이버 카페</b>
                        </a>
                    </li>
                )}
                <li>
                    <a className="btn-discord" href="https://discord.gg/officialfidelion" target="_blank">
                        <b>
                            {language === 'en' ? 'Official Discord' : '공식 디스코드'}
                        </b>
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
