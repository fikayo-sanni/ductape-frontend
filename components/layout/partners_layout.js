import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Menu,
  Badge,
  Tabs,
  Radio,
  Avatar,
  Card,
} from "antd";
import Link from "next/link";
// import { Editor } from "react-draft-wysiwyg";


import { configStore } from "../../data/configStore";
import { observer } from "mobx-react-lite";

import Icon, {
  DownCircleOutlined,
  UpCircleOutlined,
  SendOutlined,
  LinkOutlined,
  SmileOutlined,
} from "@ant-design/icons";


const SubMenu = Menu.SubMenu;
const TabPane = Tabs;

const Partners_Layout = (props) => {
  const { children } = props;
  // const config = useSelector((state) => state.app);

  useEffect(async () => {}, []);

  const [showOutgoing, setShowOutgoing] = useState(false);
  const [showIncoming, setShowIncoming] = useState(false);

  const [tabPosition, setTabPosition] = useState("top");


  const onClick = (e) => {
    console.log("click ", e);
  };

  const showOutGoingStages = (e) => {
    // console.log("click ", e);
    setShowOutgoing(!showOutgoing);
  };
  const showIncomingStages = (e) => {
    // console.log("click ", e);
    setShowIncoming(!showIncoming);
  };

  return (
    <Dashboard_Layout title={"Partners"}>
      <section className="pt-4 pe-5 row"></section>
      <section className="padding_10">
        <div className="row h-80">
          <div className="col-2 border-end">
            <div
              onClick={showOutGoingStages}
              className="border-bottom p-3 text-muted row"
            >
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>Partners</Breadcrumb.Item>
                  <Breadcrumb.Item>Pipes</Breadcrumb.Item>
                </Breadcrumb>
                <br />
                <br />
              </div>
              <span className="col-3">Outgoing</span>{" "}
              <span className="col-7"></span>
              <div className="col-2">
                {!showOutgoing ? <DownCircleOutlined /> : <UpCircleOutlined />}
              </div>
            </div>
            {showOutgoing ? (
              <div>
                <Menu
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  theme="light"
                  inlineCollapsed={false}
                  className="border-none"
                >
                  <Menu.Item key="1">
                    Reached Out{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Requested Sandbox{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Sandbox Access{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Production Access{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Live Ops{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                </Menu>
                <br />
                <button className="btn btn-lg p-2 mt-4 btn-outline-primary w-100">
                  Add +{" "}
                </button>
              </div>
            ) : null}
            <div
              onClick={showIncomingStages}
              className="border-bottom p-3 text-muted row"
            >
              <span className="col-3">Incoming</span>{" "}
              <span className="col-7"></span>
              <div className="col-2">
                {!showIncoming ? <DownCircleOutlined /> : <UpCircleOutlined />}
              </div>
            </div>
            {showIncoming ? (
              <div>
                <Menu
                  defaultSelectedKeys={["1"]}
                  mode="inline"
                  theme="light"
                  inlineCollapsed={false}
                  className="border-none"
                >
                  <Menu.Item>
                    Reached Out{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Requested Sandbox{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Sandbox Access{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    Production Access{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>

                  <Menu.Item>
                    Live Ops{" "}
                    <Badge
                      count={5}
                      style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                    />
                  </Menu.Item>
                </Menu>
                <br />
                <button className="btn btn-lg p-2 mt-4 btn-outline-primary w-100">
                  Add +{" "}
                </button>
              </div>
            ) : null}
          </div>
          <div className="col-10 row h-100">{children}</div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default Partners_Layout;
/*
export const getServerSideProps = async ({ params }) => {
  const {action_id} = params;
  return {
    props: { action_id },
  };
};*/
