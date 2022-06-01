import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
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
import NotFound from "./Components/NotFound";
import ManagerRequests from "./Pages/ManagerRequests";
import Concerts from "./Pages/Concerts";
import ConcertPage from "./Pages/ConcertPage";
import EditConcert from "./Pages/EditConcert";
import StripePay from "./Components/StripePay";
import Bookings from "./Pages/Bookings";
import MyProfile from "./Pages/MyProfile";
import EditProfile from "./Pages/EditProfile";
import About from "./Pages/About";

function App() {
  const toastredux = useSelector((state) => state.toast);
  const role = useSelector((state) => state.role);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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
        <div className="relative w-full pt-16">
          <Topbar />
          <ToastContainer
            draggable={false}
            autoClose={3000}
            position={"bottom-center"}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path={"/home"} component={Home} />
            <Route exact path="/concert/:id" component={ConcertPage} />
            <Route exact path="/concerts" component={Concerts} />
            <Route exact path={"/bookings"} component={Bookings}></Route>
            <Route exact path={"/payment"} component={StripePay}></Route>
            <Route exact path={"/signup"} component={Signup} />
            <Route exact path="/login" component={Login} />
            {role === "admin" && (
              <Route
                exact
                path="/managers/requests"
                component={ManagerRequests}
              />
            )}
            {isLoggedIn && (
              <>
                <Route
                  exact
                  path={"/profile/edit"}
                  component={EditProfile}
                ></Route>
                <Route exact path={"/profile"} component={MyProfile}></Route>
              </>
            )}
            {role === "manager" && (
              <Route exact path="/concert/:id/edit" component={EditConcert} />
            )}
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
