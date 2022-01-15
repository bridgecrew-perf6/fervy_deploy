import React, { useState } from 'react'
import { Button, Input, TextField } from '@mui/material'
import { Box } from '@mui/system'
// import axios from 'axios'
import history from '../../../../history'


const AdminCsds = () => {
    let files = {}
    const [cert, setCert] = useState()
    const [key, setKey] = useState()
    const [keypass, setKeyPass] = useState()
    const [rfc, setRfc] = useState("")

    const handleChange = (e) => {
        // return new Promise((resolve, reject) => {})
        switch(e.target.id){
            case "upload-cert-btn":
                setCert(e.target.files)
                break;
            case "upload-key-btn":
                setKey(e.target.files)
                break;
            case "keypass":
                setKeyPass(e.target.value)
                break;
            case "rfc":
                console.log(e.target.value)
                setRfc(e.target.value)
                break;
            default:
                break;
        }
    }
    const handleSend = async () => {
        // const formData = new FormData()
        const certProcess = Object.entries(cert).map((item) => {
            return new Promise((resolve, reject) =>  {
                const [key,file] = item;
                const reader = new FileReader()
                reader.readAsBinaryString(file)

                reader.onload = function (event) {
                    const filekey = "Certificate"
                    files[filekey] = `${btoa(event.target.result)}`
                    console.log(key)
                    resolve()
                }

                reader.onerror = function (){
                    console.log("No se pudo procesar el archivo")
                    console.log(key)
                    reject()
                }
            })
        })
        const keyProcess = Object.entries(key).map((item) => {
            return new Promise((resolve, reject) =>  {
                const [key, file] = item;
                const reader = new FileReader()
                reader.readAsBinaryString(file)

                reader.onload = function (event) {
                    const filekey = "PrivateKey"
                    files[filekey] = `${btoa(event.target.result)}`
                    window.FacturamaMulti.Certificates.Create({
                        "Rfc":rfc,
                        "Certificate":files.Certificate,
                        "PrivateKey":files.PrivateKey,
                        "PrivateKeyPassword":keypass
                    }, (res) => {
                        console.log(res)
                        console.log(key)
                        resolve(res)
                    }, (err) => {
                        console.log(key)
                        console.log(err)
                        reject(err)
                    })
                }

                reader.onerror = function (){
                    console.log("No se pudo procesar el archivo")
                    reject()
                }
            })
        })

        Promise.all(certProcess, keyProcess)
        .then((res) => {
            console.log(res)
            console.log("procesado")
            console.log("Volver al escritorio o registrar otro ente?")
            return true
        })
        .then((boolean) => {
            if(boolean) {
                history.push("/admin/dashboard")
                window.location.reload()
            } else {
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
        })
        // formData.append(
        //     "cert",
        //     cert
        // )
        // formData.append(
        //     "key",
        //     key
             
        // )

        // formData.append(
        //     "Rfc",
        //     rfc
        // )

        // formData.append(
        //     "PrivateKeyPassword",
        //     keypass
        // )

        // axios.post('http://localhost:9999/register/certificates',formData, {
        //     headers:{
        //         "content-type": "multipart/form-data"
        //     }
        // }).then((res, err) => {
        //     console.log(res)
        //     if(res.status === 200 && res.data.Message === "Recibido exitosamente"){
        //         console.log("Generado con exito")
        //         console.log(res.data.TaxEntity.Certificate.toString())
        //     }
        // })
    }

    // const handleCreateEntity = () => {
    //     console.log(taxEntity)
    //     // setTaxEntity({
    //     //     ...taxEntity,
    //     //     Certificate:taxEntity.Certificate.toString(),
    //     //     PrivateKey:taxEntity.Privatekey.toString()
    //     // })

    //     // axios.post('https://apisandbox.facturama.mx/api-lite/csds',taxEntity, {
    //     //     headers:{
    //     //         Authorization: "Basic RXNxdWl6b0RFVjpxdTN0MzFtcDBydDQ="
    //     //     }
    //     // }).then((res) => {
    //     //     console.log(res)
    //     //     if(res.status === 200) {
    //     //         console.log("Generado exitosamente")
    //     //         history.push('/admin')
    //     //         window.location.reload()
    //     //     }
    //     // })
    // }
    
    return (
        <div style={{width:"100%", height:"100vh"}}>
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", width:"100%", height:"80%"}}>
                    <TextField label="RFC" onChange={handleChange} id="rfc"/>
                    <TextField label="Contraseña de llave privada" id="keypass" onChange={handleChange}/>
                    <label htmlFor='upload-cert-btn'>
                        <Input inputProps={{type:"file",accept:".cer"}} sx={{display:"none"}} onChange={handleChange} id="upload-cert-btn"></Input>
                        <Button sx={{background:"blue",color:"white", margin:"2vh"}} component="span">Subir certificado</Button>
                    </label>
                    <label htmlFor='upload-key-btn'>
                        <Input inputProps={{type:"file", accept:".key"}} sx={{display:"none"}} onChange={handleChange} id="upload-key-btn"></Input>
                        <Button sx={{background:"red",color:"white", margin:"2vh"}} component="span">Subir llave privada</Button>
                    </label>
                    <Button sx={{background:"green", color:"white"}} onClick={handleSend}>Enviar todo</Button>
                </Box>
        </div>
    )
}

export default AdminCsds
