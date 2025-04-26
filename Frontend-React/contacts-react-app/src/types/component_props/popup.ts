export interface PopupProps {
    id: number;
    title: string;
    subheading: string;
    onCancel: () => void;
    onOk: (id: number) => void;
}