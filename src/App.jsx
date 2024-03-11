import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Toolbar from './components/layout/Toolbar'

import Main from './pages/ko/Main'
import Looting from './pages/ko/Looting'
import Level from './pages/ko/Level'
import Stats from './pages/ko/Stats'

import './scss/App.scss'

function App() {
    return (
        <LanguageProvider>
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
                                </Routes>
                            </div>
                            <Footer />
                        </div>
                    </div>
                    <Toolbar />
                </div>
            </Router>
        </LanguageProvider>
    )
}

export default App
