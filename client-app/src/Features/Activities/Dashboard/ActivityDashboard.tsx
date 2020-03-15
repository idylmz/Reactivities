import React, { SyntheticEvent, useContext } from "react";
import ActivityStore from "../../../App/Stores/activityStore";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../Details/ActivityDetails";
import { ActivityForm } from "../Form/ActivityForm";
import { observer } from "mobx-react-lite";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  editActivity: (
    e: SyntheticEvent<HTMLFormElement>,
    activity: IActivity
  ) => void;
  createActivity: (activity: IActivity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList
          submitting={submitting}
          deleteActivity={deleteActivity}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity}
            setEditMode={setEditMode}
            editActivity={editActivity}
            createActivity={createActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
