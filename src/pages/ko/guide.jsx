import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function Guide() {
    return (
        <div className="gn-guide">
            <ul>
                <li className="gn-box">
                    <a href="https://cafe.naver.com/fidelion/6" target="_blank">
                        <b>팬텀 지갑 생성 & 지갑에 솔라나 입금</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
                <li className="gn-box">
                    <a href="https://cafe.naver.com/fidelion/17" target="_blank">
                        <b>블랙마켓에서 피델리온 구매하기</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
                <li className="gn-box">
                    <a href="https://cafe.naver.com/fidelion/18" target="_blank">
                        <b>블랙마켓에서 루팅하기</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
                <li className="gn-box">
                    <a href="https://cafe.naver.com/fidelion/8" target="_blank">
                        <b>블랙마켓 모바일로 이용하기</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
                <li className="gn-box">
                    <a href="https://open.kakao.com/o/sNEP96eg" target="_blank">
                        <b>구구봇 내 지갑 수익률 시뮬레이터</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Guide
