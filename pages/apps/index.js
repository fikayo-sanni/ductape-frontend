import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import {
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  Tabs,
  Typography,
  List,
  Card,
  Avatar,
  Modal,
  Input,
  Button,
  Menu,
  Breadcrumb,
} from "antd";
import NProgress from "nprogress";
import { toast } from "react-hot-toast";
import moment from "moment";
import { configStore } from "../../data/configStore";
import { observer } from "mobx-react-lite";
import {
  cleanFields,
  getTotalRow,
  Loading,
  fetchInitials,
  capitalize,
} from "../../components/config/constant";
import {
  createApp,
  fetchWorkspaceApps,
} from "../../components/services/apps.service";
import { updateDefaultEnvs } from "../../components/services/workspaces.service";
import { useDispatch, useSelector } from "react-redux";
import { changeWorkspaces, changeApps } from "../../data/applicationSlice";


const { TextArea } = Input;

const Index = observer((props) => {
  const config = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const defaultValue = {
    env_name: "",
    slug: "",
    description: "",
  };
  const [user, setUser] = useState(config.user);
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultEnvs, setDefaultEnvs] = useState([{ ...defaultValue }]);
  const [defaultLoading, setDefaultLoading] = useState(false);
  const [app, setApp] = useState({});
  const [inputFields, setInputFields] = useState([
    ...defaultEnvs,
    { ...defaultValue },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultsModalVisible, setIsDefaultsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDefaultsModal = () => {
    setIsDefaultsModalVisible(true);
  };

  const handleDefaultCancel = async () => {
    setIsDefaultsModalVisible(false);
  };

  const allFieldsDefaultSet = () => {
    let valid = true;
    let exists = false;
    inputFields.map((data, index) => {
      const { env_name, slug } = data;
      if (env_name && !slug) {
        valid = false;
        toast.error(`Slug is required for ${env_name}`);
      }
      if (slug && !env_name) {
        valid = false;
        toast.error(`Environment name is required for ${slug}`);
      }

      if (env_name && slug && slug.length !== 3) {
        valid = false;
        toast.error(`Slugs should ony be 3 characters`);
      } else if (env_name && slug && slug.length === 3) {
        exists = true;
      }
    });

    if (!exists) {
      toast.error(`There should be atleast one valid default environment`);
      return exists;
    }

    return valid;
  };

  const handleDefaultOk = async () => {
    if (allFieldsDefaultSet()) {
      setDefaultLoading(true);
      try {
        NProgress.start();
        const { auth_token: token, _id: user_id, public_key } = user;
        const create = await updateDefaultEnvs({
          token,
          user_id,
          public_key,
          workspace_id: config.defaultWorkspaceId,
          envs: cleanFields(inputFields),
        });
        dispatch(changeWorkspaces(create.data.data));
        toast.success("Default Environments Updated");
        setDefaultLoading(false);
        setIsDefaultsModalVisible(false);
        NProgress.done();
      } catch (e) {
        setDefaultLoading(false);
        NProgress.done();
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
      }
    }
  };

  const handleOk = async () => {
    if (app.app_name) {
      setLoading(true);
      try {
        NProgress.start();
        const { auth_token: token, _id: user_id, public_key } = user;
        const create = await createApp({
          ...app,
          token,
          user_id,
          public_key,
          workspace_id: config.defaultWorkspaceId,
        });
        toast.success("App Created");
        setLoading(false);
        setApps(create.data.data);
        setIsModalVisible(false);
        NProgress.done();
      } catch (e) {
        setLoading(false);
        NProgress.done();
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
      }
    } else {
      toast.error("App Name Required");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) =>
    setApp({ ...app, [e.target.name]: e.target.value });

  const handleChangeEnv = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const handleKeyPress = (index, e) => {
    if (index === inputFields.length - 1) {
      setInputFields([...inputFields, { ...defaultValue }]);
    }
  };

  useEffect(async () => {
    config.workspaces.map((data, index) => {
      if (data.workspace_id === config.defaultWorkspaceId) {
        // setDefaultWorkspace(data)
        if (data.defaultEnvs) {
          setInputFields([...data.defaultEnvs, { ...defaultValue }]);
        }
      }
    });

    const { auth_token: token, _id: user_id, public_key } = user;

    const configApps = config.apps;

    if (
      configApps &&
      configApps.length &&
      configApps[0].workspace_id === config.defaultWorkspaceId
    )
      setApps(configApps);
    try {
      const apps = await fetchWorkspaceApps({
        token,
        user_id,
        public_key,
        workspace_id: config.defaultWorkspaceId,
      });
      dispatch(changeApps(apps.data.data));
      if (apps.data.data.length) {
        setApps(apps.data.data);
      } else {
        setError("No Apps");
        toast.error("No Apps");
      }
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error || e.toString());
      toast.error(error);
    }
  }, []);

  const Apps = (
    <div>
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
        dataSource={apps}
        renderItem={(item, index) => (
          <List.Item className="p-2">
            <Link href={`/apps/${item._id}`}>
              <Card
                title={
                  <span>
                    <Avatar
                      className="bg-gray text-primary me-2 border_radius font-weight-500"
                      shape="square"
                    >
                      {fetchInitials(capitalize(item.app_name))}
                    </Avatar>{" "}
                    {capitalize(item.app_name)}
                  </span>
                }
                className="hover-blue"
              >
                <div className="row">
                  <label className="mt-2 text-muted col-9">
                    <label className="btn btn-light text-muted">
                      {item.envs.length} envs
                    </label>
                  </label>
                </div>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
  return (
    <Dashboard_Layout title="Apps">
      <Modal
        title="Create App"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Create
          </Button>,
        ]}
      >
        <form id="login_form" onSubmit={(e) => login(e, "login_button")}>
          <p className="text-muted">
            Each app defines its own environments, workflows and rules for
            authorization, authentication and integration. Allowing for secure
            communication between your webservices and integration partners
          </p>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  value={app.app_name}
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="App Name"
                  name="app_name"
                />
                <label>App Name</label>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="form-floating">
                <TextArea
                  rows={5}
                  value={app.description}
                  onChange={handleChange}
                  placeholder="Describe your app... (optional)"
                  maxLength={200}
                  name="description"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title="Default Environments"
        visible={isDefaultsModalVisible}
        onOk={handleDefaultOk}
        onCancel={handleDefaultCancel}
        width={900}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={defaultLoading}
            onClick={handleDefaultOk}
          >
            Save
          </Button>,
        ]}
      >
        <form id="login_form" onSubmit={(e) => login(e, "login_button")}>
          <p className="text-muted">
            Configure which environments are created automatically for new apps
          </p>
          {inputFields.map((input, index) => {
            return (
              <div className="row">
                <div className="col-4 mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      value={input.env_name}
                      onChange={(e) => {
                        handleChangeEnv(index, e);
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(index, e);
                      }}
                      required
                      className="form-control"
                      placeholder="Env Name"
                      name="env_name"
                    />
                    <label>Env Name</label>
                  </div>
                </div>

                <div className="col-2 mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      value={input.slug}
                      onChange={(e) => {
                        handleChangeEnv(index, e);
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(index, e);
                      }}
                      required
                      className="form-control"
                      placeholder="Slug"
                      name="slug"
                    />
                    <label>Slug</label>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="form-floating">
                    <input
                      type="text"
                      value={input.description}
                      onChange={(e) => {
                        handleChangeEnv(index, e);
                      }}
                      onKeyPress={(e) => {
                        handleKeyPress(index, e);
                      }}
                      required
                      className="form-control"
                      placeholder="Description"
                      name="description"
                    />
                    <label>Description</label>
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </Modal>
      <section className="padding_10">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Apps</Breadcrumb.Item>
            <Breadcrumb.Item className="text-white">""</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-2">
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="border-none"
            >
              <Menu.Item key="1">
                <span>All</span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>Draft</span>
              </Menu.Item>
              <Menu.Item key="3">
                <span>Private</span>
              </Menu.Item>
              <Menu.Item key="4">
                <span>Public</span>
              </Menu.Item>
            </Menu>
            <button
              className="btn btn-outline-primary w-100 mb-3 mt-3 text-uppercase"
              onClick={showModal}
            >
              Apps <PlusOutlined />
            </button>
            <button
              className="btn btn-outline-danger w-100 text-uppercase"
              onClick={showDefaultsModal}
            >
              Envs <SettingOutlined />
            </button>
          </div>
          <div className="col-10">
            {!apps.length && !error ? <Loading /> : Apps}
            {error && !apps.length ? <></> : ""}
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
});

export default Index;
