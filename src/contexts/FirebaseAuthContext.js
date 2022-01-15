import React, { createContext, useEffect, useReducer } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import FerbyLoading from '../components/FerbyLoading/FerbyLoading'
import api from '../axios';

const firebaseConfig = {
    apiKey: "AIzaSyD6h4ufijaej1NKo03Dn4pqK_ACNEYGmjM",
    authDomain: "ferby-abbd4.firebaseapp.com",
    projectId: "ferby-abbd4",
    storageBucket: "ferby-abbd4.appspot.com",
    messagingSenderId: "606393316795",
    appId: "1:606393316795:web:51926aaec444ba8710809e"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


const initialAuthState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'FB_AUTH_STATE_CHANGED': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialAuthState,
    method: 'FIREBASE',
    createUserWithEmailAndPassword: () => Promise.resolve(),
    signInWithEmailAndPassword: () => Promise.resolve(),
    logout: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState)

    const signInWithEmailAndPassword = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }  

    const createUserWithEmailAndPassword = async (state) => {
        let { email, password } = state;
        
        
        let userdata = state;
        console.log(userdata);
        return api.post('/signup', { 
            "userdata": userdata, 
            "email": email, 
            "password": password
        })
    }


    const logout = () => {
        return firebase.auth().signOut()
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdTokenResult()
                .then( idTokenResult => {
                    api.defaults.headers.common["Authorization"] = `Bearer ${idTokenResult.token}`
                    console.log(api.defaults.headers)
                    if (idTokenResult.claims.role === "user") {
                        api.get(`/user/${user.uid}`)
                        .then(res => {
                            dispatch({
                                type: 'FB_AUTH_STATE_CHANGED',
                                payload: {
                                    isAuthenticated: true,
                                    user: {
                                        uid: user.uid,
                                        name: res.data.name,
                                        email: user.email,
                                        age: res.data.age,
                                        phone: res.data.phone,
                                        role: idTokenResult.claims.role,
                                        token: idTokenResult.token,
                                    },
                                },
                            })
                        })
                    } else {
                        api.get(`/user/${user.uid}`)
                        .then(res => {
                            dispatch({
                                type: 'FB_AUTH_STATE_CHANGED',
                                payload: {
                                    isAuthenticated: true,
                                    user: {
                                        uid: user.uid,
                                        name: res.data.name,
                                        email: user.email,
                                        age: res.data.age,
                                        phone: res.data.phone,
                                        role: idTokenResult.claims.role,
                                        token: idTokenResult.token,
                                    },
                                },
                            })
                        })
                    }
                })
            } else {
                dispatch({
                    type: 'FB_AUTH_STATE_CHANGED',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })

        return unsubscribe
    }, [dispatch])

    if (!state.isInitialised) {
        return <FerbyLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'FIREBASE',
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
