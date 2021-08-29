import logo from './logo.svg';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import DashBoard from "./components/Dashboard";
import AuthRoute from "./components/AuthRoute";

const App = () => {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthRoute path={["/", "/dashboard"]} component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

