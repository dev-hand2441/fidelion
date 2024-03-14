import NftInfo from '../../components/price/NftInfo'
import TokenPrice from '../../components/price/TokenPrice'
import ExchangePrice from '../../components/price/ExchangePrice'

function Price() {
    return (
        <div>
            <NftInfo />
            <TokenPrice />
            <ExchangePrice />
        </div>
    )
}

export default Price
