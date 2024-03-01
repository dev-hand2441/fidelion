import React, { useState, useEffect } from 'react'

function TokenPrices() {
    const [price2080, setPrice2080] = useState(null)
    const [priceSolana, setPriceSolana] = useState(null)

    useEffect(() => {
        // 2080 토큰 가격 정보를 불러오는 함수
        const fetchPrice2080 = () => {
            fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=2080&vs_currencies=usd'
            )
                .then(response => response.json())
                .then(data => setPrice2080(data['2080'].usd))
                .catch(error =>
                    console.error(
                        '2080 토큰 가격 정보 요청 중 에러 발생:',
                        error
                    )
                )
        }

        // Solana 토큰 가격 정보를 불러오는 함수
        const fetchPriceSolana = () => {
            fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
            )
                .then(response => response.json())
                .then(data => setPriceSolana(data.solana.usd))
                .catch(error =>
                    console.error(
                        'Solana 토큰 가격 정보 요청 중 에러 발생:',
                        error
                    )
                )
        }

        // 컴포넌트 마운트 시 두 토큰의 가격 정보를 불러옵니다.
        fetchPrice2080()
        fetchPriceSolana()

        // 5분마다 두 토큰의 가격 정보를 갱신합니다.
        const intervalId2080 = setInterval(fetchPrice2080, 300000) // 300,000ms = 5min
        const intervalIdSolana = setInterval(fetchPriceSolana, 300000) // 300,000ms = 5min

        // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
        return () => {
            clearInterval(intervalId2080)
            clearInterval(intervalIdSolana)
        }
    }, [])

    return (
        <div className="gn-token-price-inner">
            <h2>토큰 현재가</h2>
            <ul>
                <li>
                    <h3>2080</h3>
                    <p className="text-price">
                        {price2080 ? `$${price2080}` : '로딩 중...'}
                    </p>
                </li>
                <li>
                    <h3>SOLANA</h3>
                    <p className="text-price">
                        {priceSolana ? `$${priceSolana}` : '로딩 중...'}
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default TokenPrices
