import Dashboard_Layout from "./dashboard_layout";
import { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import Link from "next/link";
import { FilterFilled, PlusCircleOutlined, SettingFilled } from "@ant-design/icons";
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

  const handleMenuClick = (e) => {
    console.log("click left button", e);
  };

  const filterMenu = (
    <Menu onClick={handleMenuClick}>
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
  );

  /* <div className="col-2">
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
</div>*/

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
      <section className="padding_30 row">
      <h2 className="mb-0">Integration Projects</h2>
        <span className="row">
          <span className="col-9">
            <label className="text-muted mt-2">
              Build exciting features off existing apps & services
            </label>
          </span>
          <span className="col-3">
            <Dropdown overlay={filterMenu}>
              <Button
                className="mt-0 me-2"
                onClick={() => {
                  showModal(true);
                }}
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
              Project <PlusCircleOutlined style={{ color: "#0746A6" }} />
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
};

export default Integrations_Layout;
