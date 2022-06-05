const modalsScheduleReducer = (state = { is_hide: true, action: {} }, { type, payload }) => {
    switch (type) {
        case "modal_schedule/SET":
        return payload;
        default:
        return state;
    }
  };
  
  export default modalsScheduleReducer;
  