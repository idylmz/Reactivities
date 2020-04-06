import React, { useContext, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/Stores/activityStore";
import { LoadingComponent } from "../../../App/Layout/LoadingComponent";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent loadingText="Loading Activities!!" />;

  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={"6"}>
        <Segment clearing>
          <h2>Activity Filters</h2>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
