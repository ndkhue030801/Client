import { useState } from "react";
import LoginForm from "./components/login_form";
import RegisterForm from "./components/register_form";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import ForgotPassword from "./components/forgot_password";
import MainScreen from "./components/main_screen";

const App = () => {
  // const [authState, setAuthState] = useState('login');

  // const onChangeView = () => {
  //   setAuthState('register');
  // }
  const [state, setState] = useState({
    user_name: "",
    token: "",
  });
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={<LoginForm state={state} setState={setState} />}
            />
            <Route
              path="/register"
              element={<RegisterForm state={state} setState={setState} />}
            />
            <Route
              path="/forgot_password"
              element={<ForgotPassword state={state} setState={setState} />}
            />
            <Route
              path="/main_screen"
              element={
                state.token == "" ? (
                  <Navigate to="/"></Navigate>
                ) : (
                  <MainScreen state={state} setState={setState} />
                )
              }
            />
            <Route element={<Navigate to="/"></Navigate>} />
          </Routes>
          {/* <Navigate to="/"></Navigate> */}
        </Router>
      </div>
    </>
  );
};

export default App;
