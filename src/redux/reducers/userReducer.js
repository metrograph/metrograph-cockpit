

function setUser(payload) {
  return payload.user;
}

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "setUser":
      return setUser(payload);
    default:
      return state;
  }
};

export default userReducer;
