import { Divider, Stack } from "@mui/material";
import Header from "./Header";
import LeftSideMenu from "./LeftSideMenu";
import {Outlet, useNavigate} from "react-router-dom";
import { Box } from "@mui/system";
import { motion } from "framer-motion";
import {useEffect} from "react";
import {useIsAuthenticated, useSignIn, useSignOut} from "react-auth-kit";

export default function HomePage() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  console.log(isAuthenticated());
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/account/login");
    }
  }, []);
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      sx={{ minHeight: "90vh" }}
    >
      <Header />
      <Stack direction="row">
        <LeftSideMenu />
        <Divider orientation="vertical" flexItem />
        <Outlet />
      </Stack>
    </Box>
  );
}
