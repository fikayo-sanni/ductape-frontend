import { Header } from "antd/lib/layout/layout";
import { Dropdown, Button, Space, Menu, Avatar } from "antd";
import { useSelector } from "react-redux";
import { fetchInitials } from "../../config/constant";
import React, { useEffect, useState } from "react";
import {
  CheckOutlined,
  CaretDownOutlined,
  PlusOutlined,
  DownOutlined,
} from "@ant-design/icons";

import Link from "next/link";

export default function FullHeader() {
  let config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);
  const [workspaces, setWorkspaces] = useState(config.workspaces);

  const [pathname, setPathname] = useState("");
  const [defaultWorkspace, setDefaultWorkspace] = useState({});

  const handleMenuClick = (e) => {
    console.log("click left button", e);
  };

  const workspaceItems = workspaces.map((data, index) => {
    return (
      <Menu.Item
        onClick={(e) => {
          changeDefaultWorkspace(e, data.workspace_id, index);
        }}
      >
        {data.name}{" "}
        {config.defaultWorkspaceId === data.workspace_id ? (
          <CheckOutlined />
        ) : (
          ""
        )}
      </Menu.Item>
    );
  });
  useEffect(() => {
    // code to run on component mount
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }

    if (!config) config = useSelector((state) => state.app);

    workspaces.map((data) => {
      if (data.workspace_id === config.defaultWorkspaceId) {
        setDefaultWorkspace(data);
      }
    });
  }, []);
  const menu = (
    <Menu onClick={handleMenuClick}>
      {workspaceItems}
      <Link href="/workspaces">
        <a>
          <Menu.Item className="bg-muted">
            <Space className="text-primary">
              <PlusOutlined /> Create Workspace
            </Space>
          </Menu.Item>
        </a>
      </Link>
    </Menu>
  );
  return (
    <Header className="header bg-white border-bottom row">
      <div className="row">
        <div className="col-8"></div>
        <div className="col-2">
          <Dropdown overlay={menu} className="w-80">
            <Button className="border smallHeight mt-0 pt-0 mb-3">
              <label className="pe-5">{defaultWorkspace.name || "Workspace"}</label>
              <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="col-2">
          <div className="row">
            <Avatar
              className="bg-dark me-2 border_radius font-weight-700 col-4  mt-3"
              shape="square"
            >
              {fetchInitials(user.firstname, user.lastname)}
            </Avatar>
            <div className="col-7 mt-3">
              <h6 className="mt-2">
                {user.firstname} {user.lastname}
              </h6>
            </div>
            <div className="col-1 mt-0">
              <DownOutlined />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}
