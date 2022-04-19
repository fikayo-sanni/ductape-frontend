import {Logo} from "../../config/constant";
import {Menu, Button, Tooltip, Avatar} from 'antd';
import {
    SettingOutlined,
    LogoutOutlined,
    HomeOutlined,
    ProfileOutlined,
    FolderOpenOutlined,
    BankOutlined,
    AuditOutlined,
    FileDoneOutlined,
    BarChartOutlined,
    CaretDownOutlined,
    CaretUpOutlined,
    ArrowRightOutlined,
    TeamOutlined, GroupOutlined, ArrowDownOutlined, DownOutlined, UploadOutlined,
} from '@ant-design/icons';
import Link from "next/link";
import React, {useState, useContext} from "react";
import toast from "react-hot-toast";

const {SubMenu} = Menu;


export default function sidebar(title) {
    const [openKeys, setOpenKeys] = React.useState(['0']);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    return (
        <div className="position-relative main_sidebar border-end d-flex flex-column align-items-baseline h-100">

            <div className="p-4">
                <Logo/>
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
                            <Menu.Item key="home" className='ant-menu-item-selected'
                                       icon={<Avatar src="/images/icons/dashboard.svg" shape="square" size={15}/>}>
                                Dashboard
                            </Menu.Item>
                        </a>
                    </Link>

                    <Link href="/upload">
                        <a>
                            <Menu.Item key="upload" className='bg-primary rounded-3 font-white'
                                       icon={<UploadOutlined/>}>
                                Upload Documents
                            </Menu.Item>
                        </a>
                    </Link>

                    <Link href="documents">
                        <a>
                            <Menu.Item key="documents"
                                       icon={<Avatar src="/images/icons/quotes.svg" shape="square" size={15}/>}>
                                My Documents
                            </Menu.Item>
                        </a>
                    </Link>

                    <Link href="reports">
                        <a>
                            <Menu.Item key="reports"
                                       icon={<Avatar src="/images/icons/quotes.svg" shape="square" size={15}/>}>
                                Reports
                            </Menu.Item>
                        </a>
                    </Link>

                    <Link href="subscription">
                        <a>
                            <Menu.Item key="subscriptions"
                                       icon={<Avatar src="/images/icons/booking.svg" shape="square" size={15}/>}>
                                Subscriptions
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

                    <Menu.Item key="notifications"
                               icon={<Avatar src="/images/icons/notification.svg" shape="square" size={15}/>}>
                        Notifications
                    </Menu.Item>

                    <Menu.Item key="settings"
                               icon={<Avatar src="/images/icons/settings.svg" shape="square" size={15}/>}>
                        Settings
                    </Menu.Item>
                    <Menu.Item key="support" icon={<Avatar src="/images/icons/support.svg" shape="square" size={15}/>}>
                        Support
                    </Menu.Item>


                </Menu>

            </div>

            <div className="bg-primary_transparent_2 align-items-center d-flex justify-content-between p-4 w-100">
                <div className="d-flex">
                    <Avatar className="bg-dark me-2 border_radius font-weight-700" shape="square">UK</Avatar>
                    <div>
                        <h6 className="m-0">Mati Industries</h6>
                        <p className="m-0 font-gray font-xs">Lanremati@gmail.com</p>
                    </div>
                </div>

                <img src="/images/icons/down.svg"/>

            </div>

        </div>
    );
}