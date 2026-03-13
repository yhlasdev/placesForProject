import { useState } from "react";
import { Box, IconButton, Typography, Drawer } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getDocument } from "../../api/queries/getters";
import dayjs from "dayjs";
import { Loader } from "../../shared/Loader/Loader";
import ChatIcon from '@mui/icons-material/Chat';
import { Chat } from "./chat";

export const HomeHeader = ({ guid }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const { data: document, isLoading, isError } = useQuery({
        queryKey: ['documents', guid],
        queryFn: async () => await getDocument(guid),
    });

    const receivedDocument = document?.data?.data;

    if (isError) return <Box sx={{ p: 2, color: 'error.main' }}> Maglumat almakda ýalňyşlyk </Box>;
    if (isLoading) return <Loader />;

    return (
        <Box className='flex' sx={{ width: '100%', gap: 2 }}>
            <Box className='flex-1 flex flex-col justify-between'>

                <Box>
                    <Typography variant="h5" color="text.secondary"> Arzaçynyň F.A.A </Typography>
                    <Typography variant="body1">
                        {receivedDocument?.documentOwner_name} {receivedDocument?.documentOwner_surname} {receivedDocument?.documentOwner_patronymic}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" color="text.secondary"> Möhleti: </Typography>
                    <Typography variant="body2" color={dayjs().isAfter(dayjs(receivedDocument?.dueDate)) ? 'error.main' : 'inherit'}>
                        {receivedDocument?.dueDate ? dayjs(receivedDocument.dueDate).format('DD.MM.YYYY') : '-'}
                    </Typography>
                </Box>
            </Box>

            <Box className='flex-1 flex flex-col justify-between gap-2'>
                <Box>
                    <Typography variant="h5" color="text.secondary"> Arzanyň mazmuny: </Typography>
                    <Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {receivedDocument?.content}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" color="text.secondary"> Arzaçynyň salgysy: </Typography>
                    <Typography variant="body2"> {receivedDocument?.documentOwner_address} </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                <IconButton
                    color="primary"
                    onClick={() => setIsChatOpen(true)}
                >
                    <ChatIcon />
                </IconButton>
            </Box>
            <Drawer
                anchor="right"
                open={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: '400px' },
                        boxShadow: -5
                    }
                }}
            >
                <Chat onClose={() => setIsChatOpen(false)} guid={guid} />
            </Drawer>
        </Box>
    );
};