import { Typography, Box, Button, Step, Stepper, StepLabel } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid'
import { Products, SelectOperator, SelectTransport, CartaPorte,Locations, InputsInvoice, datosPorte } from './AdminServiceSteps'
// import data from './dummyData'

import React, { useEffect } from 'react'
// import history from '../../../../history'

const steps = ['Operador', 'Transporte', 'Productos', 'Ubicaciones','Factura','Carta porte']

const AdminService = () => {
    // const [state, setState] = useState({
    //     rowSel:false,
    //     step:0,
    // })

    // const handleTest = ()=>{
    //     history.push("/admin")
    //     window.location.reload()
    //   }
  
      const [activeStep, setActiveStep] = React.useState(0);
      const [skipped, setSkipped] = React.useState(new Set());
      
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
        console.log(datosPorte)
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
    
      const getStepContent = (step) => {
          switch(step) {
            case 0:
                return <SelectOperator/>
            case 1:
                return <SelectTransport/>
            case 2: 
                return <Products/>
            case 3: 
                return <Locations/>
            case 4: 
                return <InputsInvoice/>
            case 5: 
                return <CartaPorte/>
            default:
                return
          }
      }
  
    function HorizontalLinearStepper() {

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
                Haz completado todos los pasos, presiona el botón "Registrarse"
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
            // <React.Fragment>
            
            //  
            
            // </React.Fragment>
        )}
        </Box>
    );
    }
    // const handleAccept = () => {
    //     if(datosPorte.operador.length > 0) {
    //         setState({
    //             ...state,
    //             step:state.step+1,
    //         })
    //     }
    // }

    // const handleClick = (e) => {
    //     switch(e.target.id){
    //         case "accept":
    //             //*Si selecciona un operador,  cargarlo al arreglo datosPorte  y cambiar el estado de la tabla para mostrar datos de los transportes
    //             handleAccept()
    //             console.log(datosPorte)
    //             //*Si ya ha seleccionado un operador, el usuario siempre seleccionará después el transporte
    //             //* Aquí se añaden los datos del transporte al objeto vacío transporte, 
    //             //* parte del arreglo de objetos datosPorte

    //             //* No se escribe en base de datos para el caso en el que el usuario se equivoque, no realizar
    //             //* tantas operaciones de escritura o delete de base de datos
    //             if(state.step === 1){
    //                 console.log("Mostrar subir productos?")
    //                 history.push('/admin/client')
    //                 window.location.reload()
    //             }
    //             break;
    //         case "cancel":
    //             history.push('/admin')
    //             window.location.reload()
    //             break;
    //         default:
    //             break;
    //     }
    // }

    useEffect(() => {
        console.log(datosPorte)
        return
    },[activeStep])
    return (
        <div>
            <Box sx={{width:"100%", height:"100vh"}}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h2">Crear un nuevo servicio</Typography>

                    <Typography variant="h4">¿Qué operador va a llevar a cabo el servicio?</Typography>
                    <Box sx={
                        {
                            width:"100vw", 
                            height:"100vh", 
                            display:"flex", 
                            alignItems:"center", 
                            justifyContent:"center",
                            margin:"1vh"
                        }}
                    >
                        <Box sx={{width:"95%",height:"100%"}}>
                            <HorizontalLinearStepper/>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AdminService