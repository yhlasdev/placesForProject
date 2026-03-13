import { Box, Button, TextField } from '@mui/material'
import { CustomDialog } from './customDialog'
import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { documentSend } from '../api/queries/post';

export const AddDocument = ({ open, onClose }) => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newDoc) => await documentSend(newDoc),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            onClose();
        },
        onError: (error) => {
            console.error("Resminama goşulanda säwlik boldy:", error);
        }
    });

    const [formData, setFormData] = useState({
        documentOwner_name: '',
        documentOwner_surname: '',
        documentOwner_patronymic: '',
        content: '',
        place_id: JSON.parse(localStorage.getItem('userData'))?.place_id,
        documentOwner_address: '',
        dueDate: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newValue) => {
        setFormData({ ...formData, dueDate: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            dueDate: formData.dueDate ? formData.dueDate.toISOString() : null
        };

        mutation.mutate(payload);
        onClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CustomDialog open={open} onClose={onClose} title="Täze resminama goş">
                <form onSubmit={handleSubmit}>
                    <Box className='flex flex-col gap-4 mt-2'>

                        <TextField
                            label="Ady"
                            name="documentOwner_name"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            onChange={handleChange}
                        />
                        <TextField
                            label="Familiýasy"
                            name="documentOwner_surname"
                            variant="outlined"
                            fullWidth
                            required
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            label="Atasynyň ady (hökman däl)"
                            name="documentOwner_patronymic"
                            variant="outlined"
                            fullWidth
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            label="Salgysy"
                            name="documentOwner_address"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={2}
                            size="small"
                            onChange={handleChange}
                        />

                        <TextField
                            label="Resminamanyň mazmuny"
                            name="content"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            size="small"
                            onChange={handleChange}
                        />

                        <DatePicker
                            label="Gutarýan möhleti"
                            value={formData.dueDate}
                            onChange={handleDateChange}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    fullWidth: true,
                                    required: true
                                }
                            }}
                        />

                        <Box className='flex gap-2 items-center justify-end mt-4'>
                            <Button
                                disabled={mutation.isPending}
                                onClick={onClose}
                                sx={{
                                    backgroundColor: 'red',
                                    color: 'white'
                                }} variant="contained">
                                Ýatyr
                            </Button>
                            <Button
                                disabled={mutation.isPending}
                                type='submit'
                                variant="contained"
                                color="primary">
                                Ýatda sakla
                            </Button>
                        </Box>
                    </Box>
                </form>
            </CustomDialog>
        </LocalizationProvider>
    )
}