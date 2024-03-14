import { useState, useEffect } from 'react'

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
    }, [])

    return (
        <div className="gn-nft-price">
            <div className="gn-nft-price-inner">
                <h3 className="text-heading">NFT Floor Price</h3>
                <p>Powered by Magiceden</p>
                <div className="gn-box">
                    <b className="text-collection">
                        FIDELION<span>Listed {listedCount}</span>
                    </b>
                    <p className="text-price">{floorPrice ? `${floorPrice.toFixed(2)} SOL` : 'Loading...'}</p>
                </div>
                <div className="gn-note">
                    <ul>
                        <li>Floor prices reflect Creator Royalties (5%) only and do not include fees.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NFTPriceInfo
