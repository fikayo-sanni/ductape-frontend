import Dashboard_Layout from "./dashboard_layout";
import React, { useEffect, useState } from "react";
import { Input, Breadcrumb, Menu } from "antd";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { fetchApp, updateAppEnv } from "../services/apps.service"; // "../../services/apps.service";
import { capitalize, uniqueCheck, Loading } from "../config/constant";

// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import CreateActionModal from "../apps/createActionModal";
import { changeSelectedApp } from "../../data/applicationSlice";
import CreateSetupModal from "../apps/createSetupModal";
import CreateWebhookModal from "../apps/createWebhookModal";

const { TextArea } = Input;

const App_Layout = (props) => {
  const dispatch = useDispatch();
  const {
    children,
    selected,
    setHTML,
    setText,
    setEnvs,
    setSetupEnvsList,
    setWebhooksList,
    setWebhookEnvsList,
    setSetupList,
    setAppDomains,
    setAuthList,
    setCreateList,
    createAction,
    setCreateAction,
    createSetup,
    setCreateSetup,
    createWebhooks,
    setCreateWebhooks,
    defaultActionType,
    setUpdateList,
    setDeleteList,
  } = props;
  const config = useSelector((state) => state.app);
  const [app, setApp] = useState({});
  const [error, setError] = useState();
  const [selectedPage, setSelectedPage] = useState(selected);
  //if(selected)alert(selected);
  const { app_id } = props;

  const fetchAppData = async () => {
    const { auth_token: token, _id: user_id, public_key } = config.user;
    const data = await fetchApp({
      token,
      user_id,
      public_key,
      app_id,
    });
    const app = data.data.data;
    return app;
  };

  const categorizeActions = (actions) => {
    const setupList = [],
      authList = [],
      createList = [],
      readList = [],
      updateList = [],
      deleteList = [],
      hooksList = [];

    actions.map((data) => {
      const { type } = data;

      if (type === "AUTH") {
        if (uniqueCheck(authList, data)) authList.push(data);
        if (setAuthList) setAuthList(authList);
      }
      if (type === "CREATE") {
        if (uniqueCheck(createList, data)) createList.push(data);
        if (setCreateList) setCreateList(createList);
      }
      if (type === "READ") {
        if (uniqueCheck(readList, data)) readList.push(data);
        setReadList(readList);
      }
      if (type === "UPDATE") {
        if (uniqueCheck(updateList, data)) updateList.push(data);
        if (setReadList) setUpdateList(updateList);
      }
      if (type === "DELETE") {
        if (uniqueCheck(deleteList, data)) deleteList.push(data);
        if (setDeleteList) setDeleteList(deleteList);
      }
      if (type === "HOOKS") {
        if (uniqueCheck(hooksList, data)) hooksList.push(data);
        if (setDeleteList) setHooksList(hooksList);
      }
      //alert(setupList.length)
    });
  };

  const setCreateActionDialog = (bool) => {
    setCreateAction(bool);
  };

  const setCreateSetupDialog = (bool) => {
    setCreateSetup(bool);
  };

  useEffect(async () => {
    if (config.app && config.app._id === app_id) {
      setApp(config.app);
      categorizeActions(config.app.actions);
      if (setSetupList) setSetupList(config.app.setups);
      if (setSetupEnvsList) setSetupEnvsList(config.app.setups_envs);
      if (setWebhooksList) setWebhooksList(config.app.webhooks);
      if (setWebhookEnvsList) setWebhookEnvsList(config.app.webhooks_envs);
      if (setEnvs) setEnvs(config.app.envs);
      if (setHTML) setHTML(config.app.aboutHTML);
      if (setText) setText(config.app.aboutText);
      if (setAppDomains && config.app.domains && config.app.domains.length)
        setAppDomains(config.app.domains);
    } else {
      try {
        const app = await fetchAppData();
        if (app.workspace_id === config.defaultWorkspaceId) {
          setApp(app);
          dispatch(changeSelectedApp(app));
          categorizeActions(app.actions);
          if (setEnvs) setEnvs(app.envs);
          if (setSetupList) setSetupList(app.setups);
          if (setSetupEnvsList) setSetupEnvsList(app.setups_envs);
          if (setWebhookEnvsList) setWebhookEnvsList(app.webhooks_envs);
          if (setWebhooksList) setWebhooksList(app.webhooks);
          if (setHTML) setHTML(app.aboutHTML);
          if (setText) setText(app.aboutText);
          if (setAppDomains && app.domains && app.domains.length)
            setAppDomains(app.domains);
        } else {
          const error = "Access Denied";
          setError(error);
        }
      } catch (e) {
        //alert(JSON.stringify(e));
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
        setError(error);
      }
    }
  }, [app]);

  //alert(selected)

  return (
    <Dashboard_Layout title={capitalize(String(app.app_name)) || "App"}>
      <div className="padding_10"></div>

      {createAction ? (
        <CreateActionModal
          setCreateActionDialog={setCreateActionDialog}
          defaultActionType={defaultActionType}
          app_id={app._id}
        />
      ) : (
        <></>
      )}

      {createSetup ? (
        <CreateSetupModal
          setCreateSetupDialog={setCreateSetupDialog}
          envs={app.envs}
          app_id={app._id}
        />
      ) : (
        <></>
      )}

      {createWebhooks ? (
        <CreateWebhookModal
          setCreateWebhooks={setCreateWebhooks}
          envs={app.envs}
          app_id={app._id}
        />
      ) : (
        <></>
      )}
      <section className="padding_10 row">
        <div className="row">
          <div className="col-2 h-100">
            <div className="padding_10">
              <Breadcrumb>
                <Breadcrumb.Item className="text-muted">
                  <Link href="/apps" className="text-muted">
                    Apps
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="text-muted">
                  {app.app_name ? capitalize(String(app.app_name)) : "App"}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {selected ? (
              <Menu
                defaultSelectedKeys={[selected]}
                mode="inline"
                theme="light"
                inlineCollapsed={false}
                className="border-none"
              >
                <Menu.Item className="border-bottom" key="1">
                  <Link href={`/apps/${app_id}`}>
                    <span>Overview</span>
                  </Link>
                </Menu.Item>
                <Menu.Item className="border-bottom" key="2">
                  <Link href={`/apps/${app_id}/environments`}>
                    <span>Environments</span>
                  </Link>
                </Menu.Item>
                <Menu.Item className="border-bottom" key="3">
                  <Link href={`/apps/${app_id}/setup`}>
                    <span>Setup</span>
                  </Link>
                </Menu.Item>
                <Menu.Item className="border-bottom" key="5">
                  <Link href={`/apps/${app_id}/crud`}>
                    <span>CRUD Actions</span>
                  </Link>
                </Menu.Item>
                <Menu.Item className="border-bottom" key="6">
                  <Link href={`/apps/${app_id}/webhooks`}>
                    <span>Webhook Events</span>
                  </Link>
                </Menu.Item>
                <Menu.Item className="border-bottom" key="7">
                  <Link href={`/apps/${app_id}/pricing`}>
                    <span>Pricing</span>
                  </Link>
                </Menu.Item>
                <Menu.Item className="border-bottom" key="8">
                  <Link href={`/apps/${app_id}/publish`}>
                    <span>Publish</span>
                  </Link>
                </Menu.Item>
              </Menu>
            ) : (
              <Loading />
            )}
          </div>
          <div className="col-10 padding_10">{children}</div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default App_Layout;
