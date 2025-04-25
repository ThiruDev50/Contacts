import React from 'react';
import styles from './button.module.scss';
import { ButtonProps, ButtonStyles } from '../../../types/component_props/button';

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type,
    disabled = false,
}) => {
    const btnStyle = ButtonStyles[type];

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            onClick();
        }
    };

    return (
        <div
            className={styles.customButton}
            onClick={handleClick}
            style={{
                backgroundColor: btnStyle.backgroundColor,
                color: btnStyle.textColor,
                borderColor: btnStyle.hoverBorderColor,
                cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = btnStyle.hoverBgColor;
                //e.currentTarget.style.color = btnStyle.hoverTextColor;
                e.currentTarget.style.borderColor = btnStyle.hoverBorderColor;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = btnStyle.backgroundColor;
                e.currentTarget.style.color = btnStyle.textColor;
                e.currentTarget.style.borderColor = btnStyle.hoverBorderColor;
            }}
        >
            {label}
        </div>
    );
};

export default Button;
