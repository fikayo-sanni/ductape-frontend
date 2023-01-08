import Dashboard_Layout from "./dashboard_layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  FilterFilled,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
  PlusSquareFilled,
  SettingFilled,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, Button, Dropdown, Menu } from "antd";
import { observer } from "mobx-react-lite";
import CreateAppModal from "../apps/createAppModal";
import CreateEnvsModal from "../apps/createEnvsModal";

const { TextArea } = Input;

const Apps_Layout = observer(({ children, refreshApps, selected }) => {
  useEffect(async () => {}, []);
  const handleMenuClick = (e) => {
    console.log("click left button", e);
  };

  const filterMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Link href="/apps">
          <span>All</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link href={"/apps/draft"}>
          <span>Draft</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link href={"/apps/private"}>
          <span>Private</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link href={"/apps/public"}>
          <span>Public</span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultsModalVisible, setIsDefaultsModalVisible] = useState(false);

  const showModal = (bool) => {
    setIsModalVisible(bool);
  };

  const showDefaultsModal = (bool) => {
    setIsDefaultsModalVisible(bool);
  };

  return (
    <Dashboard_Layout title="Apps" type="dashboard" refreshApps={refreshApps}>
      {isModalVisible ? (
        <CreateAppModal showModal={showModal} refreshApps={refreshApps} />
      ) : (
        <></>
      )}
      {isDefaultsModalVisible ? (
        <CreateEnvsModal showModal={showDefaultsModal} />
      ) : (
        <></>
      )}
      <section className="padding_30">
        <h2 className="mb-0 mt-2">Apps</h2>
        <span className="row">
          <span className="col-9">
            <label className="text-muted">
              Overview of all your apps & services
            </label>
          </span>
          <span className="col-3">
            <Dropdown overlay={filterMenu}>
              <Button
                className="mt-0 me-2"
              >
                Filter <FilterFilled style={{ color: "#00875A" }} />
              </Button>
            </Dropdown>
            <Button
              className="mt-0 me-2"
              onClick={() => {
                showModal(true);
              }}
            >
              App <PlusCircleOutlined style={{ color: "#0746A6" }} />
            </Button>
            <Button
              onClick={() => {
                showDefaultsModal(true);
              }}
            >
              Envs <SettingFilled style={{ color: "#dc3545" }} />
            </Button>
          </span>
        </span>
        <div className="row">
          <div className="col-12">{children}</div>
        </div>
      </section>
    </Dashboard_Layout>
  );
});

export default Apps_Layout;
