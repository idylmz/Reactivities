import React, { useState, FormEvent, SyntheticEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  activity: IActivity | null;
  setEditMode: (editMode: boolean) => void;
  editActivity: (e: SyntheticEvent<HTMLFormElement>, activity: IActivity) => void;
  createActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState,
  setEditMode,
  createActivity,
  editActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

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
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(e, activity);
    }
  };

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
          content="Submit" />
        <Button
          floated="right"
          onClick={() => setEditMode(false)}
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
