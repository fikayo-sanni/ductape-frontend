import Link from "next/link";
import {Menu} from "antd";
import {
    BankOutlined,
    FolderOpenOutlined,
    FolderOutlined,
    GlobalOutlined, GroupOutlined, MoneyCollectOutlined, SettingOutlined,
    UsergroupAddOutlined, WalletOutlined
} from "@ant-design/icons";
import React from "react";

const OrganizationMenu = (props) => {
    return (

        <Menu id="organization_menu" className="sticky-top" mode="horizontal">

            <Link href="/dashboard/organization/">
                <a>
                    <Menu.Item key="profile" className={props.active === 'profile' ? 'ant-menu-item-selected' : null} icon={<BankOutlined/>}>
                        Organization Profile
                    </Menu.Item>
                </a>
            </Link>

            <Link href="/dashboard/organization/members">
                <a>
                    <Menu.Item key="members" className={props.active === 'members' ? 'ant-menu-item-selected' : null} icon={<UsergroupAddOutlined/>}>
                        Organization Members
                    </Menu.Item>
                </a>
            </Link>

            <Link href="/dashboard/organization/bank_info">
                <a>
                    <Menu.Item key="bank" className={props.active === 'bank' ? 'ant-menu-item-selected' : null} icon={<GlobalOutlined/>}>
                        Banking Information
                    </Menu.Item>
                </a>
            </Link>

            <Link href="/dashboard/organization/preferences">
                <a>
                    <Menu.Item key="bank" className={props.active === 'preferences' ? 'ant-menu-item-selected' : null} icon={<SettingOutlined/>}>
                        Preferences
                    </Menu.Item>
                </a>
            </Link>

        </Menu>
    )
};

const TransactionMenu = (props) => {
    return (

        <Menu id="organization_menu" className="sticky-top" mode="horizontal">

            <Link href="/dashboard/transactions/">
                <a>
                    <Menu.Item key="transactions" className={props.active === 'transactions' ? 'ant-menu-item-selected' : null} icon={<FolderOutlined/>}>
                       All Transactions
                    </Menu.Item>
                </a>
            </Link>

            <Link href="/dashboard/transactions/uncategorized">
                <a>
                    <Menu.Item key="uncategorized" className={props.active === 'uncategorized' ? 'ant-menu-item-selected' : null} icon={<FolderOpenOutlined/>}>
                        Uncategorized Transactions <badge className="badge bg-danger">34</badge>
                    </Menu.Item>
                </a>
            </Link>

        </Menu>
    )
};

const RecurringPaymentsMenu = (props) => {
    return (

        <Menu id="organization_menu" className="sticky-top" mode="horizontal">

            <Link href="/dashboard/payments/">
                <a>
                    <Menu.Item key="payments" className={props.active === 'payments' ? 'ant-menu-item-selected' : null} icon={<WalletOutlined/>}>
                        Recurring Payments
                    </Menu.Item>
                </a>
            </Link>

            <Link href="/dashboard/payments/recepients">
                <a>
                    <Menu.Item key="recepients" className={props.active === 'recepients' ? 'ant-menu-item-selected' : null} icon={<GroupOutlined/>}>
                        Recepients
                    </Menu.Item>
                </a>
            </Link>

        </Menu>
    )
};

module.exports = {OrganizationMenu,TransactionMenu, RecurringPaymentsMenu};