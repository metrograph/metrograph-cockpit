const fileStatusReducer = (state = { is_hide: true, file: {} }, { type, payload }) => {
    switch (type) {
        case "file_status/SET":
        return payload;
        default:
        return state;
    }
  };
  
  export default fileStatusReducer;
  