import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Button, Card, Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import { Logo } from '../../../config/constant';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

interface Props {
    pageTitle: string;
    className?: string;
    mainNav?: string;
}

export const LowerNav: React.FC<Props> = ({ pageTitle, className }) => {
    const { user, currentApp, workspace, workspaces, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );
    const [currentMenu, setCurrentMenu] = useState<string>('dashboard')

    const items: MenuProps['items'] = [
        {
            label: 'Dashboard',
            key: 'dashboard',
        },
        {
            label: 'Apps',
            key: 'apps',
        },
        {
            label: 'Domains',
            key: 'domains',
        },
        {
            label: 'Integrations',
            key: 'integrations',
        },
        {
            label: 'Market Place',
            key: 'marketPlace',
        },
        {
            label: 'Partners',
            key: 'partners',
        },
        {
            label: 'Teams',
            key: 'teams',
        },
        {
            label: 'Tokens',
            key: 'tokens',
        },
        {
            label: 'Activity',
            key: 'activity',
        },
        {
            label: 'Billing',
            key: 'billing',
        },


    ];


    return (
        <div type='inner' className='rounded-0 p-0' size='small'>
            <Menu
                onClick={(e) => setCurrentMenu(e.key)}
                selectedKeys={[currentMenu]}
                mode="horizontal" items={items} />
        </div>
    )
}

export default LowerNav;