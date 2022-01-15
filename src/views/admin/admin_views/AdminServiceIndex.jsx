import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import history from '../../../history'

const AdminServiceIndex = () => {
    const handleClick= (e) => {
        let id = e.target.id
        switch(id){
            case "select_timbrado_btn":
                history.push('/admin/file')
                window.location.reload()
                break
            case "select_data_btn":
                history.push('/admin/service')
                window.location.reload()
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Box sx={
                {
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"space-evenly", 
                    width:"100vw", 
                    height:"100vh"
                }
            }>
                <Button 
                id="select_timbrado_btn" 
                variant="outlined"
                sx={{background:"red", color:"white"}} 
                onClick={handleClick}>
                    Timbrar carta porte directamente
                </Button>

                <Button 
                id="select_data_btn" 
                sx={{background:"blue", color:"white"}}
                onClick={handleClick}>
                    Seleccionar y cargar datos de servicio
                </Button>
            </Box>
        </div>
    )
}

export default AdminServiceIndex
