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
  Slider,
  Switch,
  Empty,
  Radio,
} from "antd";
import Icon, {
  InfoCircleOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { configStore } from "../../../data/configStore";
import { observer } from "mobx-react-lite";
import {
  fetchApp,
  updateAppEnv,
} from "../../../components/services/apps.service";
import { createActions } from "../../../components/services/actions.service";
import {
  getTotalRow,
  Loading,
  capitalize,
  isValidHttpUrl,
  tagify,
  resourcify,
  uniqueCheck
} from "../../../components/config/constant";
import NProgress from "nprogress";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const { TextArea } = Input;

const Index = observer((props) => {
  const config = useContext(configStore);
  const [app, setApp] = useState({});
  const [action, setAction] = useState({});
  const [createAction, setCreateAction] = useState(false);

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

  const showCreateActionDialog = () => {
    setCreateAction(true);
  };

  const showEnvDialog = (index, e) => {
    setEnvSelected(index);
    setEnvSelectedData(app.envs[index]);
    setEnvSelectedPage(1);
    setEnvDialog(true);
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
          if(uniqueCheck(setupList, data))setupList.push(data);
          setSetupList(setupList);
        }
        if (type === "AUTH") {
          if(uniqueCheck(authList, data))authList.push(data);
          setAuthList(authList);
        }
        if (type === "CREATE") {
          if(uniqueCheck(createList, data))createList.push(data);
          setCreateList(createList);
        }
        if (type === "READ") {
          if(uniqueCheck(readList, data))readList.push(data);
          setReadList(readList);
        }
        if (type === "UPDATE") {
          if(uniqueCheck(updateList, data))updateList.push(data);
          setUpdateList(updateList);
        }
        if (type === "DELETE") {
          if(uniqueCheck(deleteList, data))deleteList.push(data);
          setDeleteList(deleteList);
        }
        if (type === "HOOKS") {
          if(uniqueCheck(hooksList, data))hooksList.push(data);
          setHooksList(hooksList);
        }
        //alert(setupList.length)
      
    });
  };

  useEffect(async () => {
    try {
      const app = await fetchAppData();
      if (app.workspace_id === config.defaultWorkspaceId) {
        categorizeActions(app.actions)
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

  let arrRowItems = [];

  if (app.envs) arrRowItems = getTotalRow(app.envs, 3);

  const columns = [
    {
      title: "Active",
      key: "active",
      render: (_, record) => (
        <Space size="middle">
          <Switch />
        </Space>
      ),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (text) => <label className="font-weight-500">{text}</label>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <label className="text-muted">{text}</label>,
    },
    {
      title: "Category",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <badge className="border_radius border p-2">{text}</badge>
      ),
    },
    {
      title: "Method",
      dataIndex: "httpVerb",
      key: "httpVerb",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    {
      title: "Resource",
      dataIndex: "resource",
      key: "resource",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`/apps/${app_id}/actions/${record._id}`}>
            Configure <SettingOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Dashboard_Layout title={app.app_name || "App"}>
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
                value={action.type || ""}
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
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/apps">Apps</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{app.app_name || "App"}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {Object.keys(app).length && !error ? (
          <div>
            <div>
              <h4 className="ms-3">Environments</h4>
              {app.envs.length ? (
                <div>
                  {arrRowItems.map((rowItems, index) => {
                    return (
                      <div key={"key-" + index}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                          }}
                        >
                          {rowItems.map((item, index) => {
                            return (
                              <div>
                                <div
                                  className="border animated slideInDown p-4 border_radius m-3 mb-0 hover-blue"
                                  onClick={(e) => {
                                    showEnvDialog(index, e);
                                  }}
                                >
                                  <h5 className="m-0">
                                    {capitalize(item.env_name)}{" "}
                                  </h5>

                                  <label className="mt-4 text-muted">
                                    <Switch checked={item.active} />
                                  </label>
                                </div>
                                {index !== 2 ? (
                                  <div style={{ width: "15 px" }}></div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                        {index !== arrRowItems.length - 1 ? (
                          <div style={{ marginTop: "30px" }}></div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Empty></Empty>
              )}
              <br />
              <h4 className="ms-3 mt-3">Actions</h4>

              <Tabs
                defaultActiveKey="1"
                className="page_tabs animated slideInUp"
                tabBarStyle={{ paddingLeft: 44 }}
                tabBarExtraContent={
                  <div>
                    <button
                      className="btn btn-primary btn-pill font-white text-uppercase"
                      onClick={showCreateActionDialog}
                    >
                      Create Action
                    </button>
                  </div>
                }
                //onChange={callback}
              >
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Setup{" "}
                      <Badge
                        count={setupList.length}
                        style={{ backgroundColor: "#E9ECF1" }}
                      />
                    </span>
                  }
                  key="2"
                >
                  <section
                    className=""
                    style={{ height: "83vh", overflowY: "auto" }}
                  >
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={setupList}
                        columns={columns}
                        pagination={{
                          showTotal: (total, range) =>
                            `Showing ${range[0]}-${range[1]} of ${total} results`,
                          defaultPageSize: 5,
                          showSizeChanger: true,
                        }}
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Auth{" "}
                      <Badge
                        count={authList.length || 0}
                        style={{ backgroundColor: "#E9ECF1" }}
                      />
                    </span>
                  }
                  key="3"
                >
                  <section
                    className=""
                    style={{ height: "83vh", overflowY: "auto" }}
                  >
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={authList}
                        columns={columns}
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Create{" "}
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
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={createList}
                        columns={columns}
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Read{" "}
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
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={readList}
                        columns={columns}
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Update{" "}
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
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={updateList}
                        columns={columns}
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Delete{" "}
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
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={deleteList}
                        columns={columns}
                      />
                    </div>
                  </section>
                </TabPane>
                <TabPane
                  tab={
                    <span className="align-items-center d-flex">
                      Hooks{" "}
                      <Badge
                        count={hooksList.length}
                        style={{ backgroundColor: "#E9ECF1" }}
                      />
                    </span>
                  }
                  key="8"
                >
                  <section
                    className=""
                    style={{ height: "83vh", overflowY: "auto" }}
                  >
                    <div className="p-3">
                      <Table
                        showHeader={false}
                        dataSource={hooksList}
                        columns={columns}
                      />
                    </div>
                  </section>
                </TabPane>
              </Tabs>
            </div>
            :
          </div>
        ) : !error ? (
          <Loading />
        ) : (
          <Empty description={<span>{error}</span>}></Empty>
        )}
      </section>
    </Dashboard_Layout>
  );
});

/**
 *
 */

export default Index;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;
  return {
    props: { app_id },
  };
};
