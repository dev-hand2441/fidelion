import React from 'react'
import { useLanguage } from '../contexts/LanguageContext';

import MainKo from './ko/Main'
import MainEn from './en/Main'

function Main() {
    const { language } = useLanguage();

    if (language === 'en') {
        return <MainEn />;
    }
    else {
        return <MainKo />;
    }
}

export default Main
