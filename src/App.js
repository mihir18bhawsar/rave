import { Route, Switch, Router } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import history from "./history";
function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
