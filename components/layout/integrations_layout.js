import Dashboard_Layout from "./dashboard_layout";
import { useState } from "react";
import { Menu, Input, Breadcrumb } from "antd";
import Link from "next/link";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import CreateProjectModal from "../integrations/createProjectModal";
import UpdateIntegrationsEnvModal from "../integrations/updateIntegrationEnv";
import CreateEnvsModal from "../apps/createEnvsModal";

const Integrations_Layout = ({ children, refreshIntegrations, selected }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultsModalVisible, setIsDefaultsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDefaultsModal = (bool) => {
    setIsDefaultsModalVisible(bool);
  };

  //alert(selected)
  return (
    <Dashboard_Layout title="Integrations">
      {isModalVisible ? (
        <CreateProjectModal setIsModalVisible={setIsModalVisible} refreshIntegrations={refreshIntegrations}/>
      ) : (
        <></>
      )}
      {isDefaultsModalVisible ? (
        <CreateEnvsModal showModal={showDefaultsModal} />
      ) : (
        <></>
      )}
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
              defaultSelectedKeys={selected || "1"}
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="border-none"
            >
              <Menu.Item key="1">
                <Link href="/integrations"><span>All</span></Link>
              </Menu.Item>
              <Menu.Item key="2">
              <Link href={"/integrations/draft"}><span>Draft</span></Link>
              </Menu.Item>
              <Menu.Item key="3">
              <Link href={"/integrations/active"}><span>Active</span></Link>
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
          <div className="col-10">{children}</div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default Integrations_Layout;
