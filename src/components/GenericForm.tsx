import { Button, Stack, TextField, Typography } from "@mui/material";
import CustomDatePicker from "./CustomDatePicker";
import SendIcon from "@mui/icons-material/Send";

type Props = {};

function GenericForm({}: Props) {
  return (
    <form action="submit">
      <Stack
        alignItems="center"
        direction="column"
        sx={{ height: "100%", width: "70%" }}
        spacing={5}
      >
        <Stack>
          <Typography variant="h4">Formular adaugare produs</Typography>
        </Stack>

        <Stack
          sx={{ width: "80%" }}
          spacing={3}
          alignItems="center"
        >
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            
            <TextField
              required
              id="standard"
              label="Denumire"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
            <TextField
              required
              id="standard"
              label="Producator"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <TextField
              required
              id="standard"
              label="Descriere"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
            <TextField
              required
              id="standard"
              label="Categorie"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <TextField
              required
              id="standard"
              label="Numar inventar"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
            <TextField
              id="standard"
              label="Numar serie"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <TextField
              id="standard"
              label="Valoare inventar"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
            <TextField
              id="standard"
              label="Adresa IP"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <TextField
              required
              id="standard"
              label="Utilizator"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
            <TextField
              required
              id="standard"
              label="Locatie"
              defaultValue=""
              variant="standard"
              sx={{ width: "40%" }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={10}
            alignItems="center"
            justifyContent="start"
            sx={{ width: "100%"}}
          >
            <CustomDatePicker />
            <Stack alignItems="center" justifyContent="center" sx={{ height:"1000%"}} >
              <Button variant="contained" endIcon={<SendIcon />}>
                Confirma
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}

export default GenericForm;
