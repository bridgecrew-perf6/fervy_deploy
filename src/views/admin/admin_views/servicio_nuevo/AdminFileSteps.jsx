import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {operators_col, trucks_col} from './dummyData'
import { Autocomplete, 
    CircularProgress, 
    //Button, 
    TextField, 
    Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
// import axios from 'axios'

let datosPorte = {
    operador:[],
    transporte:[],
    mercancias:{
        Mercancia:[]
    },
    Ubicaciones:[]
}

// let datosFacturaToMigrate = {
//     Receiver:{},
//     Items:[],
//     Issuer:{}
// }


let datosTransporte = {
    operador:[],
    transporte:[]
}

let datosFactura = {
    receptor:{},
    factura:{},
    conceptos:{},
}

let router = [
    "192.168.100.110",
    "localhost"
]

const ip = router[0]


const SelectOperator = () => {
    const [operatorRows, setOperatorRows] = useState([])
    const [loading, setLoading] = useState(true)
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
        let operatorData =  await axios.get(`http://${ip}:9999/data/operators`)
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
    return(
        <div style={{width:"100%", height:"100%"}}>
            {
                loading 
                ?
                <CircularProgress/>
                : 
                 //**Componentizar para reutilzar tabla */
                <DataGrid
                rows={operatorRows}
                columns={table.columns}
                pageSize={20}
                rowsPerPageOptions={[25,50,100]}
                checkboxSelection
                disableSelectionOnClick
                onStateChange={
                    (params, event, details) => {
                        if (params.selection.length>0){
                            let rawValues = Object.values(params.rows.idRowsLookup)
                            let values = rawValues.filter((elem) => {
                                return elem.id === params.selection[0]
                            })
                            datosTransporte.operador.push(values)
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
    const [loading, setLoading] = useState(false)
    
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
        let operatorData =  await axios.get(`http://${ip}:9999/data/transports`)
        return operatorData
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
                disableSelectionOnClick
                onStateChange={
                    (params, event, details) => {
                        if (params.selection.length>0){
                            let rawValues = Object.values(params.rows.idRowsLookup)
                            let values = rawValues.filter((elem) => {
                                return elem.id === params.selection[0]
                            })
                            datosTransporte.transporte.push(values)

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
                                datosPorte.transporte = {
                                    ...datosPorte.transporte[0],
                                    Remolques:[{
                                        SubTipoRem:values[0].SubtipoRem,
                                        Placa:values[0].placa_caja
                                    }],
                                }
                                
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

const CompleteInvoice = (props) => {
    const [usocfdi, setUsocfdi] = useState("")
    const [input, setInput] = useState("")
    const [usesOptions, setUsesOptions] = useState([])
    const [typesOptions, setTypesOptions] = useState([])
    const [methodOptions, setMethodOptions] = useState([])
    const [paymentOptions, setPaymentOptions] = useState([])
    const [placeData, setPlaceData] = useState([])
    const [conceptData, setConceptData] = useState([])
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [regimenes, setRegimenes] =  useState([])
    const [showPayment, setShowPayment] = useState(false)
    const [state, setState] = useState({
        usoSelected:false,
        typeSelected:false,
        placeSelected:false,
        productSelected:false,
        subtotal:0
    })

    //*event.value reason
    const handleChange = (e,v,r) => {   
        let id = e.target.id
        console.log(e.target.value)

        switch(id){
            case "Description":
                break;
            case "unitPrice":
                datosFactura.conceptos ={
                    ...datosFactura.conceptos,
                    UnitPrice: e.target.value,
                }
                if(datosFactura.conceptos.quantity){
                    setState({
                        ...state,
                        subtotal: datosFactura.conceptos.UnitPrice * datosFactura.conceptos.quantity
                    })
                }
                break;
            case "quantity":
                datosFactura.conceptos ={
                    ...datosFactura.conceptos,
                    quantity: e.target.value,
                }
                if(datosFactura.conceptos.UnitPrice) {
                    setState({
                        ...state,
                        subtotal: datosFactura.conceptos.UnitPrice * datosFactura.conceptos.quantity
                    })
                }
                break;
            case "issuer_rfc":
                datosFactura.factura ={
                    ...datosFactura.factura,
                    Issuer:{
                        ...datosFactura.factura.issuer,
                        Rfc:e.target.value
                    }
                        
                }
                break;
            case "issuer_name":
                datosFactura.factura = {
                    ...datosFactura.factura,
                    Issuer: {
                        ...datosFactura.factura.Issuer,
                        Name:e.target.value
                    },
                    Folio:1
                }
                break;
            case "productCode":
                setInput(e.target.value)
                break;
            default:
                break;
        }
    }

    // const handleInputChange = (e, value, reason) => {
    //     if(e.target.id === "issuer_rfc") {
    //         datosFactura.factura.issuer.Rfc = e.target.value
    //     }
        
    // }

    const handleSubmit = ()=> {
        console.log(datosFactura)
    }

    useEffect(() => {
        if(!state.usoSelected){
            window.Facturama.Catalogs.CfdiUses(props.porte.Receiver.Rfc,(res) => {
                setUsesOptions(res)
                return
            })
        }

        window.Facturama.Catalogs.CfdiTypes((res) => {
            setTypesOptions(res)
            return
        })
            

        if(state.typeSelected){
            window.Facturama.BranchOffice.List((res)=> {
                setPlaceData(res)
                return
            })

            window.Facturama.Catalogs.PaymentMethods((res) => {
                setPaymentOptions(res)
                return
            })
            window.Facturama.Catalogs.PaymentForms((res) => {
                setMethodOptions(res)
                return
            })
            window.Facturama.Catalogs.Currencies((res) => {
                setCurrencyOptions(res)
                return
            })
        }

        if(input.length>3){
            window.Facturama.Catalogs.ProductsOrServices(input,(res)=> {
                setConceptData(res)
            })
        }

        window.Facturama.Catalogs.FiscalRegimens((res) => setRegimenes(res))

        //*Hacer otro useEffect porque el valor de issuer es undefined
        // if(datosFactura.factura.issuer.Rfc != undefined){
        //     if(input.length>3) {
        //         
        //     }
        // }
    },[usocfdi, state, input, props])

    useEffect(() => {
          datosFactura.conceptos.Subtotal = state.subtotal
        
    }, [state.subtotal])

    useEffect(() => {
        if(props.complete){
            handleSubmit()
        }
    }, [props.complete])
    
    return (
        <Box sx={{width:"80vw"}}>
            <Typography>Datos del receptor:</Typography>
            <Autocomplete
                id="cfdiuses"
                autoComplete={true}
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    setUsocfdi(reason)
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            datosFactura.receptor = {
                                CfdiUse:value.Value
                            }
                            
                            setState({
                                ...state,
                                usoSelected:true
                            })
                            break;
                        case "clear":
                            setState({
                                ...state,
                                usoSelected:false
                            })
                            break;
                        case "removeOption":
                            setState({
                                ...state,
                                usoSelected:false
                            })
                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={usesOptions}
                renderInput={(params) => <TextField {...params} label="Uso del CFDI" name="cfdiuses"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                onInputChange={handleChange}
                isOptionEqualToValue={(option, value) => {
                    return option.Name === value.Name
                }}
                />
            <Typography>Datos de la factura:</Typography>
            <Box component="form" id="items" onSubmit={handleSubmit}>
                <Autocomplete
                id="cfditypes"
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
                            datosFactura.factura = {
                                CfdiType: value.Value,
                                NameId: value.NameId,
                            }
                            setState({
                                ...state,
                                typeSelected:true,
                                nameId:datosFactura.factura.NameId
                            })
                            break;
                        case "clear":
                            setState({
                                ...state,
                                placeSelected:false
                            })
                            break;
                        case "removeOption":
                            setState({
                                ...state,
                                typeSelected:false
                            })
                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={typesOptions}
                renderInput={(params) => <TextField {...params} label="Tipo de CFDI" name="cfditype"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.Name === value.Name
                }}
                />
                {
                    showPayment ? 

                    <>
                    <Autocomplete
                    id="paymentForm"
                    autoComplete
                    clearText='Limpiar'
                    clearOnBlur={true}
                    onChange={(event,value, reason) => {
                        switch(reason){
                            case "blur":
                                break;
                            case "selectOption":
                                datosFactura.factura = {
                                    ...datosFactura.factura,
                                    paymentForm:value.Value
                                }
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
                    options={paymentOptions}
                    renderInput={(params) => <TextField {...params} label="Forma de pago" name="cfditype"/>}
                    getOptionLabel={(option) => `${option.Name}`}
                    renderOption={(props, option, state) => {
                        return <h4 {...props}>{`${option.Name}`}</h4>
                    }}
                    isOptionEqualToValue={(option, value) => {
                        return option.Name === value.Name
                    }}
                    />
                    <Autocomplete
                    id="paymentMethod"
                    autoComplete
                    clearText='Limpiar'
                    clearOnBlur={true}
                    onChange={(event,value, reason) => {
                        switch(reason){
                            case "blur":
                                break;
                            case "selectOption":
                                console.log("Opción de forma de pago seleccionada")
                                console.log(value)
                                datosFactura.factura = {
                                    ...datosFactura.factura,
                                    paymentMethod:value.Value
                                }
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
                    options={methodOptions}
                    renderInput={(params) => <TextField {...params} label="Método de pago" id="inputProducts" name="paymentMethod"/>}
                    getOptionLabel={(option) => `${option.Name}`}
                    renderOption={(props, option, state) => {
                        return <h4 {...props}>{`${option.Name}`}</h4>
                    }}
                    isOptionEqualToValue={(option, value) => {
                        return option.Name === value.Name
                    }}
                    />
                    <Autocomplete
                    id="currency"
                    autoComplete
                    clearText='Limpiar'
                    clearOnBlur={true}
                    onChange={(event,value, reason) => {
                        switch(reason){
                            case "blur":
                                break;
                            case "selectOption":
                                console.log("Moneda seleccionada")
                                console.log(value)
                                datosFactura.factura = {
                                    ...datosFactura.factura,
                                    currency:value.Value
                                }
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
                    renderInput={(params) => <TextField {...params} label="Moneda" name="cfditype"/>}
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

                <TextField label="NameID" value={`${state.nameId}`}/>
                <Autocomplete
                id="expeditionplc"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            datosFactura.factura = {
                                ...datosFactura.factura,
                                ExpeditionPlace:value.Address.ZipCode
                            }
                            setState({
                                ...state,
                                placeSelected:true
                            })
                            break;
                        case "clear":
                            setState({
                                ...state,
                                placeSelected:false
                            })
                            break;
                        case "removeOption":
                            setState({
                                ...state,
                                placeSelected:false
                            })
                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={placeData}
                renderInput={(params) => <TextField {...params} label="Lugar de expedición" name="expeditionplc"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                isOptionEqualToValue={(option, value) => {
                    return true
                }}
                />
                <Typography>Datos del Emisor</Typography>
                <TextField
                id="issuer_rfc"
                onChange={handleChange}
                />
                <Autocomplete
                id="issuer_regimen"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            datosFactura.factura = {
                                ...datosFactura.factura,
                                Issuer: {
                                    ...datosFactura.factura.Issuer,
                                    FiscalRegime:value.Value
                                }
                            }
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
                options={regimenes}
                renderInput={(params) => <TextField {...params} label="Regimen fiscal" name="expeditionplc"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                onInputChange={handleChange}
                isOptionEqualToValue={(option, value) => {
                    return true
                }}
                />
                <TextField id="issuer_name" label="Nombre del Emisor" onChange={handleChange}/>
                <Typography>Conceptos</Typography>
                {/* //*Añadir manejo de multiples conceptos (impuesto sólo trasladado .16) */}
                <TextField label="Cantidad" type="number" id="quantity" onChange={handleChange}/>
                <TextField label="Precio unitario" id="unitPrice" step=".01" onChange={handleChange} type="number"/>
                <Autocomplete
                id="productCode"
                autoComplete
                clearText='Limpiar'
                clearOnBlur={true}
                onChange={(event,value, reason) => {
                    switch(reason){
                        case "blur":
                            console.log(reason)
                            break;
                        case "selectOption":
                            datosFactura.conceptos ={
                                ...datosFactura.conceptos,
                                ProductCode: value.Value,
                                Description: value.Name,
                            }
                            setState({
                                ...state,
                                productSelected:true
                            })
                            break;
                        case "clear":

                            break;
                        default:
                            break;
                    }
                }}
                fullWidth={true}
                options={conceptData}
                renderInput={(params) => <TextField {...params} label="Código de producto" name="productcode"/>}
                getOptionLabel={(option) => `${option.Name}`}
                renderOption={(props, option, state) => {
                    return <h4 {...props}>{`${option.Name}`}</h4>
                }}
                onInputChange={handleChange}
                isOptionEqualToValue={(option, value) => {
                    return option.Name === value.Name
                }}
                />
                <TextField label="Descripción" id="description" onChange={handleChange}/>
                <TextField label="Subtotal" type="number" disabled value={`${state.subtotal}`}/>
            </Box>
        </Box>
    )
}


export {SelectOperator, SelectTransport,CompleteInvoice, datosTransporte, datosFactura}