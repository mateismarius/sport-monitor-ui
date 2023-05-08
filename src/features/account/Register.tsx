import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import validateForm from "../../helpers/validation/validator";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuthUser, useSignIn } from "react-auth-kit";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        to="#"
        color="inherit"
        style={{ textDecoration: "none", color: "#e1eaeb" }}
      >
        Sport Monitor
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/player/list";
  const signIn = useSignIn();
  const authUser = useAuthUser();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "10%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inregistrare
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            email: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setLoading(true);
              setSubmitting(false);
              const user = {
                username: values.username,
                password: values.password,
                email: values.email,
              };

              agent.Account.register(user)
                .then((response) => {
                  console.log("response: ", response);
                  signIn({
                    token: response.user.accessToken,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { email: response.user.email, role: response.user.roles },
                  });
                  navigate(from, { replace: true });
                })
                .catch((error) => {
                  if (error.status === 401)
                    toast.error(
                      "Nu sunteti autorizat sa vizualizati aceasta pagina",
                      {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                      }
                    );
                });
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }, 500);
          }}
        >
          {({ values, submitForm, isSubmitting, touched, errors }) => (
            <Form>
              <Box margin={1} sx={{ width: "100%" }}>
                <Field
                  validate={validateForm.requiredField}
                  component={TextField}
                  label="Nume utilizator"
                  name="username"
                  type="text"
                  style={{ width: "100%", margin: "2%" }}
                />
                <Field
                  validate={validateForm.requiredField}
                  component={TextField}
                  label="Email"
                  name="email"
                  type="text"
                  style={{ width: "100%", margin: "2%" }}
                />
                <Field
                  validate={validateForm.requiredField}
                  component={TextField}
                  label="Parola"
                  name="password"
                  type="password"
                  style={{ width: "100%", margin: "2%" }}
                />
                <Field
                  validate={validateForm.requiredField}
                  component={TextField}
                  label="Confirma parola"
                  name="password"
                  type="password"
                  style={{ width: "100%", margin: "2%" }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={submitForm}
                  sx={{ mt: 3, mb: 2, margin: "2%" }}
                >
                  Inregisrare
                </Button>

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
