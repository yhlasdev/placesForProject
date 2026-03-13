import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Divider, Button } from '@mui/material';
import { HomeHeader } from '../components/homeComponents/homeHeader';
import { HomeDocuments } from '../components/homeComponents/homeDocuments';

import { useOpenClose } from '../hooks/useOpenClose'
import { UploadDocument } from '../components/uploadDocument';

export default function DocumentPage() {

    const { open, handleOpen, handleClose } = useOpenClose();

    const { guid } = useParams();

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.50', overflow: 'hidden' }}>
                <Box
                    sx={{
                        width: '250px',
                        flexShrink: 0,
                        bgcolor: 'background.paper',
                        borderRight: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography className=' text-center' variant="h4" fontWeight="bold" color="text.primary">
                            Arzalar
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    height: '100vh',
                    overflowY: 'auto'
                }}>
                    <Box sx={{ p: 4 }}>
                        <HomeHeader guid={guid} />
                    </Box>
                    <Divider />
                    <Box sx={{ p: 4 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                            <Button onClick={handleOpen} sx={{ textTransform: 'none', mb: 3 }} variant='contained'> Dokument ýüklemek </Button>
                        </Box>
                        <HomeDocuments guid={guid} />
                    </Box>
                </Box>
            </Box>
            <UploadDocument document_guid={guid} open={open} onClose={handleClose} />
        </>
    );
}