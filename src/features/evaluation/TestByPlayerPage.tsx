import { Backdrop, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import agent from "../../app/api/agent";
import { EvaluationDto } from "../../app/models/evaluationDto";
import EvaluationCard from "./EvaluationCard";



export default function TestByPlayerPage() {
  const { state } = useLocation();
  const { playerId } = state || {};
  const [loading, setLoading] = useState(true);
  const [playerTest, setPlayerTest] = useState<EvaluationDto[]>([]);

  useEffect(() => {
    agent.Evaluations.getByPlayer(playerId)
      .then((response) => {
        const tests: EvaluationDto[] = response;
        setPlayerTest(tests);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [playerId]);

var uniqueTest = playerTest.filter((set => f => !set.has(f.test.id) && set.add(f.test.id))(new Set()));
  return (
     <Container>
      {uniqueTest.map((test) => <EvaluationCard name={test.test} data={playerTest}/>)}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
