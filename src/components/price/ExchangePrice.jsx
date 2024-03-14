import { useState } from 'react'
import { Box, Select, MenuItem, TextField, FormControl } from '@mui/material';

import tokenPrices from '../../json/tokenPrice.json';
import { usePrice } from '../../contexts/inquiryPrice';

function ExchangePrice() {

    const [selectedToken, setSelectedToken] = useState('2080');
    const [tokenValue, setTokenValue] = useState('');

    const [convertSelectedToken, setConvertSelectedToken] = useState('SOLANA');
    const [convertTokenValue, setConvertTokenValue] = useState('');

    const selectToken = (event) => {
        setSelectedToken(event.target.value);
    };

    const changeTokenValue = (event) => {
        setTokenValue(event.target.value);
    };

    const convertSelectToken = (event) => {
        setConvertSelectedToken(event.target.value);
    };

    const CovertChangeTokenValue = (event) => {
        setConvertTokenValue(event.target.value);
    };

    return (
        <div className='gn-block gn-price-exchange'>
            <div className="gn-box">
                <Box display="flex" alignItems="center" width="100%">
                    <FormControl sx={{ width: 'auto', marginRight: '16px' }}>
                        <Select
                            value={selectedToken}
                            onChange={selectToken}
                            sx={{
                                width: 140,
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
                                width: 140,
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
                        onChange={CovertChangeTokenValue}
                        placeholder="0.00" // Placeholder 추가
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
