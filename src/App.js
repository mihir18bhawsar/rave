import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch, Router } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import history from "./history";
import Background from "./Components/Background";
import { connect } from "react-redux";
import { useEffect } from "react";

function App({ toastredux }) {
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
        <div className="w-full h-screen">
          <ToastContainer
            draggable={false}
            autoClose={3000}
            position={"bottom-center"}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
const mapStateToProps = (state) => {
  return { toastredux: state.toast };
};

export default connect(mapStateToProps)(App);
