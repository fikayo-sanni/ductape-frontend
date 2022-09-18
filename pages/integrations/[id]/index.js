import Dashboard_Layout from "../../../components/layout/dashboard_layout";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Menu, List, Card, Avatar, Switch, Button } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  Loading,
  capitalize,
  fetchInitials,
} from "../../../components/config/constant";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";

const Index = (props) => {
  const config = useSelector((state) => state.app);
  const env_data = [
    {
      title: "Sandbox",
      description: "Sandbox Environment",
    },
    {
      title: "Production",
      description: "Production Environment",
    },
  ];

  const app_data = [
    {
      title: "NIBBS",
    },
    {
      title: "Flutterwave",
    },
    {
      title: "MTN Cameroon",
    },
    {
      title: "DSTV Uganda",
    },
    {
      title: "Bank of Ghana",
    },
  ];

  const feature_data = [
    {
      title: "Account Creation",
    },
    {
      title: "Accounts Credit",
    },
    {
      title: "Account Debit",
    },
    {
      title: "Local Settlement Payment",
    },
    {
      title: "Account Deletion",
    },
  ];

  const [featureSelected, setFeatureSelected] = useState("");
  const [page, setPage] = useState(1);

  useEffect(async () => {}, []);

  return (
    <Dashboard_Layout title={"App"}>
      <section className="padding_10 row">
        <div className="row">
          <div className="col-2">
            <br />
            <div className="padding_10">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href={"/integrations"}>Integrations</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>XCel App </Breadcrumb.Item>
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
                  setPage(1);
                  setFeatureSelected("");
                }}
              >
                <span>Envs</span>
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => {
                  setPage(2);
                  setFeatureSelected("");
                }}
              >
                <span>Apps</span>
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  setPage(3);
                  setFeatureSelected("");
                }}
              >
                <span>Features</span>
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => {
                  setPage(4);
                  setFeatureSelected("");
                }}
              >
                <span>Access Keys</span>
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => {
                  setPage(5);
                  setFeatureSelected("");
                }}
              >
                <span>Data Caches</span>
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => {
                  setPage(6);
                  setFeatureSelected("");
                }}
              >
                <span>Activity</span>
              </Menu.Item>
            </Menu>
          </div>
          <div className="col-10">
            {page === 1 && !featureSelected ? (
              <div>
                <br />
                <div className="padding_10">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href={"/integrations"}>XCel App</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Envs </Breadcrumb.Item>
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
                  dataSource={env_data}
                  renderItem={(item) => (
                    <List.Item className="p-2">
                      <Card
                        className="hover-blue"
                        title={
                          <span>
                            <Avatar
                              className="bg-gray text-primary me-2 border_radius font-weight-500"
                              shape="square"
                            >
                              {fetchInitials(capitalize(item.title))}
                            </Avatar>{" "}
                            {item.title}
                          </span>
                        }
                      >
                        <p>{item.description}</p>
                        <Switch></Switch>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            ) : null}
            {page === 2 && !featureSelected ? (
              <div>
                <br />
                <div className="padding_10">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href={"/integrations"}>XCel App</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Apps </Breadcrumb.Item>
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
                  dataSource={app_data}
                  renderItem={(item) => (
                    <List.Item className="p-2">
                      <Card
                        className="hover-blue"
                        title={
                          <span>
                            <Avatar
                              className="bg-gray text-primary me-2 border_radius font-weight-500"
                              shape="square"
                            >
                              {fetchInitials(capitalize(item.title))}
                            </Avatar>{" "}
                            {item.title}
                          </span>
                        }
                      >
                        <label className="btn btn-light text-muted mt-2">
                          2 envs
                        </label>
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            ) : null}

            {page === 3 && !featureSelected ? (
              <div>
                <br />
                <div className="padding_10">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href={"/integrations"}>XCel App</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Features </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="row">
                  <div className="col-1"></div>
                  <List
                    className="col-10"
                    bordered={false}
                    dataSource={feature_data}
                    renderItem={(item, index) => (
                      <List.Item className="p-2">
                        <Card
                          className="hover-blue w-100 m-3"
                          title={
                            <span>
                              <Avatar
                                className="bg-gray text-primary me-2 border_radius font-weight-500"
                                shape="square"
                              >
                                {fetchInitials(capitalize(item.title))}
                              </Avatar>{" "}
                              {item.title}
                            </span>
                          }
                        >
                          <Button
                            className="btn-outline-primary"
                            onClick={() => {
                              setFeatureSelected(`${index}`);
                            }}
                          >
                            Configure <SettingOutlined />
                          </Button>
                        </Card>
                      </List.Item>
                    )}
                  />
                  <div className="col-1"></div>
                </div>
              </div>
            ) : null}

            {featureSelected ? (
              <div>
                <br />
                <div className="padding_10">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href={"/integrations"}>XCel App</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Create Intro </Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="padding_20 row">
                  <div className="col-4 h-100">
                    <Card
                      className="hover-blue"
                      title={<span>Data Source</span>}
                    >
                      Schema
                    </Card>
                    <br />
                    <button className="btn btn-outline-primary w-100">
                      ADD DATA SOURCE <PlusOutlined />
                    </button>
                  </div>
                  <div className="col-4 h-100">
                    <Card
                      className="hover-blue"
                      title={<span>Action</span>}
                    >
                      Schema
                    </Card>
                    <br />
                    <button className="btn btn-outline-primary w-100">
                      ADD APP ACTION <PlusOutlined />
                    </button>
                  </div>
                  <div className="col-4 h-100">
                    <Card
                      className="hover-blue"
                      title={<span>Response Formatter</span>}
                    >
                      Schema
                    </Card>
                  </div>
                </div>
              </div>
            ) : null}
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
