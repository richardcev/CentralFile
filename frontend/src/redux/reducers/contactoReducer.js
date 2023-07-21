import { SET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from '../actions/contactoAction';

const initialState = {
  contacts: [], 
};

const contactoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
    return {
        ...state,
        contacts: [...state.contacts, action.payload],
    };
    case DELETE_CONTACT:
        return {
          ...state,
          contacts: state.contacts.filter(contact => contact.id_contacto !== action.payload.id_contacto),
        };
    default:
      return state;
  }
};

export default contactoReducer;
