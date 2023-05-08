import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Test } from "../../app/models/test";

export default function TestCard(props: { test: Test }) {
  const navigate = useNavigate();
  const viewEvaluations = async (event: any) => {
    event.preventDefault();

    try {
      navigate("/evaluation/player/player-table-view", {
        state: { testId: props.test.id, testName: props.test.name },
      });
    } catch (error) {
      // handle rejected Promise/error/etc...
    }
  };
  return (
    <Card sx={{ maxWidth: 300, minHeight: 200 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.test.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.test.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/evaluation/player" onClick={viewEvaluations}>
          <Button variant="outlined" size="small">
            Rezultate
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
