import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import SideMenu from './components/SideMenu'

import TokenPrice from './components/TokenPrice'
import DexSimulator from './pages/DexSimulator'
import LevelUp from './pages/LevelUp'

import './scss/App.scss'

function App() {
    return (
        <Router>
            <SideMenu />
            <div className="gn-layout-view">
                <Header />
                <div className="gn-layout-page">
                    <div className="gn-scroller">
                        <div className="gn-layout-page-content">
                            <TokenPrice />
                            <Routes>
                                <Route path="/" element={<DexSimulator />} />
                                <Route path="/level" element={<LevelUp />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <Toolbar />
            </div>
        </Router>
    )
}

export default App
