import { useState, useEffect } from 'react';

const usePrices = () => {
    const [prices, setPrices] = useState({
        solanaPrice: null,
        token2080Price: null,
        usdKrwExchangeRate: null, // 환율 정보 추가
    });

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // Solana 가격 정보
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

                // 2080 토큰 가격 정보
                const token2080Response = await fetch(
                    'https://public-api.birdeye.so/public/price?address=Dwri1iuy5pDFf2u2GwwsH2MxjR6dATyDv9En9Jk8Fkof',
                    {
                        method: 'GET',
                        headers: {
                            'x-chain': 'solana',
                            'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                        },
                    }
                );
                const token2080Data = await token2080Response.json();

                const exchangeResponse = await fetch('/exchange-api?authkey=CKxFJAScH4L3j7YmIpni9PZs14LhBams&searchdate=20240306&data=AP01');
                const exchangeData = await exchangeResponse.json();
                const usdInfo = exchangeData.find(currency => currency.cur_unit === 'USD');

                setPrices({
                    solanaPrice: dataSolana.data.value.toFixed(2),
                    token2080Price: token2080Data.data.value.toFixed(4),
                    usdKrwExchangeRate: parseFloat(usdInfo.kftc_deal_bas_r.replace(/,/g, '')), // 환율 정보 저장
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPrices();
    }, []);

    return prices;
};

export default usePrices;
