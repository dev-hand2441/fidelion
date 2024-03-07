import React, { useState, useEffect } from 'react'
import { Select, MenuItem, FormControl, Slider, Typography, Box, Button, TextField } from '@mui/material'

import dexData from '../json/dex.json' // dex.json 파일 import
import lootingData from '../json/looting.json' // looting.json 파일 import

function DexSimulator() {
    const [dexLevel, setDexLevel] = useState(38) // 슬라이더의 초기값을 25로 설정
    const [faction, setFaction] = useState('[BT] Blattas') // 선택된 항목을 저장할 상태
    const [decreaseTime, setDecreaseTime] = useState('') // 시간 감소 값을 저장할 상태
    const [lootingTime, setLootingTime] = useState('') // 포맷된 루팅 기간을 저장할 상태
    const [penaltyTime, setPenaltyTime] = useState('') // 패널티 시간을 저장할 상태
    const [lootingEndTime, setLootingEndTime] = useState('')
    const [penaltyEndTime, setPenaltyEndTime] = useState('')

    // 레벨 슬라이더
    useEffect(() => {
        setDecreaseTime(dexData[dexLevel.toString()]) // 슬라이더 값에 해당하는 시간 감소 값을 설정
    }, [dexLevel]) // 슬라이더 값이 변경될 때마다 실행

    const handleSliderChange = (event, newValue) => {
        setDexLevel(newValue) // 슬라이더의 값을 상태에 저장
    }

    // 팩션 선택
    const handleChange = event => {
        setFaction(event.target.value) // 선택된 항목을 상태에 저장
    }

    const parsePercentage = percentageStr => {
        return parseFloat(percentageStr) / 100
    }

    const formatTime = (timeInHours, decreasePercentageStr) => {
        const decreasePercentage = parsePercentage(decreasePercentageStr)
        const hours = parseInt(timeInHours, 10)
        const decreasedHours = hours * (1 - decreasePercentage) // 시간 감소 비율 적용
        const penaltyHours = decreasedHours * 1.2 // 패널티 시간 적용 (20% 증가)

        const format = hours => {
            const days = Math.floor(hours / 24)
            const remainingHours = Math.floor(hours % 24)
            const minutes = Math.floor((hours - days * 24 - remainingHours) * 60)
            return `${days}일 ${remainingHours}시 ${minutes}분`
        }

        setLootingTime(format(decreasedHours))
        setPenaltyTime(format(penaltyHours)) // 패널티 시간을 상태에 저장
    }

    useEffect(() => {
        if (faction) {
            const factionKey = faction.match(/\[(.*?)\]/)[1]
            const time = lootingData[factionKey]
            if (time && decreaseTime) {
                formatTime(time, decreaseTime)
            } else {
                setLootingTime('')
                setPenaltyTime('') // 선택이 해제되면 패널티 시간도 초기화
            }
        }
    }, [faction, decreaseTime])

    // 현재 시간으로 계산
    const calculateEndTime = hoursStr => {
        const [days, hours, minutes] = hoursStr.split(' ').map(part => parseInt(part, 10))
        const totalMinutes = days * 24 * 60 + hours * 60 + minutes

        const now = new Date()
        const endTime = new Date(now.getTime() + totalMinutes * 60000)

        return `${endTime.getMonth() + 1}월 ${endTime.getDate()}일 ${endTime.getHours()}시 ${endTime.getMinutes()}분`
    }

    const handleClick = () => {
        const lootingEndTimeFormatted = calculateEndTime(lootingTime)
        const penaltyEndTimeFormatted = calculateEndTime(penaltyTime)

        setLootingEndTime(lootingEndTimeFormatted)
        setPenaltyEndTime(penaltyEndTimeFormatted)
    }

    // 날짜 입력

    return (
        <div className="gn-dex-simulator">
            <h3 className="text-heading">루팅 시간 계산</h3>
            <div className="gn-block">
                <h5 className="text-label">Dex Level</h5>
                <div className="gn-form-box">
                    <Typography className="text-level" id="slider-value" gutterBottom>
                        {dexLevel} <span>Lv.</span>
                    </Typography>
                    <Box className="form-slider">
                        <Slider aria-label="Slider" value={dexLevel} onChange={handleSliderChange} min={0} max={60} />
                    </Box>
                </div>

                <h5 className="text-label">Faction</h5>
                <div className="gn-form-box">
                    <FormControl fullWidth className="form-select">
                        <Select
                            displayEmpty // 선택되지 않은 상태에서도 첫 번째 MenuItem 표시
                            value={faction}
                            onChange={handleChange}
                            renderValue={selected => {
                                if (selected === '') return <em>Faction을 선택하세요</em> // placeholder처럼 보이는 텍스트
                                return selected
                            }}
                        >
                            <MenuItem value={`[BT] Blattas`}>[BT] Blattas</MenuItem>
                            <MenuItem value={`[HT] Hunter`}>[HT] Hunter</MenuItem>
                            <MenuItem value={`[JB] Jack N Boyz`}>[JB] Jack N Boyz</MenuItem>
                            <MenuItem value={`[NF] Nine Fingers`}>[NF] Nine Fingers</MenuItem>
                            <MenuItem value={`[GL] Gary's Lounge`}>[GL] Gary's Lounge</MenuItem>
                            <MenuItem value={`[CL] Caballeros`}>[CL] Caballeros</MenuItem>
                            <MenuItem value={`[QS] Quasars`}>[QS] Quasars</MenuItem>
                            <MenuItem value={`[ZK] Zaikasha`}>[ZK] Zaikasha</MenuItem>
                            <MenuItem value={`[KS] Kossacks`}>[KS] Kossacks</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <h5 className="text-label">루팅 시간 입력</h5>
                <div className="gn-form-box">
                    <Button className="btn-today" fullWidth variant="contained" onClick={handleClick}>
                        현재 시간으로 계산
                    </Button>
                </div>
            </div>

            <div className="gn-dex-simulator-looting">
                <div className="gn-block">
                    <h5 className="text-faction">{faction ? faction : 'Faction'}</h5>
                    <dl>
                        <dt>기간 감소율</dt>
                        <dd>{decreaseTime ? decreaseTime : '-'}</dd>
                    </dl>
                    <dl>
                        <dt>루팅 기간</dt>
                        <dd>{lootingTime ? lootingTime : '-'}</dd>
                    </dl>
                    <dl>
                        <dt>패널티 + 20%</dt>
                        <dd>{penaltyTime ? penaltyTime : '-'}</dd>
                    </dl>
                    <dl className="gn__looting-today">
                        <dt>다음 루팅 종료일</dt>
                        <dd>
                            <dl>
                                <dt>종료일</dt>
                                <dd>{lootingEndTime ? lootingEndTime : '-'}</dd>
                            </dl>
                            <dl>
                                <dt>패널티</dt>
                                <dd>{penaltyEndTime ? penaltyEndTime : '-'}</dd>
                            </dl>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default DexSimulator
