import React, { useState, useEffect, useCallback } from 'react'
import { Slider, Typography, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { debounce } from 'lodash'

import defData from '../json/def.json' // looting.json 파일 import
import lukData from '../json/luk.json' // looting.json 파일 import
import dexData from '../json/dex.json' // looting.json 파일 import

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

    useEffect(() => {
        const calculatePriceSum = (data, range) =>
            data.slice(range[0], range[1] + 1).reduce((acc, item) => acc + item.price, 0)

        const defPriceSum = calculatePriceSum(defData, defRange)
        const lukPriceSum = calculatePriceSum(lukData, lukRange)
        const dexPriceSum = calculatePriceSum(dexData, dexRange)

        setStatsPriceSum(defPriceSum + lukPriceSum + dexPriceSum)
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

            const responseExchange = await fetch(
                '/exchange-api?authkey=CKxFJAScH4L3j7YmIpni9PZs14LhBams&searchdate=20240306&data=AP01'
            )
            const dataExchange = await responseExchange.json()
            const usdInfo = dataExchange.find(currency => currency.cur_unit === 'USD')
            setUsdKrwExchangeRate(parseFloat(usdInfo.kftc_deal_bas_r.replace(/,/g, '')))
        } catch (error) {
            console.error('Failed to fetch price data:', error)
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
                <h3 className="text-heading">스탯 비용 계산</h3>
                <div className="gn-box">
                    <h5 className="text-label">
                        DEF Level<small>(백파이어 방어)</small>
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
                            백파이어시 {counterAttack} {defRange[1] < 46 ? '복원' : '카운터어택'}
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
                        LUK Level<small>(포춘러시 강화)</small>
                    </h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {lukRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {lukRange[1]} <span>Lv.</span>
                        </Typography>
                        <p className="text-effect">포춘러시 {fortuneRush}배 적용</p>
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
                        DEX Level<small>(루팅기간 감소)</small>
                    </h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {dexRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {dexRange[1]} <span>Lv.</span>
                        </Typography>
                        <p className="text-effect">루팅 기간 {decreaseRatio} 감소</p>
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
                        <dt>백파이어 카운터어택</dt>
                        <dd>{counterAttack}</dd>
                    </dl>
                    <dl>
                        <dt>포춘러시 멀티플라이어</dt>
                        <dd>{fortuneRush}x</dd>
                    </dl>
                    <dl>
                        <dt>포춘러시 적용 배율</dt>
                        <dd>{fortuneRushMultiple}x</dd>
                    </dl>
                    <dl>
                        <dt>루팅 기간 감소율</dt>
                        <dd>{decreaseRatio}</dd>
                    </dl>
                    <dl>
                        <dt>
                            스탯 레벨업 예상 비용{' '}
                            <button className="btn-reload-api" onClick={fetchPrices}>
                                <i>
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </i>
                                <b>코인 가격 갱신</b>
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
                                <dd>{token2080ToSol} SOL</dd>
                            </dl>
                            <dl>
                                <dt>USD</dt>
                                <dd>${token2080ToUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</dd>
                            </dl>
                            <dl>
                                <dt>KRW</dt>
                                <dd>{token2080ToKRW.toLocaleString(undefined, { maximumFractionDigits: 0 })}원</dd>
                            </dl>
                        </dd>
                    </dl>
                    <div className="gn-note">
                        <ul>
                            <li>위의 가격은 예상 비용으로 DEX의 Price Impact에 따라 차이가 발생할 수 있습니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="gn-block">
                <h3 className="text-heading">스탯 조합</h3>
                <div className="gn-box">
                    <p>준비 중입니다.</p>
                </div>
            </div> */}
        </div>
    )
}

export default Stats
