import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

export default function InputPassword({ id, name, value, onChange }) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#191919',
            },
        }
    });

    const [values, setValues] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

                <OutlinedInput
                    sx={{ width: '100%' }}
                    id={id}
                    type={values.showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={onChange}
                    color='primary'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />

            </Box>
        </ThemeProvider >
    );
}