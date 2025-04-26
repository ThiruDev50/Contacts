export type SnackbarProps = {
    message: string;
    duration?: number;
    type?: SnackbarType;
    onClose: () => void;
};

export enum SnackbarType {
    SUCCESS = 'success',
    ERROR= 'error',
    WARNING = 'warning'
}