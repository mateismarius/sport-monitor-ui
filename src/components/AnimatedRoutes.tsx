import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFound } from "../app/errors/NotFound";
import ServerError from "../app/errors/ServerError";
import ErrorsPage from "../app/layout/ErrorsPage";
import HomePage from "../app/layout/HomePage";
import AddEvaluationPage from "../features/evaluation/AddEvaluationPage";
import AddTestPage from "../features/evaluation/AddTestPage";
import EvaluationViewChart from "../features/evaluation/EvaluationViewChart";
import EvaluationViewTable from "../features/evaluation/EvaluationViewTable";
import PlayerEvaluationChartView from "../features/evaluation/PlayerEvaluationChartView";
import TestByPlayerPage from "../features/evaluation/TestByPlayerPage";
import AddCheckingPage from "../features/measurement/AddCheckingPage";
import AddMeasurementPage from "../features/measurement/AddMeasurementPage";
import AddPlayerPage from "../features/player/AddPlayerPage";
import PlayerListPage from "../features/player/PlayerListPage";
import Spinner from "./Spinner";
import PlayerEvaluationTableView from "../features/evaluation/PlayerEvaluationTableView";
import TestListPage from "../features/evaluation/TestListPage";
import Login from "../features/account/Login";
import Register from "../features/account/Register";
import { RequireAuth } from "react-auth-kit";
import AllTestsChartView from "../features/evaluation/AllTestsChartView";

export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <RequireAuth loginPath={"account/login"}>
              <HomePage />
            </RequireAuth>
          }
        >

          <Route path="/player/list" element={<PlayerListPage />} />

          <Route path="/player/new" element={<AddPlayerPage />} />

          <Route path="/measurement/new" element={<AddMeasurementPage />} />

          <Route path="/test/new" element={<AddTestPage />} />

          <Route path="/evaluation/new" element={<AddEvaluationPage />} />

          <Route path="/checking/new" element={<AddCheckingPage />} />

          <Route path="/evaluation/player/" element={<TestByPlayerPage />} />
          <Route
            path="/evaluation/player/view-table"
            element={<EvaluationViewTable />}
          />
          <Route
            path="/evaluation/player/view-chart"
            element={<EvaluationViewChart />}
          />
          <Route
            path="/evaluation/player/player-chart-view"
            element={<PlayerEvaluationChartView />}
          />
          <Route
            path="/evaluation/player/player-table-view"
            element={<PlayerEvaluationTableView />}
          />
          <Route
            path="/evaluation/player/evaluation-table-view"
            element={<EvaluationViewTable />}
          />
          <Route
            path="/evaluation/player/evaluation-allTests-chartView"
            element={<AllTestsChartView />}
          />
          <Route path="/test/list" element={<TestListPage />} />
        </Route>
        <Route path="account/login" element={<Login />} />
        <Route path="account/register" element={<Register />} />
        <Route path="errors" element={<ErrorsPage />} />
        <Route path="spinner" element={<Spinner />} />
        <Route path="server-error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
