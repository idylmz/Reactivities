import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../Models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | null = null;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("Loading Activities", () => {
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction("Loading Activities Finally", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
    } 
    else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction("Loading Activity", () => {
          activity.date = activity.date.split(".")[0];
          this.selectedActivity = activity;
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction("Loading Activity Finally", () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };
  @action createActivity = async (
    event: SyntheticEvent<HTMLFormElement>,
    activity: IActivity
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.create(activity);
      runInAction("Creating Activity", () => {
        this.activityRegistry.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction("Creating Activity Finally", () => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action editActivity = async (
    event: SyntheticEvent<HTMLFormElement>,
    activity: IActivity
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.update(activity);
      runInAction("Editting Activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction("Editting Activity Finally", () => {
        this.submitting = false;
        this.target = "";
      });
    }
  };


  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("Deleting Activity", () => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction("Deleting Activity Finally", () => {
        this.selectedActivity = null;
        this.submitting = false;
        this.target = "";
      });
    }
  };
}
export default createContext(new ActivityStore());
