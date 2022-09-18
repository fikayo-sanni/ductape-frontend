import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import { Modal, Breadcrumb, Menu, List, Card, Avatar, Button, Input } from "antd";
import Link from "next/link";

import { configStore } from "../../data/configStore";
import { observer } from "mobx-react-lite";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Index = (props) => {
  const config = useSelector((state) => state.app);
  const data = [
    {
      title: "XCelApp Backend",
    },
    {
      title: "Exqu Logistics Service",
    },
    {
      title: "Batman App",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultsModalVisible, setIsDefaultsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [proj, setProj] = useState({});
  const defaultValue = {
    env_name: "",
    slug: "",
    description: "",
  };
  const [inputFields, setInputFields] = useState([
    { ...defaultValue },
  ]);
  const [defaultLoading, setDefaultLoading] = useState(false);

  const { TextArea } = Input;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDefaultsModal = () => {
    setIsDefaultsModalVisible(true);
  };
  const handleOk = async () => {};

  const handleDefaultOk = async () => {};

  const handleDefaultCancel = async () => {
    setIsDefaultsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) =>
    setApp({ ...proj, [e.target.name]: e.target.value });

  useEffect(async () => {}, []);

  return (
    <Dashboard_Layout title={"App"}>
      <Modal
        title="Create Project"
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
          <p className="text-muted"></p>
          <div className="row">
            <div className="col-12 mb-4">
              <div className="form-floating">
                <input
                  type="text"
                  value={proj.name}
                  required
                  onChange={handleChange}
                  className="form-control"
                  placeholder="App Name"
                  name="app_name"
                />
                <label>Project Name</label>
              </div>
            </div>
            <div className="col-12 mb-4">
              <div className="form-floating">
                <TextArea
                  rows={5}
                  value={proj.description}
                  onChange={handleChange}
                  placeholder="Describe your project... (optional)"
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
            Configure which environments are created automatically for new projects
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
      <section className="padding_10 row">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Integrations</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
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
                <span>Released</span>
              </Menu.Item>
            </Menu>
            <button
              className="btn btn-outline-primary w-100 mb-3 mt-3 text-uppercase"
              onClick={showModal}
            >
              Project <PlusOutlined />
            </button>
            <button
              className="btn btn-outline-danger w-100 text-uppercase"
              onClick={showDefaultsModal}
            >
              Envs <SettingOutlined />
            </button>
          </div>
          <div className="col-10">
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
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item className="p-2">
                  <Link href={`/integrations/${index}`}>
                    <Card
                      className="hover-blue"
                      title={
                        <span>
                          <Avatar
                            className="bg-gray text-primary me-2 border_radius font-weight-500"
                            shape="square"
                          >
                            S
                          </Avatar>{" "}
                          {item.title}
                        </span>
                      }
                    >
                      <p>Discover the prefontal cortex of programming</p>
                      <label className="btn btn-light text-muted mt-2">
                        2 envs
                      </label>
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default Index;
/*
export const getServerSideProps = async ({ params }) => {
  const {action_id} = params;
  return {
    props: { action_id },
  };
};*/
