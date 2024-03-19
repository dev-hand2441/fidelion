import { useState, useEffect, useCallback } from 'react';
import { Box, Select, MenuItem, TextField, FormControl } from '@mui/material';

import tokenPrices from '../../json/tokenPrice.json';
import { usePrice } from '../../contexts/InquiryPrice';

function ExchangePrice() {
    const [selectedToken, setSelectedToken] = useState('2080');
    const [tokenValue, setTokenValue] = useState('');
    const [convertSelectedToken, setConvertSelectedToken] = useState('USDC');
    const [convertTokenValue, setConvertTokenValue] = useState('');
    const { fetchPrice } = usePrice();

    const [firstTokenPrice, setFirstTokenPrice] = useState(null);
    const [secondTokenPrice, setSecondTokenPrice] = useState(null);

    useEffect(() => {
        if (selectedToken && tokenPrices[selectedToken]) {
            fetchPrice(tokenPrices[selectedToken]).then(fetchedPrice => {
                setFirstTokenPrice(fetchedPrice);
            });
        }
    }, [selectedToken]); // fetchPrice 의존성 제거

    useEffect(() => {
        if (convertSelectedToken && tokenPrices[convertSelectedToken]) {
            fetchPrice(tokenPrices[convertSelectedToken]).then(fetchedPrice => {
                setSecondTokenPrice(fetchedPrice);
            });
        }
    }, [convertSelectedToken]); // fetchPrice 의존성 제거

    useEffect(() => {
        if (firstTokenPrice && secondTokenPrice && tokenValue) {
            const numericTokenValue = Number(tokenValue.replace(/,/g, ''));
            if (!isNaN(numericTokenValue)) {
                const convertedValue = ((numericTokenValue * firstTokenPrice) / secondTokenPrice).toFixed(3);
                setConvertTokenValue(convertedValue.toLocaleString());
            }
        }
    }, [firstTokenPrice, secondTokenPrice, tokenValue]);

    const selectToken = (event) => {
        setSelectedToken(event.target.value);
    };

    const changeTokenValue = (event) => {
        const value = event.target.value.replace(/,/g, ''); // 콤마 제거
        const numericValue = Number(value); // 숫자로 변환
        if (!isNaN(numericValue)) { // 숫자인 경우만 업데이트
            setTokenValue(numericValue.toLocaleString()); // 콤마 추가
        }
    };

    const convertSelectToken = (event) => {
        setConvertSelectedToken(event.target.value);
    };

    return (
        <div className='gn-block gn-price-exchange'>
            <h3 className="text-heading">코인 가격 환산</h3>
            <div className="gn-box">
                <Box display="flex" alignItems="center" width="100%">
                    <FormControl sx={{ width: 'auto', marginRight: '16px' }}>
                        <Select
                            value={selectedToken}
                            onChange={selectToken}
                            sx={{
                                width: 160,
                                border: 'none',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }}
                        >
                            {Object.entries(tokenPrices).map(([key]) => (
                                <MenuItem key={key} value={key}><i className={`image-token-${key.toLowerCase()}`}></i><span className="text-token">{key}</span></MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        value={tokenValue}
                        onChange={changeTokenValue}
                        placeholder="0.00" // Placeholder 추가
                        sx={{
                            border: 'none',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            },
                            '& .MuiInputBase-input': {
                                "font-weight": '700'
                            }
                        }}
                    />
                </Box>
                <Box display="flex" alignItems="center" width="100%">
                    <FormControl sx={{ width: 'auto', marginRight: '16px' }}>
                        <Select
                            value={convertSelectedToken}
                            onChange={convertSelectToken}
                            sx={{
                                width: 160,
                                border: 'none',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                }
                            }}
                            displayEmpty
                        >
                            {/* <MenuItem value="solana"><i className="image-token-2080"></i><span className="text-token">2080</span></MenuItem> */}
                            {Object.entries(tokenPrices).map(([key]) => (
                                <MenuItem key={key} value={key}><i className={`image-token-${key.toLowerCase()}`}></i><span className="text-token">{key}</span></MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        value={convertTokenValue}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{
                            border: 'none',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            },
                            '& .MuiInputBase-input': {
                                "font-weight": '700'
                            }
                        }}
                    />
                </Box>
            </div>
        </div>
    )
}

export default ExchangePrice
