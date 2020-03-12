import React, { Fragment } from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";

interface IProps {
    activities: IActivity[]
}

export const ActivityDashboard: React.FC<IProps> = (props) => {
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <List>
          {props.activities.map(activity => (
            <List.Item key={activity.id}>
              {activity.title}
              <br />
              {activity.description}
            </List.Item>
          ))}
        </List>
      </Grid.Column>
    </Grid>
  );
};
