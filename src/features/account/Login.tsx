import {
  Box,
  Button,
  Container,
  Typography,
  Avatar,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import validateForm from "../../helpers/validation/validator";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { User } from "../../app/models/user";
import {useSignIn} from "react-auth-kit";
import axiosInstance from "../../app/api/axios";

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

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/player/list";
  const signIn = useSignIn();

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
          Autentificare
        </Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setLoading(true);
              setSubmitting(false);
              const user = {
                username: values.username,
                password: values.password,
              };
              
              axiosInstance.post("account/login", user, {headers: {"Content-Type": "application/json"}}).then((response) => {
                const user: User = response.data;
                signIn({
                  token: user.accessToken,
                  expiresIn: 5,
                  tokenType: "Bearer",
                  authState: {email: user.email, role: user.roles},
                })
                navigate(from, {replace: true});
              });
              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }, 500);
          }
        }
        >
          {({ values, submitForm, isSubmitting, touched, errors }) => (
            <Form>
              <Box margin={1} sx={{ width: "100%" }}>
                <Field
                  validate={validateForm.requiredField}
                  component={TextField}
                  label="Utilizator"
                  name="username"
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
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  onClick={submitForm}
                  sx={{ mt: 3, mb: 2, margin: "2%" }}
                >
                  Autentificare
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to="#"
                      style={{ textDecoration: "none", color: "#e1eaeb" }}
                    >
                      Ai uitat parola?
                    </Link>
                  </Grid>
                </Grid>

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
