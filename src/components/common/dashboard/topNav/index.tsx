import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Button, Card, Dropdown, Layout, MenuProps, Space } from 'antd';
import { BellOutlined, DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setCurrentWorkspace, logoutUser } from '../../../../redux/applicationSlice';
import dynamic from 'next/dynamic';
import { WorkspaceModal } from '../workspaceModal';

const Logo = dynamic(() => import('../../../config/constant').then((component) => component.Logo));

export const TopNav: React.FC = () => {
    const { user, app, workspace, workspaces, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );
    const dispatch = useDispatch();

    const [workspaceModal, showWorkspaceModal] = useState(false);

    let workspaceItems: MenuProps['items'] = workspaces.map((wkspace: any, i) => {
        if (wkspace.workspace_id !== workspace.workspace_id) {
            return {
                label: wkspace.name,
                key: i,
                icon: <Avatar shape="square">{wkspace.name.charAt(0).toUpperCase()}</Avatar>,
                onClick: () => dispatch(setCurrentWorkspace(wkspace)),
            };
        }
    });

    let items = [
        ...workspaceItems,
        {
            key: 'divider',
            type: 'divider',
        },
        {
            label: <a onClick={()=>showWorkspaceModal(true)}>Add New Workspace</a>,
            key: 'new',
            icon: <PlusOutlined />,
        },
    ];

    const menuProps = {
        items,
    };

    const userItems: MenuProps['items'] = [
        {
            key: '2',
            label: 'Preferences',
        },
        {
            key: 'divider',
            type: 'divider',
        },
        {
            key: '3',
            label: 'Logout',
            danger: true,
            onClick: async () => {
                await dispatch(logoutUser());
            },
        },
    ];

    const userProps = {
        items: userItems,
    };

    useEffect(() => {}, []);

    return (
        <Card className="rounded-0 border border-start-0 border-end-0 m-0" size="small">
            <Space size={20} className="d-flex align-items-center justify-content-between w-100 flex-row">
                <div className="d-flex flex-row gap-4">
                    <div style={{ height: 30, overflow: 'hidden' }}>
                        <Logo />
                    </div>

                    <Dropdown menu={menuProps} trigger={['click']}>
                        <Button>
                            <Space>
                                {workspace.name}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>

                <div className="d-flex flex-row align-items-center gap-4">
                    <Link href="/">Docs</Link>
                    <Link href="/">Support</Link>
                    <Button shape="circle" icon={<BellOutlined />} />

                    <Dropdown menu={userProps} trigger={['click']}>
                        <Button type="primary" icon={<UserOutlined />}>
                            {user.firstname} {user.lastname.charAt(0).toUpperCase()}.
                        </Button>
                    </Dropdown>
                </div>
            </Space>
            {workspaceModal? <WorkspaceModal showWorkspaceModal={showWorkspaceModal}/>:<></>}
        </Card>
    );
};

export default TopNav;
