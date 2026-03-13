import { Box, Typography, Container, Button } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import { getAllDocuments } from '../api/queries/getters';
import { Home_card } from '../components/home_card';
import { Loader } from '../shared/Loader/Loader';
import { useOpenClose } from '../hooks/useOpenClose';
import { AddDocument } from '../components/addDocument';

export default function Home() {

    const { open, handleOpen, handleClose } = useOpenClose();

    const { data: documents = [], isLoading, isError, error } = useQuery({
        queryKey: ['documents'],
        queryFn: async () => await getAllDocuments()
    });

    const allDocuments = documents?.data?.data || [];

    const userData = JSON.parse(localStorage.getItem('userData'));

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                <Typography variant='h3' component='h1' fontWeight='800' sx={{ mb: 4 }}> Edara: {userData?.place?.name}  </Typography>
                <Box className='flex justify-between'>
                    <Typography variant="h3" fontWeight="800" sx={{ mb: 4 }}>
                        Dokumentlerimiz
                    </Typography>
                    <Button sx={{ height: '50px' }} variant='contained' onClick={handleOpen}>  Dokument goşmak </Button>
                </Box>

                {isLoading ? (<Loader />) :
                    isError ? (<Box> Maglumat almakda ýalňyşlyk </Box>) : (
                        <Box className='flex flex-wrap -m-1'>
                            {allDocuments?.map((item) => (
                                <Home_card key={item.guid} item={item} />
                            ))}
                        </Box>
                    )}
            </Container>
            <AddDocument open={open} onClose={handleClose} />
        </Box>
    );
}