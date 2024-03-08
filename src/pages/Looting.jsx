import React, { useState, useEffect } from 'react'
import { Select, MenuItem, FormControl, Slider, Typography, Box, Button, TextField, InputLabel } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

import LootingInfo from '../components/LootingInfo'
import dexData from '../json/dex.json' // dex.json 파일 import
import lootingData from '../json/looting.json' // looting.json 파일 import

function Looting() {
    const [dexLevel, setDexLevel] = useState(38) // 슬라이더의 초기값을 25로 설정
    const [faction, setFaction] = useState('[BT] Blattas') // 선택된 항목을 저장할 상태
    const [decreaseTime, setDecreaseTime] = useState('') // 시간 감소 값을 저장할 상태
    const [lootingTime, setLootingTime] = useState('') // 포맷된 루팅 기간을 저장할 상태
    const [penaltyTime, setPenaltyTime] = useState('') // 패널티 시간을 저장할 상태
    const [lootingEndTime, setLootingEndTime] = useState('')
    const [penaltyEndTime, setPenaltyEndTime] = useState('')

    const [selectedDate, setSelectedDate] = useState(dayjs())
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)

    //< 레벨 슬라이더
    useEffect(() => {
        setDecreaseTime(dexData[dexLevel.toString()]) // 슬라이더 값에 해당하는 시간 감소 값을 설정
    }, [dexLevel]) // 슬라이더 값이 변경될 때마다 실행

    const handleSliderChange = (event, newValue) => {
        setDexLevel(newValue) // 슬라이더의 값을 상태에 저장
    }
    //> 레벨 슬라이더

    //< 팩션 선택
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
        setPenaltyTime(format(penaltyHours))
    }

    useEffect(() => {
        if (faction) {
            const factionKey = faction.match(/\[(.*?)\]/)[1]
            const time = lootingData[factionKey]
            if (time && decreaseTime) {
                formatTime(time, decreaseTime)
            } else {
                setLootingTime('')
                setPenaltyTime('')
            }
        }
    }, [faction, decreaseTime])
    //> 팩션 선택

    //< 시간 계산
    const hours = Array.from({ length: 24 }, (_, index) => index)
    const minutes = Array.from({ length: 60 }, (_, index) => index)

    // 주어진 루팅 시간 문자열을 파싱하여 일, 시간, 분으로 변환
    function parseLootingTime(lootingTimeStr) {
        const [daysStr, hoursStr, minutesStr] = lootingTimeStr.match(/\d+/g)
        return {
            days: parseInt(daysStr, 10),
            hours: parseInt(hoursStr, 10),
            minutes: parseInt(minutesStr, 10),
        }
    }

    // 주어진 시간과 루팅 시간을 이용하여 최종 종료 시간 계산
    function calculateEndTime(startTime, { days, hours, minutes }) {
        return startTime.add(days, 'day').add(hours, 'hour').add(minutes, 'minute')
    }

    // dayjs 객체를 "월 일 시 분" 형식의 문자열로 포맷팅
    function formatDate(date) {
        return date.format('M월 D일 HH시 mm분')
    }

    // 패널티를 적용한 루팅 시간을 계산하는 함수
    const calculateWithPenalty = lootingTime => {
        const totalMinutes = lootingTime.days * 24 * 60 + lootingTime.hours * 60 + lootingTime.minutes
        const totalMinutesWithPenalty = totalMinutes * 1.2 // 20% 패널티 추가

        // 패널티가 적용된 총 시간을 일, 시간, 분으로 변환
        const daysWithPenalty = Math.floor(totalMinutesWithPenalty / (24 * 60))
        const hoursWithPenalty = Math.floor((totalMinutesWithPenalty % (24 * 60)) / 60)
        const minutesWithPenalty = Math.floor(totalMinutesWithPenalty % 60)

        return { days: daysWithPenalty, hours: hoursWithPenalty, minutes: minutesWithPenalty }
    }

    const handleCalculate = () => {
        const startDate = dayjs(selectedDate).hour(hour).minute(minute)
        const looting = parseLootingTime(lootingTime)

        const endTime = calculateEndTime(startDate, looting)
        const penaltyLootingTime = calculateWithPenalty(looting)
        const penaltyEndTime = calculateEndTime(startDate, penaltyLootingTime)

        setLootingEndTime(formatDate(endTime))
        setPenaltyEndTime(formatDate(penaltyEndTime))
    }

    const handleClick = () => {
        const now = dayjs()
        const looting = parseLootingTime(lootingTime)

        const endTime = calculateEndTime(now, looting)
        const penaltyLootingTime = calculateWithPenalty(looting)
        const penaltyEndTime = calculateEndTime(now, penaltyLootingTime)

        setLootingEndTime(formatDate(endTime))
        setPenaltyEndTime(formatDate(penaltyEndTime))
    }
    //> 시간 계산

    return (
        <div className="gn-looting">
            <h3 className="text-heading">루팅 정보</h3>
            <LootingInfo />

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
                    <Box className="gn-looting-date">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className="form-datepicker"
                                value={selectedDate}
                                format="YYYY-MM-DD"
                                renderInput={params => <TextField {...params} />}
                                onChange={newDate => {
                                    setSelectedDate(newDate)
                                }}
                            />

                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <FormControl className="form-select" fullWidth>
                                    <InputLabel>시간</InputLabel>
                                    <Select value={hour} onChange={e => setHour(e.target.value)} label="시간">
                                        {hours.map(h => (
                                            <MenuItem key={h} value={h}>
                                                {`${h}시`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className="form-select" fullWidth>
                                    <InputLabel>분</InputLabel>
                                    <Select value={minute} onChange={e => setMinute(e.target.value)} label="분">
                                        {minutes.map(m => (
                                            <MenuItem key={m} value={m}>
                                                {`${m}분`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </LocalizationProvider>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: '16px' }}>
                            <Button className="btn-calculate" variant="outlined" onClick={handleCalculate}>
                                계산
                            </Button>
                            <Button className="btn-today" variant="contained" onClick={handleClick}>
                                현재 시간으로 계산
                            </Button>
                        </Box>
                    </Box>
                </div>
            </div>

            <div className="gn-block">
                <div className="gn-looting-period">
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
                    <dl className="gn__period-today">
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

export default Looting
