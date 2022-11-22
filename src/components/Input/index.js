import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export default function Input({ id,
    type,
    name,
    value,
    onChange,
    placeholder,
    textArea,
    maxRows,
    rows,
    characterLimit,
    characterCount,
}) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#191919',
            },
        }
    });

    function handleError(characterLimit, characterCount) {
        return Number(characterCount) > Number(characterLimit);
    }

    const inputModifierMultiline = { multiline: true, rows: Number(rows) || 3, maxRows: Number(maxRows) || 5 }
    const inputModifierPadding = { '& .MuiInputBase-input': { paddingRight: '88px' } }

    return (
        <ThemeProvider theme={theme}>
            <Box
                noValidate
                autoComplete="off"
                {...(name === 'product_name' && { sx: { ...inputModifierPadding } })}
            >
                <TextField
                    error={handleError(characterLimit, characterCount)}
                    {...(textArea && { ...inputModifierMultiline })}
                    sx={{ width: '100%', marginTop: '4px' }}
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    color='primary'
                    placeholder={placeholder && placeholder}
                />
            </Box>
        </ThemeProvider>
    );
}