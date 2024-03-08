import React, { useState } from 'react'
import { Slider, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import levelData from '../json/level.json' // level.json 파일 import

function Level() {
    // 구간 정의 (기본 구간 + 추가 구간)
    const ranges = [
        { start: 1, end: 10, mercenary: 2, isAdditional: false },
        { start: 10, end: 20, mercenary: 3, isAdditional: false },
        { start: 20, end: 30, mercenary: 4, isAdditional: false },
        { start: 30, end: 40, mercenary: 5, isAdditional: false },
        { start: 40, end: 50, mercenary: 5, isAdditional: false },
        { start: 15, end: 20, mercenary: 3, isAdditional: true },
        { start: 15, end: 30, mercenary: 4, isAdditional: true },
        { start: 15, end: 40, mercenary: 5, isAdditional: true },
        { start: 15, end: 50, mercenary: 5, isAdditional: true },
    ]

    const calculatedRanges = ranges.reduce((acc, range) => {
        const sum = levelData
            .filter(({ lv }) => lv > range.start && lv <= range.end)
            .reduce((acc, { Price }) => acc + Price, 0)

        const lastCumulativeSum = acc.length > 0 ? acc[acc.length - 1].cumulativeSum : 0
        const cumulativeSum = range.isAdditional ? '-' : lastCumulativeSum + sum

        acc.push({ ...range, sum, cumulativeSum })
        return acc
    }, [])

    const [value, setValue] = useState([0, 50])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const selectedSum = levelData
        .filter(({ lv }) => lv > value[0] && lv <= value[1]) // 최소값 초과, 최대값 이하인 레벨 필터링
        .reduce((sum, { Price }) => sum + Price, 0) // 필터링된 요소들의 Price 합계 계산

    return (
        <div className="gn-level">
            <h3 className="text-heading">레벨업 비용 계산</h3>
            <div className="gn-block">
                <div className="gn-level-calc">
                    <Box className="form-slider">
                        <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" min={0} max={50} />
                    </Box>
                    <dl>
                        <dt>
                            {value[0]}Lv ~ {value[1]}Lv 까지의 레벨업 비용
                        </dt>
                        <dd>{selectedSum.toLocaleString()}</dd>
                    </dl>
                </div>
            </div>
            <div className="gn-block">
                <h4 className="text-strapline">레벨 구간 별 필요 코인량</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Mercenary</th>
                            <th>Price</th>
                            <th>Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculatedRanges.map((range, index) => (
                            <tr key={index}>
                                <td>
                                    {range.start}
                                    <i>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </i>
                                    {range.end}
                                </td>
                                <td>{range.mercenary}</td>
                                <td>{range.sum.toLocaleString()}</td>
                                <td>
                                    {typeof range.cumulativeSum === 'number'
                                        ? range.cumulativeSum.toLocaleString()
                                        : range.cumulativeSum}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="gn-note">
                    <ul>
                        <li>블랙마켓 마켓플레이스에서 15레벨 이하 NFT 구매시 자동으로 15렙까지 레벨업 이벤트 진행중</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Level
