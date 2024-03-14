import { useLanguage } from '../contexts/LanguageContext';

import PriceKo from './ko/Price'
import PriceEn from './en/Price'

function Price() {
    const { language } = useLanguage();

    if (language === 'en') {
        return <PriceEn />;
    }
    else {
        return <PriceKo />;
    }
}

export default Price
