import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import usePrices from '../../../contexts/usePrices'

function TokenPrices() {
    const [token2080ToKRW, setToken2080ToKRW] = useState(null)
    const [solanaToKRW, setSolanaToKRW] = useState(null)

    const { solanaPrice, token2080Price, usdKrwExchangeRate, fetchPrices } = usePrices()

    useEffect(() => {
        if (usdKrwExchangeRate) {
            setToken2080ToKRW((token2080Price * usdKrwExchangeRate).toFixed(2));
            setSolanaToKRW((solanaPrice * usdKrwExchangeRate).toFixed(2));
        }
    }, [usdKrwExchangeRate, token2080Price, solanaPrice]);

    const handleRefreshClick = () => {
        fetchPrices()
    }

    return (
        <div className="gn-token-price">
            <div className="gn-token-price-inner">
                <h3 className="text-heading">Token Current Price</h3>
                <p>Powered by Birdeye</p>
                <button className="btn-reload-api" onClick={handleRefreshClick}>
                    <i>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </i>
                    <b>Update Price</b>
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
                            {solanaPrice ? `$${solanaPrice}` : 'Loading...'} {solanaToKRW ? `≈ ${solanaToKRW}원` : ''}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TokenPrices
