import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import history from '../../../../history'

const AdminRegisterOperators = () => {
    const [operator, setOperator] = useState({})
    const handleChange = (e) => {
        let id = e.target.id
        switch(id) {
            case "name":
                setOperator({
                    ...operator,
                    [id]:e.target.value
                })
                break;
            case "lastName":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            case "age":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            case "figure":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            case "licence":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            case "nss":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            case "rfc":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            case "_id":
                setOperator({
                    ...operator, 
                    [id]: e.target.value
                })
                break;
            default:
                break;
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(operator)
        axios.post("http://192.168.100.110:9999/register/operator", {
            datos:operator   
        }).then((res) => {
            if(res.status === 201){
                console.log("Operador registrado exitosamente")
                history.push('/admin/dashboard')
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
                Registra un operador para los servicios
            </Typography>    
            <Box component="div" sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"80vh", width:"100%"}}>
                <Box component="form" onSubmit={handleSubmit} sx={{flexFlow:"column",display:"flex",width:"70%", alignItems:"center"}}>
                    <TextField sx={{width:"40%"}} onChange={handleChange} id="name"label="Nombre"/>
                    <TextField sx={{width:"40%"}} onChange={handleChange} id="lastName"label="Apellidos"/>
                    <TextField sx={{width:"20%"}} onChange={handleChange} id="age"label="Edad" type="number"/>
                    <TextField sx={{width:"20%"}} onChange={handleChange} id="figure"label="Tipo figura" type="string"/>
                    <TextField sx={{width:"35%"}} onChange={handleChange} id="licence"label="Numero de licencia" type="string"/>
                    <TextField sx={{width:"35%"}} onChange={handleChange} id="nss"label="NSS" type="string"/>
                    <TextField sx={{width:"40%"}} onChange={handleChange} id="rfc"label="RFC" type="string"/>
                    <TextField sx={{width:"40%"}} onChange={handleChange} id="_id"label="ID" type="string"/>
                    <Button sx={{width:"30%", textAlign:"center", margin:"1.2vh", color:"white", background:"red"}} type="submit" variant="outlined">Registrar operador</Button>
                </Box>
            </Box>

        </div>
    )
}

export default AdminRegisterOperators
