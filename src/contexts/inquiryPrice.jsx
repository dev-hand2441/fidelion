import React, { createContext, useState, useContext } from 'react';

const PriceContext = createContext();

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
    // 상태로 가지고 있을 필요가 없어짐
    // const [price, setPrice] = useState(null);

    const fetchPrice = async (address) => {
        try {
            const response = await fetch(`https://public-api.birdeye.so/public/price?address=${address}`, {
                method: 'GET',
                headers: {
                    'x-chain': 'solana',
                    'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                },
            });
            const data = await response.json();
            // setPrice를 사용하는 대신 직접 가격을 반환
            return data.data.value.toFixed(2); // 가격 정보를 반환
        } catch (error) {
            console.error('Error fetching price:', error);
            return null; // 오류 발생 시 null 반환
        }
    };

    return (
        <PriceContext.Provider value={{ fetchPrice }}>
            {children}
        </PriceContext.Provider>
    );
};
