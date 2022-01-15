import React, { useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {operators_col, trucks_col} from './dummyData'
import { Button, CircularProgress, Input, InputLabel, TextField, Typography, Autocomplete } from '@mui/material'
import {DateTimePicker} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import axios from 'axios'
import { Box } from '@mui/system'
import history from '../../../../history'
// import { Box } from '@mui/system'
// import axios from 'axios'

let router = [
    "192.168.100.110",
    "localhost"
]

const ip = router[1]


let datosPorte = {
    operador:[],
    transporte:[],
    mercancias:{
        Mercancia:[]
    },
    Ubicaciones:[]
}

let datosFactura = {
    Receiver:{},
    Items:[],
    Issuer:{}
}

const productsColumns = [
    {field:"id", headerName:"ID", width:90},
    {field:"BienesTransp", headerName:"Bienes Transportados", width:150},
    {field:"Descripcion", headerName:"Descripción", width:150},
    {field:"Cantidad", headerName:"Cantidad", width:150},
    {field:"ClaveUnidad", headerName:"Clave unidad peso", width:150},
    {field:"Unidad", headerName:"Unidad de peso", width:90},    
    {field:"PesoEnKg", headerName:"Peso en KG", width:150},    
]

const productRows = []

const SelectOperator = () => {
    const [operatorRows, setOperatorRows] = useState([])
    const [loading, setLoading] = useState(true)
    // const columns = operators_col
    const table = {
    columns:[
        operators_col[0],
        operators_col[1],
        operators_col[2],
        operators_col[3],
        operators_col[4],
        operators_col[5],
        operators_col[6],
    ]}

    useEffect(() => {
        const getData = async () => {
        let operatorData =  await axios.get(`http://${ip}:8000/data/operators`)
        return operatorData
        }
        getData()
        .then((res) => {
            if(res.status !== 200) {
                console.log("Error obteniendo los datos")
            } else {
                setOperatorRows(res.data.data)
                setLoading(false)
            }
    
        })
    
    },[])

    console.log(operatorRows)
    return(
        <div style={{width:"100%", height:"100%"}}>
            {
                loading 
                ?
                    <CircularProgress/>
                :
                <DataGrid
                rows={operatorRows}
                columns={table.columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                checkboxSelection
                disableSelectionOnClick
                onStateChange={
                    (params, event, details) => {
                        console.log('state change')
                        if (params.selection.length>0){
                            let rawValues = Object.values(params.rows.idRowsLookup)
                            let values = rawValues.filter((elem) => {
                                return elem.id === params.selection[0]
                            })
                            datosPorte.operador.push(values)
                            return
                        }
        
                        return {event, details}
                    }
                }
                />
            }

        </div>
    )
}

const SelectTransport = () => {
    const [transportRows, setTransportRows] = useState([])
    const [loading, setLoading] = useState(true)
    
    const table = {
        columns:[
            trucks_col[0],
            trucks_col[1],
            trucks_col[2],
            trucks_col[3],
            trucks_col[4],
            trucks_col[5],
            trucks_col[6],
        ]}

        useEffect(() => {
            const getData = async () => {
            let transportData =  await axios.get(`http://${ip}:8000/data/transports`)
            return transportData
            }
            getData()
            .then((res) => {
                if(res.status !== 200) {
                    console.log("Error obteniendo los datos")
                } else {
                    setTransportRows(res.data.data)
                    setLoading(false)
                }
        
            })
        
        },[])
        
    return(
        <div style={{width:"100%", height:"100%"}}>
            {
                loading
                ?
                <CircularProgress/>
                :
                <DataGrid
                rows={transportRows}
                columns={table.columns}
                pageSize={20}
                rowsPerPageOptions={[25,50,100]}
                checkboxSelection
                disableSelectionOnClick={true}
                onStateChange={
                    (params, event, details) => {
                        if (params.selection.length>0){
                            let rawValues = Object.values(params.rows.idRowsLookup)
                            let values = rawValues.filter((elem) => {
                                return elem.id === params.selection[0]
                            })
                            datosPorte.transporte.push({
                                PermSCT:values[0].permisoSCT,
                                NumPermisoSCT:values[0].NUMpermisoSCT,
                                IdentificacionVehicular: {
                                   ConfigVehicular:values[0].ConfigVehicular,
                                   PlacaVM:values[0].placa_trac,
                                   AnioModeloVM:values[0].año
                               },
                               Seguros:{
                                    AseguraRespCivil:values[0].aeguraRespCivil,
                                    PolizaRespCivil:values[0].poliza
                                }
                            })
                            
                            if(Object.keys(values[0]).includes("SubtipoRem")){
                                console.log("tiene remolque")
                                datosPorte.transporte = [{
                                    ...datosPorte.transporte[0],
                                    Remolques:[{
                                        SubTipoRem:values[0].SubtipoRem,
                                        Placa:values[0].placa_caja
                                    }],
                                }]
                            }
                            return
                        }

                        return {event, details}
                    }
                }
                />
            }
        </div>
    )
}

const Products = () => {
    const [loading, setLoading] = useState()
    const [showSpin, setShowSpin] = useState(false)
    const [rows, setRows] = useState([])
    const [showTable, setShowTable] = useState(false)
    // let fileReader
    // let content
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(e.target.files)
        let formData = new FormData()

        formData.append(
            "productos",
            e.target.files[0]
        )

        let response = await axios.post(`http://${ip}:8000/service/productsFile`, formData, {headers: {
            "Content-type":"multipart/formData"
        }}).then((err, res) => {
            return err ? err : res
        })

        if(!(response.status === 200)) {
            console.log("Error en la petición al servidor para procesar el archivo")
            setRows([{id:"0", BienesTransp:"0", Descripcion:"No se ha recibido un objeto de respuesta"}])
        } else { 
            console.log(response)
            datosPorte.mercancias.Mercancia.push(response.data.data)
            response.data.data.map((obj, key) => {
                productRows.push({id:key, BienesTransp:obj.BienesTransp, Descripcion:obj.Descripcion, Cantidad:obj.Cantidad, ClaveUnidad:obj.ClaveUnidad,Unidad:obj.Unidad,PesoEnKg:obj.PesoEnKg})
                return true
            })
            setLoading(false)
        }
    }

    const handleGeneralData = (e) => {
        datosPorte.mercancias = {
            ...datosPorte.mercancias,
            [e.target.id]:e.target.value
        }
    }

    useEffect(() => {
        if(loading){
            setShowSpin(true)
        } else {
            setShowSpin(false)
            if(productRows.length>0){
                setRows(productRows)
                setShowTable(true)
            } else {
                setShowTable(false)
            }
        }
    }, [loading])
    
    return (
        <div style={{display:"inline-block", width:"100%", height:"100%"}}>
            {
                showSpin
                ?
                <CircularProgress/>
                :
                <DataGrid
                sx={{display:showTable ? "" : "none", width:"100%"}}
                initialState={undefined}
                columns={productsColumns}
                rows={rows}
                rowsPerPageOptions={[25,50,100]}
                pageSize={20}
                />
            }
            <Box>
                <TextField onChange={handleGeneralData} disabled={loading ? true : false} sx={{display:showTable ? "none" : ""}} id="UnidadPeso" label="Unidad de peso"/>
                <TextField onChange={handleGeneralData} disabled={loading ? true : false} sx={{display:showTable ? "none" : ""}} id="PesoBrutoTotal" label="Peso bruto total"/>
            </Box>
            <Box>
                <Button disabled={loading ? true : false} sx={{display:showTable ? "none" : "",background:"red", color:"white", margin:"2vh"}} variant="contained">Buscar</Button>
                <label style={{display:showTable ? "none" : ""}} htmlFor="contained-button-file">
                    <Input  onChange={handleSubmit} sx={{display:"none"}}  id="contained-button-file" type="file" />
                    <Button  disabled={loading ? true : false} variant="contained" component="span">
                        Subir archivo
                    </Button>
                </label>
            </Box>
        </div>

    )
}

const Locations = () => {
    const [showDestiny, setShowDestiny] = useState(false)
    const [date, setDate] = useState(new Date().toISOString())
    const [originLocations, setOriginLocations] = useState({TipoUbicacion: "Origen"})
    const [locations, setLocations] = useState({TipoUbicacion: "Destino"})
    const [activeStep, setActiveStep] = useState(0)
    const [state, setState] = useState({
        localidad:undefined,
        municipio:undefined,
        estado:undefined
    })
    const handleLocations = (e, value) => {
        if((e === undefined) && (activeStep === 0)) {
            setOriginLocations(                
                {
                    ...originLocations,
                    FechaHoraSalidaLlegada:value
                }
            )
            return
        } else if((e === undefined) && (activeStep === 1)) {
            setLocations(
                {
                    ...locations,
                    FechaHoraSalidaLlegada:value
                }
            )
            return
        } 
        try{
            switch(e.target.id){
                case "or_rfc":
                    datosPorte.TranspInternac = "No";
                    setOriginLocations({
                        ...originLocations,
                        RFCRemitenteDestinatario:value

                    })
                    break;
                case "or_date":
                    setOriginLocations(
                        {
                            ...originLocations,
                            FechaHoraSalidaLlegada:value
                        }
                    )
                    break;
                case "or_street":
                    setOriginLocations(
                        {
                            ...originLocations,
                            Domicilio:{
                                Calle:value
                            }
                        }
                    )
                    break;
                case "or_cp":
                    setOriginLocations(
                        {
                            ...originLocations,
                            Domicilio:{
                                ...originLocations.Domicilio,
                                CodigoPostal:value
                            }
                        }
                    )
                    break;
                case "or_state":
                    break;
                case "or_country":
                    break;
                case "or_munic":
                    break;
                case "or_locality":
                    break;
                case "d_rfc":
                    setLocations(
                    {
                        ...locations,
                        RFCRemitenteDestinatario:value

                    })
                    break;
                case "d_date":
                    setLocations(
                        {
                            ...locations,
                            FechaHoraSalidaLlegada:value
                        }
                    )
                    break;
                case "d_street":
                    setLocations(
                        {
                            ...locations,
                            Domicilio:{
                                Calle:value
                            }
                        }
                    )
                    break;
                case "d_cp":
                    console.log(value)
                    setLocations(
                        {
                            ...locations,
                            Domicilio:{
                                ...locations.Domicilio,
                                CodigoPostal:value
                            }
                        }
                    )
                    break;
                case "d_state":
                    break;
                case "d_country":
                    break;
                case "d_munic":
                    break;
                case "d_locality":
                    break;
                default:
                    break;
            }
        }catch(err){
            console.log(err)
        }
    }

    const completeOrigin = () => {
        setShowDestiny(true)
        console.log(state)
        console.log()
        if((state.localidad === ('' || 'NULL'))&&(state.municipio === ('' || 'NULL'))){
            console.log("entrando doble null")
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Origen",
                "RFCRemitenteDestinatario": originLocations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": originLocations.FechaHoraSalidaLlegada,
                "Domicilio": {
                    "Calle": originLocations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Pais": "MEX",
                    "CodigoPostal": originLocations.Domicilio.CodigoPostal,
                }
            })
            setActiveStep(1)
            console.log(originLocations)
            return
        } else if(state.municipio === ('' || 'NULL')){
            console.log("entrando municipio null")
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Origen",
                "RFCRemitenteDestinatario": originLocations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": originLocations.FechaHoraSalidaLlegada,
                "Domicilio": {
                    "Calle": originLocations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Pais": "MEX",
                    "CodigoPostal": originLocations.Domicilio.CodigoPostal,
                    "Localidad": state.localidad
                }
            })
            setActiveStep(1)
            console.log(originLocations)
            return
        } else if (state.localidad === ('' || 'NULL')){
            console.log("entrando localiadd null")
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Origen",
                "RFCRemitenteDestinatario": originLocations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": originLocations.FechaHoraSalidaLlegada,
                "Domicilio": {
                    "Calle": originLocations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Municipio":state.municipio,
                    "Pais": "MEX",
                    "CodigoPostal": originLocations.Domicilio.CodigoPostal,
                }
            })
            setActiveStep(1)
            console.log(originLocations)
            return
        } else {
            console.log("tiene ambos")
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Origen",
                "RFCRemitenteDestinatario": originLocations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": originLocations.FechaHoraSalidaLlegada,
                "Domicilio": {
                    "Calle": originLocations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Municipio":state.municipio,
                    "Localidad":state.localidad,
                    "Pais": "MEX",
                    "CodigoPostal": originLocations.Domicilio.CodigoPostal,
                }
            })
            setActiveStep(1)
            console.log(originLocations)
            return
        }
    }
    const completeDestiny = () => {
        
        if(state.municipio === (''||'NULL')){
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Destino",
                "RFCRemitenteDestinatario": locations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": locations.FechaHoraSalidaLlegada,
                "DistanciaRecorrida":"1",
                "Domicilio": {
                    "Calle": locations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Pais": "MEX",
                    "CodigoPostal": locations.Domicilio.CodigoPostal,
                    "Localidad": state.localidad
                }
            })
            console.log("Cargado exitosamente")
            return
        } else if((state.localidad === (''||'NULL')) && (state.municipio === (''||'NULL'))){
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Destino",
                "RFCRemitenteDestinatario": locations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": locations.FechaHoraSalidaLlegada,
                "DistanciaRecorrida":"1",
                "Domicilio": {
                    "Calle": locations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Pais": "MEX",
                    "CodigoPostal": locations.Domicilio.CodigoPostal,
                }
            })
            console.log("Cargado exitosamente")
            return
        } else if (state.localidad === (''||'NULL')){
            datosPorte.Ubicaciones.push({
                "TipoUbicacion": "Destino",
                "RFCRemitenteDestinatario": locations.RFCRemitenteDestinatario,
                "FechaHoraSalidaLlegada": locations.FechaHoraSalidaLlegada,
                "DistanciaRecorrida":"1",
                "Domicilio": {
                    "Calle": locations.Domicilio.Calle,
                    "Estado": state.estado,
                    "Municipio":state.municipio,
                    "Pais": "MEX",
                    "CodigoPostal": locations.Domicilio.CodigoPostal,
                }
            })
            console.log("Cargado exitosamente")
            return
        } else {
            datosPorte.Ubicaciones.push(
                {
                    "TipoUbicacion": "Destino",
                    "RFCRemitenteDestinatario": locations.RFCRemitenteDestinatario,
                    "FechaHoraSalidaLlegada": locations.FechaHoraSalidaLlegada,
                    "DistanciaRecorrida":"1",
                    "Domicilio": {
                        "Calle": locations.Domicilio.Calle,
                        "Municipio": state.municipio,
                        "Estado": state.estado,
                        "Pais": "MEX",
                        "CodigoPostal": locations.Domicilio.CodigoPostal,
                        "Localidad": state.localidad
                }
                }
            )
            console.log("Cargado exitosamente")

            return

        }
        
    }

    const toIsoHelper = (date) => {
        // var tzo = -date.getTimezoneOffset(),
        //     dif = tzo >= 0 ? '+' : '-',
        var pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };

        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds())
            // dif + pad(tzo / 60) +
            // ':' + pad(tzo % 60);
    }
    
    useEffect(() => {
        if(activeStep === 1){
            try {
                if(locations.Domicilio.CodigoPostal.length>3){
                    console.log("Petición iniciada")
                    console.log(locations.Domicilio.CodigoPostal)
                    window.Facturama.Catalogs.PostalCodes(locations.Domicilio.CodigoPostal, (res) => {
                        if(res.length === 1){
                            if(res[0].LocationCode === ''){
                                setState({
                                    municipio:res[0].MunicipalityCode,
                                    estado:res[0].StateCode,
                                })

                            } else if (res[0].MunicipalityCode === '') {
                                setState({
                                    localidad:res[0].LocationCode,
                                    estado:res[0].StateCode,
                                })
                            } else if (res[0].MunicipalityCode && res[0].LocationCode) {
                                setState({
                                    localidad:res[0].LocationCode,
                                    municipio:res[0].MunicipalityCode,
                                    estado:res[0].StateCode,
                                })
                            } else {
                                setState({
                                    estado:res[0].StateCode,
                                })

                            }
                            return
                        }
                    })
                    return
                } else {
                    return
                }
            } catch(err) {
                return
            }
        } else {
            try {
                if(originLocations.Domicilio.CodigoPostal.length>3){
                    window.Facturama.Catalogs.PostalCodes(originLocations.Domicilio.CodigoPostal, (res) => {
                        if(res.length === 1){
                            setState({
                                localidad:res[0].LocationCode,
                                municipio:res[0].MunicipalityCode,
                                estado:res[0].StateCode,
                            })
                            return
                        }
                    })
                    return
                } else {
                    return
                }
            } catch(err) {
                console.log(err)
                return
            }
        }
    },  [originLocations,locations, activeStep])

    return(
        <div>
            {
                showDestiny 
                ?
                <Box>
                     <Typography>Ubicación de destino</Typography>
                        <Box sx={{display:"flex"}}>
                            <Box>
                                <InputLabel htmlFor='d_rfc'>RFC de destino</InputLabel>
                                <Input variant="outlined" id="d_rfc"  onChange={(e) => handleLocations(e,e.target.value)}/>
                            </Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="d_date"
                                    renderInput={(props) => <TextField {...props}/>}
                                    label="Fecha y hora de salida"
                                    value={date}
                                    onChange={(newValue) => {
                                        //*Esto es necesario porque al convertir el valor de la fecha en ISO, cambia la zona horaria por automatico
                                        let dateFormated = toIsoHelper(new Date(newValue))
                                        console.log("Añadiendo fecha")
                                        handleLocations(undefined,dateFormated)
                                        setDate(newValue)
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Typography>Domicilio</Typography>
                        <Box sx={{display:"inline-grid"}}>
                            <Box>
                                <InputLabel htmlFor='d_street'>Calle</InputLabel>
                                <Input variant="outlined" id="d_street"  onChange={(e) => handleLocations(e,e.target.value)}/>
                            </Box>
                            <Box>
                                <InputLabel htmlFor='d_cp'>Código postal</InputLabel>
                                <Input variant="outlined" id="d_cp"  onChange={(e) => handleLocations(e,e.target.value)}/>
                            </Box>
                            <Box>
                                {/* <InputLabel htmlFor='d_locality'>Localidad</InputLabel> */}
                                <TextField variant="outlined" id="d_locality" value={`${state.localidad}`} onChange={(e) => handleLocations(e,e.target.value)}/>
                            </Box>
                        </Box>

                        {/* //*Autocomplete */}
                        <Box sx={{display:"inline-grid"}}>
                            <TextField label="País" value="MEX" id="d_country" onChange={(e) => handleLocations(e, e.target.value)}/>
                            <TextField label="Estado" value={`${state.estado}`} id="d_state" />
                            <TextField label="Municipio" id="d_munic" value={`${state.municipio}`} />
                        </Box>
                        <Button variant="contained" sx={{color:"white", background:"blue"}} onClick={completeDestiny}>Completar</Button>
                </Box>
                :
                <Box >
                    <Typography>Ubicación de origen</Typography>
                        <Box sx={{display:"flex"}}>
                            <Box>
                                <InputLabel htmlFor='or_rfc'>RFC de origen</InputLabel>
                                <Input variant="outlined" id="or_rfc"  onChange={(e) => handleLocations(e,e.target.value)}/>
                            </Box>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="or_date"
                                    renderInput={(props) => <TextField {...props}/>}
                                    label="Fecha y hora de salida"
                                    value={date}
                                    onChange={(newValue) => {
                                        //*Esto es necesario porque al convertir el valor de la fecha en ISO, cambia la zona horaria por automatico
                                        let dateFormated = toIsoHelper(new Date(newValue))
                                        setDate(newValue)
                                        console.log(dateFormated)
                                        handleLocations(undefined,dateFormated)
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Typography>Domicilio</Typography>
                        <Box sx={{display:"inline-grid"}}>
                            <TextField label="Calle" id="or_street" onChange={(e) => handleLocations(e,e.target.value)}/>
                            <TextField label="Código postal" id="or_cp" onChange={(e) => handleLocations(e, e.target.value)}/>
                            <TextField label="Localidad" id="or_locality" value={`${state.localidad}`}/>
                        </Box>

                        {/* //*Autocomplete */}
                        <Box sx={{display:"inline-grid"}}>
                            <TextField label="País" value="MEX" id="or_country" onChange={(e) => handleLocations(e, e.target.value)}/>
                            <TextField label="Estado" value={`${state.estado}`} id="or_state" />
                            <TextField label="Municipio" id="or_munic" value={`${state.municipio}`} />
                        </Box>
                        {/* //*Opcional si al poner el codigo postal viene con el */}
                    <Button variant="contained" sx={{color:"white", background:"blue"}} onClick={completeOrigin}>Completar</Button>
                </Box>

            }
        </div>
    )
}

const InputsInvoice = () => {
    const [usesOptions, setUsesOptions] = useState([])
    const [typesOptions, setTypesOptions] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [paymentForms, setPaymentForms] = useState([])
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [expeditionPlc, setExpeditionPlc] = useState([])
    const [fiscalRegimens, setFiscalRegimens] = useState([])
    const [productCodes, setProductCodes] = useState([])
    const [inputChange, setInputChange] = useState()
    const [showPayment, setShowPayment] = useState(false)

    const handleReceiver = (e) => {
        if(e.target.id === "Rfc" || e.target.id === "Name"){
            datosFactura.Receiver = {
                ...datosFactura.Receiver,
                [e.target.id]:e.target.value
            }
            if(e.target.id === "Rfc"){
                setInputChange(e.target.value)
            }
        } 
    }

    const handleIssuer = (e) => {
        if(e.target.id === "Rfc") {
            datosFactura.Issuer = {
                ...datosFactura.Issuer,
                [e.target.id]:e.target.value
            }
            setInputChange("issuer")
            return
        } else if(e.target.id === "Name"){
            datosFactura.Issuer = {
                ...datosFactura.Issuer,
                [e.target.id]:e.target.value
            }
            return
        } else if(e.target.id === "folio") {
            datosFactura.Issuer = {
                ...datosFactura.Issuer,
                [e.target.id]:e.target.value
            }
            return
        }
        if(e.target.id === "FiscalRegime"){
            console.log("Cambiando regimen fiscal")
            return
        }
    }
    
    const handleInvoiceData = (e) => {
        if(e.target.id === "ProductCode"){
            setInputChange(`ProductCode-${e.target.value}`)
        } else if(e.target.id === "Quantity" || e.target.id === "UnitPrice"){
            datosFactura.Items = [
                {
                    ...datosFactura.Items[0],
                    [e.target.id]:e.target.value,
                    Quantity:1
                }
            ]
        } else {
            datosFactura.Items = [
                {
                    ...datosFactura.Items[0],
                }
            ]
        }
    }

    const handleSelection = (id, value) => {
        console.log(id.split("-"))
        switch(id.split("-")[0]){
            case "CfdiUse":
                datosFactura.Receiver = {
                    ...datosFactura.Receiver,
                    CfdiUse: value
                }
                break;
            case "CfdiType":
                datosFactura = {
                    ...datosFactura,
                    CfdiType:value,
                    NameId:"33"
                }
                break;
            case "PaymentMethod":
                datosFactura = {
                    ...datosFactura,
                    PaymentMethod:value
                }
                break;
            case "PaymentForm":
                datosFactura = {
                    ...datosFactura,
                    PaymentForm:value
                }
                break;
            case "Currency":
                datosFactura = {
                    ...datosFactura,
                    Currency:value
                }
                break;
            case "ExpeditionPlace":
                datosFactura = {
                    ...datosFactura,
                    ExpeditionPlace:value
                }
                break;
            case "FiscalRegime":
                datosFactura.Issuer = {
                    ...datosFactura.Issuer,
                    FiscalRegime:value
                }
                break;
            case "ProductCode":
                console.log(value)
                datosFactura.Items = [
                    {
                        ...datosFactura.Items[0],
                        ProductCode:value.value,
                        Description:value.description

                    }
                ]
                
                break;
            default:
                break;

        }
    }

    useEffect(() => {
        if(inputChange === "issuer" ){
            window.Facturama.Catalogs.FiscalRegimens((res) => {
                setFiscalRegimens(res)
            })
        } else if(inputChange !== undefined && inputChange.split("-")[0] === "ProductCode"){
            if(inputChange.split("-")[1].length>3){
                window.Facturama.Catalogs.ProductsOrServices(inputChange.split("-")[1], (res) => {
                    setProductCodes(res)
                    return
                })
                return
            }
        } else {
            window.Facturama.Catalogs.CfdiUses(datosFactura.Receiver.Rfc, (res) => {
                setUsesOptions(res)
                return
            })
        }
        return

    }, [inputChange])

    useEffect(() => {
        window.Facturama.Catalogs.CfdiTypes((res) => {
            setTypesOptions(res)
            return
        })

        window.Facturama.BranchOffice.List((res) => {
            setExpeditionPlc(res)
            return
        })
        return
    }, [])

    useEffect(() => {
        if(showPayment === true){
            window.Facturama.Catalogs.PaymentMethods((res) => {
                setPaymentMethods(res)
                return
            })
            window.Facturama.Catalogs.PaymentForms((res) => {
                setPaymentForms(res)
                return
            })
            window.Facturama.Catalogs.Currencies((res) => {
                setCurrencyOptions(res)
                return
            })
            return
        }
        

    }, [showPayment])


    return(
        <div>
            <Box component="form" onSubmit={handleInvoiceData}>
                <Typography>Datos del receptor</Typography>
                    <TextField label="RFC" id="Rfc" onChange={handleReceiver}/>
                    <TextField label="Nombre" id="Name" onChange={handleReceiver}/>
                    <Autocomplete
                    id="CfdiUse"
                    autoComplete={true}
                    clearText='Limpiar'
                    clearOnBlur={true}
                    onChange={(event,value, reason) => {
                        switch(reason){
                            case "blur":
                                console.log(reason)
                                break;
                            case "selectOption":
                                handleSelection(event.target.id, value.Value)
                                console.log(value)
                                break;
                            case "clear":
                                break;
                            case "removeOption":
                                break;
                            default:
                                break;
                        }
                    }}
                    fullWidth={true}
                    options={usesOptions}
                    renderInput={(params) => <TextField {...params} label="Uso del CFDI" name="Cfdiuse"/>}
                    getOptionLabel={(option) => `${option.Name}`}
                    renderOption={(props, option, state) => {
                        return <h4 {...props}>{`${option.Name}`}</h4>
                    }}
                    onInputChange={handleReceiver}
                    isOptionEqualToValue={(option, value) => {
                        return option.Name === value.Name
                    }}
                    />
                <Typography>Datos del emisor</Typography>
                <TextField label="RFC" id="Rfc" onChange={handleIssuer}/>
                <TextField label="Folio" id="folio" onChange={handleIssuer}/>
                <Autocomplete
                id="FiscalRegime"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            handleSelection(event.target.id, value.Value)
                            break;
                        case "clear":
                            break;
                        case "removeOption":
                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={fiscalRegimens}
                renderInput={(params) => <TextField {...params} label="Regimen fiscal" name="FiscalRegime"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                onInputChange={handleIssuer}
                isOptionEqualToValue={(option, value) => {
                    return true
                }}
                />
                <TextField label="Nombre" id="Name" onChange={handleIssuer}/>
                <Autocomplete
                id="CfdiType"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            break;
                        case "selectOption":
                            if(value.Value === "I"){
                                setShowPayment(true)
                            }
                            handleSelection(event.target.id, value.Value)
                            break;
                        case "clear":
                            break;
                        case "removeOption":
                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={typesOptions}
                renderInput={(params) => <TextField {...params} label="Tipo de CFDI" name="CfdiType"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.Name === value.Name
                }}
                />
                {
                    showPayment 
                    ?
                    <>
                        <Autocomplete
                        id="PaymentMethod"
                        autoComplete
                        clearText='Limpiar'
                        clearOnBlur={true}
                        onChange={(event,value, reason) => {
                            switch(reason){
                                case "blur":
                                    break;
                                case "selectOption":
                                    console.log(value)
                                    handleSelection(event.target.id, value.Value)
                                    break;
                                case "clear":
                                    break;
                                case "removeOption":
                                    break;
                                default:
                                    break;
                            }
                        }}
                        fullWidth={true}
                        options={paymentMethods}
                        renderInput={(params) => <TextField {...params} label="Método de pago" name="PaymentMethod"/>}
                        getOptionLabel={(option) => `${option.Name}`}
                        renderOption={(props, option, state) => {
                            return <h4 {...props}>{`${option.Name}`}</h4>
                        }}
                        isOptionEqualToValue={(option, value) => {
                            return option.Name === value.Name
                        }}
                        />
                        <Autocomplete
                        id="PaymentForm"
                        autoComplete
                        clearText='Limpiar'
                        clearOnBlur={true}
                        onChange={(event,value, reason) => {
                            switch(reason){
                                case "blur":
                                    break;
                                case "selectOption":
                                    console.log(value)
                                    handleSelection(event.target.id, value.Value)
                                    break;
                                case "clear":
                                    break;
                                case "removeOption":
                                    break;
                                default:
                                    break;
                            }
                        }}
                        fullWidth={true}
                        options={paymentForms}
                        renderInput={(params) => <TextField {...params} label="Forma de pago" name="PaymentForm"/>}
                        getOptionLabel={(option) => `${option.Name}`}
                        renderOption={(props, option, state) => {
                            return <h4 {...props}>{`${option.Name}`}</h4>
                        }}
                        isOptionEqualToValue={(option, value) => {
                            return option.Name === value.Name
                        }}
                        />
                        <Autocomplete
                        id="Currency"
                        autoComplete
                        clearText='Limpiar'
                        clearOnBlur={true}
                        onChange={(event,value, reason) => {
                            switch(reason){
                                case "blur":
                                    break;
                                case "selectOption":
                                    handleSelection(event.target.id, value.Value)
                                    break;
                                case "clear":
                                    break;
                                case "removeOption":
                                    break;
                                default:
                                    break;
                            }
                        }}
                        fullWidth={true}
                        options={currencyOptions}
                        renderInput={(params) => <TextField {...params} label="Moneda" name="Currency"/>}
                        getOptionLabel={(option) => `${option.Name}`}
                        renderOption={(props, option, state) => {
                            return <h4 {...props}>{`${option.Name}`}</h4>
                        }}
                        isOptionEqualToValue={(option, value) => {
                            return option.Name === value.Name
                        }}
                        />
                    </>
                    :
                    null 
                }
                {
                    datosFactura.CfdiType
                    ?
                    <TextField label="NameID" value={`${datosFactura.NameId}`}/>
                    :
                    null
                }
                <Autocomplete
                id="ExpeditionPlace"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            handleSelection(event.target.id, value.Address.ZipCode)
                            break;
                        case "clear":
                            break;
                        case "removeOption":
                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={expeditionPlc}
                renderInput={(params) => <TextField {...params} label="Lugar de expedición" name="ExpeditionPlace"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                isOptionEqualToValue={(option, value) => {
                    return true
                }}
                />
                <Typography>Conceptos</Typography>
                <TextField label="Cantidad" type="number" id="Quantity" defaultValue={1} onChange={handleInvoiceData}/>
                <Autocomplete
                id="ProductCode"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            handleSelection(event.target.id, {value:value.Value, description:value.Name})
                            break;
                        case "clear":

                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={productCodes}
                renderInput={(params) => <TextField {...params} label="Código de producto" name="ProductCode"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                onInputChange={handleInvoiceData}
                isOptionEqualToValue={(option, value) => {
                    return option.Name === value.Name
                }}
                />
                <TextField label="Precio unitario" id="UnitPrice" onChange={handleInvoiceData}/>
            </Box>
        </div>
    )
}
const CartaPorte = () => {
    /* //*Ejemplo carta porte */
    let dataToSend = {
        "Issuer": {}, 
        "Receiver": {},
        "CfdiType": "",
        "NameId": "",
        "ExpeditionPlace": "",
        "Items": [
            {
                "Quantity": "",
                "ProductCode": "",
                "UnitCode": "E48",            
                "Description": "",
                "IdentificationNumber": null,
                "UnitPrice": "",
                "Subtotal": "",            
                "Taxes": [
                    {
                        "Name": "IVA RET",
                        "IsRetention":"true",
                        "Rate": "0.04",
                        "Base": "",
                        "Total": ""
                    },
                    {
                        "Name": "IVA",
                        "Rate": "0.16",
                        "Base": "",
                        "Total": ""
                    }
                ],
                "Total": ""
            }
        ],
        "Complemento": {
            "CartaPorte20": {
                "TranspInternac": "",
                "Ubicaciones": [
                    {
                        "TipoUbicacion": "",
                        "RFCRemitenteDestinatario": "",
                        "FechaHoraSalidaLlegada": "",
                        "DistanciaRecorrida": "1",
                        "Domicilio": {}
                    },
                    {
                        "TipoUbicacion": "",
                        "RFCRemitenteDestinatario": "",
                        "FechaHoraSalidaLlegada": "",
                        "TipoEstacion": "Seleccionar",
                        "DistanciaRecorrida":"",
                        "Domicilio": {}
                    }
                ],
                "Mercancias": {
                    "UnidadPeso": "",
                    "Mercancia": [],
                    "Autotransporte": {},
                    "Seguros": {}
                },
                "FiguraTransporte": []
            }
        }
        }
    
    const handlePorte = () => {
        console.log(datosFactura)
        console.log(datosPorte)
        const deleteProducts = () => {
            datosPorte.mercancias.Mercancia[0].forEach((obj, index) => {
                if(obj.Descripcion === "No es un valor del catalogo del SAT"){
                    console.log("borrando")
                    datosPorte.mercancias.Mercancia[0].splice(index, 1)
                }
            })
        }

        deleteProducts()
        
        const getSubtotal = () => {
            return datosFactura.Items[0].Quantity * datosFactura.Items[0].UnitPrice
        }
        
        const taxes = (base, rate) => {
            console.log(`BASE: ${base} RATE:${rate}`)
            let result = Number(parseFloat(`${base*rate}`)).toFixed(2)
            console.log(result)
            return result
        }

        const getTotalMerch = ()=> {
            return datosPorte.mercancias.Mercancia[0].length
        }

        let subtotal = Number(getSubtotal())
        let retentionTotal =Number(taxes(Number(subtotal),Number(dataToSend["Items"][0]["Taxes"][0]["Rate"])))
        let feeTax = Number(taxes(subtotal - retentionTotal, dataToSend["Items"][0]["Taxes"][1]["Rate"]))
        let totalMerch = getTotalMerch()
        
        dataToSend = {
            ...dataToSend,
            Issuer:datosFactura.Issuer,
            Receiver:datosFactura.Receiver,
            CfdiType:datosFactura.CfdiType,
            PaymentMethod:datosFactura.PaymentMethod,
            PaymentForm:datosFactura.PaymentForm,
            NameId: datosFactura.NameId,
            ExpeditionPlace:datosFactura.ExpeditionPlace,
            Folio:datosFactura.Issuer.folio,
            Items:[{
                ...dataToSend["Items"][0],
                Description:datosFactura.Items[0].Description,
                ProductCode:datosFactura.Items[0].ProductCode,
                Quantity:datosFactura.Items[0].Quantity,
                UnitPrice:datosFactura.Items[0].UnitPrice,
                Subtotal:subtotal,
                Taxes:[
                    {
                        ...dataToSend["Items"][0].Taxes[0],
                        Base:subtotal,
                        Total:Number(retentionTotal)   
                    },
                    {
                        ...dataToSend["Items"][0].Taxes[1],
                        Base:subtotal - retentionTotal,
                        Total:Number(feeTax)
                    }
                ],
                Total:Number(subtotal - retentionTotal + feeTax).toFixed(2)
            }],
            Complemento: {
                CartaPorte20: {
                    TranspInternac:datosPorte.TranspInternac,
                    Ubicaciones:datosPorte.Ubicaciones,
                    Mercancias:{
                        UnidadPeso:datosPorte.mercancias.UnidadPeso,
                        PesoBrutoTotal:datosPorte.mercancias.PesoBrutoTotal,
                        NumTotalMercancias:totalMerch,
                        Mercancia:datosPorte.mercancias.Mercancia[0],
                        Autotransporte:datosPorte.transporte[0],
                        //    ...dataToSend["Complemento"]["CartaPorte20"]["Mercancias"]["Autotransporte"],
                        //    PermSCT:datosPorte.transporte[0][0].permisoSCT,
                        //    NumPermisoSCT:datosPorte.transporte[0][0].NUMpermisoSCT,
                        //    IdentificacionVehicular: {
                        //        ConfigVehicular:datosPorte.transporte[0][0].ConfigVehicular,
                        //        PlacaVM:datosPorte.transporte[0][0].placa_trac,
                        //        AnioModeloVM:datosPorte.transporte[0][0].año
                        //    },
                        // //    Remolques:[{
                        // //         SubTipoRem:datosPorte.transporte[0][0].SubtipoRem,
                        // //         Placa:datosPorte.transporte[0][0].placa_caja
                        // //     }],
                        //    Seguros:{
                        //         AseguraRespCivil:datosPorte.transporte[0][0].aeguraRespCivil,
                        //         PolizaRespCivil:datosPorte.transporte[0][0].poliza
                        //    }

                        // }
                    },
                    FiguraTransporte:[
                    {
                        ...dataToSend.Complemento.CartaPorte20.FiguraTransporte[0],
                        TipoFigura:datosPorte.operador[0][0].TipoFigura,
                        RFCFigura:datosPorte.operador[0][0].RFC,
                        NombreFigura:datosPorte.operador[0][0].firstName + ' ' + datosPorte.operador[0][0].lastName,
                        NumLicencia:datosPorte.operador[0][0].NumLicencia
                    }]
                }
            }

        }

        console.log(dataToSend)
        window.FacturamaMulti.Cfdi.Create(dataToSend, (res)=> {
            console.log(res)
            history.push(`/admin/download/?id=${res.Id}`)
            window.location.reload()
        })
    }
    
    return (
        <div>
            <Button variant="outlined" onClick={handlePorte}>Generar carta porte</Button>
        </div>

    )
}

export {SelectOperator, SelectTransport, Products, CartaPorte, datosPorte, Locations, InputsInvoice  }