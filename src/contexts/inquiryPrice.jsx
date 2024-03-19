import React, { createContext, useState, useContext, useEffect } from 'react';

const PriceContext = createContext();

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {

    // 상태로 가지고 있을 필요가 없어짐
    const [prices, setPrices] = useState({ token2080Price: null, solanaPrice: null, usdKrwExchangeRate: null });

    const fetchPrices = async () => {
        try {
            // 각 코인 및 환율에 대한 API 호출 로직 구현
            // 예시 코드이므로 실제 API 요청에 맞게 수정 필요
            const token2080Response = await fetch(
                'https://public-api.birdeye.so/public/price?address=Dwri1iuy5pDFf2u2GwwsH2MxjR6dATyDv9En9Jk8Fkof',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const token2080Data = await token2080Response.json();

            const solanaResponse = await fetch(
                'https://public-api.birdeye.so/public/price?address=So11111111111111111111111111111111111111112',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const solanaData = await solanaResponse.json();

            let exchangeUSD = null; // 초기값 설정
            if (process.env.NODE_ENV === 'production') {
                const exchangeRateResponse = await fetch(
                    '/exchange-api?authkey=CKxFJAScH4L3j7YmIpni9PZs14LhBams&searchdate=20240306&data=AP01'
                );
                const exchangeRateData = await exchangeRateResponse.json();
                const usdInfo = exchangeRateData.find(currency => currency.cur_unit === 'USD');
                exchangeUSD = parseFloat(usdInfo.kftc_deal_bas_r.replace(/,/g, ''));
            }

            console.log(`$2080 ${token2080Data.data.value.toFixed(4)} / $SOL ${solanaData.data.value.toFixed(2)}`);

            setPrices({
                token2080Price: token2080Data.data.value.toFixed(4),
                solanaPrice: solanaData.data.value.toFixed(2),
                usdKrwExchangeRate: exchangeUSD
            });
        } catch (error) {
            console.error('Error fetching prices:', error);
        }
    }

    // 초기 가격 정보 로드
    useEffect(() => {
        fetchPrices();
    }, []);

    return (
        <PriceContext.Provider value={{ ...prices, fetchPrices }}>
            {children}
        </PriceContext.Provider>
    );
};
