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
  CheckOutlined,
  MessageOutlined
} from "@ant-design/icons";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import { changeDefaultWorkspaceId } from "../../../data/applicationSlice";
import { fetchInitials } from "../../config/constant";
import React, { useEffect, useState, useContext } from "react";
import { updateDefaultAccess } from "../../services/workspaces.service";


const Sidebar = (props) => {
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

    if(!config) config = useSelector((state) => state.app);

    workspaces.map((data)=>{
      if(data.workspace_id === config.defaultWorkspaceId){
        setDefaultWorkspace(data)
      }
    })
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleMenuClick = (e) => {
    console.log("click left button", e);
  };

  const changeDefaultWorkspace = async (e, workspace_id, index) => {
    dispatch(changeDefaultWorkspaceId(workspace_id));
    // setDefaultWorkspace(workspaces[index]);
    const {auth_token: token, _id: user_id, public_key} = config.user;
    updateDefaultAccess({token, user_id, workspace_id, public_key});
    window.location.reload();
  }

  const workspaceItems = workspaces.map((data,index)=>{
      return <Menu.Item onClick={(e)=>{changeDefaultWorkspace(e, data.workspace_id, index)}}>{data.name} {config.defaultWorkspaceId===data.workspace_id?<CheckOutlined />: ""}</Menu.Item>;
  });

  const menu = (
    <Menu onClick={handleMenuClick}>
      {workspaceItems}
      <Link href="/workspaces">
        <a>
          <Menu.Item className="bg-muted">
            <Space className="text-primary"><PlusOutlined /> Create Workspace</Space>
          </Menu.Item>
        </a>
      </Link>
    </Menu>
  );

  

  return (
    <div className="position-relative main_sidebar border-0 d-flex flex-column align-items-baseline h-100">
      <div className="p-4">
        <Logo />
      </div>

      <div className="ps-3 w-90">
        <Dropdown overlay={menu} className="w-100">
          <Button>
            <Space>
              {defaultWorkspace.name || "Workspace"}
              <CaretDownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className="py-4 ps-0 w-100 mb-auto ">
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
                  pathname.startsWith("/dashboard") ? "ant-menu-item-selected" : ""
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
                className={pathname.startsWith("/apps") ? "ant-menu-item-selected" : ""}
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
                  pathname.startsWith("/integrations") ? "ant-menu-item-selected" : ""
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
                  pathname.startsWith("/marketplace") ? "ant-menu-item-selected" : ""
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
                  pathname.startsWith("/partners") ? "ant-menu-item-selected" : ""
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
                className={pathname.startsWith("/team") ? "ant-menu-item-selected" : ""}
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
                  pathname.startsWith("/activity") ? "ant-menu-item-selected" : ""
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
                  pathname.startsWith("/tokens") ? "ant-menu-item-selected" : ""
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
                  pathname.startsWith("/billing") ? "ant-menu-item-selected" : ""
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
      </div>

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

      <div className="bg-primary_transparent_2 align-items-center d-flex justify-content-between p-4 w-100">
        <div className="d-flex">
          <Avatar
            className="bg-dark me-2 border_radius font-weight-700"
            shape="square"
          >
            {fetchInitials(user.firstname, user.lastname)}
          </Avatar>
          <div>
            <h6 className="m-0">
              {user.firstname} {user.lastname}
            </h6>
            <p className="m-0 font-gray font-xs">{user.email}</p>
          </div>
        </div>

        <img src="/images/icons/down.svg" />
      </div>
    </div>
  );
};

export default Sidebar;
