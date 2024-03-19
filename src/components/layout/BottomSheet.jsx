import React from 'react';
import { Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BottomSheet = ({ isOpen, onClose, children, className }) => {
    return (
        <Drawer anchor="bottom" open={isOpen} onClose={onClose}  className="gn-layout-bottomsheet" >
            <IconButton onClick={onClose} style={{ position: 'absolute', right: 12, top: 12, color: '#131313', fontSize: 30 }}>
                <CloseIcon  style={{ fontSize: 32 }}/>
            </IconButton>

            {children}
        </Drawer>
    );
};

export default BottomSheet;
