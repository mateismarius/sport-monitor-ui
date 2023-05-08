import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Formik, Form, Field } from "formik";
import validateForm from "../../helpers/validation/validator";
import { TextField } from "formik-mui";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function AddMeasurementPage() {
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
            Adaugare masuratoare noua
          </Typography>
          <Formik
            initialValues={{
              name: "",
              description: "",
              unit: "",
              createdAt: new Date(),
              lastModified: new Date(),
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                setSubmitting(false);
                const measurement = {
                  name: values.name,
                  description: values.description,
                  unit: values.unit,
                  createdAt: values.createdAt,
                  lastModified: values.lastModified,
                  id: 0,
                };

                agent.Measurements.addItem(measurement).then((response) => {
                  if (response.statusCode === 200)
                    toast.success(response.message, { position: "top-center", autoClose: 2000 });
                })
              }, 500);
              resetForm();
            }}
          >
            {({ values, submitForm, isSubmitting, touched, errors }) => (
              <Form>
                <Stack>
                    <Box margin={1}>
                      <Field
                        validate={validateForm.requiredField}
                        component={TextField}
                        label="Denumire"
                        name="name"
                        type="text"
                      />
                    </Box>
                    <Box margin={1}>
                      <Field
                        validate={validateForm.requiredField}
                        component={TextField}
                        label="Descriere"
                        name="description"
                        type="text"
                      />
                    </Box>
                    <Box margin={1}>
                      <Field
                        validate={validateForm.requiredField}
                        component={TextField}
                        label="Unitate de masura"
                        name="unit"
                        type="text"
                      />
                    </Box>
                    <Box sx={{ margin: 1, width: "100%", height: "100%" }} >
                      <Button
                        sx={{ margin: 2, width: "50%", height: "100%", float: "right" }}
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        Adauga
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
