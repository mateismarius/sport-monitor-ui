import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AnimatedRoutes from "../../components/AnimatedRoutes";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAuthHeader, useSignOut} from "react-auth-kit";
import axios, {AxiosError} from "axios";
import {customHistory} from "../../components/CustomBrowserRouter";
import {useLocation, useNavigate} from "react-router-dom";

function App() {
  const authHeader = useAuthHeader();
    axios.interceptors.request.use((config) => {
      if (authHeader()) {
          config.headers!.authorization = authHeader()
      }
      return config;
  });

  axios.interceptors.response.use(
      (response: any) => {
        console.log("response ", response);
        return response;
      },
      (error: AxiosError) => {
        // @ts-ignore: Unreachable code error
        const res = error.response?.status;
        console.log("status ", error.response?.status)
        // @ts-ignore: Unreachable code error
        switch (res) {
          case 400:
            toast.error("A aparut o eroare! Va rugam sa reveniti!", {position: "top-center", autoClose: 2000});
            break;
          case 401:
            toast.error("Tokenul dvs. este expirat, va rog sa va reconectati", {position: "top-center", autoClose: 2000});
            customHistory.replace("/account/login");
            break;
          case 404:
            // @ts-ignore: Unreachable code error
            customHistory.push("not-found", { error: res });
            break;
          case 500:
            // @ts-ignore: Unreachable code error
            customHistory.push("/server-error");
            break;
        }
        return Promise.reject(res);
      }
  );

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      exit={{ opacity: 0 }} 
    >
      <ThemeProvider theme={darkTheme}>
        <ToastContainer position="top-center" />
        <CssBaseline />
        <AnimatedRoutes />
      </ThemeProvider>
    </Box>
  );
}

export default App;
