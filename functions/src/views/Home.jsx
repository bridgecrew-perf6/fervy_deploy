import React from 'react'
import {Button} from '@mui/material'
import history from '../history'

const Home = () => {
    const handleClick = (e) => {
        switch(e.target.id) {
            case "login":
                history.push("/login");
                window.location.reload();
                break;
            case "register":
                history.push("/register");
                window.location.reload();
                break;
            default:
                console.log("Default")
        }
    }
    
    return (
        <div style={{width:"100%",height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Button id="login" onClick={handleClick} variant="filled" sx={{backgroundColor:"red", color:"white", marginX:"2vw"}}>Iniciar sesión</Button>
            <Button id="register" onClick={handleClick} variant="filled" sx={{backgroundColor:"red", color:"white", marginX:"2vw"}}>Registrarse</Button>
        </div>
    )
}

export default Home