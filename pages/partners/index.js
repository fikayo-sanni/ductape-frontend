import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useContext, Component, useEffect, useState } from "react";
import { Breadcrumb, Button, Menu, Badge, Tabs, Radio } from "antd";
import Link from "next/link";

import { configStore } from "../../data/configStore";
import { observer } from "mobx-react-lite";

import Icon, { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";

const SubMenu = Menu.SubMenu;
const TabPane = Tabs;

const Index = observer((props) => {
  const config = useContext(configStore);

  useEffect(async () => {}, []);

  const [showOutgoing, setShowOutgoing] = useState(false);
  const [showIncoming, setShowIncoming] = useState(false);

  const [tabPosition, setTabPosition] = useState('left');

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
    <Dashboard_Layout title={"App"}>
      <section className="pt-4 pe-5 row">
        <div className="pt-4 pe-4 padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Partners</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </section>
      <section className="padding_10">
        <div className="row h-80">
          <div className="col-3 border-end">
            <div
              onClick={showOutGoingStages}
              className="border-bottom p-3 text-muted row"
            >
              <span className="col-3">Outgoing</span>{" "}
              <span className="col-7"></span>
              <div className="col-2">
                {!showOutgoing ? <DownCircleOutlined /> : <UpCircleOutlined />}
              </div>
            </div>
            {showOutgoing ? (
              <div className="p-2">
                <div className="border-bottom p-3 hover-skyblue">
                  Reached Out{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Requested Sandbox Access{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Sandbox Access{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Production Access{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Live Ops{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <br />
                <button className="btn btn-lg p-2 mt-4 btn-primary w-100">
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
              <div className="p-2">
                <div className="border-bottom p-3 hover-skyblue">
                  Reached Out{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Requested Sandbox Access{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Sandbox Access{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3 hover-skyblue">
                  Production Access{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <div className="border-bottom p-3  hover-skyblue">
                  Live Ops{" "}
                  <Badge
                    count={5}
                    style={{ backgroundColor: "#E9ECF1", color: "blue" }}
                  />
                </div>
                <br />
                <button className="btn btn-lg p-2 mt-4 btn-primary w-100">
                  Add +{" "}
                </button>
              </div>
            ) : null}
          </div>
          <div className="col-9 row h-100">
            <div className="col-3 padding_10 border-end">
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>Outgoing</Breadcrumb.Item>
                  <Breadcrumb.Item>Reached Out</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <div className="col-6 padding_10 border-end">
              <span className="text-muted">Conversation</span>
            </div>
            <div className="col-3 padding_10">
              <span className="text-muted">Tickets</span>
              <br/><br/>
              <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                <Radio.Button value="top">All</Radio.Button>
                <Radio.Button value="left">Active</Radio.Button>
                <Radio.Button value="right">Resolved</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
});

export default Index;
/*
export const getServerSideProps = async ({ params }) => {
  const {action_id} = params;
  return {
    props: { action_id },
  };
};*/
