import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuProps } from 'antd';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import Router from "next/router";
import { Logo } from '../../../config/constant';

interface Props {
    pageTitle: string;
    className?: string;
    mainNav?: string;
}

export const LowerNav: React.FC<Props> = ({ pageTitle, className }) => {
    const { user, app, workspace, workspaces, currentTheme, darkMode, isAuthenticated } = useSelector(
        (state: RootState) => state.app,
    );

    const [currentMenu, setCurrentMenu] = useState<string>(pageTitle ?? 'dashboard')

    const items: MenuProps['items'] = [
        {
            label: 'Dashboard',
            key: 'Dashboard',
            onClick: () => Router.push('/dashboard')
        },
        {
            label: 'Apps',
            key: 'Apps',
            onClick: () => Router.push('/apps')
        },

        {
            label: 'Integrations',
            key: 'Integrations',
        },
        {
            label: 'Market Place',
            key: 'MarketPlace',
        },
        {
            label: 'Partners',
            key: 'Partners',
        },
        {
            label: 'Teams',
            key: 'Teams',
        },
        {
            label: 'Tokens',
            key: 'Tokens',
        },
        {
            label: 'Activity',
            key: 'Activity',
        },
        {
            label: 'Billing',
            key: 'Billing',
        },


    ];


    return (
        <div className='rounded-0 p-0 '>

            <Menu
                onClick={(e) => setCurrentMenu(e.key)}
                selectedKeys={[currentMenu]}
                mode="horizontal" items={items} />

        </div>
    )
}

export default LowerNav;