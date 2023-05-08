import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SignedInMenu from "../../components/SingedInMenu";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

export default function Header() {
  const user = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  console.log(user());
  return (
    <Box
      sx={{ flexGrow: 1 }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" justifyContent="center">
            <Grid>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sport Performance Monitor
              </Typography>
            </Grid>
          </Grid>

          {isAuthenticated() ? (
            <SignedInMenu />
          ) : (
            <>
              <Link to="account/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{ marginRight: "10px" }}
                  endIcon={<LoginIcon />}
                >
                  Autentificare
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
