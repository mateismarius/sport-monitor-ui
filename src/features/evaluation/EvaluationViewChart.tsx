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
import {
  Backdrop,
  Box,
  CircularProgress,
} from "@mui/material";
import { EvaluationDto } from "../../app/models/evaluationDto";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import {
  ConvertToArrayWithDistinctValues,
} from "../../helpers/evaluation/evaluationHelper";
import { colors } from "../../constants/chartColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function EvaluationViewChart() {
  const [allTests, setAllTests] = useState<EvaluationDto[]>([]);
  const [loading, setLoading] = useState(false);
  const namesList = ConvertToArrayWithDistinctValues(
    allTests.map((test) => test.player.playerName)
  );
  const labelsAll: string[] = allTests.map((test: EvaluationDto) =>
    test.takenAt !== null
      ? new Date(test.takenAt).toLocaleDateString("ro-RO")
      : ""
  );
  const labels = labelsAll.filter((v, i, a) => a.indexOf(v) === i);
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
        text: 'Grafic evolutie la proba "Abdomene"',
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
    datasets: namesList.map((name) => {
      contor++;
      const dataLst = allTests.filter(
        (test) => test.player.playerName === name
      );
      const dataLst2 = dataLst.map((test) => ({
        result: test.result,
        takenAt:
          test.takenAt !== null
            ? new Date(test.takenAt).toLocaleDateString("ro-RO")
            : "",
      }));

      return {
        label: name,
        data: dataLst2.map((test) => ({
          x: test.takenAt,
          y: test.result,
        })),
        borderColor: colors[contor - 1],
        backgroundColor: colors[contor - 1],
        lineTension: 0.4,        
        radius: 6     
      };
    }),
  };

  useEffect(() => {
    agent.Evaluations.getByTest(2)
      .then((response) => {
        const tests: EvaluationDto[] = response;
        setAllTests(tests);
        console.log(tests);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

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
