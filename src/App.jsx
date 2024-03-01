import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import DexSimulator from './pages/DexSimulator' // 예시 페이지 컴포넌트
import LevelUp from './pages/LevelUp' // 예시 페이지 컴포넌트

import './scss/App.scss'

function App() {
    return (
        <Router>
            <div className="gn-layout-view">
                <Header />
                <div className="gn-layout-page">
                    <Routes>
                        <Route path="/" element={<DexSimulator />} />
                        <Route path="/level" element={<LevelUp />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    )
}

export default App
