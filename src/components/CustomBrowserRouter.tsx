import { Router} from "react-router-dom";
import { useRef, useState, useLayoutEffect } from "react";
import { createBrowserHistory } from "history";

// Can be used to manage navigation state outside of React components
// ex : Redux, Axios interceptors, ...


export const customHistory = createBrowserHistory();
// @ts-ignore: Unreachable code error
export function CustomBrowserRouter({basename, children}) {
  const historyRef = useRef();
  if (historyRef.current == null) {
    // @ts-ignore: Unreachable code error
    historyRef.current = customHistory;
  }
  const history = historyRef.current;
  const [state, setState] = useState({
    // @ts-ignore: Unreachable code error
    action: history.action,
    // @ts-ignore: Unreachable code error
    location: history.location
  });
// @ts-ignore: Unreachable code error
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      // @ts-ignore: Unreachable code error
      navigator={history}
    />
  );
}