import Dashboard_Layout from "../../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import {
  Tabs,
  Tag,
  Typography,
  Badge,
  Table,
  Space,
  Modal,
  Input,
  Button,
  Breadcrumb,
  Checkbox,
  Card,
  Slider,
  Switch,
  Empty,
  Menu,
  List,
  Avatar,
} from "antd";
import Icon, {
  InfoCircleOutlined,
  LeftOutlined,
  OrderedListOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import {
  fetchApp,
  updateAppEnv,
} from "../../../components/services/apps.service";
import { createActions } from "../../../components/services/actions.service";
import {
  Loading,
  capitalize,
  fetchInitials,
  isValidHttpUrl,
  tagify,
  resourcify,
  uniqueCheck,
} from "../../../components/config/constant";
import NProgress from "nprogress";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import {useDispatch, useSelector} from "react-redux";
import { changeDefaultWorkspaceId } from "../../../data/applicationSlice";
import Actions from "../../../components/apps/actions";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const { TextArea } = Input;
const { Meta } = Card;
const { Title } = Typography;
const { TabPane } = Tabs;

const Index = (props) => {
  const config = useSelector((state) => state.app);
  const [app, setApp] = useState({});
  const [action, setAction] = useState({});
  const [createAction, setCreateAction] = useState(false);
  const [appPage, setAppPage] = useState(1);
  const [defaultActionType, setDefaultActionType] = useState("");
  const [actionSelected, setActionSelected] = useState("");

  const [setupList, setSetupList] = useState([]);
  const [authList, setAuthList] = useState([]);
  const [createList, setCreateList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [hooksList, setHooksList] = useState([]);

  const [envSelectedData, setEnvSelectedData] = useState({});
  const [envSelected, setEnvSelected] = useState();
  const [error, setError] = useState("");
  const [selectedPage, setSelectedPage] = useState(-1);
  const [envSelectedPage, setEnvSelectedPage] = useState();
  const [user, setUser] = useState(config.user);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingActionButton, setLoadingActionButton] = useState(false);
  const [envDialog, setEnvDialog] = useState(false);
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

  const updateEnvData = async () => {
    try {
      setLoadingButton(true);
      NProgress.start();
      const result = await updateAppEnv({
        ...envSelectedData,
        token: user.auth_token,
        public_key: user.public_key,
        user_id: user._id,
        env_id: envSelectedData._id,
      });

      setLoadingButton(false);
      NProgress.done();
      if (result) {
        toast.success("Environment Updated");
        setApp(result.data.data);
        setEnvDialog(false);
      } else {
        toast.error("Something unexpected happened");
      }
    } catch (e) {
      setLoadingButton(false);
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  };

  const createActionData = async () => {
    try {
      setLoadingActionButton(true);
      NProgress.start();
      const result = await createActions({
        ...action,
        token: user.auth_token,
        public_key: user.public_key,
        user_id: user._id,
        app_id: props.app_id,
      });

      setLoadingActionButton(false);
      NProgress.done();
      if (result) {
        const app = await fetchAppData();
        setApp(app);

        toast.success("Action Added");
        //setApp(result.data.data);
        setAction({});
        setCreateAction(false);
      } else {
        toast.error("Something unexpected happened");
      }
    } catch (e) {
      setLoadingActionButton(false);
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  };

  const handleChange = (e) =>
    setEnvSelectedData({ ...envSelectedData, [e.target.name]: e.target.value });

  const handleChangeLimits = (e) => {
    const Limits = envSelectedData.limits;
    const limits = { ...Limits, [e.target.name]: e.target.value };
    setEnvSelectedData({ ...envSelectedData, limits });
  };

  const handleChangeWhiteList = (e) => {
    setEnvSelectedData({
      ...envSelectedData,
      whitelist: !envSelectedData.whitelist,
    });
  };

  const handleChangeActive = (e) => {
    setEnvSelectedData({ ...envSelectedData, active: !envSelectedData.active });
  };

  const handleChangeTag = (e) => {
    const tag = tagify(e.target.value);
    setAction({ ...action, tag });
  };

  const handleChangeName = (e) => {
    const name = tagify(e.target.value);
    setAction({ ...action, name });
  };

  const handleChangeResource = (e) => {
    const resource = resourcify(e.target.value);
    setAction({ ...action, resource });
  };

  const handleChangeAction = (e) => {
    setAction({ ...action, [e.target.name]: e.target.value });
  };

  const closeCreateActionDialog = () => {
    setCreateAction(false);
  };

  const showCreateActionDialog = (defaultActionType = "") => {
    setCreateAction(true);
    setDefaultActionType(defaultActionType);
  };

  const showEnvDialog = (index, e) => {
    setEnvSelected(index);
    setEnvSelectedData(app.envs[index]);
    setEnvSelectedPage(1);
    setEnvDialog(true);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const incEnvDialog = () => {
    let next = true;
    if (envSelectedPage === 1) {
      if (!envSelectedData.base_url) {
        next = false;
        toast.error("base url is required");
      } else if (!isValidHttpUrl(envSelectedData.base_url)) {
        next = false;
        toast.error("base url is invalid");
      } else if (!envSelectedData.request_type) {
        next = false;
        toast.error("default request-type is required");
      }
    }

    if (envSelectedPage === 3) {
      if (!envSelectedData.payment_type) {
        next = false;
        toast.error("payment type is required");
      }
    }

    if (next) {
      const value = envSelectedPage + 1;
      setEnvSelectedPage(value);
    }
  };

  const decEnvDialog = () => {
    const value = envSelectedPage - 1;
    setEnvSelectedPage(value);
  };

  const closeEnvDialog = () => {
    setEnvDialog(false);
  };

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

  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
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
      {app && app.envs ? (
        <Modal
          title={
            envSelected
              ? `${capitalize(envSelectedData.env_name)} Env`
              : `${capitalize(app.envs[0].env_name)} Env`
          }
          visible={envDialog}
          onCancel={closeEnvDialog}
          footer={[
            <Button key="submit" onClick={closeEnvDialog}>
              Cancel
            </Button>,
            <Button
              key="submit"
              onClick={decEnvDialog}
              disabled={envSelectedPage <= 1}
            >
              Prev
            </Button>,
            <Button
              key="submit"
              onClick={incEnvDialog}
              disabled={envSelectedPage >= 4}
            >
              Next
            </Button>,
            <Button
              key="submit"
              type="primary"
              disabled={envSelectedPage !== 4}
              loading={loadingButton}
              onClick={updateEnvData}
            >
              SAVE
            </Button>,
          ]}
        >
          <label>
            {envSelectedPage}/4:{" "}
            {envSelectedPage === 1
              ? "Setup"
              : envSelectedPage == 2
              ? "Request Limits"
              : envSelectedPage == 3
              ? "Billing"
              : envSelectedPage == 4
              ? "Finish"
              : ""}
          </label>
          {envSelectedPage === 1 ? (
            <div className="row">
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={envSelectedData.base_url || ""}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="baseUrl"
                    name="base_url"
                  />
                  <label>Base Url:</label>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-control"
                    name="request_type"
                    onChange={handleChange}
                    value={envSelectedData.request_type || ""}
                  >
                    <option disabled selected value="">
                      -- Select Request Type --
                    </option>
                    <option value="application/json">application/json</option>
                    <option value="application/x-www-form-urlencoded">
                      application/x-www-form-urlencoded
                    </option>
                    <option value="multipart/form-data">
                      multipart/form-data
                    </option>
                    <option value="SOAP">SOAP</option>
                  </select>
                  <label>Default Request Type:</label>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <TextArea
                    type="text"
                    value={envSelectedData.description || ""}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                    name="description"
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {envSelectedPage === 2 ? (
            <div className="row">
              <label className="text-muted">
                {" "}
                <InfoCircleOutlined /> Set as 0 for unlimited requests
              </label>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="number"
                    value={envSelectedData.limits.per_minute || 0}
                    onChange={handleChangeLimits}
                    required
                    className="form-control"
                    placeholder="Max Requests Per Minute: "
                    name="per_minute"
                  />
                  <label>Max Requests Per Minute: </label>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="number"
                    value={envSelectedData.limits.per_hour || 0}
                    onChange={handleChangeLimits}
                    required
                    className="form-control"
                    placeholder="Max Requests Per Hour: "
                    name="per_hour"
                  />
                  <label>Max Requests Per Hour: </label>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="number"
                    value={envSelectedData.limits.per_day || 0}
                    onChange={handleChangeLimits}
                    required
                    className="form-control"
                    placeholder="Max Requests Per Day: "
                    name="per_day"
                  />
                  <label>Max Requests Per Day: </label>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {envSelectedPage === 3 ? (
            <div className="row">
              <label className="text-muted">
                {" "}
                <InfoCircleOutlined /> We charge 20% on revenue generated; and
                charge you $0.002 per request on the free tier
              </label>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-control"
                    name="payment_type"
                    onChange={handleChange}
                    value={envSelectedData.payment_type || ""}
                  >
                    <option disabled selected value="">
                      -- Select Request Type --
                    </option>
                    <option value="per_action">Per Action</option>
                    <option value="monthly_subscription">
                      Subscriptions (Monthly)
                    </option>
                    <option value="custom">Custom</option>
                    <option value="free">Free</option>
                  </select>
                  <label>Payment Type</label>
                </div>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="number"
                    value={envSelectedData.cost || ""}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="cost"
                    name="cost"
                  />
                  <label>Default Cost ($)</label>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {envSelectedPage === 4 ? (
            <div className="row">
              <div className="col-12 mb-4">
                <label className="text-muted">
                  <InfoCircleOutlined /> Require Whitelisted IPs
                </label>
                <br />
                <br />
                <div className="">
                  <Checkbox
                    onChange={handleChangeWhiteList}
                    checked={envSelectedData.whitelist}
                  >
                    Require IP Whitelist
                  </Checkbox>
                </div>
              </div>
              <label className="text-muted mb-4"> </label>
              <div className="col-12 mb-4">
                <label className="text-muted">
                  <InfoCircleOutlined /> Activate and place environment online
                </label>
                <br />
                <br />
                <div className="">
                  <Checkbox
                    onChange={handleChangeActive}
                    checked={envSelectedData.active}
                  >
                    Active
                  </Checkbox>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Modal>
      ) : (
        <></>
      )}

      <Modal
        title="Create Action"
        visible={createAction}
        onCancel={closeCreateActionDialog}
        footer={[
          <Button key="submit" onClick={closeCreateActionDialog}>
            Cancel
          </Button>,

          <Button
            key="submit"
            type="primary"
            disabled={
              !(
                action.resource &&
                action.tag &&
                action.httpVerb &&
                action.type &&
                action.description
              )
            }
            loading={loadingActionButton}
            onClick={createActionData}
          >
            SAVE
          </Button>,
        ]}
      >
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={action.name || ""}
                onChange={handleChangeName}
                required
                className="form-control"
                placeholder="Name"
                name="name"
              />
              <label>Action Name</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={action.tag || ""}
                onChange={handleChangeTag}
                required
                className="form-control"
                placeholder="action"
                name="tag"
              />
              <label>Action Tag</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={action.resource || ""}
                onChange={handleChangeResource}
                required
                className="form-control"
                placeholder="resource"
                name="resource"
              />
              <label>Resource</label>
            </div>
            <label className="text-muted">
              {" "}
              <small>
                <InfoCircleOutlined /> resource e.g /v1/user/create, url
                extension that performs an action. Please delimit variable url
                parameters using the : operator. e.g /v1/user/:user_id/fetch
              </small>
            </label>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <select
                className="form-control"
                onChange={handleChangeAction}
                value={action.httpVerb || ""}
                name="httpVerb"
              >
                <option disabled selected value="">
                  -- HTTP Action Verbs --
                </option>
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
              <label>HTTP Action Verb</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <select
                className="form-control"
                onChange={handleChangeAction}
                value={action.type || defaultActionType || ""}
                disabled={Boolean(defaultActionType)}
                name="type"
              >
                <option disabled selected value="">
                  -- Select Action Type --
                </option>
                <option value="SETUP">Set Up</option>
                <option value="AUTH">Authorization</option>
                <option value="CREATE">Create</option>
                <option value="READ">Read</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
              </select>
              <label>Action Type</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <TextArea
                type="text"
                value={action.description || ""}
                onChange={handleChangeAction}
                required
                maxLength={50}
                minLength={10}
                placeholder="Description"
                name="description"
              />
            </div>
          </div>
        </div>
      </Modal>
      <section className="padding_10 row">
        <div className="row">
          <div className="col-2 border-end h-100">
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
                  <span>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item>Overview</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>

                    <span>
                      <br />
                      <span className="h-100">
                        <MdEditor
                          style={{ height: "700px" }}
                          renderHTML={(text) => mdParser.render(text)}
                          onChange={handleEditorChange}
                        />
                      </span>
                    </span>
                  </span>
                ) : null}

                {appPage === 2 && selectedPage == -1 ? (
                  <span>
                    <div>
                      <Breadcrumb>
                        <Breadcrumb.Item>Environments</Breadcrumb.Item>
                        <Breadcrumb.Item> </Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <List
                      grid={{
                        gutter: 20,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                      }}
                      dataSource={app.envs}
                      renderItem={(item, index) => (
                        <List.Item className="p-2">
                          <Card
                            className="hover-blue"
                            title={
                              <span>
                                <Avatar
                                  className="bg-gray text-primary me-2 border_radius font-weight-500"
                                  shape="square"
                                >
                                  {fetchInitials(capitalize(item.env_name))}
                                </Avatar>{" "}
                                {capitalize(item.env_name)}
                              </span>
                            }
                          >
                            <label>{item.description}</label>
                            <br />
                            <div className="row">
                              <label className="mt-4 text-muted col-9">
                                <Switch
                                  checked={item.active}
                                  onChange={(e) => {
                                    showEnvDialog(index, e);
                                  }}
                                />
                              </label>
                              <div className="col-3 mt-4">
                                <Button
                                  className="btn-outline-primary"
                                  onClick={() => {
                                    setSelectedPage(index);
                                  }}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </List.Item>
                      )}
                    />
                  </span>
                ) : null}

                {appPage === 3 ? (
                  <span>
                    <div>
                      <div className="row">
                        <div className="col-4">
                          <Breadcrumb>
                            <Breadcrumb.Item>Onboarding</Breadcrumb.Item>
                            <Breadcrumb.Item> </Breadcrumb.Item>
                          </Breadcrumb>
                        </div>
                        <span className="col-6"></span>
                        <span className="col-2">
                          <button
                            className="btn btn-outline-primary w-100"
                            onClick={() => {
                              showCreateActionDialog("SETUP");
                            }}
                          >
                            ADD STEP <PlusOutlined />
                          </button>
                        </span>
                      </div>
                    </div>

                    <div className="row padding_20">
                      <div className="col-1"></div>
                      <div className="col-10">
                        <List
                          dataSource={setupList}
                          renderItem={(item, index) => (
                            <List.Item className="pb-4 pt-4">
                              <Card
                                className="hover-blue w-100"
                                title={
                                  <span className="row">
                                    <span className="col-10">
                                      <Avatar
                                        className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                                        shape="square"
                                      >
                                        {fetchInitials(item.tag)}
                                      </Avatar>{" "}
                                      <label>{item.tag}</label>
                                    </span>
                                    <span className="col-2">
                                      <Button
                                        className="btn-outline-primary"
                                        onClick={() => {
                                          setActionSelected(item._id);
                                        }}
                                      >
                                        Configure <SettingOutlined />
                                      </Button>
                                    </span>
                                  </span>
                                }
                              >
                                <div className="row">
                                  <span className="col-11">
                                    <label>{item.description}</label>
                                  </span>
                                  <span className="text-muted col-1">
                                    <Switch checked={false} />
                                  </span>
                                </div>
                              </Card>
                            </List.Item>
                          )}
                        />
                      </div>
                      <div className="col-1"></div>
                    </div>
                  </span>
                ) : null}

                {appPage === 4 ? (
                  <span>
                    <div>
                      <div className="row">
                        <div className="col-4">
                          <Breadcrumb>
                            <Breadcrumb.Item>Auth</Breadcrumb.Item>
                            <Breadcrumb.Item> </Breadcrumb.Item>
                          </Breadcrumb>
                        </div>
                        <span className="col-6"></span>
                        <span className="col-2">
                          <button
                            className="btn btn-outline-primary w-100"
                            onClick={() => {
                              showCreateActionDialog("AUTH");
                            }}
                          >
                            ADD AUTH <PlusOutlined />
                          </button>
                        </span>
                      </div>
                      <div className="row padding_20">
                        <div className="col-1"></div>
                        <div className="col-10">
                          <List
                            dataSource={authList}
                            renderItem={(item, index) => (
                              <List.Item className="pb-4 pt-4">
                                <Card
                                  className="hover-blue w-100"
                                  title={
                                    <span className="row">
                                      <span className="col-10">
                                        <Avatar
                                          className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                                          shape="square"
                                        >
                                          {fetchInitials(item.tag)}
                                        </Avatar>{" "}
                                        <label>{item.tag}</label>
                                      </span>
                                      <span className="col-2">
                                        <Button
                                          className="btn-outline-primary"
                                          onClick={() => {
                                            setSelectedPage(index);
                                          }}
                                        >
                                          Configure <SettingOutlined />
                                        </Button>
                                      </span>
                                    </span>
                                  }
                                >
                                  <div className="row">
                                    <span className="col-11">
                                      <label>{item.description}</label>
                                    </span>
                                    <span className="text-muted col-1">
                                      <Switch checked={false} />
                                    </span>
                                  </div>
                                </Card>
                              </List.Item>
                            )}
                          />
                        </div>
                        <div className="col-1"></div>
                      </div>
                    </div>
                  </span>
                ) : null}

                {appPage === 5 ? (
                  <span>
                    <div className="row">
                      <div className="col-4">
                        <Breadcrumb>
                          <Breadcrumb.Item>CRUD Actions</Breadcrumb.Item>
                          <Breadcrumb.Item> </Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                      <span className="col-6"></span>
                      <span className="col-2">
                        <button
                          className="btn btn-outline-primary w-100"
                          onClick={() => {
                            showCreateActionDialog("");
                          }}
                        >
                          ADD CRUD ACTION <PlusOutlined />
                        </button>
                      </span>
                    </div>

                    <div>
                      <Tabs
                        defaultActiveKey="1"
                        className="page_tabs animated slideInUp"
                        tabBarStyle={{ paddingLeft: 44 }}
                        tabBarExtraContent={<div></div>}
                        //onChange={callback}
                      >
                        <TabPane
                          tab={
                            <span className="align-items-center d-flex">
                              Create Actions{" "}
                              <Badge
                                count={createList.length}
                                style={{ backgroundColor: "#E9ECF1" }}
                              />
                            </span>
                          }
                          key="4"
                        >
                          <section
                            className=""
                            style={{ height: "83vh", overflowY: "auto" }}
                          >
                            <div>
                              <div className="row padding_20">
                                <div className="col-1"></div>
                                <div className="col-10">
                                  <List
                                    dataSource={createList}
                                    renderItem={(item, index) => (
                                      <List.Item className="pb-4 pt-4">
                                        <Card
                                          className="hover-blue w-100"
                                          title={
                                            <span className="row">
                                              <span className="col-10">
                                                <Avatar
                                                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                                                  shape="square"
                                                >
                                                  {fetchInitials(item.tag)}
                                                </Avatar>{" "}
                                                <label>{item.tag}</label>
                                              </span>
                                              <span className="col-2">
                                                <Button
                                                  className="btn-outline-primary"
                                                  onClick={() => {
                                                    setSelectedPage(index);
                                                  }}
                                                >
                                                  Configure <SettingOutlined />
                                                </Button>
                                              </span>
                                            </span>
                                          }
                                        >
                                          <div className="row">
                                            <span className="col-11">
                                              <label>{item.description}</label>
                                            </span>
                                            <span className="text-muted col-1">
                                              <Switch checked={false} />
                                            </span>
                                          </div>
                                        </Card>
                                      </List.Item>
                                    )}
                                  />
                                </div>
                                <div className="col-1"></div>
                              </div>
                            </div>
                          </section>
                        </TabPane>
                        <TabPane
                          tab={
                            <span className="align-items-center d-flex">
                              Read Actions{" "}
                              <Badge
                                count={readList.length}
                                style={{ backgroundColor: "#E9ECF1" }}
                              />
                            </span>
                          }
                          key="5"
                        >
                          <section
                            className=""
                            style={{ height: "83vh", overflowY: "auto" }}
                          >
                            <div>
                              <div className="row padding_20">
                                <div className="col-1"></div>
                                <div className="col-10">
                                  <List
                                    dataSource={readList}
                                    renderItem={(item, index) => (
                                      <List.Item className="pb-4 pt-4">
                                        <Card
                                          className="hover-blue w-100"
                                          title={
                                            <span className="row">
                                              <span className="col-10">
                                                <Avatar
                                                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                                                  shape="square"
                                                >
                                                  {fetchInitials(item.tag)}
                                                </Avatar>{" "}
                                                <label>{item.tag}</label>
                                              </span>
                                              <span className="col-2">
                                                <Button
                                                  className="btn-outline-primary"
                                                  onClick={() => {
                                                    setSelectedPage(index);
                                                  }}
                                                >
                                                  Configure <SettingOutlined />
                                                </Button>
                                              </span>
                                            </span>
                                          }
                                        >
                                          <div className="row">
                                            <span className="col-11">
                                              <label>{item.description}</label>
                                            </span>
                                            <span className="text-muted col-1">
                                              <Switch checked={false} />
                                            </span>
                                          </div>
                                        </Card>
                                      </List.Item>
                                    )}
                                  />
                                </div>
                                <div className="col-1"></div>
                              </div>
                            </div>
                          </section>
                        </TabPane>
                        <TabPane
                          tab={
                            <span className="align-items-center d-flex">
                              Update Actions{" "}
                              <Badge
                                count={updateList.length}
                                style={{ backgroundColor: "#E9ECF1" }}
                              />
                            </span>
                          }
                          key="6"
                        >
                          <section
                            className=""
                            style={{ height: "83vh", overflowY: "auto" }}
                          >
                            <div>
                              <div className="row padding_20">
                                <div className="col-1"></div>
                                <div className="col-10">
                                  <List
                                    dataSource={updateList}
                                    renderItem={(item, index) => (
                                      <List.Item className="pb-4 pt-4">
                                        <Card
                                          className="hover-blue w-100"
                                          title={
                                            <span className="row">
                                              <span className="col-10">
                                                <Avatar
                                                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                                                  shape="square"
                                                >
                                                  {fetchInitials(item.tag)}
                                                </Avatar>{" "}
                                                <label>{item.tag}</label>
                                              </span>
                                              <span className="col-2">
                                                <Button
                                                  className="btn-outline-primary"
                                                  onClick={() => {
                                                    setSelectedPage(index);
                                                  }}
                                                >
                                                  Configure <SettingOutlined />
                                                </Button>
                                              </span>
                                            </span>
                                          }
                                        >
                                          <div className="row">
                                            <span className="col-11">
                                              <label>{item.description}</label>
                                            </span>
                                            <span className="text-muted col-1">
                                              <Switch checked={false} />
                                            </span>
                                          </div>
                                        </Card>
                                      </List.Item>
                                    )}
                                  />
                                </div>
                                <div className="col-1"></div>
                              </div>
                            </div>
                          </section>
                        </TabPane>
                        <TabPane
                          tab={
                            <span className="align-items-center d-flex">
                              Delete Actions{" "}
                              <Badge
                                count={deleteList.length}
                                style={{ backgroundColor: "#E9ECF1" }}
                              />
                            </span>
                          }
                          key="7"
                        >
                          <section
                            className=""
                            style={{ height: "83vh", overflowY: "auto" }}
                          >
                            <div>
                              <div className="row padding_20">
                                <div className="col-1"></div>
                                <div className="col-10">
                                  <List
                                    dataSource={deleteList}
                                    renderItem={(item, index) => (
                                      <List.Item className="pb-4 pt-4">
                                        <Card
                                          className="hover-blue w-100"
                                          title={
                                            <span className="row">
                                              <span className="col-10">
                                                <Avatar
                                                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                                                  shape="square"
                                                >
                                                  {fetchInitials(item.tag)}
                                                </Avatar>{" "}
                                                <label>{item.tag}</label>
                                              </span>
                                              <span className="col-2">
                                                <Button
                                                  className="btn-outline-primary"
                                                  onClick={() => {
                                                    setSelectedPage(index);
                                                  }}
                                                >
                                                  Configure <SettingOutlined />
                                                </Button>
                                              </span>
                                            </span>
                                          }
                                        >
                                          <div className="row">
                                            <span className="col-11">
                                              <label>{item.description}</label>
                                            </span>
                                            <span className="text-muted col-1">
                                              <Switch checked={false} />
                                            </span>
                                          </div>
                                        </Card>
                                      </List.Item>
                                    )}
                                  />
                                </div>
                                <div className="col-1"></div>
                              </div>
                            </div>
                          </section>
                        </TabPane>
                      </Tabs>
                    </div>
                  </span>
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
            ) : null}
            {selectedPage > -1 && appPage === 2 ? (
              <span className="padding_10">
                <span
                  className="padding_10 pointer top-margin"
                  onClick={() => {
                    setSelectedPage(-1);
                  }}
                >
                  <LeftOutlined />
                </span>
                <br />
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10">
                    <Card
                      bordered={false}
                      style={{
                        width: "100%",
                      }}
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Meta
                        title={
                          <span>
                            <Avatar
                              className="bg-gray text-primary me-2 border_radius font-weight-500"
                              shape="square"
                            >
                              {fetchInitials(
                                capitalize(app.envs[selectedPage].env_name)
                              )}
                            </Avatar>{" "}
                            {capitalize(app.envs[selectedPage].env_name)}
                          </span>
                        }
                        description={app.envs[selectedPage].description}
                      />
                      <br />

                      <table className="table border">
                        <tbody>
                          <tr>
                            <td>Base URL:</td>
                            <td>
                              <a
                                href={app.envs[selectedPage].base_url}
                                target="blank"
                              >
                                {app.envs[selectedPage].base_url || "undefined"}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Default Content-Type:</td>
                            <td>
                              <label className="text-primary">
                                {app.envs[selectedPage].request_type ||
                                  "undefined"}
                              </label>
                            </td>
                          </tr>
                          <tr>
                            <td>Pricing Strategy:</td>
                            <td>
                              <Tag color="geekblue">
                                {String(
                                  app.envs[selectedPage].payment_type
                                ).toUpperCase()}
                              </Tag>
                            </td>
                          </tr>
                          <tr>
                            <td>Base Price:</td>
                            <td>
                              ${app.envs[selectedPage].cost || "undefined"}
                            </td>
                          </tr>
                          <tr>
                            <td>Inbound Requests:</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Inbound Responses:</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Average Latency:</td>
                            <td>
                              <label className="text-muted">0ms</label>
                            </td>
                          </tr>
                          <tr>
                            <td>Success Rate:</td>
                            <td>0</td>
                          </tr>
                          <tr>
                            <td>Status:</td>
                            <td>
                              <Switch
                                checked={app.envs[selectedPage].active}
                                onChange={(e) => {
                                  showEnvDialog(selectedPage, e);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Require Whitelist:</td>
                            <td>
                              <Switch
                                checked={app.envs[selectedPage].active}
                                onChange={(e) => {
                                  showEnvDialog(selectedPage, e);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Default Test Environment:</td>
                            <td>
                              <Switch
                                checked={app.envs[selectedPage].default_sandbox}
                                onChange={(e) => {
                                  showEnvDialog(selectedPage, e);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Default Live Environment:</td>
                            <td>
                              {" "}
                              <Switch
                                checked={app.envs[selectedPage].default_prod}
                                onChange={(e) => {
                                  showEnvDialog(selectedPage, e);
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Card>
                  </div>
                  <div className="col-1"></div>
                </div>
              </span>
            ) : (
              <></>
            )}

            {actionSelected?(<div>
              <Actions action_id={actionSelected} app_id={app_id} user_data={config.user}/>
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
