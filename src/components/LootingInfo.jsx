import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import lootData from '../json/looting.json' // looting.json 파일 import

function Levelup() {
    return (
        <div className="gn-looting-info">
            <Swiper loop={true} spaceBetween={8} slidesPerView={1.2} centeredSlides={true}>
                {Object.values(lootData).map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="gn-block">
                            <div className="gn-looting-info-card">
                                <h4>{item.faction}</h4>
                                <span className="text-period">{Math.floor(item.period / 24)} Day</span>
                                <dl>
                                    <dt>Min Price</dt>
                                    <dd>{item.min}</dd>
                                </dl>
                                <dl>
                                    <dt>Max Price</dt>
                                    <dd>{item.max}</dd>
                                </dl>
                                <dl>
                                    <dt>Average Price</dt>
                                    <dd>{Math.round((item.min + item.max) / 2)}</dd>
                                </dl>
                                <dl>
                                    <dt>Reroll(85%)</dt>
                                    <dd>{Math.round(item.max * 0.85)}</dd>
                                </dl>
                                <dl>
                                    <dt>Average Per Day</dt>
                                    <dd>{Math.round((item.min + item.max) / 2 / (item.period / 24))}</dd>
                                </dl>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Levelup
