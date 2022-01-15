import React, {useState, useEffect} from 'react'
import {Box} from '@mui/system'
import { 
    Input, 
    Button, 
    TextField, 
    Typography, 
    Autocomplete,
} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
// import axios from 'axios'

const pcolumns = [
    {
        field:"id",
        headerName:"ID",
        width:150,
        editable:true
    },
    {
      field: 'products',
      headerName: 'Productos',
      width: 150,
      editable: true,
    },
  ];
  
const prows = [];

const ucolumns = [
    {
        field:"id",
        headerName:"ID",
        width:150,
        editable:true
    },
    {
      field: 'units',
      headerName: 'Embalaje',
      width: 150,
      editable: true,
    },
  ];
  
const urows = [];

// const docs = ["Documento","Factura", "Remisión"]

let products = []

let unidades = []

export const Step2 = () => {
    const [counter, setCounter] = useState(0)
    const [data, setData] = useState([])
    const [table, setTable] = useState({
        products:false,
        units:false
    })
    const [units, setUnits] = useState([])
    const [state, setState] = useState({
        file:false,
        manual:false,
        methodSelected:false,
        description:"",
        unidad:"",
        docs:"",
        empty:true,
        canAdd:false,
        input:""

    })

    const handleAdd = () => {
        //*Si el hook state.unidad es algo superior a un string vacío añade la unidad al arreglo units
        if(state.unidad){
            unidades.push({
                unidad:state.unidad
            })
            setCounter(unidades.length)
            setState({
                ...state,
                canAdd:false,
                input:""
            })

            return
        } else{
            // *Si no existe unidad entonces estaremos en la descripción, por lo tanto se añade el estado de la descripción al arreglo products
            products.push({
                description:state.description,
                clear:true
            })
            setCounter(products.length)
            setState({
                ...state,
                canAdd:false,
                input:""
            })
        }
    }

    const handleComplete = () => {
        //*Si existen productos en el arreglo products entonces puede completar el primer paso de añadir productos
        if(products.length>0) {
            setState({
                ...state,
                descriptionCompleted:true
            })
        }

        
        //*si existe state.unidad entonces es momento de mostrar la tabla con el hook showProductsAndUnits
        if(state.unidad){
            setState({
                ...state,
                showProductsAndUnits:true
            })
            unidades.map((obj, key) => {
                urows.push({id:key, units:obj.unidad})
                return null
            })
        } else {
            //*Si no existe state.unidad entonces estamos entrando apenas a este buscador
            //*Por lo tanto se ajusta el contador al length del array units
            setCounter(unidades.length)

            //*Se mapean todos los productos y se añade cada uno al arreglo de objetos rows para mostrarse en tabla de resumen
            products.map((obj, key) => {
                prows.push({id:key,products:obj.description})
                return null
            })
        }
    }

    const handleYes = ()=>{
        table.units 
        ?
        setState({
            ...state,
            completed:true,
            showProductsAndUnits:false
        })
        :
        setTable({...table, units:true})

    }
    const handleNo = ()=>{

        setTable({...table, units:true})
    }

    // *Función para mostrar contenido dependiendo del método que el usuario seleccione para subir sus productos
    const handleUploadMethod = (e) => {
        //*Selecciona subir con archivo
        if (e.target.name === "file"){
            setState({
                ...state,
                file:true,
                manual:false,
                methodSelected:true
            })
            return
        }

        //*Selecciona manual
        setState({
            ...state,
            file:false,
            manual:true,
            methodSelected:true
        })
    }

    //*Función que escucha el cambio en el valor del componente AutoComplete
    const handleChange = (e, value, reason) => {
        //*En caso que el usuario esté introduciendo datos
        switch(reason){
            case "input":
                setState({
                    ...state,
                    [e.target.name]: e.target.value
                })
                break;
        //* en caso que se limpie el input (borrando o con botón clear)
            case "clear":
                console.log("Se limpia")
                break;
        //* En caso que se reseteé el componente AutoComplete
            case "reset":
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        // *Petición de los embalajes del catalogo del SAT a la API facturama
        window.Facturama.Catalogs.Units( (res)=> {
            // *Asigna el valor devuelto por la api a un hook state para que se muestren las unidades a el usuario cuando typea en el buscador
            setUnits(res)
        }, (err) => {
            console.error("No se han podido cargar las unidades")
            console.error(err)
        })
        if(state.description.length>3) {
            // *Peticiín de los productos del catalogo del sat a API facturama
            let options = window.Facturama.Catalogs.ProductsOrServices(state.description, (res)=> {
                //Asigna los valores de los productos a un hook de react para que el buscador se actualice conforme el usuario typea
                setData(res)
            }, (err) => {
                console.error("error")
                console.error(err.responseJSON)
            })

            console.log('Opciones ' + options)
        }
    }, [state])
    return (
        <>
        {
            // *BUSCADORES DEL CATALOGO DEL SAT
           // *Sólo se muyestra el contenido BUSCADORES si el usuario selecciona cargar sus datos de forma manual  
           state.manual 
           ? 
           <>
           
           {
                state.completed 
                ? 
                <>
                <Box sx={{width:"50%"}}>
                    <Typography variant="h4" sx={{fontSize:"2vw"}}>Felicidades, haz completado la carga de productos y embalajes para que sea más fácil facturar en futuros pedidos.</Typography>
                    <Typography variant="body2" sx={{fontSize:"1.2vw"}}>Presiona el botón "Siguiente", para crear tu contraseña y empezar a solicitar transporte de mercancías</Typography>
                </Box>
                </>
                :
                undefined
            }
           <Box sx={{width:"50%", display:state.completed ? "none": "flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>

                {/* // *Solo se muestra el contador para el usuario que está buscando y seleccionado productos o unidades */}
                {/* // *El booleano es el estado del hook showProductsandUnits */}
                {
                    state.showProductsAndUnits 
                    ?
                    undefined
                    :
                    <>
                        <Box sx={{display:state.completed ? 'none' : 'flex'}}>
                            <Typography variant="body2" sx={{fontSize:"1.5vw"}}>Numero de items:</Typography>
                            <Box sx={
                                {
                                    width:"3vw", 
                                    height:"3vw", 
                                    backgroundColor:"red", 
                                    display:"flex", 
                                    flexDirection:"column",
                                    justifyContent:"center", 
                                    alignItems:"center"
                                }
                            }>
                                <Typography variant="body2" sx={{fontSize:"2vw", color:"white"}}>{counter}</Typography>
                            </Box>
                        </Box>
                    </>
                }
                        {
                            // *Si el usuario ya completó la sección de descripción de productos se muestra el buscador de unidades
                            state.descriptionCompleted
                            ?
                            //* y se ejecuta la función para resetear el addItemButton
                            <>
                                {
                                    // *Tabla de resumen que se muestra cuando el usuario a completado el llenado de los campos de productos
                                    state.showProductsAndUnits
                                    ?
                                    <>
                                        <Typography variant="h4">Estos son los {table.units ? 'embalajes' : 'productos'} que seleccionaste, ¿están correctos?</Typography>
                                        <Box sx={{height:"40vh", width:"30vw"}}>
                                            <DataGrid
                                            columns={table.units ? ucolumns : pcolumns}
                                            rows={table.units ? urows : prows}
                                            pageSize={6}
                                            rowsPerPageOptions={[5]}
                                            checkboxSelection
                                            disableSelectionOnClick
                                            /> 
                                        </Box>
                                    </>
                                    :
                                    <Autocomplete
                                        id="autocomplete_units"
                                        autoComplete
                                        onChange={(event,value,reason)=>{
                                            switch(reason){
                                                case "selectOption":
                                                    // * Por cada objeto del arreglo de unidades que incluya el valor seleccionado
                                                    // * retornará TRUE 
                                                    let add = unidades.map((obj,key) => {
                                                        console.log(obj)
                                                        return obj.description === value.Name    
                                                    })
                                                    setState({
                                                        ...state,
                                                        unidad:value.Name,
                                                        //*Al ser map una función que retorna un arreglo, se comprueba si incluye true
                                                        //*en el caso de incluirlo, state.canAdd must be false
                                                        canAdd:!add.includes(true)
                                                    })
                                                    break;
                                                case "clear":
                                                    setState({
                                                        ...state,
                                                        canAdd:false
                                                    })
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }}
                                        fullWidth={true}
                                        options={units}
                                        renderInput={(params)=><TextField {...params} label="Embalaje" name="unidad"/>}
                                        getOptionLabel={(option) => `${option.Name}`}
                                        renderOption={(props, option, state)=>{
                                            return <h4 {...props}>{`${option.Name}`}</h4>
                                        }}
                                        inputValue=''
                                        onInputChange={handleChange}
                                        isOptionEqualToValue={(option, value)=> {
                                            return option.Name === value
                                        }}
                                    />
                                }
                            </>
                            :
                            <>
                                <Autocomplete
                                    id="autocomplete_products"
                                    autoComplete
                                    clearText='Limpiar'
                                    clearOnBlur={state.clear}
                                    onChange={(event,value, reason) => {
                                        switch(reason){
                                            case "blur":
                                                console.log(reason)
                                                break;
                                            case "selectOption":
                                                // * Por cada objeto del arreglo de products que incluya el valor seleccionado
                                                // * retornará TRUE 
                                                let add = products.map((obj,key) => {
                                                    return obj.description === value.Name    
                                                })
                                                setState({
                                                    ...state,
                                                    description:value.Name,
                                                    //*Al ser map una función que retorna un arreglo, se comprueba si incluye true
                                                    //*en el caso de incluirlo, state.canAdd must be false
                                                    canAdd:!add.includes(true)
                                                })
                                                break;
                                            case "clear":
                                                setState({
                                                    ...state,
                                                    canAdd:false
                                                })
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                    fullWidth={true}
                                    options={data}
                                    renderInput={(params) => <TextField {...params} label="Descripción de la mercancía" name="description"/>}
                                    getOptionLabel={(option) => `${option.Name}`}
                                    renderOption={(props, option, state) => {
                                        return <h4 {...props}>{`${option.Name}`}</h4>
                                    }}
                                    onInputChange={handleChange}
                                    isOptionEqualToValue={(option, value) => {
                                        return option.Name.split(" " || "").includes(value) 
                                    }}
                                />
                            </>
                        }
                        {
                            state.showProductsAndUnits
                            ?
                            <>
                            <Box display={state.completed ? 'none' : 'flex'}>
                                <Button onClick={handleYes} sx={{color:"white",margin:"1vh",background:"green"}}>Sí</Button>
                                <Button onClick={handleNo}  sx={{color:"white",margin:"1vh",background:"red"}}>No</Button>
                            </Box>
                            </>
                            :
                            <>
                                <Button 
                                    variant="filled"
                                    disabled={!state.canAdd} 
                                    sx={
                                        {
                                            background:"red", 
                                            color:"white",
                                            margin:"1vh"
                                        }
                                    } 
                                    onClick={handleAdd}
                                    >
                                        Añadir item
                                </Button>
                                <Button 
                                    variant="filled"
                                    onClick={handleComplete}
                                    about="Agregar item a tu lista de productos"
                                    disabled={state.descriptionCompleted ? !unidades.length>0 : !products.length>0} 
                                    sx={
                                        {
                                            backgroundColor:"green", 
                                            color:"white",
                                            margin:"1vh"
                                        }
                                    }>
                                        Cargar {state.descriptionCompleted ?  'embalajes' : 'productos'}
                                </Button>
                            </>
                        }

           </Box>
            </>
            :
            //*Si el usuario selecciona subir con un archivo
            <>
                {
                    state.file ? <Input type="file"></Input> : undefined
                }
            </>

        }
        {
            state.methodSelected 
            ? 
            undefined
            :
            <>
                <Box sx={{display:"flex", flexDirection:"column"}}>
                    <Button 
                    onClick={handleUploadMethod} 
                    sx={{background:"red", color:"white", margin:"1vh"}} 
                    name="file"
                    >
                        Subir archivo
                    </Button>
                    <Button 
                    onClick={handleUploadMethod} 
                    sx={{background:"red", color:"white", margin:"1vh"}} 
                    name="manual">
                        Subir manualmente
                    </Button>
                </Box>
            </>
        }
        </>
    )
}
