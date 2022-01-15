import { TextField, Box, Button } from '@mui/material'
import Context from '../../../Context'
import React from 'react'
import history from '../../../history'
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
const Login = () => {
    
    const [state, setState] = useState({
        user: "",
        pass: "",
    }) 
    
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    const { signInWithEmailAndPassword } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Haciendo login");
        signInWithEmailAndPassword(state.user, state.pass)
        .then(user => { 
            history.push('/admin');
            window.location.reload()
        })
    }
    const handleTestSubmit = (e) => {
        e.preventDefault();
        console.log("Haciendo login en test");
        signInWithEmailAndPassword(state.user, state.pass)
        .then(user => {
            history.push('/admin');
        })
        
    }

    
    return (
        <>
        <Context.Consumer>
            {({test, activeTest, deactivateTest}) => {
                return(
                    <div>
                        <Box component="form" onSubmit={test ? handleTestSubmit : handleSubmit} sx={
                            {
                                width:"100vw",
                                height:"100vh",
                                display:"flex", 
                                alignItems:"center", 
                                justifyContent:"center",
                                flexDirection:"column"
                            }
                        }>
                            <TextField 
                                variant="outlined" 
                                name="user" 
                                helperText="Usuario"
                                onChange={handleChange}
                                value={state.user}
                            />
                            <TextField 
                                variant="outlined" 
                                name="pass" 
                                helperText="Contraseña"
                                onChange={handleChange}
                                value={state.password}
                            />
                            <Button sx={{background:"red", color:"white"}} type="submit">Enviar</Button>
                        </Box>
                    </div>
                )
            }}
        </Context.Consumer>
        </>
    )
}

export default Login
