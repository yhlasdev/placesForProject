import { Box, Card, Typography } from "@mui/material"
import { MEDIA_URL } from "../api/axiosInstance"
import { useRef } from "react"
import DescriptionIcon from '@mui/icons-material/Description'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

export const SubDocumentCard = ({ item }) => {
    const fullUrl = `${MEDIA_URL}${item.file_path}`;
    const videoRef = useRef(null);

    const handleDownload = async () => {
        const fileType = item.file_type?.toLowerCase();
        const fileName = item.file_path.split('/').pop();

        if (['mp4', 'mov', 'video', 'avi'].includes(fileType)) {
            try {
                const response = await fetch(fullUrl);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            } catch (error) {
                console.error("Video download error:", error);
                window.open(fullUrl, '_blank');
            }
        } else {
            const link = document.createElement('a');
            link.href = fullUrl;
            link.setAttribute('download', fileName);
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const renderContent = () => {
        const fileType = item.file_type?.toLowerCase();
        switch (fileType) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'webp':
                return <img src={fullUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
            case 'mp3':
            case 'wav':
            case 'audio':
                return (
                    <Box className="flex flex-col items-center justify-center h-full bg-amber-50 p-2">
                        <MusicNoteIcon sx={{ fontSize: 50, color: '#ff8f00' }} />
                        <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 'bold', color: '#ff8f00' }}>SES</Typography>
                        <audio src={fullUrl} controls style={{ width: '100%', height: '30px', marginTop: '4px' }} />
                    </Box>
                );
            case 'mp4':
            case 'mov':
            case 'video':
                return (
                    <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: 'black' }}>
                        <video
                            ref={videoRef}
                            src={fullUrl}
                            muted
                            loop
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <PlayCircleOutlineIcon
                            className="play-icon"
                            sx={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)', color: 'white', fontSize: 40,
                                opacity: 0.6, pointerEvents: 'none', transition: 'opacity 0.2s'
                            }}
                        />
                    </Box>
                );
            case 'doc':
            case 'docx':
                return (
                    <Box className="flex flex-col items-center justify-center h-full bg-blue-50">
                        <DescriptionIcon sx={{ fontSize: 50, color: '#2b579a' }} />
                        <Typography variant="caption" sx={{ mt: 1, fontWeight: 'bold', color: '#2b579a' }}>WORD</Typography>
                    </Box>
                );
            default:
                return (
                    <Box className="flex flex-col items-center justify-center h-full bg-gray-100">
                        <InsertDriveFileIcon sx={{ fontSize: 40, color: 'gray' }} />
                        <Typography variant="caption" sx={{ mt: 1 }}>{fileType?.toUpperCase() || 'Document'}</Typography>
                    </Box>
                );
        }
    };

    return (
        <Box className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-1">
            <Card
                variant="outlined"
                onClick={handleDownload}
                onMouseEnter={() => videoRef.current?.play().catch(() => { })}
                onMouseLeave={() => {
                    if (videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                }}
                sx={{
                    height: '100%', cursor: 'pointer', transition: 'all 0.2s',
                    '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                        '& .play-icon': { opacity: 0 }
                    }
                }}
            >
                <Box sx={{ aspectRatio: '1 / 1', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
                    {renderContent()}
                </Box>
                <Box className='p-2' sx={{ minHeight: '52px', display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="body2"
                        sx={{
                            overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                            fontSize: '0.75rem', lineHeight: '1.2rem'
                        }}
                    >
                        {item?.description || 'Description not found'}
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}