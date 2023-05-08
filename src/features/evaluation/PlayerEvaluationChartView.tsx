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
import { useLocation } from "react-router-dom";
import {
  Backdrop,
  Box,
  CircularProgress,
} from "@mui/material";
import { EvaluationDto } from "../../app/models/evaluationDto";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
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

type ChartDataSets = {
  name: string;
  data: ChartData[];
};
type ChartData = {
  x: string | null;
  y: number | undefined;
};

export default function PlayerEvaluationChartView() {
  const { state } = useLocation();
  const { testId, playerId } = state || {};
  const [allTests, setAllTests] = useState<EvaluationDto[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedPlayerResults = allTests.filter(
    (test) => test.player.id === playerId
  );
  useEffect(() => {
    agent.Evaluations.getByTest(testId)
      .then((response) => {
        const tests: EvaluationDto[] = response;
        setAllTests(tests);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  
  const selectedPlayerName = selectedPlayerResults[0]?.player.playerName;
  const namesList = [
    selectedPlayerName,
    "Cel mai bun rezultat",
    "Media echipei",
    "Cel mai slab rezultat",
  ];

  const selectedPlayerTakenAtList = selectedPlayerResults.map(
    (test) => test.takenAt
  );

  const resultsForDateList = selectedPlayerTakenAtList.map((date) => ({
    takenAt: date,
    results: allTests
      .filter((test) => test.takenAt === date)
      .map((test) => test.result),
  }));

  const resultsByDate = resultsForDateList.map((result) => ({
    takenAt: result.takenAt,
    bestResult: Math.max(...result.results),
    lowestResult: Math.min(...result.results),
    averageResult:
      result.results.reduce((a, b) => a + b, 0) / result.results.length,
    playerResult: selectedPlayerResults.find(
      (res) => res.takenAt === result.takenAt
    )?.result,
  }));

  const chartDataList: ChartDataSets[] = [];
  for (let i = 0; i < namesList.length; i++) {
    chartDataList.push({
      name: namesList[i],
      data: resultsByDate.map((result) => ({
        x:
          result.takenAt !== null
            ? new Date(result.takenAt).toLocaleDateString("ro-RO")
            : "",
        y:
          namesList[i] === selectedPlayerName
            ? result.playerResult
            : namesList[i] === "Cel mai bun rezultat"
            ? result.bestResult
            : namesList[i] === "Cel mai slab rezultat"
            ? result.lowestResult
            : result.averageResult,
      })),
    });
  }
  const labels: string[] = selectedPlayerTakenAtList.map((date) =>
    date !== null ? new Date(date).toLocaleDateString("ro-RO") : ""
  );
  //  const labels = labelsAll.filter((v, i, a) => a.indexOf(v) === i);
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
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
      // filter all tests by player name
      const dataLst = chartDataList.filter((data) => data.name === name);
      // return new datasets object
      return {
        label: name,
        // forEach test, map it to {x: date, y: result}
        data: dataLst.map((data) => data.data).flat(1),
        borderColor: colors[contor - 1],
        backgroundColor: colors[contor - 1],
        lineTension: 0.4,
        radius: 6,
      };
    }),
  };
  console.log(data);

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
