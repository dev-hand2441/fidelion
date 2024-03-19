import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Toolbar from './components/layout/Toolbar'
import BottomSheet from './components/layout/BottomSheet'

import { LanguageProvider } from './contexts/LanguageContext'
import { PriceProvider } from './contexts/inquiryPrice';

import Price from './pages/LocalizedPrice'
import Looting from './pages/LocalizedLooting'
import Level from './pages/LocalizedLevel'
import Stats from './pages/LocalizedStats'
import Guide from './pages/ko/guide'

import './scss/App.scss'

function App() {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    // 바텀시트 표시 상태를 토글하는 함수
    const toggleBottomSheet = () => {
      setIsBottomSheetOpen(!isBottomSheetOpen);
    };

    return (
        <LanguageProvider>
            <PriceProvider>
                <Router>
                    <div className="gn-layout-view">
                        <Header />
                        <div className="gn-layout-page">
                            <div className="gn-scroller">
                                <div className="gn-layout-page-content">
                                    <Routes>
                                        <Route path="/" element={<Looting />} />
                                        <Route path="/level" element={<Level />} />
                                        <Route path="/stats" element={<Stats />} />
                                        <Route path="/guide" element={<Guide />} />
                                    </Routes>
                                </div>
                                <Footer />
                            </div>
                            <button type='button' className='btn-price' onClick={toggleBottomSheet}>
                                <i className='icon-token'><FontAwesomeIcon icon={faCircleDollarToSlot} /></i>
                                <b>Price</b>
                            </button>
                        </div>
                        <Toolbar />
                    </div>
                    <BottomSheet isOpen={isBottomSheetOpen} onClose={toggleBottomSheet}>
                        <Price />
                    </BottomSheet>
                </Router>
            </PriceProvider>
        </LanguageProvider>
    )
}

export default App
