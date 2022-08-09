import {
  autorun,
  configure,
  makeAutoObservable,
  action,
  observable,
  makeObservable,
} from "mobx";
// import { storeResourcesToDB } from "../api/utils/dataWrites";
import { storeData, retrieveData } from "./localStorage";

configure({ enforceActions: "always" });

export class DataStore {
  // stats = [];
  // selected = ""
  // name = "wing";
  // resource = "starships";
  user = {};
  workspaces = [];
  apps = [];
  defaultWorkspaceId = "";
  storeName = "MOBX:STATE";

  constructor() {
    makeObservable(this, {
      changeWorkspaces: action,
      changeUser: action,
      changeDefaultWorkspaceId: action,
      changeApps: action,
      apps: observable,
      defaultWorkspaceId: observable,
      workspaces: observable,
      user: observable
    });
    this.load();
    autorun(this.save);
  }

  load = async () => {
    const data = await retrieveData(this.storeName);
    console.log(data);
    console.log("Load Event");
    Object.assign(this, JSON.parse(data));
  };

  save = async () => {
    console.log("Save event");
    await storeData(this.storeName, JSON.stringify({
      user: this.user,
      workspaces: this.workspaces,
      defaultWorkspaceId: this.defaultWorkspaceId,
      apps: this.apps
    }));
  };

  changeApps = data => {
    this.apps = data;
  }

  changeUser = data => {
    this.user = data
  }

  changeWorkspaces = data => {
    this.workspaces = data
  }

  changeDefaultWorkspaceId = data => {
    this.defaultWorkspaceId = data;
  }
}
