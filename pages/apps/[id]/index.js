import Dashboard_Layout from "../../../components/layout/dashboard_layout";
import React, { useEffect, useState } from "react";
import {
  Input,
  Breadcrumb,
  Menu,
} from "antd";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import {
  fetchApp,
  updateAppEnv,
} from "../../../components/services/apps.service";
import { createActions } from "../../../components/services/actions.service";
import {
  capitalize,
  tagify,
  resourcify,
  uniqueCheck,
  Loading
} from "../../../components/config/constant";
import NProgress from "nprogress";


// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { useSelector} from "react-redux";
import Actions from "../../../components/apps/actions";
import Overview from "../../../components/apps/app/overview";
import Environments from "../../../components/apps/app/environments";
import Onboarding from "../../../components/apps/app/onboarding";
import Auth from "../../../components/apps/app/auth";
import CRUD from "../../../components/apps/app/crud";
import CreateActionModal from "../../../components/apps/createActionModal";

const { TextArea } = Input;


const Index = (props) => {
  const config = useSelector((state) => state.app);
  const [app, setApp] = useState({});
  const [appPage, setAppPage] = useState(1);
  const [error, setError] = useState();
  const [createAction, setCreateAction] = useState(false)
  const [defaultActionType, setDefaultActionType] = useState("");
 
  const [setupList, setSetupList] = useState([]);
  const [authList, setAuthList] = useState([]);
  const [createList, setCreateList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [hooksList, setHooksList] = useState([]);
  const [actionSelected, setActionSelected] = useState("");

  const [user, setUser] = useState(config.user);
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

  const setCreateActionDialog = (bool) => {
    setCreateAction(bool);
  };

  const showCreateActionDialog = (defaultActionType = "") => {
    setCreateAction(true);
    setDefaultActionType(defaultActionType);
  };

  const changeActionSelected = (id) =>{

    setActionSelected(id)
  }

  const categorizeActions = (actions) => {
    actions.map((data) => {
      const { type } = data;

      if (type === "SETUP") {
        if (uniqueCheck(setupList, data)) setupList.push(data);
        setSetupList(setupList);
      }
      if (type === "AUTH") {
        if (uniqueCheck(authList, data)) authList.push(data);
        setAuthList(authList);
      }
      if (type === "CREATE") {
        if (uniqueCheck(createList, data)) createList.push(data);
        setCreateList(createList);
      }
      if (type === "READ") {
        if (uniqueCheck(readList, data)) readList.push(data);
        setReadList(readList);
      }
      if (type === "UPDATE") {
        if (uniqueCheck(updateList, data)) updateList.push(data);
        setUpdateList(updateList);
      }
      if (type === "DELETE") {
        if (uniqueCheck(deleteList, data)) deleteList.push(data);
        setDeleteList(deleteList);
      }
      if (type === "HOOKS") {
        if (uniqueCheck(hooksList, data)) hooksList.push(data);
        setHooksList(hooksList);
      }
      //alert(setupList.length)
    });
  };

  useEffect(async () => {
    try {
      const app = await fetchAppData();
      if (app.workspace_id === config.defaultWorkspaceId) {
        categorizeActions(app.actions);
        setApp(app);
      } else {
        const error = "Access Denied";
        setError(error);
      }
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
      setError(error);
    }
  }, [app]);

  return (
    <Dashboard_Layout title={capitalize(String(app.app_name)) || "App"}>
      <div className="padding_10"></div>

      {createAction?<CreateActionModal setCreateActionDialog={setCreateActionDialog} defaultActionType={defaultActionType} app_id={app._id}/>:<></>}
      <section className="padding_10 row">
        <div className="row">
          <div className="col-2 h-100">
            <div className="padding_10">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href="/apps">Apps</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {app.app_name ? capitalize(String(app.app_name)) : "App"}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="border-none"
            >
              <Menu.Item
                key="1"
                onClick={() => {
                  setAppPage(1);
                  setActionSelected("");
                }}
              >
                <span>Overview</span>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  setAppPage(2);
                  setActionSelected("");
                }}
              >
                <span>Environments</span>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  setAppPage(3);
                  setActionSelected("");
                }}
              >
                <span>Onboarding</span>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  setAppPage(4);
                  setActionSelected("");
                }}
              >
                <span>Auth</span>
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => {
                  setAppPage(5);
                  setActionSelected("");
                }}
              >
                <span>CRUD Actions</span>
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => {
                  setAppPage(6);
                  setActionSelected("");
                }}
              >
                <span>Webhook Events</span>
              </Menu.Item>
              <Menu.Item
                key="9"
                onClick={() => {
                  setAppPage(9);
                  setActionSelected("");
                }}
              >
                <span>Geo-Availability</span>
              </Menu.Item>
              <Menu.Item
                key="7"
                onClick={() => {
                  setAppPage(7);
                  setActionSelected("");
                }}
              >
                <span>Pricing</span>
              </Menu.Item>
              <Menu.Item
                key="8"
                onClick={() => {
                  setAppPage(8);
                  setActionSelected("");
                }}
              >
                <span>Publish</span>
              </Menu.Item>
            </Menu>
          </div>
          <div className="col-10 padding_10">
            {Object.keys(app).length && !actionSelected && !error ? (
              <div>
                {appPage === 1 ? (
                  <Overview/>
                ) : null}

                {appPage === 2 ? (
                  <Environments envs={app.envs} showCreateActionDialog={showCreateActionDialog}/>
                ) : null}

                {appPage === 3 ? (
                  <Onboarding setupList={setupList} showCreateActionDialog={showCreateActionDialog} setActionSelected={changeActionSelected}/>
                ) : null}

                {appPage === 4 ? (
                  <Auth authList={authList} showCreateActionDialog={showCreateActionDialog} setActionSelected={setActionSelected}/>
                ) : null}

                {appPage === 5 ? (
                  <CRUD deleteList={deleteList} readList={readList} updateList={updateList} createList={createList} showCreateActionDialog={showCreateActionDialog} setActionSelected={setActionSelected}/>
                ) : null}

                {appPage === 6 ? (
                  <span>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item>Webhook Events</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </span>
                ) : null}

                {appPage === 7 ? (
                  <span>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item>Pricing</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </span>
                ) : null}

                {appPage === 8 ? (
                  <span>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item>Publish</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </span>
                ) : null}

                {appPage === 9 ? (
                  <span>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item>Geo-Availability</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                  </span>
                ) : null}
              </div>
            ) : !actionSelected?<Loading/>: <></>}

            {actionSelected?(<div>
              <Actions action_id={actionSelected} app_id={app_id} user_data={config.user} envs={app.envs}/>
            </div>):(<></>)}
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;
  return {
    props: { app_id },
  };
};
