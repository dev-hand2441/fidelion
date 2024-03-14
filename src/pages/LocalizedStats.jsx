import { useLanguage } from '../contexts/LanguageContext';

import StatsKo from './ko/Stats'
import StatsEn from './en/Stats'

function Stats() {
    const { language } = useLanguage();

    if (language === 'en') {
        return <StatsEn />;
    }
    else {
        return <StatsKo />;
    }
}

export default Stats
