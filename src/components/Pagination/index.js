import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export default function BasicPagination({ handleClickPagination, productsList, paginationLimit }) {

    const theme = createTheme({
        palette: {
            primary: {
                main: 'rgba(183, 0, 92, 0.80)',
            },
        }
    });

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [productsList])

    function handleChange(event, value) {
        setPage(value);
        handleClickPagination(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={2}>
                <Pagination
                    count={Math.ceil(productsList.length / paginationLimit)}
                    page={page}
                    color="primary"
                    showFirstButton
                    showLastButton
                    onChange={handleChange}
                />
            </Stack>
        </ThemeProvider >
    );
}