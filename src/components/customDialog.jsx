import { CloseOutlined } from "@mui/icons-material"
import { Box, Dialog, IconButton, Typography } from "@mui/material"


export const CustomDialog = ({ open, onClose, title, children }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '400px',
                    maxWidth: 'none'
                }
            }}
        >
            <Box className='p-5 relative'>
                <IconButton className=" absolute right-1 top-1" onClick={onClose} >
                    <CloseOutlined />
                </IconButton>
                <Box className='flex items-center justify-center mb-4 w-full'>
                    <Typography variant="h6"> {title} </Typography>
                </Box>
                {children}
            </Box>
        </Dialog>
    )
}