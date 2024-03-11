import React, { useState, useEffect, useCallback } from 'react'
import { Slider, Typography, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash'

import defData from '../../json/def.json' // looting.json 파일 import
import lukData from '../../json/luk.json' // looting.json 파일 import
import dexData from '../../json/dex.json' // looting.json 파일 import

function Stats() {
    const [defRange, setDefRange] = useState([0, 46])
    const [lukRange, setLukRange] = useState([0, 46])
    const [dexRange, setDexRange] = useState([0, 38])
    const [statsPriceSum, setStatsPriceSum] = useState(0)
    const [counterAttack, setCounterAttack] = useState('0.00%')
    const [fortuneRush, setFortuneRush] = useState('1.00')
    const [fortuneRushMultiple, setFortuneRushMultiple] = useState('2')
    const [decreaseRatio, setDecreaseRatio] = useState('0.00%')
    const [token2080Price, setToken2080Price] = useState(null)
    const [solanaPrice, setSolanaPrice] = useState(null)
    const [usdKrwExchangeRate, setUsdKrwExchangeRate] = useState(null)
    const [token2080ToUSD, setToken2080ToUSD] = useState(0)
    const [token2080ToSol, setToken2080ToSol] = useState(0)
    const [token2080ToKRW, setToken2080ToKRW] = useState(0)

    const calculatePriceSum = (data, range) =>
        data.slice(range[0], range[1] + 1).reduce((acc, item) => acc + item.price, 0)

    useEffect(() => {
        const defPriceSum = calculatePriceSum(defData, defRange)
        const lukPriceSum = calculatePriceSum(lukData, lukRange)
        const dexPriceSum = calculatePriceSum(dexData, dexRange)

        setStatsPriceSum(defPriceSum + lukPriceSum + dexPriceSum)

        // DEF 슬라이더 값 매핑
        const defItem = defData.find(item => item.lv === defRange[1])
        if (defItem) {
            setCounterAttack(defItem.counter)
        }

        // LUK 슬라이더 값 매핑
        const lukItem = lukData.find(item => item.lv === lukRange[1])
        if (lukItem) {
            setFortuneRush(lukItem.Multiplier)
            setFortuneRushMultiple(lukItem['Reward Multiplier'])
        }

        // DEX 슬라이더 값 매핑
        const dexItem = dexData.find(item => item.lv === dexRange[1])
        if (dexItem) {
            setDecreaseRatio(dexItem.reduction)
        }
    }, [defRange, lukRange, dexRange])

    const calculateValues = useCallback(() => {
        if (token2080Price && solanaPrice) {
            const calculatedToken2080ToUSD = statsPriceSum * token2080Price
            setToken2080ToUSD(calculatedToken2080ToUSD)

            const calculatedToken2080ToSol = calculatedToken2080ToUSD / solanaPrice
            setToken2080ToSol(calculatedToken2080ToSol.toFixed(2))

            const calculatedToken2080ToKRW = calculatedToken2080ToUSD * usdKrwExchangeRate
            setToken2080ToKRW(calculatedToken2080ToKRW)
        }
    }, [statsPriceSum, token2080Price, solanaPrice, usdKrwExchangeRate])

    const fetchPrices = useCallback(async () => {
        try {
            const response2080 = await fetch(
                'https://public-api.birdeye.so/public/price?address=Dwri1iuy5pDFf2u2GwwsH2MxjR6dATyDv9En9Jk8Fkof',
                {
                    method: 'GET',
                    headers: {
                        'x-chain': 'solana',
                        'X-API-KEY': '72e6d89433b645cf8993ad398f95aeea',
                    },
                }
            )
            const data2080 = await response2080.json()
            setToken2080Price(parseFloat(data2080.data.value))

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
            setSolanaPrice(parseFloat(dataSolana.data.value))
        } catch (error) {
            // 가격 호출 에러
        }
    }, [])

    // Only run fetchPrices once on component mount
    useEffect(() => {
        fetchPrices()
    }, [])

    // Calculate values whenever one of the dependencies changes
    useEffect(() => {
        calculateValues()
    }, [calculateValues])

    const handleDefRangeChange = (event, newValue) => setDefRange(newValue)
    const handleLukRangeChange = (event, newValue) => setLukRange(newValue)
    const handleDexRangeChange = (event, newValue) => setDexRange(newValue)

    return (
        <div className="gn-stats">
            <div className="gn-block gn-stats-calc">
                <h3 className="text-heading">Calculating stats costs</h3>
                <div className="gn-box">
                    <h5 className="text-label">
                        DEF Level
                    </h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {defRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {defRange[1]} <span>Lv.</span>
                        </Typography>
                        <p className="text-effect">
                            {counterAttack} {defRange[1] < 46 ? 'restoration' : 'counterattack'} on backfire
                        </p>
                        <Box className="form-slider">
                            <Slider
                                value={defRange}
                                onChange={handleDefRangeChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={90}
                            />
                        </Box>
                    </div>
                    <h5 className="text-label">
                        LUK Level
                    </h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {lukRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {lukRange[1]} <span>Lv.</span>
                        </Typography>
                        <p className="text-effect">{fortuneRush}x Fortune Rush Chance</p>
                        <Box className="form-slider">
                            <Slider
                                value={lukRange}
                                onChange={handleLukRangeChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={90}
                            />
                        </Box>
                    </div>
                    <h5 className="text-label">
                        DEX Level
                    </h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {dexRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {dexRange[1]} <span>Lv.</span>
                        </Typography>
                        <p className="text-effect">{decreaseRatio} reduction in Looting duration</p>
                        <Box className="form-slider">
                            <Slider
                                value={dexRange}
                                onChange={handleDexRangeChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={60}
                            />
                        </Box>
                    </div>
                </div>

                <div className="gn-box">
                    <dl>
                        <dt>Backfire Counterattack</dt>
                        <dd>{counterAttack}</dd>
                    </dl>
                    <dl>
                        <dt>FortuneRush Multiplier</dt>
                        <dd>{fortuneRush}x</dd>
                    </dl>
                    <dl>
                        <dt>FortuneRush Price Multiplier</dt>
                        <dd>{fortuneRushMultiple}x</dd>
                    </dl>
                    <dl>
                        <dt>Duration reduction rate</dt>
                        <dd>{decreaseRatio}</dd>
                    </dl>
                    <dl>
                        <dt>
                            Estimated cost {' '}
                            <button className="btn-reload-api" onClick={fetchPrices}>
                                <i>
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </i>
                                <b>Update price</b>
                            </button>
                        </dt>
                        <dd>
                            <dl>
                                <dt>
                                    <i className="image-token-2080"></i>
                                </dt>
                                <dd>{statsPriceSum.toLocaleString()}</dd>
                            </dl>
                            <dl>
                                <dt>
                                    <i className="image-token-sol"></i>
                                </dt>
                                <dd>{token2080ToSol ? `${token2080ToSol} SOL` : 'Loading...'}</dd>
                            </dl>
                            <dl>
                                <dt>USD</dt>
                                <dd>
                                    {token2080ToUSD
                                        ? `$${token2080ToUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                                        : 'Loading...'}
                                </dd>
                            </dl>
                        </dd>
                    </dl>
                    <div className="gn-note">
                        <ul>
                            <li>The above prices are estimates and may vary depending on the price impact of the DEX.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
