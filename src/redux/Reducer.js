import * as types from './ActionTypes'

const initialState = {
  contacts: [],
  contact: {},
  commerces: [],
  commerce: {}
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTACTS: 
      return {
        ...state,
        contacts: action.payload
      }
    case types.GET_CONTACT: 
      return {
        ...state,
        contact: action.payload
      }
    case types.GET_COMMERCES: 
    return {
      ...state,
      commerces: action.payload
    }
    case types.GET_COMMERCE: 
    return {
      ...state,
      commerce: action.payload
    }
    case types.RESET: 
      return {
        ...state,
        contact: {}
      }
    default:
      return state
  }
}

export default contactReducer