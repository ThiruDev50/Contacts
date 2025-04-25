import { combineReducers } from 'redux';
import contactReducer from './contacts_reducer';
const rootReducer = combineReducers({
    contactReducer: contactReducer,
});

export default rootReducer;