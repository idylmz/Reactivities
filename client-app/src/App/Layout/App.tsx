import React, { useState, useEffect, Fragment } from "react";
import { Header, Icon, List, Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../Models/activity";
import { NavBar } from "../../Features/Nav/NavBar";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data);
    });
  }, []); // We use "[]" to stop program to loop forever.
  return (
    <Fragment>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
