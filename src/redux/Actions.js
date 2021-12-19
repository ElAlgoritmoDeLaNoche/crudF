import * as types from './ActionTypes'
import { db } from '../config/firebase'

const getContacts = (contacts) => ({
  type: types.GET_CONTACTS,
  payload: contacts
})

const updateContact = () => ({
  type: types.UPDATE_CONTACT
})

const deleteContact = () => ({
  type: types.DELETE_CONTACT
})

const getContact = (contact) => ({
  type: types.GET_CONTACT,
  payload: contact
})

const addContact = () => ({
  type: types.ADD_CONTACT
})

//COMMERCE
const getCommerces = (commerces) => ({
  type: types.GET_COMMERCES,
  payload: commerces
})

const updateCommerce = () => ({
  type: types.UPDATE_COMMERCE
})

const deleteCommerce = () => ({
  type: types.DELETE_COMMERCE
})

const getCommerce = (commerce) => ({
  type: types.GET_COMMERCE,
  payload: commerce
})

const addCommerce = () => ({
  type: types.ADD_COMMERCE
})

export const reset = () => ({
  type: types.RESET
})

export const getContactsInitiate = () => {
  return function (dispatch) {
    db.collection("contacts").onSnapshot((querySnapshot) => {
      const contacts = []
      querySnapshot.forEach((doc) => {
        contacts.push({...doc.data(), id: doc.id})
      })
      dispatch(getContacts(contacts))
    })
  }
}

export const addContactInitiate = (contact) => {
  return function(dispatch) {
    db.collection("contacts").doc().set(contact)
    dispatch(addContact())
  }
}

export const deleteContactInitiate = (id) => {
  return function(dispatch) {
    db.collection("contacts").doc(id).delete()
    dispatch(deleteContact())
  }
}

export const updateContactInitiate = (id, contact) => {
  return function(dispatch) {
    db.collection("contacts").doc(id).update(contact)
    dispatch(updateContact())
  }
}

export const getContactInitiate = (id) => {
  return function(dispatch) {
    db.collection("contacts").doc(id).get().then((contact) => {
      dispatch(getContact({
        ...contact.data()
      }))
    }).catch((error) => {
      console.log(error)
    })
  }
}

//COMMERCE
export const getCommercesInitiate = () => {
  return function (dispatch) {
    db.collection("commerces").onSnapshot((querySnapshot) => {
      const commerces = []
      querySnapshot.forEach((doc) => {
        commerces.push({...doc.data(), id: doc.id})
      })
      dispatch(getCommerces(commerces))
    })
  }
}

export const addCommerceInitiate = (commerce) => {
  return function(dispatch) {
    db.collection("commerces").doc().set(commerce)
    dispatch(addCommerce())
  }
}

export const deleteCommerceInitiate = (id) => {
  return function(dispatch) {
    db.collection("commerces").doc(id).delete()
    dispatch(deleteCommerce())
  }
}

export const updateCommerceInitiate = (id, commerce) => {
  return function(dispatch) {
    db.collection("commerces").doc(id).update(commerce)
    dispatch(updateCommerce())
  }
}

export const getCommerceInitiate = (id) => {
  return function(dispatch) {
    db.collection("commerces").doc(id).get().then((commerce) => {
      dispatch(getCommerce({
        ...commerce.data()
      }))
    }).catch((error) => {
      console.log( 'LOL ' + error)
    })
  }
}