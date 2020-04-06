import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../Features/Nav/NavBar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import ActivityForm from "../../Features/Activities/Form/ActivityForm";
import ActivityDetails from "../../Features/Activities/Details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {

  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={`/(.+)`}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/Activities" component={ActivityDashboard} />
              <Route path="/Activities/:id" component={ActivityDetails} />
              <Route
                path={["/CreateActivity", "/EditActivity/:id"]}
                component={ActivityForm}
                key={location.key}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
