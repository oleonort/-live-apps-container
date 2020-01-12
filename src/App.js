import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

const {
  REACT_APP_CLIENT_HOST: clientHost,
} = process.env;

const Client = ({ history }) => <MicroFrontend history={history} name="client" host={clientHost} />;
const Test = () => <h1>Test</h1>;

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
            <Route exact path="/test" component={Test} />
            <Route path="/" component={Client} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
