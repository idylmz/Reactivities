import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../Details/ActivityDetails";
import { ActivityForm } from "../Form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  editMode: boolean;
  setSelectedActivity: (activity: IActivity | null) => void;
  editActivity: (e: SyntheticEvent<HTMLFormElement>, activity: IActivity) => void;
  createActivity: (activity: IActivity) => void;
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  setEditMode,
  editMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList submitting={submitting} activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} target={target} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
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
