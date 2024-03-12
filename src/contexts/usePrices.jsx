import { useState, useCallback, useEffect } from 'react'

const usePrices = () => {
    const [prices, setPrices] = useState({
        solanaPrice: null,
        token2080Price: null,
        usdKrwExchangeRate: null,
    })

    const fetchPrices = useCallback(async () => {
        let solanaPrice = null
        let token2080Price = null
        let usdKrwExchangeRate = null

        // Solana 가격 정보 가져오기
        try {
            const response = await fetch(
                'https://public-api.birdeye.so/public/price?address=So11111111111111111111111111111111111111112',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const data = await response.json()
            solanaPrice = data.data.value.toFixed(2)
        } catch (error) {
            console.error('Solana price fetch error:', error)
        }

        // 2080 토큰 가격 정보 가져오기
        try {
            const response = await fetch(
                'https://public-api.birdeye.so/public/price?address=Dwri1iuy5pDFf2u2GwwsH2MxjR6dATyDv9En9Jk8Fkof',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const data = await response.json()
            token2080Price = data.data.value.toFixed(4)
        } catch (error) {
            console.error('2080 token price fetch error:', error)
        }

        // 환율 정보 가져오기
        try {
            const response = await fetch(
                '/exchange-api?authkey=CKxFJAScH4L3j7YmIpni9PZs14LhBams&searchdate=20240306&data=AP01'
            )
            const data = await response.json()
            const usdInfo = data.find(currency => currency.cur_unit === 'USD')
            usdKrwExchangeRate = parseFloat(usdInfo.kftc_deal_bas_r.replace(/,/g, ''))
        } catch (error) {
            console.error('Exchange rate fetch error:', error)
        }

        // API 호출 결과를 상태에 설정
        setPrices({
            solanaPrice,
            token2080Price,
            usdKrwExchangeRate,
        })
    }, [])

    useEffect(() => {
        fetchPrices()
    }, [fetchPrices])

    return { ...prices, fetchPrices }
}

export default usePrices
