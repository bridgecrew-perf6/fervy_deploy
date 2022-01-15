import { Typography, Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import {operators_col,operators_data} from './servicio_nuevo/dummyData'
import React, {  useState } from 'react'
import history from '../../../history'

const steps = ['Introduce los datos del cliente', 'Añade los productos', 'Verifica la información'];

let columns = [
    operators_col[0],
    operators_col[1],
    operators_col[2],
    operators_col[3],
    operators_col[4],
    operators_col[5],
    operators_col[6],
]
let rows = [
    operators_data[0],
    operators_data[1],
    operators_data[2],
    operators_data[3],
    operators_data[4],
    operators_data[5],
    operators_data[6],
    operators_data[7],
    operators_data[8],
    operators_data[9],
]

const AdminClient = () => {
    const [state, setState] = useState({
        step:0,
        content:"list"
        
    })

    const handleClick = (e) => {
        switch(e.target.id){
            case "accept":
                break;
            case "charge":
                setState({
                    ...state,
                    content:"inputs"
                })
                break;
            case "back":
                history.push('/admin/service')
                window.location.reload()
                break;
            default:
                break;
        }
    }

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
              return "<Step1/>"
          case 1:
              return "<Step2/>"
          case 2: 
              return "<Step3/>"
          default:
              return
        }
    }

    function HorizontalLinearStepper() {

        return (
          <Box sx={{ width: '70%' }}>
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
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
                <Box>
                    <Box sx={{display:"flex",alignItems:"center", justifyContent:"center"}}>
                      {getStepContent(activeStep)}
                    </Box>
      
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1, background:"red", color:"white" }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      {isStepOptional(activeStep) && (
                      <Button sx={{background:"red", color:"white"}} onClick={handleSkip}>
                          Saltar
                      </Button>
                      )}
      
                      <Button id="next_button" onClick={handleNext} sx={{background:"green", color:"white"}}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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

    return (
        <div>
            <Box sx={{width:"100vw", height:"100vh"}}>
                <Box sx={{textAlign:"center"}}>
                    <Typography variant="h2">Selecciona alguno de tus clientes o carga uno nuevo</Typography>

                    <Typography variant="h4" sx={{display:state.content === "list" ? '' : 'none'}}>Lista de clientes</Typography>
                    <Box sx={
                        {
                            width:"100vw", 
                            height:"50vh", 
                            display:"flex", 
                            alignItems:"center", 
                            justifyContent:"center",
                            margin:"1vh"
                        }}
                    >
                        <Box sx={{width:"50%",height:"100%"}}>
                            {
                                state.content === "list" ? 
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onStateChange={
                                        (params, event, details) => {
                                            return
                                        }
                                    }
                                    isRowSelectable={(params) => {
                                        return true
                                    }}
                                />
                                :
                                <>
                                    <Typography variant="h4">Carga un nuevo usuario</Typography>

                                    <Box sx={{margin:"1vh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <HorizontalLinearStepper></HorizontalLinearStepper>
                                    </Box>
                                </>
                            }

                            <Box sx={{display:"flex", width:"100%"}}>
                                <Button
                                id="accept" 
                                onClick={handleClick}
                                sx={
                                    {
                                        background:"green", 
                                        color:"white"
                                    }}
                                    >
                                        Aceptar
                                    </Button>
                                <Button 
                                id="charge"
                                onClick={handleClick}
                                sx={
                                    {
                                        background:"blue", 
                                        color:"white"
                                    }}
                                    >
                                        Crear
                                    </Button>
                                <Button 
                                id="back"
                                onClick={handleClick}
                                sx={
                                    {
                                        background:"red", 
                                        color:"white"
                                    }}
                                    >
                                        Volver
                                    </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AdminClient