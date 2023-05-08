import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, roRO } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import agent from "../../app/api/agent";
import { EvaluationDto } from "../../app/models/evaluationDto";

export default function PlayerEvaluationTableView() {
  const { state } = useLocation();
  const { testId, testName } = state || {};
  const [allTests, setAllTests] = useState<EvaluationDto[]>([]);
  const [loading, setLoading] = useState(false);
  const columns: GridColDef[] = [
    { field: "Crt", headerName: "Crt", width: 70 },
    { field: "playerName", headerName: "Numele complet", minWidth: 200 },
    { field: "dateOfBirth", headerName: "Anul nasterii", minWidth: 120 },
  ];
  const colNames = allTests
    .map((test) =>
      test.takenAt ? new Date(test.takenAt).toLocaleDateString("ro-Ro") : ""
    )
    .filter((v, i, a) => a.indexOf(v) === i);
  const playerNames = allTests
    .map((test) => test.player.playerName)
    .filter((v, i, a) => a.indexOf(v) === i);
  colNames.map((colName) => {
    return columns.push({ field: colName, headerName: colName, minWidth: 120 });
  });

  const dataLst: any[] = [];
  let crt = 0;

  playerNames.forEach((name) => {
    const testByPlayer = allTests.filter((f) => f.player.playerName === name);
    var playerTests: { [key: string]: any } = {};
    playerTests.Crt = ++crt;
    playerTests.playerName = testByPlayer[0].player.playerName;
    playerTests.dateOfBirth = testByPlayer[0].player.dateOfBirth?.toString().split("-")[0];
    testByPlayer.forEach((tst) => {
      const testDate = tst.takenAt
        ? new Date(tst.takenAt).toLocaleDateString("ro-Ro")
        : "";
      playerTests[testDate] = tst.result;
    });
    dataLst.push(playerTests);
  });
  console.log(dataLst);


  useEffect(() => {
    agent.Evaluations.getByTest(testId)
      .then((response) => {
        const tests: EvaluationDto[] = response;
        console.log(testId, testName);
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
        <Typography>Rezultatele obtinute la proba {testName} </Typography>
      </Container>
      <Container maxWidth={false} sx={{height: "80%"}}>
        <DataGrid
          localeText={roRO.components.MuiDataGrid.defaultProps.localeText}
          rows={dataLst}
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
