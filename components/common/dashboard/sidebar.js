import { Logo } from "../../config/constant";
import { Menu, Button, Dropdown, Space, Avatar } from "antd";
import {
  CreditCardOutlined,
  KeyOutlined,
  CaretDownOutlined,
  PlusOutlined,
  FolderOpenOutlined,
  AppstoreOutlined,
  AuditOutlined,
  BarChartOutlined,
  TeamOutlined,
  MessageOutlined,
  LeftOutlined,
  SaveOutlined,
  SettingOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  EditOutlined,
  UnorderedListOutlined,
  AppstoreFilled,
  BuildOutlined,
  PartitionOutlined,
  BookOutlined,
  NotificationOutlined,
  FileSyncOutlined,
  DiffOutlined,
  ToolOutlined,
  SwapOutlined,
  BankOutlined,
  MoneyCollectOutlined,
  AppstoreAddOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { changeDefaultWorkspaceId } from "../../../data/applicationSlice";

import CreateAppModal from "../../../components/apps/createAppModal";
import CreateEnvsModal from "../../../components/apps/createEnvsModal";

import React, { useEffect, useState, useContext } from "react";
import { updateDefaultAccess } from "../../services/workspaces.service";
import { fetchInitials, capitalize } from "../../config/constant";

const Sidebar = (props) => {
  const { type, refreshApps, id, info } = props;
  let config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);
  const [workspaces, setWorkspaces] = useState(config.workspaces);
  const [defaultWorkspace, setDefaultWorkspace] = useState({});
  const [pathname, setPathname] = useState("");
  const [openKeys, setOpenKeys] = React.useState(["0"]);
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const dispatch = useDispatch();

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

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const changeDefaultWorkspace = async (e, workspace_id, index) => {
    dispatch(changeDefaultWorkspaceId(workspace_id));
    // setDefaultWorkspace(workspaces[index]);
    const { auth_token: token, _id: user_id, public_key } = config.user;
    updateDefaultAccess({ token, user_id, workspace_id, public_key });
    window.location.reload();
  };

  return (
    <div className="position-relative main_sidebar bg-white border-end d-flex flex-column align-items-baseline h-100">
      <div className="p-4">
        {!type || type === "dashboard" ? <Logo /> : <></>}
      </div>

      <div className="py-4 ps-0 w-100 mb-auto ">
        {type && type !== "dashboard" ? (
          <span>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-2">
                <Link href={`/${type}s`}>
                  <LeftOutlined />
                </Link>
              </div>
              <div className="col-9">
                <h5>{`${capitalize(type)}s`}</h5>
              </div>
            </div>
          </span>
        ) : (
          <></>
        )}
        {type === "integration" ? (
          <div>
            <span className="padding_10 row">
              <Avatar
                className="bg-gray col-3 text-primary me-2 border_radius font-weight-700"
                shape="square"
              >
                {info.name ? fetchInitials(info.name) : <></>}
              </Avatar>{" "}
              <h5 className="col-9 pt-2">{info.name}</h5>
            </span>

            <Menu
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="w-100 no_background no_border side_menu"
            >
              <Menu.Item
                key="3"
                className={
                  pathname.endsWith("/features") ? "ant-menu-item-selected" : ""
                }
                icon={<PartitionOutlined />}
              >
                <Link href={`/integrations/${id}/features`}>
                  <span>Features</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="1"
                className={
                  pathname.endsWith("/envs") ? "ant-menu-item-selected" : ""
                }
                icon={<BuildOutlined />}
              >
                <Link href={`/integrations/${id}/envs`}>
                  <span>Envs</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                className={
                  pathname.endsWith("/apps") ? "ant-menu-item-selected" : ""
                }
                icon={<AppstoreOutlined />}
              >
                <Link href={`/integrations/${id}/apps`}>
                  <span>Apps</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                className={
                  pathname.endsWith("/caches") ? "ant-menu-item-selected" : ""
                }
                icon={<BankOutlined />}
              >
                <Link href={`/integrations/${id}/caches`}>
                  <span>Data Caches</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="6"
                className={
                  pathname.endsWith("/enums") ? "ant-menu-item-selected" : ""
                }
                icon={<BookOutlined />}
              >
                <Link href={`/integrations/${id}/enums`}>
                  <span>Data Enums</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="7"
                className={
                  pathname.endsWith("/notifications")
                    ? "ant-menu-item-selected"
                    : ""
                }
                icon={<NotificationOutlined />}
              >
                <Link href={`/integrations/${id}/notifications`}>
                  <span>Notifications</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="4"
                className={
                  pathname.endsWith("/keys") ? "ant-menu-item-selected" : ""
                }
                icon={<KeyOutlined />}
              >
                <Link href={`/integrations/${id}/keys`}>
                  <span>Access Keys</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="6"
                className={
                  pathname.endsWith("/activity") ? "ant-menu-item-selected" : ""
                }
                icon={<BarChartOutlined />}
              >
                <Link href={`/integrations/${id}/activity`}>
                  <span>Activity</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        ) : (
          <></>
        )}

        {type === "app" ? (
          <div>
            <span className="padding_10 row">
              <Avatar
                className="bg-gray col-3 text-primary me-2 border_radius font-weight-700"
                shape="square"
              >
                {info.app_name ? fetchInitials(info.app_name) : <></>}
              </Avatar>{" "}
              <h5 className="col-9 pt-2">{info.app_name}</h5>
            </span>
            <Menu
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="w-100 no_background no_border side_menu"
            >
              <Menu.Item
                key="2"
                className={
                  pathname.endsWith("/environments")
                    ? "ant-menu-item-selected"
                    : ""
                }
                icon={<BuildOutlined />}
              >
                <Link href={`/apps/${id}/environments`}>
                  <span>Environments</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="3"
                className={
                  pathname.endsWith("/setup") ? "ant-menu-item-selected" : ""
                }
                icon={<ToolOutlined/>}
              >
                <Link href={`/apps/${id}/setup`}>
                  <span>Setup</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="5"
                className={
                  pathname.endsWith("/crud") ? "ant-menu-item-selected" : ""
                }
                icon={<SwapOutlined />}
              >
                <Link href={`/apps/${id}/crud`}>
                  <span>CRUD Actions</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="6"
                className={
                  pathname.endsWith("/webhooks") ? "ant-menu-item-selected" : ""
                }
                icon={<SyncOutlined />}
              >
                <Link href={`/apps/${id}/webhooks`}>
                  <span>Webhook Events</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="7"
                className={
                  pathname.endsWith("/pricing") ? "ant-menu-item-selected" : ""
                }
                icon={<MoneyCollectOutlined/>}
              >
                <Link href={`/apps/${id}/pricing`}>
                  <span>Pricing</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="8"
                className={
                  pathname.endsWith("/publish") ? "ant-menu-item-selected" : ""
                }
                icon={<AppstoreAddOutlined/>}
              >
                <Link href={`/apps/${id}/publish`}>
                  <span>Publish</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        ) : (
          <></>
        )}

        {!type || type === "dashboard" ? (
          <Menu
            onOpenChange={onOpenChange}
            //style={{ width: 256 }}
            mode="inline"
            className="w-100 no_background no_border side_menu"
          >
            <Link href="/dashboard">
              <a>
                <Menu.Item
                  key="home"
                  className={
                    pathname.startsWith("/dashboard")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={
                    <Avatar
                      src="/images/icons/dashboard.svg"
                      shape="square"
                      size={15}
                    />
                  }
                >
                  Dashboard
                </Menu.Item>
              </a>
            </Link>

            <Link href="/apps">
              <a>
                <Menu.Item
                  key="apps" // className='bg-primary rounded-3 font-white'
                  className={
                    pathname.startsWith("/apps") ? "ant-menu-item-selected" : ""
                  }
                  icon={<AuditOutlined />}
                >
                  Apps
                </Menu.Item>
              </a>
            </Link>

            <Link href="/integrations">
              <a>
                <Menu.Item
                  key="integrations"
                  className={
                    pathname.startsWith("/integrations")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={<FolderOpenOutlined />}
                >
                  Integrations
                </Menu.Item>
              </a>
            </Link>
            <Link href="/marketplace">
              <a>
                <Menu.Item
                  key="marketplace"
                  className={
                    pathname.startsWith("/marketplace")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={<AppstoreOutlined />}
                >
                  MarketPlace
                </Menu.Item>
              </a>
            </Link>

            <Link href="/partners">
              <a>
                <Menu.Item
                  key="partners"
                  className={
                    pathname.startsWith("/partners")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={<MessageOutlined />}
                >
                  Partners
                </Menu.Item>
              </a>
            </Link>

            <Link href="/teams">
              <a>
                <Menu.Item
                  key="team"
                  className={
                    pathname.startsWith("/team") ? "ant-menu-item-selected" : ""
                  }
                  icon={<TeamOutlined />}
                >
                  Team
                </Menu.Item>
              </a>
            </Link>

            <Link href="/activity">
              <a>
                <Menu.Item
                  key="activity"
                  className={
                    pathname.startsWith("/activity")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={<BarChartOutlined />}
                >
                  Activity
                </Menu.Item>
              </a>
            </Link>

            <Link href="/tokens">
              <a>
                <Menu.Item
                  key="tokens"
                  className={
                    pathname.startsWith("/tokens")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={<KeyOutlined />}
                >
                  Tokens
                </Menu.Item>
              </a>
            </Link>
            <Link href="/billing">
              <a>
                <Menu.Item
                  key="billing"
                  className={
                    pathname.startsWith("/billing")
                      ? "ant-menu-item-selected"
                      : ""
                  }
                  icon={<CreditCardOutlined />}
                >
                  Billing
                </Menu.Item>
              </a>
            </Link>

            {/*<div className="py-3 mb-4 border-bottom"></div>*/}

            {/*<Menu.Item  key="billing" icon={<Avatar src="/images/icons/billing.svg" shape="square" size={15}/>}>*/}
            {/*    Billings*/}
            {/*</Menu.Item>*/}

            {/*<Menu.Item key="products" icon={<Avatar src="/images/icons/products.svg" shape="square" size={15}/>}>*/}
            {/*    Products*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="rates" icon={<Avatar src="/images/icons/fixed_rates.svg" shape="square" size={15}/>}>*/}
            {/*    Fixed Rates*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="network" icon={<Avatar src="/images/icons/network.svg" shape="square" size={15}/>}>*/}
            {/*    Network*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="reports" icon={<Avatar src="/images/icons/reports.svg" shape="square" size={15}/>}>*/}
            {/*    Reports*/}
            {/*</Menu.Item>*/}
          </Menu>
        ) : (
          <></>
        )}
      </div>

      {!type || type === "dashboard" ? (
        <div className="p-4 ps-0 w-100 mb-auto">
          <Menu
            onOpenChange={onOpenChange}
            //style={{ width: 256 }}
            mode="inline"
            className="w-100 no_background no_border side_menu"
          >
            <Menu.Item
              key="notifications"
              icon={
                <Avatar
                  src="/images/icons/notification.svg"
                  shape="square"
                  size={15}
                />
              }
            >
              Notifications
            </Menu.Item>

            <Menu.Item
              key="settings"
              icon={
                <Avatar
                  src="/images/icons/settings.svg"
                  shape="square"
                  size={15}
                />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              key="support"
              icon={
                <Avatar
                  src="/images/icons/support.svg"
                  shape="square"
                  size={15}
                />
              }
            >
              Support
            </Menu.Item>
          </Menu>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Sidebar;
