import React, { useState, useEffect } from 'react'

function NFTPriceInfo() {
    const [floorPrice, setFloorPrice] = useState(null)
    const [listedCount, setListedCount] = useState(null)

    useEffect(() => {
        const options = { method: 'GET', headers: { accept: 'application/json' } }

        fetch('/api/stats', options)
            .then(response => response.json())
            .then(data => {
                // API로부터 받은 floorPrice 값을 1,000,000,000로 나누어 상태에 저장
                const calculatedPrice = (data.floorPrice / 1000000000) * 1.05
                setFloorPrice(parseFloat(calculatedPrice.toFixed(2)))
                setListedCount(data.listedCount)
            })
            .catch(err => console.error(err))
    }, []) // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 API 호출

    return (
        <div className="gn-nft-price">
            <div className="gn-nft-price-inner">
                <h3 className="text-heading">NFT Floor Price</h3>
                <p>Powered by Magiceden</p>
                <div className="gn-block">
                    <b className="text-collection">
                        FIDELION<span>Listed {listedCount}</span>
                    </b>
                    <p className="text-price">{floorPrice ? `${floorPrice.toFixed(2)} SOL` : 'Loading...'}</p>
                </div>
            </div>
        </div>
    )
}

export default NFTPriceInfo
