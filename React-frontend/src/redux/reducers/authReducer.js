import { actionTypes } from "../actions/authActions"

const initialState = {
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user }

    default:
      return state
  }
}

export default authReducer
