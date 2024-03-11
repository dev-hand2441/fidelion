import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext';

import NftInfoKo from '../../components/main/NftInfo'
import TokenPriceKo from '../../components/main/TokenPrice'
import NftInfoEn from '../../components/main/en/NftInfo'
import TokenPriceEn from '../../components/main/en/TokenPrice'


function Main() {
    const { language } = useLanguage();

    if (language === 'en') {
        return (
            <>
                <NftInfoEn />
                <TokenPriceEn />
            </>
        );
    }
    else {
        return (
            <>
                <NftInfoKo />
                <TokenPriceKo />
            </>
        );
    }
}

export default Main
