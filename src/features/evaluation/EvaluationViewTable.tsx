import { Backdrop, Box, CircularProgress, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, roRO } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import agent from "../../app/api/agent";
import { EvaluationDto } from "../../app/models/evaluationDto";

export default function EvaluationViewTable() {
  const { state } = useLocation();
  const { playerId, testId, testName, playerName } = state || {};
  const [allTests, setAllTests] = useState<EvaluationDto[]>([]);
  const [loading, setLoading] = useState(false);
  const columns: GridColDef[] = [
    { field: "Crt", headerName: "Crt", width: 70 },
    { field: "takenAt", headerName: "Data testarii", minWidth: 200 },
    { field: "result", headerName: "Rezultat", minWidth: 120 },
  ];

  let crt = 0;
  const testByPlayer = allTests.filter((f) => f.playerId === playerId);
  const data = testByPlayer.map((tst) => {
    return {
      Crt: ++crt,
      takenAt: tst.takenAt ? new Date(tst.takenAt).toLocaleDateString("ro-Ro") : "",
      result: tst.result,
    };
  });


  useEffect(() => {
    agent.Evaluations.getByTest(testId)
      .then((response) => {
        const tests: EvaluationDto[] = response;
        setAllTests(tests);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
      sx={{
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
        <Typography>Rezultatele obtinute la proba {testName} de catre {playerName} </Typography>
      </Container>
      <Container maxWidth={false} sx={{height: "80%"}}>
        <DataGrid
          localeText={roRO.components.MuiDataGrid.defaultProps.localeText}
          rows={data}
          columns={columns}
          getRowId={(row) => row.Crt}
          getRowHeight={() => "auto"}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
