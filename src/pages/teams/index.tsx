import Dashboard_Layout from '../../components/layout/dashboard_layout';
import React, { useEffect, useState } from 'react';
import { Tabs, Typography, Table } from 'antd';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const PageHeader = dynamic(() => import('../../components/common/pageHeader'));
const Loading = dynamic(() => import('../../components/common/loading'));
export default function Teams(props) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {}, []);

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <Dashboard_Layout title="Teams">
            <PageHeader title="Teams" />

            <section className="container my-5">
                {loading ? <Loading /> : <Table dataSource={dataSource} columns={columns} />}
            </section>
        </Dashboard_Layout>
    );
}
