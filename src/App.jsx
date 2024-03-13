import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Toolbar from './components/layout/Toolbar'

import { LanguageProvider } from './contexts/LanguageContext'
import { PriceProvider } from './contexts/inquiryPrice';

import Main from './pages/LocalizedMain'
import Looting from './pages/LocalizedLooting'
import Level from './pages/LocalizedLevel'
import Stats from './pages/LocalizedStats'
import Guide from './pages/ko/guide'

import './scss/App.scss'

function App() {
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
                                        <Route path="/" element={<Main />} />
                                        <Route path="/looting" element={<Looting />} />
                                        <Route path="/level" element={<Level />} />
                                        <Route path="/stats" element={<Stats />} />
                                        <Route path="/guide" element={<Guide />} />
                                    </Routes>
                                </div>
                                <Footer />
                            </div>
                        </div>
                        <Toolbar />
                    </div>
                </Router>
            </PriceProvider>
        </LanguageProvider>
    )
}

export default App
