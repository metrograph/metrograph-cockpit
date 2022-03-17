import axios from "axios";
import jobs from "../../local/jobs";

function setUser(payload) {
  return payload.user;
}

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "setUser":
      return setUser(payload);
      break;

    default:
      return state;
  }
};

export default userReducer;
