import { ContactsActionTypes } from "../actions/action_types";
import { ContactActions } from "../actions/contacts_action";
import { ContactsState } from "../interfaces/redux_types";

const initialState: ContactsState = {
    [ContactsActionTypes.CONTACTS_LIST]: []
};

const contactReducer = (state: ContactsState = initialState, action: ContactActions): ContactsState => {
    switch (action.type) {
        case ContactsActionTypes.CONTACTS_LIST:
            return { ...state, [ContactsActionTypes.CONTACTS_LIST]: action.payload.value };
        default:
            return state;
    }
};

export default contactReducer;