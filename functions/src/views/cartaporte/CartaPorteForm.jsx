import React from 'react'
import { Input, FormControl, FormHelperText, InputLabel } from '@mui/material';
import { Box } from '@mui/system';

const CartaPorteForm = () => {
    return (
        <div>
            <Box sx={{width:"100%"}} component="form">
                <FormControl>
                    <InputLabel htmlFor="name-input">
                        Label
                    </InputLabel>
                    <Input id="name-input"/>
                    <FormHelperText>
                        Texto importante
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="name-input">
                        Label
                    </InputLabel>
                    <Input id="name-input"/>
                    <FormHelperText>
                        Texto importante
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="name-input">
                        Label
                    </InputLabel>
                    <Input id="name-input"/>
                    <FormHelperText>
                        Texto importante
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="name-input">
                        Label
                    </InputLabel>
                    <Input id="name-input"/>
                    <FormHelperText>
                        Texto importante
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="name-input">
                        Label
                    </InputLabel>
                    <Input id="name-input"/>
                    <FormHelperText>
                        Texto importante
                    </FormHelperText>
                </FormControl>
            </Box>
            
        </div>
    )
}

export default CartaPorteForm