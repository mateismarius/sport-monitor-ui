import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { colors } from "../../constants/chartColors";
import { PlayerEvolutionDto } from "../../app/models/playerEvolutionDto";
import {useLocation} from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AllTestsChartView() {
  const { state } = useLocation();
  const { playerName, playerId } = state || {};
  const [allTests, setAllTests] = useState<PlayerEvolutionDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     agent.Evaluations.getByPlayer(playerId)
      .then((response) => {
        const tests: PlayerEvolutionDto[] = response.data;
        setAllTests(tests);
      })
      .finally(() => setLoading(false));
  }, [playerId]);
  const resultList = allTests.map((test) => test.testResults);
  console.log("resultList: ", resultList);
  const allLabels = resultList.map((result) =>
    result.map((res) =>
      res.takenAt !== null
        ? new Date(res.takenAt).toLocaleDateString("ro-RO")
        : ""
    )
  );
  const labels = allLabels.flat(1).filter((v, i, a) => a.indexOf(v) === i);
  const options = {
    responsive: true,
    interaction: {
      mode: "dataset" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: `${playerName} - Grafic evolutie teste fizice`,
        font: {
          size: 20,
          color: "#000000",
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          padding: 30,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      autoPadding: true,
    },
  };

  let contor: number = 0;
  const data = {
    labels: labels,
    datasets: allTests.map((test) => {
      contor++;
      return {
        label: test.testName,
        data: test.testResults.map((testResult) => ({
          x:
            testResult.takenAt !== null
              ? new Date(testResult.takenAt).toLocaleDateString("ro-RO")
              : "",
          y: testResult.evolution,
        })),
        borderColor: colors[contor - 1],
        backgroundColor: colors[contor - 1],
        lineTension: 0.4,
        radius: 6,
      };
    }),
  };

  return (
    <Box sx={{ minWidth: "80%", margin: "2%" }}>
      <Line
        data={data}
        options={options}
        plugins={[
          {
            id: "increase-legend-spacing",
            beforeInit(chart: any) {
              // Get reference to the original fit function
              const originalFit = (chart.legend as any).fit;
              // Override the fit function
              (chart.legend as any).fit = function fit() {
                // Call original function and bind scope in order to use `this` correctly inside it
                originalFit.bind(chart.legend)();
                this.height += 40;
              };
            },
          },
        ]}
      ></Line>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
