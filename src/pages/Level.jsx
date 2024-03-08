import React, { useState } from 'react'
import { Slider, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import levelData from '../json/level.json' // level.json 파일 import

function Level() {
    // 구간 정의
    const ranges = [
        { start: 1, end: 10, mercenary: 2 },
        { start: 10, end: 20, mercenary: 3 },
        { start: 20, end: 30, mercenary: 4 },
        { start: 30, end: 40, mercenary: 5 },
        { start: 40, end: 50, mercenary: 5 },
    ]

    // 각 구간별 누적 합계를 계산
    const calculatedRanges = ranges.reduce((acc, range) => {
        const sum = levelData
            .filter(({ lv }) => lv > range.start && lv <= range.end)
            .reduce((sum, { Price }) => sum + Price, 0)
        const cumulativeSum = acc.length > 0 ? acc[acc.length - 1].cumulativeSum + sum : sum
        acc.push({ ...range, sum, cumulativeSum })
        return acc
    }, [])

    const [value, setValue] = useState([0, 30])

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    // 선택된 범위에 따른 Price 합계 계산
    const selectedSum = levelData
        .filter(({ lv }) => lv >= value[0] && lv <= value[1])
        .reduce((sum, { Price }) => sum + Price, 0)

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
                        <dd>
                            <i className="image-token-2080"></i>
                            {selectedSum.toLocaleString()}
                        </dd>
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
                                <td>{range.cumulativeSum.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Level
