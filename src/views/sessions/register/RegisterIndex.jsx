import React from 'react'
import { Switch, Typography} from '@mui/material'
import {Box} from '@mui/system'
import Context from '../../../Context'
import RegisterTest from './RegisterTest'
import RegisterForm from './RegisterForm'

const RegisterIndex = () => {
    return (
        <Context.Consumer>
            {({test, activeTest, deactivateTest}) => {
                return (
                    <>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                        <Switch onChange={test ? deactivateTest : activeTest}/><Typography>Test</Typography>
                    </Box>
                    {
                        test 
                        ?
                        <RegisterTest/>
                        :
                        <RegisterForm/>
                    }
                    </>
                )
            }}
        </Context.Consumer>
    )
}

export default RegisterIndex