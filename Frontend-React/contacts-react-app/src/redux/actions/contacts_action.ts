import { ContactType } from "../../types/contact_type";
import { ContactAction } from "../interfaces/redux_types";
import { ContactsActionTypes } from "./action_types";

export type ContactActions = ContactAction;

export function setContactsList(value: ContactType[]): ContactAction {
    return {
        type: ContactsActionTypes.CONTACTS_LIST,
        payload: { value },
    };
}