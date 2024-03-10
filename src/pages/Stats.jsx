import React, { useState, useEffect } from 'react'
import { Slider, Typography, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import defData from '../json/def.json' // looting.json 파일 import
import lukData from '../json/luk.json' // looting.json 파일 import
import dexData from '../json/dex.json' // looting.json 파일 import

function Stats() {
    const [defRange, setDefRange] = useState([0, 46])
    const [lukRange, setLukRange] = useState([0, 46])
    const [dexRange, setDexRange] = useState([0, 38])
    const [statsPriceSum, setStatsPriceSum] = useState(0)
    const [counterAttack, setCounterAttack] = useState(0)
    const [fortuneRush, setFortuneRush] = useState(0)
    const [fortuneRushMultiple, setFortuneRushMultiple] = useState(0)
    const [decreaseRatio, setDecreaseRatio] = useState(0)

    useEffect(() => {
        // 지정된 구간 내의 price 값들을 누적하여 합산
        const calculatePriceSum = (data, range) => {
            return data.slice(range[0], range[1] + 1).reduce((acc, item) => acc + item.price, 0)
        }

        const defPriceSum = calculatePriceSum(defData, defRange)
        const lukPriceSum = calculatePriceSum(lukData, lukRange)
        const dexPriceSum = calculatePriceSum(dexData, dexRange)

        setStatsPriceSum(defPriceSum + lukPriceSum + dexPriceSum)

        // DEF 최대값에 따른 CounterAttack 설정
        const defMaxValue = defData.find(item => item.lv === defRange[1])
        setCounterAttack(defMaxValue ? defMaxValue.counter : '0.00%')

        // LUK 최대값에 따른 FortuneRush 및 FortuneRushMultiple 설정
        const lukMaxValue = lukData.find(item => item.lv === lukRange[1])
        setFortuneRush(lukMaxValue ? Number(lukMaxValue.Multiplier).toFixed(2) : '1.00')
        setFortuneRushMultiple(lukMaxValue ? lukMaxValue['Reward Multiplier'] : '2')

        // DEX 최대값에 따른 DecreaseRatio 설정
        const dexMaxValue = dexData.find(item => item.lv === dexRange[1])
        setDecreaseRatio(dexMaxValue ? dexMaxValue.reduction : '0.00%')
    }, [defRange, lukRange, dexRange])

    //슬라이더 change 이벤트
    // 각 슬라이더 변경 이벤트 핸들러
    const handleDefRangeChange = (event, newValue) => setDefRange(newValue)
    const handleLukRangeChange = (event, newValue) => setLukRange(newValue)
    const handleDexRangeChange = (event, newValue) => setDexRange(newValue)

    const [priceSolana, setPriceSolana] = useState(null)
    const [price2080, setPrice2080] = useState(null)
    const [token2080ToKRW, setToken2080ToKRW] = useState(0)
    const [token2080ToSol, setToken2080ToSol] = useState(0)
    const [token2080ToUSD, setToken2080ToUSD] = useState(0)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // 2080 토큰 가격 정보 요청
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
                const token2080Price = parseFloat(data2080.data.value) // 2080 토큰 가격

                // Solana 토큰 가격 정보 요청
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
                const solanaPrice = parseFloat(dataSolana.data.value) // Solana 토큰 가격

                // USD 가치 계산
                const token2080ToUSD = statsPriceSum * token2080Price
                setToken2080ToUSD(token2080ToUSD.toFixed(2))

                // Sol 가치 계산
                const token2080ToSol = token2080ToUSD / solanaPrice
                setToken2080ToSol(token2080ToSol.toFixed(4))
            } catch (error) {
                console.error('가격 정보를 불러오는 중 에러가 발생했습니다:', error)
            }
        }

        fetchPrices() // 가격 정보 요청 함수 실행
    }, [statsPriceSum])

    // 환율 API 요청(30분마다 갱신)
    const fetchExchange = async () => {
        try {
            console.log('fetchExchange')
            // USD와 KRW 환율 정보를 가져오는 API 요청
            const apiUrl = '/exchange-api?authkey=CKxFJAScH4L3j7YmIpni9PZs14LhBams&searchdate=20240306&data=AP01'
            const response = await fetch(apiUrl)
            const data = await response.json()
            const usdInfo = data.find(currency => currency.cur_unit === 'USD')
            const kftcDealBasR = parseFloat(usdInfo.kftc_deal_bas_r.replace(/,/g, ''))
            console.log(kftcDealBasR)
            setToken2080ToKRW(kftcDealBasR)
        } catch (error) {
            console.error('환율 정보를 불러오는 중 에러가 발생했습니다:', error)
        }
    }

    useEffect(() => {
        console.log('exchange useeffect')
        fetchExchange() // 컴포넌트가 마운트될 때 함수 실행
        const interval = setInterval(fetchExchange, 1800000) // 30분마다 함수를 반복 실행

        return () => clearInterval(interval) // 컴포넌트가 언마운트될 때 인터벌을 정리
    }, [])

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
                        <dt>스탯 레벨업 예상 비용</dt>
                        <dd>
                            <dl>
                                <dt>$2080</dt>
                                <dd>
                                    <i className="image-token-2080"></i>
                                    {statsPriceSum.toLocaleString()}
                                </dd>
                            </dl>
                            {/* <dl>
                                <dt>USD</dt>
                                <dd>${token2080ToUSD.toLocaleString()}</dd>
                            </dl> */}
                            {/* <dl>
                                <dt>$SOL</dt>
                                <dd>
                                    <i className="image-token-sol"></i>
                                    {token2080ToSol}
                                </dd>
                            </dl>
                            <dl>
                                <dt>USD</dt>
                                <dd>${token2080ToUSD.toLocaleString()}</dd>
                            </dl>
                            <dl>
                                <dt>KRW</dt>
                                <dd>{token2080ToKRW.toLocaleString()}원</dd>
                            </dl> */}
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
