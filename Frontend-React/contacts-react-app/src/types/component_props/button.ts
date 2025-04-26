
export enum ButtonType {
    PRIMARY = 'primary',
    DANGER = 'danger',
    SECONDARY = 'secondary',
}

export const ButtonStyles = {
    [ButtonType.PRIMARY]: {
        backgroundColor: '#0f7244',
        textColor: 'var(--app-text-white-color)',
        hoverBgColor: '#117e4b',
        hoverBorderColor: '#0f7244',
    },
    [ButtonType.SECONDARY]: {
        backgroundColor: '#3f3c3c',
        textColor: '#fff',
        hoverBgColor: '#4d4a4a',
        hoverBorderColor: '#524f4f',
    },
    [ButtonType.DANGER]: {
        backgroundColor: '#f44336',
        textColor: '#fff',
        hoverBgColor: '#d6534a',
        hoverBorderColor: '#f44336',
    }
};


export interface ButtonProps {
    label: string;
    onClick: () => void;
    type: ButtonType;
    disabled?: boolean;
}