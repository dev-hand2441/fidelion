import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function Guide() {
    return (
        <div className="gn-guide">
            <ul>
                <li className="gn-box">
                    <a href="https://cafe.naver.com/fidelion?iframe_url=/ArticleList.nhn%3Fsearch.clubid=31167632%26search.menuid=24%26search.boardtype=L" target="_blank">
                        <b>공지 & 이벤트</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
                <li className="gn-box">
                    <a href="https://cafe.naver.com/fidelion/15" target="_blank">
                        <b>블랙마켓 용어 및 기능</b>
                        <i>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </i>
                    </a>
                </li>
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
                    <a href="https://cafe.naver.com/fidelion/7" target="_blank">
                        <b>텐서(Tensor)에서 피델리온 구매하기</b>
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
            </ul>
        </div>
    )
}

export default Guide
