import React, { useContext } from "react";
import { Image, Card, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import ActivityStore from "../../../App/Stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedActivity}) => {

  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity} = activityStore;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
          <Button.Group widths={2}>
              <Button color='blue' basic content='Edit' onClick={() => setEditMode(true)} />
              <Button color='grey' basic content='Cancel' onClick={() => setSelectedActivity(null)} />
          </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);