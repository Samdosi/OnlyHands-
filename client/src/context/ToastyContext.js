import React, { useContext } from "react";
import {toast} from 'react-toastify';

const ToastyContext = React.createContext();

export function useToastyContext(){
    return useContext(ToastyContext);
} 

export function ToastyProvider({ children }){

    const notify = (text, type) =>{
        switch (type) {
            case 'success':
                toast.success(text);
                break;

            case 'warn':
                toast.warn(text);
                break;

            case 'error':
                toast.error(text);
                break;

            default:
                toast(text);
                break;
        }
    }

    return(
        <ToastyContext.Provider value={notify}>
            {children}
        </ToastyContext.Provider>
    )
}