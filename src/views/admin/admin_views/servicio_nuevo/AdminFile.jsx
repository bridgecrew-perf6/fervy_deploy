import { Button, Input, Typography, Stepper, Step, StepLabel } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { SelectOperator, SelectTransport,CompleteInvoice, datosTransporte, datosFactura } from './AdminFileSteps'
import history from '../../../../history'
// import jsonPorteFormat from './porte.json'

let router = [
    "192.168.100.110",
    "localhost"
]

const ip = router[0]


//*Arreglo de objetos que determinan las columnas de la tabla de productos que se muestran al procesar el XML
const productsColumns = [
    {field:"id", headerName:"ID", width:90},
    {field:"bienesID", headerName:"Bienes Transportados", width:150},
    {field:"description", headerName:"Descripción", width:150},
    {field:"quantity", headerName:"Cantidad", width:150},
    {field:"unitKey", headerName:"Clave unidad peso", width:150},
    {field:"unit", headerName:"Unidad de peso", width:90},    
    {field:"weight", headerName:"Peso en KG", width:150},    
]

//*Las filas también son determinadas por un arreglo de objetos.
//*Se declara el arreglo vacío para que la tabla pueda detectar una asignación de valores y no de error
const productRows = []

//*Variable utilizada para mostrar los datos que faltan de la carta porte en el caso de ser así
// let datosFaltantes

//*Los pasos del componente stepper
const steps = ['Operador', 'Transporte', 'Factura']

//*Componente que se renderiza para cargar un archivo XML 
const AdminFile = () => {
    // let invoice
    const [selectedFile, setSelectedFile] = useState()
    const [porte, setPorte] = useState([])
    const [rows, setRows] = useState([])
    const [showInputs, setShowInputs] = useState(false)
    const [completePorte, setCompletePorte] = useState(false)
    const [complete, setComplete] = useState(false)
    // const [warning, setWarning] = useState(false)
    
    //*Función que asigna el buffer de datos al Hook selected files
    const handleChange =  (e) => {
       setSelectedFile(e.target.files[0])
    }

    //*Función que envía el buffer de datos al backend a través de Axios, encapsulando los datos en un el constructor de FormData
    const handleSubmit = async () => {
        const formData = new FormData()

        formData.append(
            "CartaPorte",
            selectedFile
        )

        //*Envío de datos a través de axios
        let response = await axios.post(`http://${ip}:9999/carta/cartaPorte`,formData, {
            headers: {
                'Content-type':'multipart/form-data'
            }
        }).then((err, res) => {
            return err ? err : res
        })

        if (!(response.status===200)){
            console.log("Error al procesar el archivo " + response)
            return
        }
        setPorte([response.data.cartaJson])
        // invoice = response.data.cartaJson


    }

    //*Busca valores nulos dentro del objeto (carta[0] || invoice)
    const searchForNull = (obj,array) => {
        for(const [key, value] of Object.entries(obj)){
            if(value === undefined || null){
                array.push(key)
            } else if (Array.isArray(obj)) {
                obj.map(ele => {
                    if(typeof Object.entries(ele)[1] === "object"){
                        searchForNull(ele, array)
                        return false
                    }
                    array.push(ele)
                    return true
                })
            } else if (key === "CartaPorte20") { 
                searchForNull(value, array)
            } else if (Array.isArray(value)) {
                searchForNull(value, array)
            }
        }
        return array
    }
    
    //*Función para aceptar o rechazar los datos de los productos que se muestran al procesar el XML
    const handleClick = (e) => {
        let id = e.target.id
        switch(id) {
            case "accept":
                setCompletePorte(true)
                break;
            case "unaccepted":
                break;
            default:
                break;
        }

    }

    //*Busca las llaves que corresponden al input de la factura con el id (id === llave de carta porte)
    // const findAndAssign = (obj, input, id) => {
    //     Object.keys(obj).forEach((k) => {
    //         if(obj[k] !== null && typeof obj[k] === 'object'){
    //             findAndAssign(obj[k], input, id)
    //             return
    //         }
    //         if ((obj[k] === null || undefined) && (typeof obj[k] === 'object')){
    //             if(obj[id] === null || undefined){
    //                 obj[k] = input
    //                 return
    //             }
    //         }
    //     })
    // }

    // //*Ordena los inputs para que el usuario sepa de qué concepto de la factura forman parte los inputs
    // const sortInputs = (data) => {
    //     //*key values de porte
    //     let kv = Object.entries(data)
    //     let sorted = []
    //     //*Para cada elemento el objeto carta porte siendo un array de arrays cuyos valores son de la forma, clave valor, se recorre para la busqueda
    //     //* de los valores nulos o undefined y su respectiva posición en la fctura
    //     kv.forEach(arr => {
    //         //*Condicional que valida si el elemento con indice uno del array es de tipo objeto (siendo todo en javascript un objeto a escepción de los datos primitivos)
    //         if(typeof arr[1] === "object" && arr[1]!== null || undefined) {
    //             //*si esto es cierto entonces la sección de la factura será el elemento del arreglo 0
    //             let invoiceComponent = arr[0]
    //             //*Se buscan valores nulos dentro de el elemento de tipo objeto
    //             let key = searchForNull(arr[1], [])
    //             sorted.push({seccion:invoiceComponent, nulos:key})
    //             //*En el caso contrario de que el valor del elemento uno es directamente nulo, entonces se guarda la sección de la factura directamente como "Factura"
    //         } else if(arr[1] === null || undefined) {
    //             let invoiceComponent = "Factura"
    //             let key = arr[0]
    //             sorted.push({seccion:invoiceComponent, nulos: key})
    //         }
    //     })

    //     return sorted

    // }

    //*Función que relaciona el operador y el transporte seleccionado con los datos de la carta porte (invoice || porte[0])
    const assignTransport = (porte, values) =>{
        Object.keys(porte).forEach((k) => {
            if(k === 'AutoTransporte' && typeof porte[k] === 'object') {
                porte[k].PermSCT = values.transporte[0][0].permisoSCT
                //*Dato debe estar en base de datos en entidad de transporte
                porte[k].NumPermisoSCT = values.transporte[0][0].NUMpermisoSCT
                //*Dato debe estar en base de datos en entidad de transporte
                porte[k].IdentificacionVehicular.ConfigVehicular = values.transporte[0][0].ConfigVehicular
                porte[k].IdentificacionVehicular.PlacaVM = values.transporte[0][0].placa_trac
                porte[k].IdentificacionVehicular.AnioModeloVM = values.transporte[0][0].año
                //**Dato de base de datos */
                porte[k].Remolques = [{
                    SubTipoRem: "CTR007",
                    Placa:values.transporte[0][0].placa_caja
                }]
                //*Dato debe estar en base de datos en entidad de transporte
                porte[k].Seguros.AseguraRespCivil = values.transporte[0][0].AseguraRespCivil
                porte[k].Seguros.PolizaRespCivil = values.transporte[0][0].PolizaRespCivil
                return
            }

            if(k === "FiguraTransporte" && typeof porte[k] === 'object'){
                porte[k][0].TipoFigura = values.operador[0][0].TipoFigura
                
                if(porte[k][0].NumRegIdTribFigura){
                    delete porte[k][0].NumRegIdTribFigura
                }
                porte[k][0].RFCFigura = values.operador[0][0].RFC
                porte[k][0].NombreFigura = values.operador[0][0].firstName + ' ' + values.operador[0][0].lastName
                porte[k][0].NumLicencia = values.operador[0][0].licencia

                return
            }
            if(porte[k] !== null && typeof porte[k] === 'object'){
                assignTransport(porte[k], values)            
            }
        })
    }
    
    const handleCompleteInputs = (e) => {
        if(completePorte && activeStep !== steps.length-1){
            //*Si el usuario aceptó los productos, ya seleccionó un operador y transporte por lo que el estado de completePorte es true
            //*si es true se asignan los datos de transporte a la carta porte
            assignTransport(porte[0], datosTransporte)
    
            let datosFaltantes = searchForNull(porte[0], [])
    
            if (datosFaltantes.length > 0 ) {
                setShowInputs(true)
            }
        }
    }

    const handleData = () => {
        let totalMerch = porte[0].Complemento.CartaPorte20.Mercancias.Mercancia.length
        if(datosFactura.factura.paymentMethod && datosFactura.factura.paymentForm){
            console.log("Si tiene los datos de método de pago")
            setPorte([
                ...porte,
                porte[0].Receiver.CfdiUse = datosFactura.receptor.CfdiUse, 
                porte[0].CfdiType = datosFactura.factura.CfdiType,
                porte[0].PaymentForm = datosFactura.factura.paymentMethod,
                porte[0].PaymentMethod = datosFactura.factura.paymentForm,
                porte[0].Currency = datosFactura.factura.currency,
                porte[0].NameId= "33",
                porte[0].Issuer = datosFactura.factura.Issuer,
                porte[0].Folio = datosFactura.factura.Folio,
                porte[0].ExpeditionPlace = datosFactura.factura.ExpeditionPlace,
                porte[0].Items[0].Quantity = datosFactura.conceptos.quantity,
                porte[0].Items[0].ProductCode = datosFactura.conceptos.ProductCode,
                porte[0].Items[0].Description = datosFactura.conceptos.Description,
                porte[0].Items[0].UnitPrice = datosFactura.conceptos.UnitPrice,
                porte[0].Items[0].Subtotal = Math.round(datosFactura.conceptos.Subtotal),
                porte[0].Complemento.CartaPorte20.Mercancias.NumTotalMercancias = totalMerch
            ])
            calculateTaxes()
            return
        } 
        setPorte([
            ...porte,
            porte[0].Receiver.CfdiUse = datosFactura.receptor.CfdiUse, 
            porte[0].CfdiType = datosFactura.factura.CfdiType,
            porte[0].NameId= datosFactura.factura.NameId,
            porte[0].ExpeditionPlace = datosFactura.factura.ExpeditionPlace,
            porte[0].Items[0].Quantity = datosFactura.conceptos.quantity,
            porte[0].Items[0].ProductCode = datosFactura.conceptos.ProductCode,
            porte[0].Items[0].Description = datosFactura.conceptos.Description,
            porte[0].Items[0].UnitPrice = datosFactura.conceptos.UnitPrice,
            porte[0].Items[0].Subtotal = Math.round(datosFactura.conceptos.Subtotal),
            porte[0].Complemento.CartaPorte20.Mercancias.NumTotalMercancias = totalMerch
        ])

        calculateTaxes()
    }
    
    const calculateTaxes = () => {
        setPorte([
            ...porte,
            porte[0].Items[0].Taxes[0].Base = datosFactura.conceptos.Subtotal,
            porte[0].Items[0].Taxes[0].Total = Number(datosFactura.conceptos.Subtotal * porte[0].Items[0].Taxes[0].Rate).toFixed(2),
        ])

        setPorte([
            ...porte,
            porte[0].Items[0].Taxes[1].Base = Number(datosFactura.conceptos.Subtotal - porte[0].Items[0].Taxes[0].Total).toFixed(2),
        ])
        setPorte([
            ...porte,
            porte[0].Items[0].Taxes[1].Total = Number(Number(porte[0].Items[0].Taxes[1].Base) * Number(porte[0].Items[0].Taxes[1].Rate)).toFixed(2),
        ])

        setPorte([
            ...porte,
            porte[0].Items[0].Total = Number(Number(porte[0].Items[0].Taxes[1].Base) + Number(porte[0].Items[0].Taxes[1].Total)).toFixed(2) 
        ])

        transformLocations().then((datos) => {
            console.log("Procesando datos de ubicaciones para timbrar")
            return datos
        }).then((invoice) => {
            console.log(invoice)
            window.FacturamaMulti.Cfdi.Create(invoice, (res)=>{
                console.log("Factura creada con exito")
                //*Mandar a pantalla de descarga y envío de factura
                console.log(res)
                history.push(`/admin/download/?id=${res.Id}`)
                window.location.reload()
            }, (err)=> {
                console.log("Error al crear la factura")
                console.log(err)
            })
        })
    }

    //*La función hace que las ubicaciones tengan el formato correcto de acuerdo al catalogo del sat y al código postal
    const transformLocations = async() => {
        porte[0].Complemento.CartaPorte20.Ubicaciones.map((obj, key) => {
            //*Si la respuesta de la API al pasarle el codigo postal contiene codigos de municipio y de localidad
            //*Entonces ese codigo postal depende de esas dos claves, por lo que es necesario incluirlo en la petición para generar las facturas
            window.Facturama.Catalogs.PostalCodes(obj.Domicilio.CodigoPostal, (res) => {
                if(res[0].MunicipalityCode !== "" && res[0].LocationCode !== ""){
                    setPorte([
                        ...porte,
                        porte[0].Complemento.CartaPorte20.Ubicaciones[key].Domicilio.Municipio = res[0].MunicipalityCode,
                        porte[0].Complemento.CartaPorte20.Ubicaciones[key].Domicilio.Localidad = res[0].LocationCode
                    ])
                    // obj.Domicilio.Municipio = res[0].MunicipalityCode
                    // obj.Domicilio.Localidad = res[0].LocationCode
                    if(obj.Domicilio.Estado === res[0].StateCode){
                        console.log("Si cumple con la condición de ser igual el estado que viene, con el que corresponde al codigo postal")
                    } else {
                        porte[0].Complemento.CartaPorte20.Ubicaciones[key].Domicilio.Estado = res[0].StateCode

                    }
                } else {
                    delete obj.Domicilio.Calle
                    delete obj.Domicilio.Municipio
                    delete obj.Domicilio.Localidad
                }
            })
            return true
        })
        return porte[0]
    }
    

    const getStepContent = (step) => {
        switch(step) {
            case 0:
                return <SelectOperator/>
            case 1:
                return <SelectTransport/>
            case 2: 
                return <CompleteInvoice complete={complete} porte={porte[0]}/> 
            default:
                return
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
      
    const isStepOptional = (step) => {
        return step === 1;
    };
    
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };
    
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if(activeStep === 1){
            handleCompleteInputs()
        }

        if(activeStep === steps.length-1){
            setComplete(true)
        }
        setSkipped(newSkipped);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.add(activeStep);
          return newSkipped;
        });
    };
    
    const handleReset = () => {
        setActiveStep(0);
    };

    const getTitleData = () => {
        if (!completePorte){
            return "Corrobora los datos de la mercancia"
        }

        return "Completa los datos para generar la factura con complemento Carta Porte"
    }

    function CompleteStepper() {

        return (
            <Box sx={{ width: '100%', height:"100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                    labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                    );
                }
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>
                        {label}
                        </StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    Haz completado todos los pasos, presiona el botón generar factura
                    <Button variant="outlined" sx={{background:"blue", color:"white"}} onClick={handleData}>Generar factura</Button>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Resetear</Button>
                </Box>
                </React.Fragment>
            ) : (
                <Box id="step_container" sx={{height:"100%"}}>
                    <Box sx={{height:"100%",display:"flex",alignItems:"center", justifyContent:"center"}}>
                        {getStepContent(activeStep)}
                    </Box>
        
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1, background:"red", color:"white" }}
                        >
                        Regresar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                        <Button sx={{background:"red", color:"white"}} onClick={handleSkip}>
                            Saltar
                        </Button>
                        )}
        
                        <Button id="next_button" onClick={handleNext} sx={{background:"green", color:"white"}}>
                        {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                        </Button>
                    </Box>
                </Box>
            )}
            </Box>
        )};

    // const warningDialog = () => {
    //     return (
    //         <div>

    //         </div>    
    //     )
    // }

    useEffect(() => {
        if(porte.length>0 && !completePorte) {
            //*Definir uso del CFDI para el receptor
            porte[0].Complemento.CartaPorte20.Mercancias.Mercancia.map((obj, key) => {
                productRows.push({id:key, bienesID:obj.BienesTransp, description:obj.Descripcion, quantity:obj.Cantidad, unitKey:obj.ClaveUnidad, unit:obj.Unidad,weight:obj.PesoEnKg})
                return true
            })
            if(productRows.length>0){
                setRows(productRows)
            }
            return 
        }
    }, [porte, completePorte])

    return (
        <div>
            {
                porte.length>0 
                ?
                <>
                <Box sx={{height:"100%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <Typography sx={{display:showInputs ? "none":""}} variant="h2">{getTitleData()}</Typography>
                        {
                            !completePorte 
                            ?
                            <>
                            <Typography sx={{display:showInputs ? "none":""}} variant="h4">Datos generales:</Typography>
                            <div sx={{display:showInputs ? "none":""}}>
                            <Typography sx={{display:showInputs ? "none" : ""}}>Peso bruto total: {porte[0].Complemento.CartaPorte20.Mercancias.PesoBrutoTotal}</Typography>
                            <Typography sx={{display:showInputs ? "none" : ""}}>Número total de mercancías: {porte[0].Complemento.CartaPorte20.Mercancias.NumTotalMercancias}</Typography>
                            <Typography sx={{display:showInputs ? "none" : ""}}>Unidad de peso: {porte[0].Complemento.CartaPorte20.Mercancias.UnidadPeso}</Typography>
                            </div>
                            <Box sx={{height:"100vh", width:"100%"}}>
                                <DataGrid
                                initialState={undefined}
                                rows={rows}
                                columns={productsColumns}
                                rowsPerPageOptions={[25,50,100]}
                                />

                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <Button
                                    id="accept" 
                                    variant="contained" 
                                    sx={
                                        {
                                            background:"green",
                                            display:completePorte ? "none" : "", 
                                            margin:"1.5vh"
                                        }
                                    } 
                                    onClick={handleClick}>
                                        Aceptar
                                    </Button>

                                    <Button 
                                    id="unaccepted"
                                    variant="contained" 
                                    sx={
                                        {
                                            background:"red",
                                            display:completePorte ? "none" : "", 
                                            margin:"1.5vh"
                                        }
                                    } 
                                    onClick={handleClick}>
                                        Rechazar
                                    </Button>
                                </Box>

                            </Box>
                            </>
                            :
                                
                            <>
                                <Box sx={{height:"100vh", width:"80%"}}>
                                    <CompleteStepper/>
                                </Box>
                            </>
                        }
                </Box>
                </>
                : 
                <Box 
                sx={
                    {
                        display:"flex",
                        alignItems:"center", 
                        justifyContent:"center",
                        width:"100vw",
                        height:"100vh"
                    }
                }>
                    <label htmlFor="contained-button-file">
                        <Input onChange={handleChange} sx={{display:"none"}}  id="contained-button-file" type="file" />
                        <Button variant="contained" component="span">Seleccionar archivo</Button>
                    </label>
                    <Button onClick={handleSubmit} variant="contained" component="span">
                        Subir archivo
                    </Button>

                </Box>
            }
        </div>
    )
}

export default AdminFile