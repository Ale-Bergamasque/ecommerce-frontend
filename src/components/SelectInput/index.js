import { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function SelectInput({ categories, placeholder, id, onChange, name, value }) {
    const [categoryData, setCategoryData] = useState({
        id: '',
        name: ''
    });

    const theme = createTheme({
        palette: {
            primary: {
                main: '#191919',
            },
        }
    });

    function getCategory(id) {
        const category = categories.find(c => Number(c.id) === Number(id));
        return category;
    }

    const handleChange = (e) => {
        const category = e.target.value
        setCategoryData(category);
    };

    useEffect(() => {
        if (!value) return;
        const category = getCategory(value);
        setCategoryData(category);
    }, [value]);

    return (
        <ThemeProvider theme={theme}>
            <FormControl sx={{ width: 300, marginTop: '4px' }}>
                <Select
                    displayEmpty
                    id={id}
                    value={categoryData}
                    name={name}
                    onChange={(e) => {
                        handleChange(e)
                        onChange('category_id', e.target.value.id)
                    }}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (!selected.id) {
                            return <em>{placeholder}</em>;
                        }

                        return selected.category;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em>{placeholder}</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem
                            key={category.id}
                            value={category}
                        >
                            {category.category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}