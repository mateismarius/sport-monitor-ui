import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Autocomplete,
  TextField as MUITextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import validateForm from "../../helpers/validation/validator";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import roLocale from "date-fns/locale/ro";
import AdapterDateFns from "@date-io/date-fns";
import { Player } from "../../app/models/player";
import { Test } from "../../app/models/test";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";

interface AddData {
  playerList: Player[];
  testList: Test[];
}

export default function AddEvaluationPage() {
  const [loading, setLoading] = useState(true);
  const [addData, setAddData] = useState<AddData>({
    testList: [],
    playerList: [],
  });
  const [playerValue, setPlayerValue] = useState<Player | null>();
  const [inputPlayerValue, setInputPlayerValue] = useState<string>("");
  const [testValue, setTestValue] = useState<Test | null>();
  const [inputTestValue, setInputTestValue] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
      const fetchData = async () => {
          const players = await agent.Players.list().then((response) => response);
          const tests = await agent.Tests.list().then((response) => response);
          setAddData({ playerList: players, testList: tests });
      };
      try {
          fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <LoadingComponent />;

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
            Adauga rezultat evaluare
          </Typography>
          <Formik
            initialValues={{
              test: "",
              player: "",
              result: 0,
              id: 0,
              takenAt: new Date(),
              createdAt: new Date(),
              lastModified: new Date(),
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                setSubmitting(false);
                const evaluation = {
                  id: values.id,
                  test: inputTestValue,
                  player: inputPlayerValue,
                  takenAt: selectedDate,
                  result: values.result,
                  createdAt: values.createdAt,
                  lastModified: values.lastModified,
                };

                agent.Evaluations.addItem(evaluation)
                    .then((response) => {
                      let res = response.data;
                  if (res.statusCode === 200)
                    toast.success(res.message, { position: "top-center", autoClose: 2000 });
                })
              }, 500);
              resetForm();
            }}
          >
            {({ values, submitForm, isSubmitting, touched, errors }) => (
              <Form>
                <Stack width="100%">
                  <Box margin={1} sx={{ width: "100%" }}>
                    <Autocomplete
                      options={addData.playerList}
                      value={playerValue}
                      getOptionLabel={(option) => option.playerName}
                      onChange={(event: any, newValue: Player | null) => {
                        setPlayerValue(newValue);
                      }}
                      inputValue={inputPlayerValue}
                      onInputChange={(event, newInputValue) => {
                        setInputPlayerValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <MUITextField {...params} label="Numele jucatorului" />
                      )}
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Box margin={1} sx={{ width: "100%" }}>
                    <Autocomplete
                      options={addData.testList}
                      getOptionLabel={(option) => option.name}
                      value={testValue}
                      onChange={(event: any, newValue: Test | null) => {
                        setTestValue(newValue);
                      }}
                      inputValue={inputTestValue}
                      onInputChange={(event, newInputValue) => {
                        setInputTestValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <MUITextField {...params} label="Test" />
                      )}
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Box margin={1} sx={{ width: "100%" }}>
                    <Field
                      validate={validateForm.requiredField}
                      component={TextField}
                      label="Rezultat"
                      name="result"
                      type="number"
                      style={{ width: "100%" }}
                    />
                  </Box>
                  <Box margin={1} sx={{ width: "100%" }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={roLocale}
                      
                    >
                      <DatePicker
                        label="Data evaluarii"
                        renderInput={(params) => <MUITextField {...params} sx={{ width: "100%" }}/>}
                        value={selectedDate}
                        onChange={(newValue) => {
                          setSelectedDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box margin={1} sx={{ width: "100%", marginTop: "5%" }}>
                    <Button
                      sx={{ margin: 1, float:"right" }}
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
      </Box>
    </Container>
  );
}
