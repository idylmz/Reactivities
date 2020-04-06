import React, {
  useState,
  FormEvent,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../App/Stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../App/Layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    selectedActivity: initialFormState,
    loadActivity,
    loadingInitial
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState));
    }
  }, [loadActivity, match.params.id, initialFormState, activity.id.length]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(e, newActivity).then(() => {history.push(`/Activities/${newActivity.id}`)});
    } else {
      editActivity(e, activity).then(() => {history.push(`/Activities/${activity.id}`)});
    }
  };

  if(loadingInitial) return <LoadingComponent loadingText="Activity is loading..." />
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} loading={submitting}>
        <Form.Input
          onChange={handleInputChange}
          placeholder="Title"
          name="title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          placeholder="Description"
          name="description"
          value={activity.description}
          rows={2}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="Category"
          name="category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          type="datetime-local"
          name="date"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="City"
          name="city"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          placeholder="Venue"
          name="venue"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          floated="right"
          onClick={() => history.push("/Activities")}
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
