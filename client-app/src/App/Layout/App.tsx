import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../Models/activity";
import { NavBar } from "../../Features/Nav/NavBar";
import { ActivityDashboard } from "../../Features/Activities/Dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleEditActivity = (event: SyntheticEvent<HTMLFormElement>, activity: IActivity) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      }); 
      setActivities(response);
    }).then(() => setLoading(false));
  }, []); // We use "[]" to stop program to loop forever.

  if(loading) return <LoadingComponent loadingText='Loading Activities!!' />

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity}
          setEditMode={setEditMode}
          editMode={editMode}
          setSelectedActivity={setSelectedActivity}
          editActivity={handleEditActivity}
          createActivity={handleCreateActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
