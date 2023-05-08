
import { Evaluation } from "../models/evaluation";
import { MeasurementTaken } from "../models/measurementTaken";
import { Game } from "../models/game";
import { Measurement } from "../models/measurement";
import { Test } from "../models/test";
import axios, { AxiosResponse} from "axios";
import { Player } from "../models/player";



axios.defaults.baseURL = "https://localhost:7254/api/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, token?: string) => axios.get(url, ).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body, {headers: {"Content-Type": "application/json"}}).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body, {headers: {"Content-Type": "application/json"}}).then(responseBody),
  delete: async (url: string) => await axios.delete(url).then(responseBody),
};

const Players = {
  list: () => requests.get("player/get-players"),
  details: (id: number) => requests.get(`player/get-players/${id}`),
  addItem: (product: Player) => requests.post("player/add-player", product),
  checkIfNameExists: (name: string) => requests.get(`player/check-name/${name}`),
  delete: (id: number) => requests.delete(`player/delete-player/${id}`)
};

  const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/current-user"),
};

const Tests = {
  list: () => requests.get("test/get-tests"),
  details: (id: number) => requests.get(`test/get-tests/${id}`),
  addItem: (test: Test) => requests.post("test/add-test", test),
};

const Measurements = {
  list: () => requests.get("measurement/get-measurements"),
  details: (id: number) => requests.get(`measurement/get-measurements/${id}`),
  addItem: (measurement: Measurement) =>
    requests.post("measurement/add-measurement", measurement),
};

const Evaluations = {
  list: () => requests.get("TestTaken/get-test-taken"),
  details: (id: number) => requests.get(`TestTaken/get-test-taken/${id}`),
  addItem: (test: Evaluation) =>
    requests.post("TestTaken/add-test-taken", test),
  getByPlayer: (id: number) => requests.get(`TestTaken/get-test-player/${id}`),
  getByTest: (id: number) => requests.get(`TestTaken/get-test-list/${id}`),
  getPerformanceByPlayer: (id: number) => requests.get(`TestTaken/get-test-evolution/${id}`),
};

const Games = {
  list: () => requests.get("test/get-tests"),
  details: (id: number) => requests.get(`test/get-tests/${id}`),
  addItem: (game: Game) => requests.post("test/add-test", game),
};

const MeasurementTakens = {
  list: () => requests.get("measurementTaken/get-measurement-taken"),
  addItem: (msrTkn: MeasurementTaken) =>
    requests.post("MeasurementTaken/add-measurement-taken", msrTkn),
};

const TestErrors = {
  get404Error: () => requests.get("Buggy/notfound"),
  get401Error: () => requests.get("Buggy/unauthorized"),
  get500Error: () => requests.get("Buggy/servererror"),
  get400Error: () => requests.get("Buggy/badrequest"),
  getValidationError: () => requests.get("Buggy/validation-error"),
};

const agent = {
  Players,
  Tests,
  Measurements,
  Games,
  MeasurementTakens,
  Evaluations,
  TestErrors,
  Account,
};

export default agent;
