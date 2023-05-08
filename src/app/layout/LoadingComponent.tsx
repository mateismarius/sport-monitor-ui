import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function LoadingComponent({message = 'Se verifica baza de date'}: Props) {
  return <Backdrop open={true} invisible={true}>
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress size={60} color='primary' />
        <Typography variant="h6" sx={{justifyContent: 'center', position: 'fixed', top: '40%'}} >{message}</Typography>
    </Box>
  </Backdrop>;
}
