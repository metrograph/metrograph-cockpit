



const jobReducer = (state = { is_hide: true, type: null }, { type, payload }) => {

    switch (type) {
        case "setAlert":
            return {
                is_hide: payload.is_hide,
                type: payload.type,
                title: payload.title,
                description: payload.description
            }
        default:
            return state
    }
}

export default jobReducer
