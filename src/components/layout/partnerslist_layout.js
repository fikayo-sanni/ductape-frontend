import Partners_Layout from "./partners_layout";
import { Breadcrumb, Avatar, Radio, Card } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { SendOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { ssr: false }
);

const PartnerList_Layout = (props) => {
  const { children } = props;
  const [tabPosition, setTabPosition] = useState("top");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <Partners_Layout>
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

      {children}
    </Partners_Layout>
  );
};

export default PartnerList_Layout;

/**
 
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
 */
