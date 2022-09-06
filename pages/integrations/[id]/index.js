import Dashboard_Layout from "../../../components/layout/dashboard_layout";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  Menu,
  List,
  Card,
  Avatar,
} from "antd";
import { useSelector } from "react-redux";



const Index = (props) => {
    const config = useSelector((state) => state.app);
  const data = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
  ];

  useEffect(async () => {}, []);

  return (
    <Dashboard_Layout title={"App"}>
      <section className="padding_10 row">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Integrations</Breadcrumb.Item>
            <Breadcrumb.Item>Project </Breadcrumb.Item>
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
                <span>Overview</span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>Envs</span>
              </Menu.Item>
              <Menu.Item key="3">
                <span>Apps</span>
              </Menu.Item>
              <Menu.Item key="4">
                <span>Features</span>
              </Menu.Item>
              <Menu.Item key="5">
                <span>Access Keys</span>
              </Menu.Item>
              <Menu.Item key="6">
                <span>Data Caches</span>
              </Menu.Item>
              <Menu.Item key="7">
                <span>Activity</span>
              </Menu.Item>
            </Menu>
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
