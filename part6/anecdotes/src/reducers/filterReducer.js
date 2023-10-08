const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload
  
    default:
      return state
  }
}

export const updateFilter = filter => {
  return {
    type: 'UPDATE',
    payload: filter
  }
}

export default filterReducer
