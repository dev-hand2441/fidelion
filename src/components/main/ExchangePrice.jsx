import React, { useState, useEffect } from 'react'
import { Box, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import { usePrice } from '../../contexts/inquiryPrice';

function ExchangePrice() {

    const [selectedOption, setSelectedOption] = useState('solana');
    const [inputText, setInputText] = useState('');

    const selectToken = (event) => {
        setSelectedOption(event.target.value);
    };

    const selectTokenValue = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div>
            <Box display="flex" alignItems="center" gap={1}>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        value={selectedOption}
                        onChange={selectToken}
                    >
                        <MenuItem value="solana"><i className="image-token-2080"></i>{2080}</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={inputText}
                    onChange={selectTokenValue}
                />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        value={selectedOption}
                        onChange={selectToken}
                    >
                        <MenuItem value="solana"><i className="image-token-2080"></i>{2080}</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={inputText}
                    onChange={selectTokenValue}
                />
            </Box>
        </div>
    )
}

export default ExchangePrice
