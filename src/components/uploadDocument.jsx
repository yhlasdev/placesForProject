import { Box, Button, TextField, Typography } from '@mui/material';
import { CustomDialog } from "./customDialog";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadDocumentSend } from '../api/queries/post';

export const UploadDocument = ({ document_guid, open, onClose }) => {
    const queryClient = useQueryClient();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

    const mutation = useMutation({
        mutationFn: async (formData) => await uploadDocumentSend(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subdocuments', document_guid] });
            onClose();
            setFile(null);
            setDescription('');
        },
        onError: (err) => {
            console.error("file upload error:", err);
        }
    });

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('document_guid', document_guid);
        formData.append('description', description);
        if (file) {
            formData.append('subDocumentFile', file);
        }

        mutation.mutate(formData);
    };

    return (
        <CustomDialog open={open} onClose={onClose} title={'Resminama ýüklemek'}>
            <form onSubmit={handleSubmit}>
                <Box className="flex flex-col gap-4 mt-2">

                    <TextField
                        label="Beýany"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        size="small"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Box className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer">
                        <input
                            accept="*/*"
                            style={{ display: 'none' }}
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Typography variant="body2" color="textSecondary">
                                {file ? `Saýlanan faýl: ${file.name}` : "Faýly saýlaň"}
                            </Typography>
                            <Button variant="outlined" sx={{ textTransform: 'none' }} component="span" size="small" className="mt-2">
                                Faýl saýla
                            </Button>
                        </label>
                    </Box>

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
                            disabled={mutation.isPending || !file}
                            type='submit'
                            variant="contained"
                            color="primary">
                            Ýatda sakla
                        </Button>
                    </Box>
                </Box>
            </form>
        </CustomDialog>
    );
};