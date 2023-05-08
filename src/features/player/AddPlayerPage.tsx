import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField as MUITextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import validateForm from "../../helpers/validation/validator";
import { TextField } from "formik-mui";
import { ChangeEvent, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import roLocale from "date-fns/locale/ro";
import AdapterDateFns from "@date-io/date-fns";
import { toast } from "react-toastify";
import { PlayerDto } from "../../app/models/playerDto";
import {useNavigate} from "react-router-dom";

export default function AddPlayerPage() {
  const [selectedDOB, setSelectedDOB] = useState<Date | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [checked, setChecked] = useState(true);
  const [genreValue, setGenreValue] = useState("feminin");
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Players.list()
      .then((response) => {
        const playerBnd: PlayerDto[] = response;
        let playerNames: string[] = playerBnd.map((element) =>
          element.playerName.trim().toLowerCase()
        );
        setPlayers(playerNames);
        let playerBadges: string[] = playerBnd.map((element) =>
          element.badgeNo.trim().toLocaleLowerCase()
        );
        setBadges(playerBadges);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleGenreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGenreValue((event.target as HTMLInputElement).value);
  };

  function validatePlayerName(str: string) {
    return validateForm.validateIfExistsRequiredAndNames(str, players);
  }
const navigateToPlayerList = () => {
    navigate("/player/list");
}
  function validatePlayerBadge(str: string) {
    let error;
    error = validateForm.validateIfExistsAndRequired(str, badges);
    if (error) return error;
    if (!validateForm.validateOnlyLettersNumbersAndSpaces(str))
      error =
        "Numarul de inscriere trebuie sa contina doar litere, cifre si spatii";
    return error;
  }

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5vh",
        marginRight: "22%",
        width: "100%",
      }}
    >
      <Box>
        <Stack alignItems="center">
          <Typography variant="h5" marginBottom={6}>
            Adaugare jucator nou
          </Typography>
          <Formik
            initialValues={{
              playerName: "",
              genre: genreValue,
              dateOfBirth: new Date(),
              startDate: new Date(),
              badgeNo: "",
              isActive: checked,
              createdAt: new Date(),
              lastModified: new Date(),
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                setSubmitting(false);

                const player = {
                  playerName: values.playerName,
                  genre: genreValue,
                  dateOfBirth: selectedDOB,
                  startDate: selectedStartDate,
                  badgeNo: values.badgeNo,
                  isActive: checked,
                  createdAt: values.createdAt,
                  lastModified: values.lastModified,
                  id: 0,
                };
                if (player.startDate !== null && player.dateOfBirth !== null) {
                  setLoading(true);
                  agent.Players.addItem(player).then((response) => {
                    if (response.statusCode === 200) setLoading(false);
                    toast.success(response.message, {
                      position: "top-center",
                      autoClose: 2000,
                    });
                    setTimeout(navigateToPlayerList, 2500);
                  });
                } else {
                  toast.error("Va rugam sa completati toate campurile", {
                    position: "top-center",
                    autoClose: 2000,
                  });
                }
              }, 500);
              resetForm();
            }}
          >
            {({
              values,
              submitForm,
              isSubmitting,
              touched,
              errors,
              isValid,
            }) => (
              <Form>
                <Stack>
                  <Box margin={1} sx={{ width: "100%" }}>
                    <Field
                      validate={validatePlayerName}
                      component={TextField}
                      label="Nume si prenume"
                      name="playerName"
                      type="text"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box margin={1} sx={{ width: "100%" }}>
                    <Field
                      validate={validatePlayerBadge}
                      component={TextField}
                      label="Legitimatie"
                      name="badgeNo"
                      type="text"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={roLocale}
                  >
                    <Box margin={1} sx={{ width: "100%" }}>
                      <DatePicker
                        label="Data nasterii"
                        maxDate={new Date()}
                        renderInput={(params) => (
                          <MUITextField
                            {...params}
                            error={selectedDOB === null}
                            helperText={
                              selectedDOB === null
                                ? "Va rugam sa selectati o data"
                                : ""
                            }
                            sx={{ width: "100%" }}
                          />
                        )}
                        value={selectedDOB}
                        onChange={(newValue) => {
                          setSelectedDOB(newValue);
                        }}
                      />
                    </Box>
                    <Box margin={1} sx={{ width: "100%" }}>
                      <DatePicker
                        label="Data inceperii"
                        maxDate={new Date()}
                        renderInput={(params) => (
                          <MUITextField
                            {...params}
                            sx={{ width: "100%" }}
                            error={selectedStartDate === null}
                            helperText={
                              selectedStartDate === null
                                ? "Va rugam sa selectati o data"
                                : ""
                            }
                          />
                        )}
                        value={selectedStartDate}
                        onChange={(newValue) => {
                          setSelectedStartDate(newValue);
                        }}
                      />
                    </Box>
                  </LocalizationProvider>

                  <Box margin={1} sx={{ width: "100%" }}>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={genreValue}
                      onChange={handleGenreChange}
                    >
                      <Stack direction="row">
                        <FormControlLabel
                          value="feminin"
                          control={<Radio />}
                          label="Feminin"
                        />
                        <FormControlLabel
                          value="masculin"
                          control={<Radio />}
                          label="Masculin"
                        />
                      </Stack>
                    </RadioGroup>
                  </Box>

                  <Box margin={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Este activ"
                    />
                  </Box>
                  <Box>
                    <Button
                      sx={{ margin: 1, float: "right", width: "50%" }}
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Salveaza
                    </Button>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
}
