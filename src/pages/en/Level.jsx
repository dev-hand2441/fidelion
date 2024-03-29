import { useState } from 'react'
import { Slider, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import levelData from '../../json/level.json' // level.json 파일 import

function Level() {
    // 구간 정의 (기본 구간 + 추가 구간)
    const ranges = [
        // 기본 구간
        { start: 1, end: 10, mercenary: 2, isAdditional: false },
        { start: 10, end: 20, mercenary: 3, isAdditional: false },
        { start: 20, end: 30, mercenary: 4, isAdditional: false },
        { start: 30, end: 40, mercenary: 5, isAdditional: false },
        { start: 40, end: 50, mercenary: 5, isAdditional: false },
        // 추가 구간
        { start: 15, end: 20, mercenary: 3, isAdditional: true },
        { start: 15, end: 30, mercenary: 4, isAdditional: true },
        { start: 15, end: 40, mercenary: 5, isAdditional: true },
        { start: 15, end: 50, mercenary: 5, isAdditional: true },
    ]

    const [value, setValue] = useState([0, 50])
    const handleChange = (event, newValue) => setValue(newValue)

    const selectedSum = levelData
        .filter(({ lv }) => lv > value[0] && lv <= value[1])
        .reduce((sum, { Price }) => sum + Price, 0)

    // 기본 구간과 추가 구간을 분리하여 계산
    const basicRanges = ranges.filter(range => !range.isAdditional)
    const additionalRanges = ranges.filter(range => range.isAdditional)

    // 기본 구간에 대한 계산
    const calculatedBasicRanges = basicRanges.reduce((acc, range) => {
        const sum = levelData
            .filter(({ lv }) => lv > range.start && lv <= range.end)
            .reduce((sum, { Price }) => sum + Price, 0)
        const cumulativeSum = acc.length > 0 ? acc[acc.length - 1].cumulativeSum + sum : sum
        acc.push({ ...range, sum, cumulativeSum })
        return acc
    }, [])

    // 추가 구간에 대한 계산
    const calculatedAdditionalRanges = additionalRanges.map(range => {
        const sum = levelData
            .filter(({ lv }) => lv > range.start && lv <= range.end)
            .reduce((sum, { Price }) => sum + Price, 0)
        return { ...range, sum }
    })

    return (
        <div className="gn-level">
            <div className="gn-block">
                <h3 className="text-heading">FAME Level Upgrade Calculator</h3>
                <div className="gn-box">
                    <div className="gn-level-calc">
                        <Box className="form-slider">
                            <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" min={0} max={50} />
                        </Box>
                        <dl>
                            <dt>
                                Cost to level up to {value[0]}Lv ~ {value[1]}Lv
                            </dt>
                            <dd>
                                <i className="image-token-2080"></i>
                                {selectedSum.toLocaleString()}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="gn-block">
                <div className="gn-box">
                    <h4 className="text-strapline">Cost per level tier</h4>
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
                            {calculatedBasicRanges.map((range, index) => (
                                <tr key={index}>
                                    <td>
                                        {range.start}
                                        <i>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </i>
                                        {range.end}
                                    </td>
                                    <td>{range.mercenary}</td>
                                    <td>
                                        <i className="image-token-2080"></i>
                                        {range.sum.toLocaleString()}
                                    </td>
                                    <td>
                                        <i className="image-token-2080"></i>
                                        {typeof range.cumulativeSum === 'number'
                                            ? range.cumulativeSum.toLocaleString()
                                            : range.cumulativeSum}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="gn-box">
                    <h4 className="text-strapline">
                        Black Market Marketplace<br></br>Level-Up Discount Event
                    </h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Mercenary</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculatedAdditionalRanges.map((range, index) => (
                                <tr key={index}>
                                    <td>
                                        {range.start}
                                        <i>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </i>
                                        {range.end}
                                    </td>
                                    <td>{range.mercenary}</td>
                                    <td>
                                        {' '}
                                        <i className="image-token-2080"></i>
                                        {range.sum.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="gn-note">
                        <ul>
                            <li>
                                Your NFT will receive an additional mercenary to aid in looting when you level up to a
                                higher tier.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Level
