import React,{ createContext, useState } from "react";

const Context = createContext()

const Provider = ({children}) => {
    const [test, setTest] = useState(false)

    const value = {
        test,
        activeTest: () => {
            setTest(true)
        },
        deactivateTest: () => {
            setTest(false)
        }
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

const consumer = Context.Consumer;

const context = {
    Provider,
    Consumer: consumer
}



export default context