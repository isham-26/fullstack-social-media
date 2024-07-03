
import {createContext,useEffect, useReducer } from "react";
import { reducer } from "./reducer";
const initalState={
    user: JSON.parse(localStorage.getItem("user")) || null,
    //user: null,
    isfatching:false,
    error:false,
}
export const AppContext=createContext(initalState);


export const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initalState)
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])
    return(
        <AppContext.Provider value={{state,dispatch}}>{children}</AppContext.Provider>
    )
   
}