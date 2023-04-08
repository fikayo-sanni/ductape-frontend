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
    integrationPage: string;
}

export const IntegrationNav: React.FC<Props> = ({ integrationPage }) => {
    const { user, integration, workspace, workspaces, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );
    const dispatch = useDispatch();

    useEffect(() => {}, []);

    return (
        <Menu className="no_background no_border" mode="inline" selectedKeys={[integrationPage]}>
            <div className="p-4">
                <Breadcrumb>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Integrations</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Title className="mb-1 p-0 mt-2" level={4}>
                    {integration.name}
                </Title>
                <Link href="/integrations">
                    <Button className="w-100" type="dashed">
                        <ArrowLeftOutlined /> Back to integrations
                    </Button>
                </Link>
            </div>

            <Divider orientation="left" className="mb-0 ">
                <Text type="secondary" className="font-weight-600 font-xxs text-uppercase">
                    Management
                </Text>
            </Divider>

            <Menu.ItemGroup key="preference_area">
                <Menu.Item key="My Integration" icon={<DashboardOutlined style={{ width: 20 }} />}>
                    <Link href={`/integrations/current/`}>My Integration</Link>
                </Menu.Item>
            </Menu.ItemGroup>

            <Divider orientation="left" className="mb-0 ">
                <Text type="secondary" className="font-weight-600 font-xxs text-uppercase">
                    Setup
                </Text>
            </Divider>

            <Menu.ItemGroup key="management_area">
                <Menu.Item key="Environments" icon={<AppstoreAddOutlined style={{ width: 20 }} />}>
                    <Link href={`/integrations/current/envs`}>
                        <a>Environments</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Apps" icon={<MobileOutlined style={{ width: 20 }} />}>
                    <Link href="/integrations/current/apps">
                        <a>Apps</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Features" icon={<SettingOutlined style={{ width: 20 }} />}>
                    <Link href="/integrations/current/features">
                        <a>Features</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Activity" icon={<PartitionOutlined style={{ width: 20 }} />}>
                    <Link href="/integrations/current/activity">
                        <a>Activity</a>
                    </Link>
                </Menu.Item>

                <Menu.Item key="Caches" icon={<DatabaseOutlined style={{ width: 20 }} />}>
                    <Link href="/integrations/current/caches">
                        <a>Caches</a>
                    </Link>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );
};

export default IntegrationNav;
