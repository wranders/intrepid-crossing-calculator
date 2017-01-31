const initialState =  {
  fetching: false,
  data: {
    results : []
  },
  toastdata: {
    visible: false,
    text: '', 
    status: 'ok'
  },
  createContractModalVisible : true
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'fetching':
      return Object.assign({}, state, { fetching: action.fetching });
    case 'result':
      return Object.assign({}, state, { data: action.data });
    case 'toast':
      return Object.assign({}, state, { toastdata: action.data });  
    case 'createContractModal':
      return Object.assign({}, state, {createContractModalVisible: action.visible});
    default:
      return state;
  }
}