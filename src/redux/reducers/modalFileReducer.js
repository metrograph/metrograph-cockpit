const modalFileReducer = (state = { is_hide: true, file: {} }, { type, payload }) => {
    switch (type) {
        case "modal_file/SET":
        return payload;
        default:
        return state;
    }
  };
  
  export default modalFileReducer;
  