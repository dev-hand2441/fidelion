import React, { useState, useEffect } from 'react';
import { Slider, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { usePrice } from '../../contexts/InquiryPrices';
import levelData from '../../json/level.json' // level.json 파일 import

function Level() {
    const { token2080Price, usdKrwExchangeRate } = usePrice();
    const [token2080ToKRW, setToken2080ToKRW] = useState(0);
    const [value, setValue] = useState([0, 50])
    const handleChange = (event, newValue) => setValue(newValue)

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

    const selectedSum = levelData
        .filter(({ lv }) => lv > value[0] && lv <= value[1])
        .reduce((sum, { Price }) => sum + Price, 0);

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

    useEffect(() => {
        if (usdKrwExchangeRate && token2080Price) {
            setToken2080ToKRW((selectedSum * (token2080Price * usdKrwExchangeRate)).toLocaleString(undefined, { maximumFractionDigits: 0 }));
        }
    }, [usdKrwExchangeRate, token2080Price, selectedSum]);

    return (
        <div className="gn-level">
            <div className="gn-block">
                <h3 className="text-heading">레벨업 비용 계산</h3>
                <div className="gn-box">
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
                                {` ≈ ${token2080ToKRW}원`}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="gn-block">
                <div className="gn-box">
                    <h4 className="text-strapline">레벨 구간 별 비용</h4>
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
                    <h4 className="text-strapline">블랙마켓 마켓플레이스 레벨업 이벤트</h4>
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
                                블랙마켓 마켓플레이스에서 15레벨 이하 NFT 구매시 자동으로 15렙까지 레벨업 이벤트 진행중
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Level
