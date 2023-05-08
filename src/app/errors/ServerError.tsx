import { Button, Container, Divider, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';
import { customHistory } from '../../components/CustomBrowserRouter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ServerError() {
  const history = customHistory;
  const {state} = useLocation();
  return (
    <Container >
        {state?.error ? (
          <>
            <Typography variant='h5' gutterBottom>Server Error</Typography>
            <Divider />
            <Typography>{state.error.message}</Typography>
          </>
        ) : (
          <Typography variant='h5' gutterBottom>Server Error</Typography>
        )}
        <Button onClick={() => history.push('/')} variant="contained" startIcon={<ArrowBackIcon />}>Catre prima pagina</Button>
    </Container>
  )
}

