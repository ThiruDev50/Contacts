import { ContactType } from "../contact_type";

export interface ContactFormProps {
    contact?: ContactType;
    onClose: () => void;
    onSubmit: (isUpdateMode: boolean, contact: Omit<ContactType, 'id' | 'createdAt' | 'updatedAt'>) => void;
}