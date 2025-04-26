import { ContactType } from "../contact_type";

export interface ContactCardProps {
    contact: ContactType;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}