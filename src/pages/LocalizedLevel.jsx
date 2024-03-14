import { useLanguage } from '../contexts/LanguageContext';

import LevelKo from './ko/Level'
import LevelEn from './en/Level'

function Level() {
    const { language } = useLanguage();

    if (language === 'en') {
        return <LevelEn />;
    }
    else {
        return <LevelKo />;
    }
}

export default Level
