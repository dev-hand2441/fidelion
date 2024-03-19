import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import { usePrice } from '../../contexts/InquiryPrices';

function TokenPrices() {
    const { token2080Price, solanaPrice, usdKrwExchangeRate, fetchPrices } = usePrice();

    const [token2080ToKRW, setToken2080ToKRW] = useState(null)
    const [solanaToKRW, setSolanaToKRW] = useState(null)

    useEffect(() => {
        if (usdKrwExchangeRate) {
            setToken2080ToKRW((token2080Price * usdKrwExchangeRate).toFixed(2));
            setSolanaToKRW((solanaPrice * usdKrwExchangeRate).toLocaleString(undefined, { maximumFractionDigits: 0 }));
        }
    }, [usdKrwExchangeRate, token2080Price, solanaPrice]);

    const handleRefreshClick = () => {
        fetchPrices()
    }

    return (
        <div className="gn-token-price">
            <div className="gn-token-price-inner">
                <h3 className="text-heading">코인 현재가</h3>
                <p>Powered by Birdeye</p>
                <button className="btn-reload-api" onClick={handleRefreshClick}>
                    <i>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </i>
                    <b>코인 가격 갱신</b>
                </button>
                <ul>
                    <li className="gn-box">
                        <i className="image-token">
                            <img src="/image/token_2080.png" alt="" />
                        </i>
                        <b className="text-token">2080</b>
                        <p className="text-price">
                            {token2080Price ? `$${token2080Price}` : 'Loading...'}{' '}
                            {token2080ToKRW ? `≈ ${token2080ToKRW}원` : ''}
                        </p>
                    </li>
                    <li className="gn-box">
                        <i className="image-token">
                            <img src="/image/token_sol.png" alt="" />
                        </i>
                        <b className="text-token">Solana</b>
                        <p className="text-price">
                            {solanaPrice ? `$${solanaPrice}` : 'Loading...'}{' '}
                            {solanaToKRW ? `≈ ${solanaToKRW}원` : ''}
                        </p>
                    </li>
                </ul>
                <div className="gn-note">
                    <ul>
                        <li>원화 가격은 매매 기준 환율을 이용하여 실제와 오차가 발생할 수 있습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TokenPrices
