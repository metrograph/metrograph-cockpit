const modalActionReducer = (state = { is_hide: true, action: {} }, { type, payload }) => {
    switch (type) {
        case "modal_action/SET":
        return payload;
        default:
        return state;
    }
  };
  
  export default modalActionReducer;
  