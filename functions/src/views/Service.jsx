import React from 'react'
import {Button} from '@mui/material'
import history from '../history'

const Home = () => {
    const handleClick = (e) => {
        history.push('/service')
        window.location.reload()
    }
    
    return (
        <div style={{width:"100%",height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Button id="login" onClick={handleClick} variant="filled" sx={{backgroundColor:"red", color:"white", marginX:"2vw"}}>Solicitar servicio</Button>
        </div>
    )
}

export default Home