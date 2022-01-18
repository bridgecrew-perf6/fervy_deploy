import React, {useState} from 'react'
import {Box, TextField, Button, Typography} from '@mui/material'
import history from '../../../../history'
import api from '../../../../axios'

const AdminRegisterTransports = () => {
    const [transport, setTransport] = useState({})
    const handleChange = (e) => {
        let id = e.target.id
        setTransport({
            ...transport,
            [id]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(transport)
        api.post("/api/register/transport", {
            datos:transport   
        }).then((res) => {
            if(res.status === 201){
                console.log("Operador registrado exitosamente")
                history.push('/admin')
                window.location.reload()

            } else {
                console.log("No se pudo registrar al operador")
            }
        })

    }
    return (
        <div>
            <Typography 
            variant="h3" 
            sx={
                {
                    fontSize:"3vh",
                    textAlign:"center", 
                    margin:"1.2vh"
                }
            }>
                Registra un vehículo para los servicios
            </Typography>
            <Box component="div" sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"80vh", width:"100%"}}>
                <Box component="form" onSubmit={handleSubmit} sx={{flexFlow:"column",display:"flex",width:"70%", alignItems:"center"}}>
                    <TextField sx={{width:"30%"}} onChange={handleChange} id="type"label="Tipo"/>
                    <TextField sx={{width:"20%"}} onChange={handleChange} id="model"label="Modelo Año" type="number"/>
                    <TextField sx={{width:"35%"}} onChange={handleChange} id="poliza"label="Poliza"/>
                    <TextField sx={{width:"35%"}} onChange={handleChange} id="permisoSCT"label="Permiso SCT" type="string"/>
                    <TextField sx={{width:"25%"}} onChange={handleChange} id="placaTrac"label="Placa del tractor" type="string"/>
                    <TextField sx={{width:"25%"}} onChange={handleChange} id="placaCaja"label="Placa de la caja" type="string"/>
                    <TextField sx={{width:"25%"}} onChange={handleChange} id="tipoRem"label="Tipo de remolque" type="string"/>
                    <TextField sx={{width:"25%"}} onChange={handleChange} id="polizaName"label="Empresa de seguros" type="string"/>
                    <Button sx={{width:"30%", alignSelf:"center", margin:"1.2vh", background:"red", color:"white"}} type="submit" variant="outlined">Registrar transporte</Button>
                </Box>
            </Box>
        </div>
    )
}

export default AdminRegisterTransports
