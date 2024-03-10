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
        setFortuneRush(lukMaxValue ? lukMaxValue.Multiplier : '1.0000')
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

    return (
        <div className="gn-stats">
            <div className="gn-block gn-stats-calc">
                <h3 className="text-heading">스탯 비용 계산</h3>
                <div className="gn-box">
                    <h5 className="text-label">DEF Level</h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {defRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {defRange[1]} <span>Lv.</span>
                        </Typography>
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
                    <h5 className="text-label">LUK Level</h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {lukRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {lukRange[1]} <span>Lv.</span>
                        </Typography>
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
                    <h5 className="text-label">DEX Level</h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {dexRange[0]} <span>Lv.</span>
                            <i>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </i>
                            {dexRange[1]} <span>Lv.</span>
                        </Typography>
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
                        <dt>루팅 시간 감소율</dt>
                        <dd>{decreaseRatio}</dd>
                    </dl>
                    <dl>
                        <dt>스탯 레벨업 소모 비용</dt>
                        <dd className="text-highlight">{statsPriceSum.toLocaleString()}</dd>
                    </dl>
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
