import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const LanguageContext = createContext()

export function useLanguage() {
    return useContext(LanguageContext)
}

export const LanguageProvider = ({ children }) => {
    // 쿠키에서 언어 설정을 가져오거나 기본값을 'ko'로 설정
    const [language, setLanguage] = useState(Cookies.get('language') || 'ko')

    useEffect(() => {
        // 언어 설정이 변경될 때마다 쿠키에 저장
        Cookies.set('language', language, { expires: 7 }) // 쿠키 유효 기간을 7일로 설정
    }, [language])

    const toggleLanguage = () => {
        setLanguage(prevLanguage => (prevLanguage === 'ko' ? 'en' : 'ko'))
    }

    return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>
}
