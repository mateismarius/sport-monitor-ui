import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Test } from "../../app/models/test";
import TestCard from "./TestCard";

export default function TestListPage() {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    agent.Tests.list()
      .then((response) => setTests(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "80%",
        margin: 5,
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Typography fontSize={30}>Lista testelor fizice</Typography>
      </Container>

      <Grid container spacing={3}>
        {tests.map((test) => {
          return (
            <Grid item xs={9} md={2.4} key={test.id} margin="2%">
              <TestCard test={test} />
            </Grid>
          );
        })}
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
