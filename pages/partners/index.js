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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { configStore } from "../../data/configStore";
import { observer } from "mobx-react-lite";

import Icon, {
  DownCircleOutlined,
  UpCircleOutlined,
  SendOutlined,
  LinkOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

const SubMenu = Menu.SubMenu;
const TabPane = Tabs;

const Index = (props) => {
  const config = useSelector((state) => state.app);

  useEffect(async () => {}, []);

  const [showOutgoing, setShowOutgoing] = useState(false);
  const [showIncoming, setShowIncoming] = useState(false);

  const [tabPosition, setTabPosition] = useState("top");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

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
              <Menu.Item
                key="1">
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
          <div className="col-10 row h-100">
            <div className="col-3 padding_10 border-end">
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>Outgoing</Breadcrumb.Item>
                  <Breadcrumb.Item>Reached Out</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <br />

              <div className="p-3 hover-grey">
                <Avatar
                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                  shape="square"
                >
                  S
                </Avatar>
                Startupia
              </div>
              <div className="p-3 hover-grey">
                <Avatar
                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                  shape="square"
                >
                  F
                </Avatar>
                Flutterwave
              </div>
              <div className="p-3 hover-grey">
                <Avatar
                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                  shape="square"
                >
                  C
                </Avatar>
                Careem
              </div>
              <div className="p-3 hover-grey">
                <Avatar
                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                  shape="square"
                >
                  T
                </Avatar>
                Tookan
              </div>
              <div className="p-3 hover-grey">
                <Avatar
                  className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                  shape="square"
                >
                  M
                </Avatar>
                Maupe
              </div>
            </div>
            <div className="col-6 padding_10 border-end">
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>Startupia</Breadcrumb.Item>
                  <Breadcrumb.Item>Conversation</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <br />

              <footer className="row p-2 m-2 border border-radius">
                <div className="col-10">
                  <div>
                    {
                      <Editor
                        toolbarHidden
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                        }}
                        placeholder="Message"
                      />
                    }
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-lg p-3 btn-outline-primary w-100 font-weight-700">
                    <SendOutlined />
                  </button>
                </div>
              </footer>
              <div class="chat">
                <div data-time="16:35" class="msg sent">
                  Hi!
                  <br />
                  What's up?
                </div>
                <div data-time="Anna 16:36" class="msg rcvd">
                  Hi dear! <br />
                  Doing some CSS research, you?
                </div>
                <div data-time="16:38" class="msg sent">
                  Also learning some cool CSS stuff 🦄
                </div>
                <div data-time="16:38" class="msg sent">
                  !!
                </div>
                <div data-time="16:38" class="msg sent">
                  Up for a coffee today? ☕
                </div>
                <div data-time="Anna 16:40" class="msg rcvd">
                  It would be a pleasure!
                </div>
                <div data-time="Anna 16:40" class="msg rcvd">
                  😍
                </div>
              </div>
            </div>
            <div className="col-3 padding_10">
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>Startupia</Breadcrumb.Item>
                  <Breadcrumb.Item>Tickets</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <br />
              <br />
              <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                <Radio.Button value="top">All</Radio.Button>
                <Radio.Button value="left">Active</Radio.Button>
                <Radio.Button value="right">Resolved</Radio.Button>
              </Radio.Group>
              <br />
              <div>
                <br />
                <Card title="Header">Card content</Card>
                <br />
                <Card title="Header">Card content</Card>
                <br />
                <Card title="Header">Card content</Card>
                <br />
                <Card title="Header">Card content</Card>
              </div>
            </div>
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
