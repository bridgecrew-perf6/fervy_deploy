import React from 'react'
import { Typography, Button } from '@mui/material'
import history from '../../../history'

const AdminDashboard = () => {
    const handleClick = (e) => {
        let id = e.target.id

        switch(id) {
            case "reg_op":
                history.push('/admin/operators')
                window.location.reload()
                break;
            case "reg_trans":
                history.push('/admin/transports')
                window.location.reload()
                break;
            case "reg_certs":
                history.push('/admin/certs')
                window.location.reload();
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <Typography>Bienvenido al dashboard de administrador</Typography>
            <Button onClick={handleClick} id="reg_op" variant="outlined">Registrar operador</Button>
            <Button onClick={handleClick} id="reg_trans" variant="outlined">Registrar transporte</Button>
            <Button onClick={handleClick} id="reg_certs" variant="ourlined">Registrar nuevo ente fiscal</Button>
        </div>
    )
}

export default AdminDashboard
