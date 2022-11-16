export const actionTypes = {
  SET_USER: "SET_USER",
}

export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    user,
  }
}
