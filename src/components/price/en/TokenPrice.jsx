import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import { usePrice } from '../../../contexts/InquiryPrice';

function TokenPrices() {
    const { token2080Price, solanaPrice, fetchPrices } = usePrice();

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
                            {token2080Price ? `$${token2080Price}` : 'Loading...'}
                        </p>
                    </li>
                    <li className="gn-box">
                        <i className="image-token">
                            <img src="/image/token_sol.png" alt="" />
                        </i>
                        <b className="text-token">Solana</b>
                        <p className="text-price">
                            {solanaPrice ? `$${solanaPrice}` : 'Loading...'}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TokenPrices
