import Dashboard_Layout from '../../components/layout/dashboard_layout';
import React, { useContext, Component, useEffect, useState } from 'react';
import { Tabs, Typography, Breadcrumb, Input, Table } from 'antd';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
// import { changeDefaultWorkspaceId } from "../../../data/applicationSlice";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const { TextArea } = Input;

const PageHeader = dynamic(() => import('../../components/common/pageHeader'));
const Loading = dynamic(() => import('../../components/common/loading'));

export default function Activity() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {}, []);

    return (
        <Dashboard_Layout title="Activity">
            <PageHeader title="Activity" />

            <section className="container my-5">{loading ? <Loading /> : <div>act</div>}</section>
        </Dashboard_Layout>
    );
}
