import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../Models/activity";
import { NavBar } from "../../Features/Nav/NavBar";
import ActivityDashboard from "../../Features/Activities/Dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../Stores/activityStore";
import {observer} from 'mobx-react-lite';

const App = () => {

  const activityStore = useContext(ActivityStore);

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

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
    activityStore.loadActivities();
  }, [activityStore]); // We use "[]" to stop program to loop forever.

  if(activityStore.loadingInitial) return <LoadingComponent loadingText='Loading Activities!!' />

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          setEditMode={setEditMode}
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

export default observer(App);
