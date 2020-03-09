import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';

const {
    REACT_APP_AUTH_HOST: authHost,
} = process.env;

const Auth = ({ history }) => <MicroFrontend history={history} name="Auth" host={authHost} />;
const Test = () => <h1>Test <Link to="/">Go Back</Link></h1>;

// TODO: login should emit an event that login was successful with user info, other apps will listen to it
const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
            <Route exact path="/test" component={Test} />
            <Route path="/" component={Auth} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
