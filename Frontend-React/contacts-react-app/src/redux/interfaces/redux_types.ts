import { ContactType } from "../../types/contact_type";
import { ContactsActionTypes } from "../actions/action_types";

export interface ContactAction {
    type: ContactsActionTypes.CONTACTS_LIST;
    payload: { value: ContactType[] | [] };
}
export interface ContactsState {
    [ContactsActionTypes.CONTACTS_LIST]: ContactType[] | [];
}