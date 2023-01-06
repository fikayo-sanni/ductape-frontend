import React from 'react';
import Link from 'next/link';
import { Avatar, Button, Card, Dropdown, Layout, MenuProps, Space } from 'antd';
import { Logo } from '../../../config/constant';
import { BellOutlined, DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
    setCurrentWorkspace,
} from '../../../../redux/applicationSlice';

interface Props {
    pageTitle: string;
    className?: string;
    mainNav?: string;
}

export const TopNav: React.FC<Props> = ({ pageTitle, className }) => {
    const { user, currentApp, workspace, workspaces, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );
    const dispatch = useDispatch();

    let workspaceItems: MenuProps['items'] =
        workspaces.map((wkspace, i) => {
            if (wkspace.workspace_id !== workspace.workspace_id) {
                return {
                    label: wkspace.name,
                    key: i,
                    icon: <Avatar shape='square'>{wkspace.name.charAt(0).toUpperCase()}</Avatar>,
                    onClick: () => dispatch(setCurrentWorkspace(wkspace))
                };
            }
        });

    let items = [...workspaceItems,
        {
            type: 'divider',
        },
        {
            label: <Link href='/workspaces'>Add New Workspace</Link>,
            key: 'new',
            icon: <PlusOutlined />,
        }];

    const menuProps = {
        items,

    };


    return (
        <Card className='rounded-0 border-start-0 border-end-0' size='small'>
            <Space size={20} className='d-flex align-items-center justify-content-between w-100 flex-row'>
                <div className='d-flex flex-row gap-4'>
                    <div style={{ height: 30, overflow: 'hidden' }}><Logo /></div>

                    <Dropdown menu={menuProps} trigger='click'>
                        <Button>
                            <Space>
                                {workspace.name}
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>

                <div className='d-flex flex-row align-items-center gap-4'>
                    <Link href='/'>Docs</Link>
                    <Link href='/'>Support</Link>
                    <Button shape="circle" icon={<BellOutlined />} />

                    <Button type='primary' icon={<UserOutlined />}>
                        {user.firstname} {user.lastname.charAt(0).toUpperCase()}.
                    </Button>
                </div>
            </Space>
        </Card>
    )
}

export default TopNav;