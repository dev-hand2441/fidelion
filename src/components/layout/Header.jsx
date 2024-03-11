// Header.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'

import { useLanguage } from '../../contexts/LanguageContext';

import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function Header() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <header className="gn-layout-header">
            <NavLink to="/">
                <h1>
                    <i className="icon-logo"></i>
                    <b>Fidelion</b> Calculator
                </h1>
            </NavLink>
            <FormGroup className='gn-layout-header-lang'>
                <FormControlLabel
                    control={
                        <Switch
                            checked={language === 'en'}
                            onChange={toggleLanguage}
                        />
                    }
                    label={language === 'en' ? 'EN' : 'KO'}
                />
            </FormGroup>
        </header>
    )
}

export default Header
