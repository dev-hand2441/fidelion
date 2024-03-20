import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { usePrice } from '../../contexts/InquiryPrices';
import combinationData from '../../json/combination.json'
import defData from '../../json/def.json' // looting.json 파일 import
import lukData from '../../json/luk.json' // looting.json 파일 import
import dexData from '../../json/dex.json' // looting.json 파일 import

function CombinationChart() {
    const { token2080Price, solanaPrice, usdKrwExchangeRate } = usePrice();

    const getPriceSum = (def, luk, dex) => {
        // 누적 가격 계산을 위한 함수
        const calculateAccumulatedPrice = (data, level) => {
            return data
                .filter(item => item.lv <= level) // 해당 레벨 이하의 모든 가격을 포함
                .reduce((acc, item) => acc + item.price, 0); // 누적 합산
        };

        // def, luk, dex 각각에 대해 누적 가격 계산
        const defPrice = calculateAccumulatedPrice(defData, def);
        const lukPrice = calculateAccumulatedPrice(lukData, luk);
        const dexPrice = calculateAccumulatedPrice(dexData, dex);

        // 세 가격의 총합 반환
        return defPrice + lukPrice + dexPrice;
    }

    return (
        <div className='gn-stats-combination'>
            <h3 className="text-heading">스탯 조합표</h3>
            <Swiper loop={true} spaceBetween={8} slidesPerView={1.2} centeredSlides={true}>
                {Object.entries(combinationData).map(([title, { def, luk, dex }]) => {
                    const statsPriceSum = getPriceSum(def, luk, dex);
                    const token2080ToUSD = statsPriceSum * token2080Price;
                    const token2080ToSol = token2080ToUSD / solanaPrice;
                    const token2080ToKRW = token2080ToUSD * usdKrwExchangeRate;

                    return (
                        <SwiperSlide key={title}>
                            <div className="gn-box">
                                <div className="gn-stats-combination-card">
                                    <h4>{title}</h4>
                                    <dl>
                                        <dt>DEF</dt>
                                        <dd>{def}</dd>
                                    </dl>
                                    <dl>
                                        <dt>LUK</dt>
                                        <dd>{luk}</dd>
                                    </dl>
                                    <dl>
                                        <dt>DEX</dt>
                                        <dd>{dex}</dd>
                                    </dl>
                                    <dl>
                                        <dt>$2080</dt>
                                        <dd><i className="image-token-2080"></i> {statsPriceSum.toLocaleString()}</dd>
                                    </dl>
                                    <dl>
                                        <dt>$SOL</dt>
                                        <dd><i className="image-token-solana"></i> {token2080ToSol ? `${token2080ToSol.toFixed(2)}` : <FontAwesomeIcon icon={faSpinner} spin />}</dd>
                                    </dl>
                                    <dl>
                                        <dt>USD</dt>
                                        <dd>
                                            {token2080ToUSD ? `$${token2080ToUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : <FontAwesomeIcon icon={faSpinner} spin />}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>KRW</dt>
                                        <dd>{token2080ToKRW ? `${token2080ToKRW.toLocaleString(undefined, { maximumFractionDigits: 0 })}원` : <FontAwesomeIcon icon={faSpinner} spin />}</dd>
                                    </dl>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}

export default CombinationChart
