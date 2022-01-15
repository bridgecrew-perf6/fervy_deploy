import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import history from '../../history';

const AdminIndex = () => {

    const handleClick = (e) => {
        switch(e.target.id){
            case "service":
                console.log("Entrando a service")
                history.push('/admin/serviceIndex')
                window.location.reload()
                break;
            case "dashboard":
                history.push('/admin/dashboard')
                window.location.reload()
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <Box sx={{width:"100vw", height:"100vh", alignItems:"center", display:"flex", flexDirection:"column"}}>
                <Typography variant='h4' sx={{width:"50vw",marginTop:"10vh",alignItems:"center"}}>Bienvenido al adiministrador de Transportes Fervy</Typography>
                
                <Button 
                id="service"
                sx={{backgroundColor:"red", margin:"1vh",height:"5vh", color:"white"}} 
                onClick={handleClick}
                >
                    Nuevo servicio
                </Button>
                <Button 
                id="dashboard"
                sx={{backgroundColor:"red", margin:"1vh",height:"5vh", color:"white"}} 
                onClick={handleClick}
                >
                    Ir al dashboard
                </Button>
            </Box>
        </div>
    )
}

export default AdminIndex