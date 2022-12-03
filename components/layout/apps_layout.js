import Dashboard_Layout from "./dashboard_layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Input,
  Menu,
  Breadcrumb,
} from "antd";
import { observer } from "mobx-react-lite";
import CreateAppModal from "../../components/apps/createAppModal";
import CreateEnvsModal from "../../components/apps/createEnvsModal";


const { TextArea } = Input;

const Apps_Layout = observer(({children, refreshApps, selected}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultsModalVisible, setIsDefaultsModalVisible] = useState(false);

  const showModal = (bool) => {
    setIsModalVisible(bool);
  };

  const showDefaultsModal = (bool) => {
    setIsDefaultsModalVisible(bool);
  };

  useEffect(async () => {
  }, []);

  return (
    <Dashboard_Layout title="Apps">

      {isModalVisible?<CreateAppModal showModal={showModal} refreshApps={refreshApps}/>: <></>}
      {isDefaultsModalVisible?<CreateEnvsModal showModal={showDefaultsModal}/>:<></>}

      <section className="padding_10">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item className="text-muted">Apps</Breadcrumb.Item>
            <Breadcrumb.Item className="text-white">""</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-2">
            <Menu
              defaultSelectedKeys={selected || "1"}
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="border-none"
            >
              <Menu.Item key="1">
                <Link href="/apps"><span>All</span></Link>
              </Menu.Item>
              <Menu.Item key="2">
              <Link href={"/apps/draft"}><span>Draft</span></Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link href={"/apps/private"}><span>Private</span></Link>
              </Menu.Item>
              <Menu.Item key="4">
              <Link href={"/apps/public"}><span>Public</span></Link>
              </Menu.Item>
            </Menu>
            <button
              className="btn btn-outline-primary w-100 mb-3 mt-3 text-uppercase"
              onClick={()=>{showModal(true)}}
            >
              Apps <PlusOutlined />
            </button>
            <button
              className="btn btn-outline-danger w-100 text-uppercase"
              onClick={()=>{showDefaultsModal(true)}}
            >
              Envs <SettingOutlined />
            </button>
          </div>
          <div className="col-10">
            {children}
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
});

export default Apps_Layout;
