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
  import agent from "../../app/api/agent";
  import LoadingComponent from "../../app/layout/LoadingComponent";
  import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
  import roLocale from "date-fns/locale/ro";
  import AdapterDateFns from "@date-io/date-fns";
  import { Player } from "../../app/models/player";
import { Measurement } from "../../app/models/measurement";
import { toast } from "react-toastify";
  
  interface AddData {
    playerList: Player[];
    measurementList: Measurement[];
  }
  
  export default function AddCheckingPage() {
    const [loading, setLoading] = useState(true);
    const [addData, setAddData] = useState<AddData>({
      measurementList: [],
      playerList: [],
    });
  
    const [playerValue, setPlayerValue] = useState<Player | null>();
    const [inputPlayerValue, setInputPlayerValue] = useState<string>("");
    const [measurementValue, setTestValue] = useState<Measurement | null>();
    const [inputMeasurementValue, setInputMeasurementValue] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const players = await agent.Players.list().then((response) => response);
        const measurements = await agent.Measurements.list().then((response) => response);
        setAddData({ playerList: players, measurementList: measurements });
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
              Adaugare rezultate masuratori
            </Typography>
            <Formik
              initialValues={{
                measurement: "",
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
                    measurement: inputMeasurementValue,
                    player: inputPlayerValue,
                    takenAt: selectedDate,
                    result: values.result,
                    createdAt: values.createdAt,
                    lastModified: values.lastModified,
                  };
  
                  agent.MeasurementTakens.addItem(evaluation).then((response) => {
                    if (response.statusCode === 200)
                      toast.success(response.message, { position: "top-center", autoClose: 2000 });
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
                        options={addData.measurementList}
                        getOptionLabel={(option) => option.name}
                        value={measurementValue}
                        onChange={(event: any, newValue: Measurement | null) => {
                          setTestValue(newValue);
                        }}
                        inputValue={inputMeasurementValue}
                        onInputChange={(event, newInputValue) => {
                          setInputMeasurementValue(newInputValue);
                        }}
                        renderInput={(params) => (
                          <MUITextField {...params} label="Tip masura" />
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
                          label="Data verificarii"
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
  