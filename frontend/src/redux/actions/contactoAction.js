export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

export const setContacts = (contacts) => {
  return{
    type: SET_CONTACTS,
    payload: contacts,
  }
};

export const addContact = (contact) => {
    return {
      type: ADD_CONTACT,
      payload: contact,
    };
  };

  export const deleteContact = (contact) => {
    return {
      type: DELETE_CONTACT,
      payload: contact,
    };
  };
