
import {createContext, useReducer } from "react";
import { reducer } from "./reducer";
const initalState={
    user:null,
    isfatching:false,
    error:false,
}
export const AppContext=createContext();


export const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initalState)
    
    return(
        <AppContext.Provider value={{state,dispatch}}>{children}</AppContext.Provider>
    )
   
}