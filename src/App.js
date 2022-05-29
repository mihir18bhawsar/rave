import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, Router } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import history from "./history";
import Background from "./Components/Background";
import Topbar from "./Components/Topbar";
import SessionCheck from "./Components/SessionCheck";

function App() {
  const toastredux = useSelector((state) => state.toast);
  useEffect(() => {
    if (toastredux.type === 0) {
      toast.error(toastredux.value);
    }
    if (toastredux.type === 1) toast.success(toastredux.value);
  }, [toastredux]);
  return (
    <>
      <Router history={history}>
        <Background />
        <SessionCheck />
        <div className="w-full h-full py-16">
          <Topbar />
          <div className="w-full h-full mt-8">
            <ToastContainer
              draggable={false}
              autoClose={3000}
              position={"bottom-center"}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path={"/signup"} component={Signup} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
