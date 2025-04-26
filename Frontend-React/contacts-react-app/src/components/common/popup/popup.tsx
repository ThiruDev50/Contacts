import React, { useEffect } from 'react';
import styles from './popup.module.scss';
import { PopupProps } from '../../../types/component_props/popup';



const Popup: React.FC<PopupProps> = ({ id, title, subheading, onCancel, onOk }) => {
    useEffect(() => {
        // Save current scroll position
        const scrollY = window.scrollY;

        // Disable scrolling
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Re-enable scrolling on unmount
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <p>{subheading}</p>
                </div>
                <div className={styles.footer}>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button onClick={() => onOk(id)} className={styles.okButton}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
