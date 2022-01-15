import { Button } from '@mui/material'
import { Box } from '@mui/system'
// import download from 'js-file-download'
import axios from 'axios'
import React from 'react'
import history from '../../../../history'

const Download = () => {
    const handleDownload = () => {
        console.log("Descargando")
        const id = window.location.search.slice(4)

        axios.get(`https://api.facturama.mx/api/Cfdi/pdf/issuedLite/${id}`,{
            headers:{
                Authorization: "Basic R1VHWUJSQTpQYW5pYWd1YTE3"
            }
        })
        .then((res, error) => {
            console.log(res)
            var objbuilder = '';
            objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
            objbuilder += (res.data.Content);
            objbuilder += ('" type="application/pdf" class="internal">');
            objbuilder += ('<embed src="data:application/pdf;base64,');
            objbuilder += (res.data.Content);
            objbuilder += ('" type="application/pdf"  />');
            objbuilder += ('</object>');

            var win = window.open("#","_blank");
            var title = "my tab title";
            win.document.write('<html><title>'+ title +'</title><body style="margin-top:0px; margin-left: 0px; margin-right: 0px; margin-bottom: 0px;">');
            win.document.write(objbuilder);
            win.document.write('</body></html>');
            // download(res.data.Content,'factura1.pdf', 'data:application/pdf;base64' )
        })
    } 
    const handleBack = () => {
        history.push('/admin')
        window.location.reload()
    }
    
    return (
        <div>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Button variant="contained" 
                onClick={handleDownload}
                sx={
                    {
                        background:"red", 
                        color:"white"
                    }
                }>
                    Descargar factura
                </Button>
                <Button onClick={handleBack} variant="contained" sx={{background:"blue", color:"white"}}>Volver al escritorio</Button>
            </Box>
        </div>
    )
}

export default Download