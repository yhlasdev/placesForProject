import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import {
    AccessTime as AccessTimeIcon,
    LocationOn as LocationIcon,
    ArrowForwardIos as ArrowIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const Home_card = ({ item }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('tk-TM');
    };

    return (
        <Box sx={{ p: 1 }} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <Card
                onClick={() => navigate(`/documents/${item.guid}`)}
                sx={{
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 20px -5px rgb(0 0 0 / 0.1)',
                        borderColor: '#3b82f6'
                    }
                }}
            >
                <CardContent className="flex flex-col h-full gap-3">

                    <Box className="flex items-center gap-1 text-blue-600">
                        <LocationIcon sx={{ fontSize: 18 }} />
                        <Typography variant="caption" fontWeight="700" className="uppercase tracking-wider">
                            {item?.place?.name || "Bellenmedik ýer"}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className="line-clamp-3 min-h-12"
                        sx={{ fontWeight: 500, lineHeight: 1.6 }}
                    >
                        {item?.content || "Dokument barada maglumat ýok."}
                    </Typography>

                    <div className="mt-auto pt-4">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box className="flex flex-col">
                                <Typography variant="caption" color="text.disabled">Möhleti:</Typography>
                                <Box className="flex items-center gap-1 text-red-500">
                                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                                    <Typography variant="caption" fontWeight="600">
                                        {formatDate(item?.dueDate)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box className="bg-gray-50 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                                <ArrowIcon sx={{ fontSize: 12 }} className="text-gray-400 group-hover:text-blue-500" />
                            </Box>
                        </Stack>
                    </div>

                </CardContent>
            </Card>
        </Box>
    );
};