import {Logo} from "../../config/constant";
import {Layout, Menu, Dropdown,Button, Avatar} from "antd";
import React,{useContext} from "react";
import {
    ArrowDownOutlined,
    BellOutlined, DownOutlined,
    FileSearchOutlined,
    LogoutOutlined, PlusCircleOutlined, ProfileOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined
} from "@ant-design/icons";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function header(title) {



    return(
    <header className="align-items-center d-flex bg-white flex-wrap justify-content-between py-4 pb-3 px-5">
     <h4 className="m-0 font-weight-600">{title}</h4>


            <Button size="large" type="primary" > Create New</Button>


    </header>
    );
}