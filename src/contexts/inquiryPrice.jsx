import React, { createContext, useState, useContext, useEffect } from 'react';

const PriceContext = createContext();

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
    const [price, setPrice] = useState(null);

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
        setPrice(data.data.value.toFixed(2));
        } catch (error) {
        console.error('Error fetching price:', error);
        }
    };

    return (
        <PriceContext.Provider value={{ price, fetchPrice }}>
            {children}
        </PriceContext.Provider>
    );
};
