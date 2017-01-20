const initialState =  {
  fetching: false,
  data: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'fetching':
      return Object.assign({}, state, { fetching: action.fetching });
    case 'result':
      return Object.assign({}, state, { data: action.data });
    default:
      return state;
  }
}