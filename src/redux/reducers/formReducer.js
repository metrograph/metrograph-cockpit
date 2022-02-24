
let initialstate = {
    file: "",
    task_name: "",
    task_description: "",
    language: "",
    version: ""

}

const load = (state) => {
    console.log(state);
    return state
}

const formReducer = (state = initialstate, { type, payload }) => {

    switch (type) {
        case "setFrom":
            return load(payload)
            break;
        default:
            return state
    }
}

export default formReducer