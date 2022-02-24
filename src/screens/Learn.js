import React, { Suspense, lazy, useState } from "react";
import { combineReducers } from 'redux'
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { createStore } from 'redux'

export default function Learn() {

    const mystate = useSelector((state) => state)
    const dispatch = useDispatch()



    const incremented = () => { dispatch({ type: 'INCREMENT' }); console.log(mystate); }
    const todo = () => {
        dispatch({
            type: 'ADD_TODO',
            text: 'Use Redux'
        }); console.log(mystate);
    }
    const show = () => {
        console.log(mystate);
    }
    const change = (value) => {
        dispatch({ type: 'name', value: value })
        console.log(mystate)
    }



    return (

        <div className="container mx-auto mt-24"><p>hello {mystate.todos[0]}</p>
            <div className="mt-12 cursor-pointer" onClick={incremented}> add {mystate.counter}</div>
            <div className="mt-12 cursor-pointer" onClick={todo}> TODO</div>
            <input type="text" placeholder="what you want" onChange={e => change(e.target.value)} ></input>
            <div className="mt-12 cursor-pointer" onClick={show}> show console</div>


        </div>

    )
}