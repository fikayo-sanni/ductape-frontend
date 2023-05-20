import React, { useEffect } from 'react';
import Link from 'next/link';
import { Avatar, Typography, Card, Divider, Dropdown, Layout, Menu, MenuProps, Space, Breadcrumb, Button } from 'antd';
import {
    AppstoreAddOutlined,
    ArrowLeftOutlined,
    BellOutlined,
    CheckOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    DollarCircleOutlined,
    DollarOutlined,
    DownOutlined,
    InfoCircleOutlined,
    PartitionOutlined,
    PlusOutlined,
    SafetyCertificateOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    UserSwitchOutlined,
    WalletOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setCurrentWorkspace, logoutUser } from '../../../../redux/applicationSlice';
import dynamic from 'next/dynamic';

const { Text, Title } = Typography;

interface Props {
    appPage: string;
}

export const AppNav: React.FC<Props> = ({ appPage }) => {
    const { user, app, workspace, workspaces, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    return (
        <Menu className="no_background no_border" mode="inline" selectedKeys={[appPage]}>
            <div className="p-4">
                <Link href={"/apps"}><ArrowLeftOutlined/></Link>
                <Title className="mb-1 p-0 mt-2" level={4}>
                <Avatar shape="square" className="bg-gray text-primary me-2 border_radius border font-weight-500">{app.app_name.charAt(0).toUpperCase()}</Avatar> <label className="ps-1">{app.app_name}</label>
                </Title>
            </div>

            <Divider orientation="left" className="mb-0" style={{borderColor: "#d4d4d4"}}>
                <Text type="secondary" className="font-weight-600 font-xxs text-uppercase">
                    Management
                </Text>
            </Divider>

            <Menu.ItemGroup key="preference_area">
                <Menu.Item key="My App" icon={<DashboardOutlined style={{ width: 20 }} />}>
                    <Link href={`/apps/current/`}>My App</Link>
                </Menu.Item>
                <Menu.Item key="Get Started" icon={<CheckOutlined style={{ width: 20 }} />}>
                    <Link href="/apps/current/get-started">Get Started</Link>
                </Menu.Item>
                <Menu.Item key="Publish" icon={<InfoCircleOutlined style={{ width: 20 }} />}>
                    <Link href={`/apps/current/about`}>Publish</Link>
                </Menu.Item>
            </Menu.ItemGroup>

            <Divider orientation="left" className="mb-0 " style={{borderColor: "#d4d4d4"}}>
                <Text type="secondary" className="font-weight-600 font-xxs text-uppercase">
                    Setup
                </Text>
            </Divider>

            <Menu.ItemGroup key="management_area">
                <Menu.Item key="Environments" icon={<AppstoreAddOutlined style={{ width: 20 }} />}>
                    <Link href={`/apps/current/env`}>
                        <a>Environments</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Pricing" icon={<DollarOutlined style={{ width: 20 }} />}>
                    <Link href="/apps/current/pricing">
                        <a>Pricing</a>
                    </Link> 
                </Menu.Item>

                <Menu.Item key="Actions" icon={<DatabaseOutlined style={{ width: 20 }} />}>
                    <Link href="/apps/current/actions">
                        <a>Actions</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Webhook" icon={<PartitionOutlined style={{ width: 20 }} />}>
                    <Link href="/apps/current/webhook">
                        <a>Webhooks</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Setup" icon={<PartitionOutlined style={{ width: 20 }} />}>
                    <Link href="/apps/current/setups">
                        <a>Setups</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Access" icon={<SafetyCertificateOutlined style={{ width: 20 }} />}>
                    <Link href="/swiftmoney/user/payment">
                        <a>Access</a>
                    </Link>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
};

export default AppNav;
