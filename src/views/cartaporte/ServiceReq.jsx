import { Checkbox, FormControl, FormControlLabel, InputLabel,Button, MenuItem, Select, TextField, Typography} from '@mui/material'
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/system'
import React, { useState } from 'react'

const estados = ["Estado","CDMX", "Tepic", "GDL"]

const unidades = ["Unidad","Caja", "Pallet", "Pieza"]

const docs = ["Documento","Factura", "Remisión"]

let infoService = []

const ServiceReq = () => {
    const [state, setState] = useState({estado:estados[0], unidad:unidades[0], docs:docs[0],checked:false, disabled:false, show_infoservice:true})
    const [trailer, setTrailer] = useState(false)
    const [torton, setTorton] = useState(false)
    const [rabon, setRabon] = useState(false)
    const [onBoardDate, setonBoardDate] = useState(new Date())
    const [dropOffDate, setDropOffDate] = useState(new Date())
    const [counter, setCounter] = useState(0);
    const handleChange = (e) => {
    //Cambio de estado condicionado para que se desactiven los otros checkbox al seleccionar uno
        if (e.target.name === "tipo_trailer"){
            if (e.target.checked) {
                setTrailer(true)
                setState({
                    ...state,
                    disabled:true
                })
            } else {
                setTrailer(false)
                setState({...state, disabled:false})
            }
        } else if(e.target.name === "tipo_torton"){
            if (e.target.checked) {
                setTorton(true)
                setState({
                    ...state,
                    disabled:true
                })
            } else {
                setTorton(false)
                setState({...state, disabled:false})
            }
        } else if (e.target.name === "tipo_rabon") {
            if (e.target.checked) {
                setRabon(true)
                setState({
                    ...state,
                    disabled:true
                })
            } else {
                setRabon(false)
                setState({...state, disabled:false})
            }
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
       
    }

    const handleonBoardDateChange = (e) => {
        console.log(e)
        setonBoardDate(e)
    }
    const handledropOffDateChange = (e) => {
        console.log(e)
        setDropOffDate(e)
    }

    const handleUpload = (e) => {
        e.preventDefault()
        console.log("uploading")
        console.log(state)
        console.log(onBoardDate)
        console.log(dropOffDate)
    }

    const handleMerchData = (e) => {
        if (e.target.name === "yes"){
            infoService.push({
                description:state.description,
                cantidad: state.cantidad,
                unidad:state.unidad,
                docs:state.docs
            })
            setState({
                ...state,
                description:"",
                cantidad:"",
                unidad:unidades[0],
                docs:docs[0],
                show_infoservice:true
            })
            setCounter(infoService.length)
            return
        }
        setState({
            ...state,
            show_infoservice:false
        })

    }

    return (
        <div>
            <Box sx={{display:"flex",flexDirection:"column", alignItems:"center"}} component="form" onSubmit={handleUpload}>
                {/*Datos principales de mercancía */}
                <Typography variant="h2" style={{fontSize:"4vh"}}>
                    Información del vehículo
                </Typography>
                <Typography variant="h3" style={{fontSize:"4vh"}}>
                    Tipo de vehículo
                </Typography>
                {/* //TODO: Meter las form control label en form control groups */}
                <Box sx={{display:"flex"}}>
                    <FormControlLabel name="tipo_trailer" onChange={handleChange} control={<Checkbox/>} label="Trailer" disabled={trailer ? !state.disabled : state.disabled}/>
                    <FormControlLabel name="tipo_torton"  onChange={handleChange} control={<Checkbox/>} label="Torton" disabled={torton ? !state.disabled : state.disabled}/>
                    <FormControlLabel name="tipo_rabon"  onChange={handleChange} control={<Checkbox/>} label="Rabón" disabled={rabon ? !state.disabled : state.disabled}/>
                </Box>

                <Typography variant="h3" style={{fontSize:"4vh"}}>
                    Tipo de ambiente
                </Typography>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Seco"/>
                <FormControlLabel control={<Checkbox/>} disabled={!trailer} label="Caja de 48 o 53"/>
                <FormControlLabel control={<Checkbox/>} disabled={!trailer} label="Caja seca 53"/>

                {/* Datos de usuario */}
                <Typography variant="h3" style={{fontSize:"4vh"}}>
                    Información del solicitante
                </Typography>
                <TextField variant="outlined" label="ID cliente" helperText="¿No lo tienes? Puedes dejarlo en blanco"/>
                <TextField variant="outlined" label="Dirección" helperText="Calle y número"/>
                <TextField variant="outlined" label="Dirección linea 2" helperText="Colonia"/>
                <Select
                    labelId="select-estado-label"
                    id="select-estado"
                    name="estado"
                    value={state.estado}
                    onChange={handleChange}
                    variant="filled"
                >
                    {estados.map((estado, key)=> {
                        return <MenuItem value={estado} key={key}>{estado}</MenuItem>
                    })}
                </Select>
                <TextField variant="outlined" label="CP" helperText="Código postal"/>
                <TextField type="number" variant="outlined" label="Teléfono" helperText="Con lada"/>
                <TextField variant="outlined" label="E-mail" helperText="Correo electrónico"/>

                {/*Información del servicio */}
                <Typography variant="h3" style={{fontSize:"4vh"}}>
                    Información del servicio
                </Typography>

                <Box sx={{display:"flex", alignItems:"center"}}>
                    <Typography variant="body2" sx={{fontSize:"3vw"}}>Numero de items:</Typography>
                    <Box sx={{width:"10vw", height:"10vw", backgroundColor:"red", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="body2" sx={{fontSize:"5vw", color:"white"}}>{counter}</Typography>
                    </Box>
                </Box>


                {/* // TODO: Volver esto una lista creciente hacia abajo e ir acumulando los items */}
                {state.show_infoservice ? 
                <>

                    <TextField onChange={handleChange} sx={{height:"5vh", width:"50vw"}} value={state.description || ''} name="description" variant="outlined" multiline label="Descripción de la mercancía" helperText="¿Qué vamos a transportar?"/>
                    <Box sx={{display:"flex", margin:"5%", justifyContent:"space-between", width:"70%"}}>
                        <FormControl sx={{width:"15vw"}}>
                            <InputLabel id="select-estado-label">Unidad de medida</InputLabel>
                            <Select
                                labelId="select-unit-label"
                                id="select-unit"
                                name="unidad"
                                value={state.unidad}
                                onChange={handleChange}
                                variant="filled"
                            >
                                {unidades.map((unit, key)=> {
                                return <MenuItem value={unit} key={key}>{unit}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <TextField onChange={handleChange} sx={{width:"13vw"}} value={state.cantidad || ''} name="cantidad" variant="outlined" type="number" label="Cantidad"/>
                        <FormControl sx={{width:"15vw"}}>
                            <InputLabel id="select-estado-label">Documento</InputLabel>
                            <Select
                                labelId="select-docs-label"
                                id="select-docs"
                                name="docs"
                                value={state.docs}
                                onChange={handleChange}
                                variant="filled"
                            >
                                {docs.map((doc, key)=> {
                                return <MenuItem value={doc} key={key}>{doc}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </>
                : undefined
                }

                <Box component="div" sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <Typography variant="h3" sx={{fontSize:"4vh"}}>¿Llevas más de otro tipo de mercancia?</Typography>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
                       <Button onClick={handleMerchData} name="yes" variant="filled" sx={{backgroundColor:"red", color:"white", margin:"5vw"}}>Sí</Button>
                       <Button onClick={handleMerchData} name="no" variant="filled" sx={{backgroundColor:"red", color:"white"}}>No</Button>
                    </div>
                </Box>
                {/* Datos de carga */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker value={onBoardDate} onChange={handleonBoardDateChange} renderInput={(params)=><TextField {...params}/>} label="Fecha y hora de carga"/>
                </LocalizationProvider>
                <TextField variant="outlined" label="Lugar" helperText="Lugar de carga"/>

                {/* Datos de descarga */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker value={dropOffDate} onChange={handledropOffDateChange} renderInput={(params)=><TextField {...params}/>} label="Fecha y hora de descarga"/>
                </LocalizationProvider>
                <TextField variant="outlined" label="Lugar" helperText="Lugar de descarga"/>

                <Typography variant="h2" style={{fontSize:"4vh"}}>
                    ¿Cuenta con seguro?
                </Typography>
                <FormControlLabel control={<Checkbox/>} label="Sí"/>
                <FormControlLabel control={<Checkbox/>} label="No"/>

                <Button sx={{backgroundColor:"#210D49", color:"white" ,width:"10vw"}} type="submit" variant="filled">
                    Enviar
                </Button>

            </Box>
        </div>
    )
}

export default ServiceReq
