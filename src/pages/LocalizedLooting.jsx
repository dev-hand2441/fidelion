import React from 'react'
import { useLanguage } from '../contexts/LanguageContext';

import LootingKo from './ko/Looting'
import LootingEn from './en/Looting'

function Looting() {
    const { language } = useLanguage();

    if (language === 'en') {
        return <LootingEn />;
    }
    else {
        return <LootingKo />;
    }
}

export default Looting
