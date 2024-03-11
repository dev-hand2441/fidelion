import React, { useState, useEffect } from 'react'
import { Select, MenuItem, FormControl, Slider, Typography, Box, Button, TextField, InputLabel } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

import LootingInfo from '../../components/looting/LootingInfo'
import dexData from '../../json/dex.json' // dex.json 파일 import
import lootingData from '../../json/looting.json' // looting.json 파일 import

function Looting() {
    const [dexLevel, setDexLevel] = useState(38) // 슬라이더의 초기값을 38로 설정
    const [selectFaction, setSelectFation] = useState('bt')
    const [faction, setFaction] = useState() // 선택된 항목을 저장할 상태, 초기값은 비어있음
    const [decreaseTime, setDecreaseTime] = useState('') // 시간 감소 값을 저장할 상태, 초기값은 비어있음
    const [lootingTime, setLootingTime] = useState('') // 감소된 루팅 시간을 저장할 상태, 초기값은 비어있음
    const [penaltyTime, setPenaltyTime] = useState('') // 패널티가 적용된 루팅 시간을 저장할 상태, 초기값은 비어있음
    const [lootingEndTime, setLootingEndTime] = useState('') // 패널티가 적용된 루팅 시간을 저장할 상태, 초기값은 비어있음
    const [penaltyEndTime, setPenaltyEndTime] = useState('') // 패널티가 적용된 루팅 시간을 저장할 상태, 초기값은 비어있음
    const [selectedDate, setSelectedDate] = useState(dayjs()) // 오늘 날짜로 초기화
    const [hour, setHour] = useState(0) // '시' 선택 초기값
    const [minute, setMinute] = useState(0) // '분' 선택 초기값

    // 초기값
    useEffect(() => {
        // Dex Level 기본값으로 decreaseTime 설정
        const initialDexEntry = dexData.find(entry => entry.lv === dexLevel)
        if (initialDexEntry) {
            setDecreaseTime(initialDexEntry.reduction)
        }

        // selectFaction 기본값으로 faction 설정
        const initialLootingEntry = lootingData[selectFaction]
        if (initialLootingEntry) {
            setFaction(initialLootingEntry.faction)

            // decreaseTime과 period 값을 사용하여 lootingTime 계산
            if (initialDexEntry) {
                const reductionPercentage = parseFloat(initialDexEntry.reduction.replace('%', '')) / 100
                const decreasedPeriod = initialLootingEntry.period * (1 - reductionPercentage)
                setLootingTime(formatPeriod(decreasedPeriod))

                // 패널티 시간 계산 및 설정
                const penaltyPeriod = decreasedPeriod * 1.2
                setPenaltyTime(formatPeriod(penaltyPeriod))
            }
        }
    }, []) // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함

    // decreaseTime이나 faction 값이 변경될 때마다 lootingTime 재계산
    useEffect(() => {
        const lootingEntry = lootingData[selectFaction] // 현재 선택된 Faction의 데이터 가져오기
        if (lootingEntry && decreaseTime) {
            const reductionPercentage = parseFloat(decreaseTime.replace('%', '')) / 100 // 감소율을 백분율에서 실수로 변환
            const decreasedPeriod = lootingEntry.period * (1 - reductionPercentage) // 감소율을 적용하여 기간 계산
            setLootingTime(formatPeriod(decreasedPeriod)) // 계산된 기간을 일, 시, 분 포맷으로 변환하여 저장

            // 패널티 시간 계산 및 설정
            const penaltyPeriod = decreasedPeriod * 1.2 // 패널티 적용
            setPenaltyTime(formatPeriod(penaltyPeriod))
        }
    }, [selectFaction, decreaseTime]) // 의존성 배열에 selectFaction과 decreaseTime 추가

    // 기간을 일, 시, 분 형식으로 포맷하는 함수
    function formatPeriod(periodInHours) {
        const days = Math.floor(periodInHours / 24)
        const hours = Math.floor(periodInHours % 24)
        const minutes = Math.round((periodInHours * 60) % 60)

        return `${days}D ${hours}H ${minutes}M`
    }

    // 기간 문자열(예: "1일 2시간 30분")을 파싱하여 일, 시간, 분으로 변환하는 함수
    const parsePeriod = periodStr => {
        const match = periodStr.match(/(\d+)일 (\d+)시간 (\d+)분/)
        if (match) {
            return {
                days: parseInt(match[1], 10),
                hours: parseInt(match[2], 10),
                minutes: parseInt(match[3], 10),
            }
        }
        return { days: 0, hours: 0, minutes: 0 }
    }

    const calculateEndTime = (start, { days, hours, minutes }) => {
        return start.add(days, 'day').add(hours, 'hour').add(minutes, 'minute')
    }

    //슬라이더 change 이벤트
    const dexSliderChangeHandle = (event, newValue) => {
        setDexLevel(newValue)
        const dexEntry = dexData.find(entry => entry.lv === newValue)
        if (dexEntry) {
            setDecreaseTime(dexEntry.reduction) // reduction 값을 감소시간으로 설정
        }
    }

    // Faction 선택 이벤트
    const selectFactionHandle = event => {
        const lootingEntry = lootingData[event.target.value] // looting.json에서 해당 Faction의 데이터를 찾음
        setFaction(lootingEntry.faction) // 선택된 Faction 값을 상태에 저장
        setSelectFation(event.target.value)

        if (lootingEntry && decreaseTime) {
            const reductionPercentage = parseFloat(decreaseTime.replace('%', '')) / 100 // 감소율을 백분율에서 실수로 변환
            const decreasedPeriod = lootingEntry.period * (1 - reductionPercentage) // 감소율을 적용하여 기간 계산
            console.log(decreasedPeriod)
            setLootingTime(formatPeriod(decreasedPeriod)) // 계산된 기간을 일, 시, 분 포맷으로 변환하여 저장
        }
    }

    // 현재 시간을 기준으로 lootingTime 및 penaltyTime 이후의 시간을 계산
    const todayLootingDateCalc = () => {
        const now = dayjs() // 현재 시간
        const lootingPeriod = parsePeriod(lootingTime) // lootingTime 파싱
        const penaltyPeriod = parsePeriod(penaltyTime) // penaltyTime 파싱

        // lootingTime을 기준으로 종료 시간 계산
        const lootingEndDate = calculateEndTime(now, lootingPeriod)
        setLootingEndTime(lootingEndDate.format('M/D HH:mm'))

        // penaltyTime을 기준으로 종료 시간 계산
        const penaltyEndDate = calculateEndTime(now, penaltyPeriod)
        setPenaltyEndTime(penaltyEndDate.format('M/D HH:mm'))
    }

    // 사용자가 선택한 날짜 및 시간을 기준으로 lootingTime 및 penaltyTime 이후의 시간을 계산
    const LootingDateCalc = () => {
        const startDate = selectedDate.hour(hour).minute(minute) // 사용자 선택 날짜 및 시간
        const lootingPeriod = parsePeriod(lootingTime) // lootingTime 파싱
        const penaltyPeriod = parsePeriod(penaltyTime) // penaltyTime 파싱

        // lootingTime을 기준으로 종료 시간 계산
        const lootingEndDate = calculateEndTime(startDate, lootingPeriod)
        setLootingEndTime(lootingEndDate.format('M/D HH:mm'))

        // penaltyTime을 기준으로 종료 시간 계산
        const penaltyEndDate = calculateEndTime(startDate, penaltyPeriod)
        setPenaltyEndTime(penaltyEndDate.format('M/D HH:mm'))
    }

    return (
        <div className="gn-looting lang-en">
            <div className="gn-block gn-looting-info">
                <h3 className="text-heading">Looting Information</h3>
                <LootingInfo />
            </div>

            <div className="gn-block">
                <h3 className="text-heading">Looting Period Calcualator</h3>
                <div className="gn-box">
                    <h5 className="text-label">Dex Level</h5>
                    <div className="gn-form-box">
                        <Typography className="text-level" id="slider-value" gutterBottom>
                            {dexLevel} <span>Lv.</span>
                        </Typography>
                        <Box className="form-slider">
                            <Slider
                                aria-label="Slider"
                                value={dexLevel}
                                onChange={dexSliderChangeHandle}
                                min={0}
                                max={60}
                            />
                        </Box>
                    </div>

                    <h5 className="text-label">Faction</h5>
                    <div className="gn-form-box">
                        <FormControl fullWidth className="form-select">
                            <Select
                                displayEmpty // 선택되지 않은 상태에서도 첫 번째 MenuItem 표시
                                value={selectFaction}
                                onChange={selectFactionHandle}
                            >
                                <MenuItem value={`bt`}>[BT] Blattas</MenuItem>
                                <MenuItem value={`ht`}>[HT] Hunter</MenuItem>
                                <MenuItem value={`jb`}>[JB] Jack N Boyz</MenuItem>
                                <MenuItem value={`nf`}>[NF] Nine Fingers</MenuItem>
                                <MenuItem value={`gl`}>[GL] Gary's Lounge</MenuItem>
                                <MenuItem value={`cl`}>[CL] Caballeros</MenuItem>
                                <MenuItem value={`qs`}>[QS] Quasars</MenuItem>
                                <MenuItem value={`zk`}>[ZK] Zaikasha</MenuItem>
                                <MenuItem value={`ks`}>[KS] Kossacks</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <h5 className="text-label">Enter the looting time</h5>
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
                                        <InputLabel>Hour</InputLabel>
                                        <Select value={hour} onChange={e => setHour(e.target.value)} label="Hour">
                                            {Array.from({ length: 24 }).map((_, index) => (
                                                <MenuItem key={index} value={index}>
                                                    {`${index}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl className="form-select" fullWidth>
                                        <InputLabel>Minute</InputLabel>
                                        <Select value={minute} onChange={e => setMinute(e.target.value)} label="Minute">
                                            {Array.from({ length: 60 }).map((_, index) => (
                                                <MenuItem key={index} value={index}>
                                                    {`${index}`}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </LocalizationProvider>
                            <Box sx={{ mt: '16px' }}>
                                <Button
                                    className="btn-calculate"
                                    variant="outlined"
                                    onClick={LootingDateCalc}
                                    style={{ textTransform: 'none' }}
                                    sx={{ width: '100%' }}
                                >
                                    Calculate
                                </Button>
                                <Button
                                    className="btn-today"
                                    variant="contained"
                                    onClick={todayLootingDateCalc}
                                    style={{ textTransform: 'none' }}
                                    sx={{ mt: '8px', width: '100%' }}
                                >
                                    Calculate Real-Time
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>

                <div className="gn-box">
                    <div className="gn-looting-period">
                        <h5 className="text-faction">{faction ? faction : 'Faction'}</h5>
                        <dl>
                            <dt>Duration reduction rate</dt>
                            <dd>{decreaseTime ? decreaseTime : '-'}</dd>
                        </dl>
                        <dl>
                            <dt>Looting Period</dt>
                            <dd>{lootingTime ? lootingTime : '-'}</dd>
                        </dl>
                        <dl>
                            <dt>Penalized Looting Perid(+20%)</dt>
                            <dd>{penaltyTime ? penaltyTime : '-'}</dd>
                        </dl>
                        <dl className="gn__period-today">
                            <dt>Looting Return Date/Time</dt>
                            <dd>
                                <dl>
                                    <dt>Regular Looting</dt>
                                    <dd className="text-highlight">{lootingEndTime ? lootingEndTime : '-'}</dd>
                                </dl>
                                <dl>
                                    <dt>Penalized Looting</dt>
                                    <dd>{penaltyEndTime ? penaltyEndTime : '-'}</dd>
                                </dl>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Looting
