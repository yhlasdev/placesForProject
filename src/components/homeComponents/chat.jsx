import { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, TextField, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { getMessages } from "../../api/queries/getters";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Loader } from "../../shared/Loader/Loader";
import { messageSend } from "../../api/queries/post";

export const Chat = ({ onClose, guid }) => {
    const MY_PLACE_ID = JSON.parse(localStorage.getItem('userData'))?.place_id;
    const queryClient = useQueryClient();

    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [newMessage, setNewMessage] = useState("");

    const { data: messages = [], isLoading, isError } = useQuery({
        queryKey: ['messages', guid],
        queryFn: async () => await getMessages(guid),
        refetchInterval: 3000,
    });

    const mutation = useMutation({
        mutationFn: async (text) => {
            return await messageSend({
                document_guid: guid,
                content: text
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['messages', guid]);
            setNewMessage("");
        }
    });

    const allMessages = messages?.data?.data || [];

    useEffect(() => {
        if (allMessages.length > 0) {
            const container = scrollContainerRef.current;
            if (!container) return;

            if (isInitialLoad) {
                container.scrollTop = container.scrollHeight;
                setIsInitialLoad(false);
            } else {
                const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
                if (isNearBottom) {
                    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    }, [allMessages, isInitialLoad]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || mutation.isPending) return;
        mutation.mutate(newMessage.trim());
    };

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column',
            height: '100vh', maxHeight: '100vh', bgcolor: '#f5f7fb'
        }}>
            <Box sx={{
                p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: 1, borderColor: 'divider', bgcolor: 'white'
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}> Hatlar </Typography>
                    <Typography variant="caption" color="text.secondary">Arza: {guid?.slice(0, 8)}</Typography>
                </Box>
                <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
            </Box>

            <Box
                ref={scrollContainerRef}
                sx={{
                    flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex',
                    flexDirection: 'column', gap: 1.5, scrollBehavior: 'smooth'
                }}
            >
                {isLoading && allMessages.length === 0 ? <Loader /> : null}
                {isError && <Typography color="error" align="center">Maglumat alynmady.</Typography>}

                {allMessages.map((msg) => {
                    const isMine = Number(msg.user?.place_id) === Number(MY_PLACE_ID);

                    return (
                        <Box
                            key={msg.guid}
                            sx={{
                                display: 'flex',
                                justifyContent: !isMine ? 'flex-end' : 'flex-start',
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: '80%',
                                    p: 1.5,
                                    borderRadius: 2,
                                    bgcolor: isMine ? 'primary.main' : 'white',
                                    color: isMine ? 'white' : 'text.primary',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                    border: isMine ? 'none' : '1px solid #e0e0e0',
                                    borderBottomRightRadius: isMine ? 0 : 2,
                                    borderBottomLeftRadius: isMine ? 2 : 0,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: isMine ? 'white' : '#1976d2',
                                        display: 'block',
                                        mb: 0.3,
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    {msg.user?.phone || "Nomer ýok"}
                                </Typography>

                                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                    {msg.content}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        textAlign: 'right',
                                        mt: 0.5,
                                        fontSize: '0.65rem',
                                        opacity: 0.7
                                    }}
                                >
                                    {dayjs(msg.createdAt).format('HH:mm')}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
                <div ref={messagesEndRef} />
            </Box>

            <Divider />

            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        fullWidth multiline maxRows={4}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Hatyňyz..."
                        variant="outlined" size="small"
                        disabled={mutation.isPending}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <IconButton
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || mutation.isPending}
                        sx={{
                            bgcolor: (newMessage.trim() && !mutation.isPending) ? 'primary.main' : 'grey.300',
                            color: 'white', '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >
                        <SendIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};