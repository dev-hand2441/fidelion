import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Toolbar from './components/Toolbar'
import SideMenu from './components/SideMenu'

import Main from './pages/Main'
import Looting from './pages/Looting'
import Level from './pages/Level'
import Stats from './pages/Stats'

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
                            <Routes>
                                <Route path="/" element={<Main />} />
                                <Route path="/looting" element={<Looting />} />
                                <Route path="/level" element={<Level />} />
                                <Route path="/stats" element={<Stats />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
                <Toolbar />
            </div>
        </Router>
    )
}

export default App
