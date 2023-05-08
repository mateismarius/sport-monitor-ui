import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { EvaluationDto } from "../../app/models/evaluationDto";
import { Test } from "../../app/models/test";

interface PropsInterface {
  name: Test;
  data: EvaluationDto[];
}

export default function EvaluationCard(props: PropsInterface) {
  const { name, data } = props;

  const navigate = useNavigate();
  const viewChart = async (event: any) => {
    event.preventDefault();

    try {
      navigate("/evaluation/player/player-chart-view", {
        state: { testId: name.id, playerId: data[0].playerId },
      });
      console.log(name.id);
    } catch (error) {
      // handle rejected Promise/error/etc...
    }
  };

  const viewTable = async (event: any) => {
    event.preventDefault();

    try {
      navigate("/evaluation/player/evaluation-table-view", {
        state: { testId: name.id, testName: name.name, playerId: data[0].playerId, playerName: data[0].player.playerName },
      });
    } catch (error) {
      // handle rejected Promise/error/etc...
    }
  };

  const viewAllTestsChart = async (event: any) => {
    event.preventDefault();

    try {
      navigate("/evaluation/player/evaluation-allTests-chartView", {
        state: { playerId: data[0].playerId, playerName: data[0].player.playerName },
      });
    } catch (error) {
      // handle rejected Promise/error/etc...
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 3 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="auto"
        width="100%"
        image="/images/player.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to="/evaluation/player/table-view"
          onClick={viewTable}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" size="small">
            Rezultate
          </Button>
        </Link>
        <Link
          to="/evaluation/player/player-chart-view"
          onClick={viewChart}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" size="small">
            Grafic
          </Button>
        </Link>
        <Link
          to="/evaluation/player/evaluation-allTests-chartView"
          onClick={viewAllTestsChart}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" size="small">
            Toate Testele
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
