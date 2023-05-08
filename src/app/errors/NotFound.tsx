import { Button, Container, Divider, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { customHistory } from "../../components/CustomBrowserRouter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function NotFound() {
  const history = customHistory;
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Nu a fost gasita nici o inregistrare
      </Typography>
      <Divider />
      <Button
        onClick={() => history.push("/")}
        variant="contained"
        startIcon={<ArrowBackIcon />}
      >
        Catre prima pagina
      </Button>
    </Container>
  );
}
