import {TextField, Button} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Context from '../../../Context'

const RegisterForm = () => {
    return (
       <Context.Consumer>
           {({test, activeTest, deactivateTest}) => {
               console.log(test)
               return (
                <div>
                    <Box component="form" sx={
                        {
                            display:"flex", 
                            alignItems:"center", 
                            width:"100vw", 
                            height:"100vh", 
                            justifyContent:"center",
                            flexDirection:"column"
                        }
                    }>
                       
                        <TextField label="RFC" variant= "outlined" name="rfc"></TextField>
                   
                        <Button variant="contained" sx={{background:"red" ,color:"white"}}>Registrarse</Button>
                    </Box>
                </div>
               )
           }}
       </Context.Consumer>
    )
}

export default RegisterForm
