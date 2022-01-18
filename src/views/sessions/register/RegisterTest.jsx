import React from 'react'
import {Box} from '@mui/system'
import { 
    Button, 
    Stepper, 
    Step, 
    StepLabel, 
    Typography, 
} from '@mui/material'
import {Step1} from './components/Step1'
import {Step2} from './components/Step2'
import {Step3} from './components/Step3'
import history from '../../../history'

const steps = ['Introduce tus datos fiscales', 'Añade tus productos', 'Crea una contraseña'];

const RegisterTest = () => {
    const handleTest =async ()=>{
      let resp = await api.post('/api/auth/signup')
      if(resp.status !== 201){
        console.log("No se ha creado el usuario")
        return
      }
      history.push("/admin")
      window.location.reload()
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
              return <Step1/>
          case 1:
              return <Step2/>
          case 2: 
              return <Step3/>
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

    console.log(activeStep === steps.length -1)
    
    return (
        <div>
            <Box component="form" sx={
                {
                    display:"flex", 
                    alignItems:"center", 
                    width:"100vw", 
                    height:"100vh", 
                    justifyContent:"center",
                    flexDirection:"column"
                }
                } noValidate onSubmit={handleTest}>

                    <HorizontalLinearStepper></HorizontalLinearStepper>
                    <Button 
                    type="submit" 
                    disabled={activeStep === steps.length -1} 
                    variant="contained" 
                    sx={
                      {
                        background:"red",
                        color:"white"
                      }}
                      >
                        Registrarse
                      </Button>
            </Box>
        </div>
    )
}

export default RegisterTest
