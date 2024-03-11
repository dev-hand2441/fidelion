import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

function TokenPrices() {
    const [priceSolana, setPriceSolana] = useState(null)
    const [price2080, setPrice2080] = useState(null)

    useEffect(() => {
        const fetchPrices = async () => {
            // Solana 토큰 가격 정보 요청
            const responseSolana = await fetch(
                'https://public-api.birdeye.so/public/price?address=So11111111111111111111111111111111111111112',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const dataSolana = await responseSolana.json()
            const solanaPrice = dataSolana.data.value.toFixed(2) // Solana 토큰 가격 정보 저장 (소수점 2자리)
            setPriceSolana(solanaPrice)

            // 2080 토큰 가격 정보 요청
            const response2080 = await fetch(
                'https://public-api.birdeye.so/public/price?address=Dwri1iuy5pDFf2u2GwwsH2MxjR6dATyDv9En9Jk8Fkof',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const data2080 = await response2080.json()
            const token2080Price = data2080.data.value.toFixed(4) // 2080 토큰 가격 정보 저장 (소수점 5자리)
            setPrice2080(token2080Price)
        }

        fetchPrices() // 토큰 가격 정보 요청 함수 실행
    }, [])

    return (
        <div className="gn-token-price">
            <div className="gn-token-price-inner">
                <h3 className="text-heading">Token Current Price</h3>
                <p>Powered by Birdeye</p>
                <button className="btn-reload-api">
                    <i>
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </i>
                    <b>Update price</b>
                </button>
                <ul>
                    <li className="gn-box">
                        <i className="image-token">
                            <img src="/image/token_2080.png" alt="" />
                        </i>
                        <b className="text-token">2080</b>
                        <p className="text-price">
                            {price2080 ? `$${price2080}` : 'Loading...'}
                        </p>
                    </li>
                    <li className="gn-box">
                        <i className="image-token">
                            <img src="/image/token_sol.png" alt="" />
                        </i>
                        <b className="text-token">Solana</b>
                        <p className="text-price">
                            {priceSolana ? `$${priceSolana}` : 'Loading...'}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TokenPrices
