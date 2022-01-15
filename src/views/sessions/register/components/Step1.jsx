import React from 'react'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'

export const Step1 = () => {
    return (
        <>
        <Box sx={{display:"flex", flexDirection:"column", width:"50%"}}>
            <TextField sx={{margin:"1vh"}} label="RFC" variant= "outlined" name="rfc" defaultValue="MAEL990725294"></TextField>                        
            <TextField sx={{margin:"1vh"}} label="Razón social" variant= "outlined" name="razon" defaultValue="Luis Eduardo"></TextField>
            <TextField sx={{margin:"1vh"}} label="Correo electrónico" variant= "outlined" name="mail" defaultValue="luismtzesq@gmail"></TextField>
            <TextField sx={{margin:"1vh"}} label="Nombre del administrador" variant= "outlined" name="nombre" defaultValue="Luis Eduardo"></TextField>
            <TextField sx={{margin:"1vh"}} label="Apellidos paterno administrador" variant= "outlined" name="apellido_pat" defaultValue="Martinez"></TextField>
            <TextField sx={{margin:"1vh"}} label="Apellidos materno administrador" variant= "outlined" name="apellido_mat" defaultValue="Esquivias"></TextField>

        </Box>
        </>
    )
}
