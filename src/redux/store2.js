import React, { Suspense, lazy, useState } from "react";
import { combineReducers } from 'redux'
import { createStore } from 'redux'

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

const inputs = (state = {}, action) => {
    switch (action.type) {
        case 'name':
            return { ...state, state: action.value }
        default:
            return state
    }
}



const reducer = combineReducers({
    todos,
    counter,
    inputs
})


let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store