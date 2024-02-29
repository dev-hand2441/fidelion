import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import DexSimulate from './pages/DexSimulate' // 예시 페이지 컴포넌트
import LevelUp from './pages/LevelUp' // 예시 페이지 컴포넌트

import './scss/App.scss'

function App() {
    return (
        <Router>
            <div className="gn-view">
                <Header />
                <div className="gn-page">
                    <Routes>
                        <Route path="/" element={<DexSimulate />} />
                        <Route path="/level" element={<LevelUp />} />
                        {/* 추가 경로 및 컴포넌트 설정 */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default App
