import {Logo} from "../../config/constant";
import { Menu, Button, Tooltip } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import React from "react";
import Sider from "antd/lib/layout/Sider";
import dashboardMenu from "../inner_sidebar/dashboard";
const { SubMenu } = Menu;

export default function innerSidebar(props) {

    function displayMenu(title)
    {
        if(title === 'Dashboard')
        {
            return dashboardMenu()
        }
    }

    return(
        <div className=" bg-white  flex-fill">
            <div className="p-3 border_bottom">
            <h4 className="font-weight-500 m-0">{props.pageTitle}</h4>
            </div>

            <div className="p-3">
            {displayMenu(props.pageTitle)}
            </div>
        </div>
    );
}