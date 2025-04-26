// Snackbar.tsx
import React, { useEffect } from 'react';
import styles from './snackbar.module.scss'
import { SnackbarProps, SnackbarType } from '../../../types/component_props/snackbar';


const Snackbar: React.FC<SnackbarProps> = ({ message, duration = 3000, type = SnackbarType.SUCCESS, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`${styles.snackbar} ${styles[type]}`}>
            {message}
        </div>
    );
};

export default Snackbar;
