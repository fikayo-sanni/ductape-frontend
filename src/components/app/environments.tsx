import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Typography, Button, Result, Tag, Table, Modal, List, Switch, Card, Statistic } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import dynamic from 'next/dynamic';
import CountUp from 'react-countup';
import { EditOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

interface Props {}

const Loading = dynamic(() => import('../../components/common/loading'));
const formatter = (value: number) => <CountUp end={value} separator="," />;

export const AppEnvironments: React.FC<Props> = ({}) => {
    const { user, app } = useSelector((state: RootState) => state.app);

    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentEnv, setCurrentEnv] = useState({});

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'env_name',
            key: 'env_name',
            responsive: ['lg'],

            render: (env_name) => <span className="text-capitalize">{env_name}</span>,
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            responsive: ['lg'],
            // sorter: (a, b) => a.externalPayment - b.externalPayment,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'active',
            responsive: ['lg'],
            render: (active) => (active ? <Tag color="green">Active</Tag> : <Tag color="red">In-active</Tag>),
        },
    ];

    useEffect(() => {
        console.log(app);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="container py-5">
            <Text>Showing {app.envs.length.toLocaleString()} environment(s)</Text>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => {
                            setCurrentEnv(record);
                            setIsVisible(true);
                        },
                    };
                }}
                className="mt-3"
                rowClassName={(record) =>
                    record.status === 'failed'
                        ? 'bg-transparent-red'
                        : record.status === 'awaiting confirmation' || record.status === 'pending'
                        ? 'bg-transparent-yellow'
                        : null
                }
                loading={loading}
                size="small"
                bordered
                columns={columns}
                dataSource={app.envs}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: 50,
                    pageSizeOptions: ['50', '100', '250', '500', '800'],
                }}
            />

            <Modal
                title={
                    <div className="mb-3">
                        <Title level={2} className="m-0 text-capitalize">
                            {currentEnv.env_name}
                        </Title>
                        <Text type="secondary text-uppercase">Environment</Text>
                    </div>
                }
                width={1000}
                visible={isVisible}
                footer={null}
                onCancel={() => setIsVisible(false)}
            >
                <div className="row mb-4">
                    <div className="col-sm-4">
                        <Card>
                            <Statistic
                                title={<Text className="font-weight-500 text-uppercase">Requests Received</Text>}
                                value={93}
                                formatter={formatter}
                            />
                        </Card>
                    </div>

                    <div className="col-sm-4">
                        <Card>
                            <Statistic
                                title={<Text className="font-weight-500 text-uppercase">Latency</Text>}
                                value={'0ms'}
                                //formatter={formatter}
                            />
                        </Card>
                    </div>

                    <div className="col-sm-4">
                        <Card>
                            <Statistic
                                title={<Text className="font-weight-500 text-uppercase">Requests Sent</Text>}
                                value={1293}
                                formatter={formatter}
                            />
                        </Card>
                    </div>
                </div>

                <List
                    size="small"
                    header={
                        <div className="font-weight-700 d-flex justify-content-between">
                            Activation
                            <Button type="primary" size="small">
                                <EditOutlined /> Edit
                            </Button>
                        </div>
                    }
                    bordered
                    dataSource={[
                        {
                            title: (
                                <div>
                                    Status{' '}
                                    {currentEnv.active ? (
                                        <Tag color="green">Active</Tag>
                                    ) : (
                                        <Tag color="red">Inactive</Tag>
                                    )}
                                </div>
                            ),
                            description: 'Activate to receive requests',
                            value: <Switch checked={currentEnv.active} />,
                        },
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} description={item.description} />
                            <div>{item.value}</div>
                        </List.Item>
                    )}
                />

                <List
                    size="small"
                    className="mt-4"
                    header={
                        <div className="font-weight-700 d-flex justify-content-between">
                            General
                            <Button type="primary" size="small">
                                <EditOutlined /> Edit
                            </Button>
                        </div>
                    }
                    bordered
                    dataSource={[
                        {
                            title: 'Base URL',
                            description: 'Base URL for all endpoints in this environment',
                            value: currentEnv.base_url,
                        },
                        {
                            title: 'Content Type',
                            description: 'Default content type',
                            value: currentEnv.request_type,
                        },
                        {
                            title: 'Default Live Environment',
                            description: 'Is this your production environment?',
                            value: <Switch checked={currentEnv.default_prod} />,
                        },
                        {
                            title: 'Default Sandbox Environment',
                            description: 'Is this your sandbox environment?',
                            value: <Switch checked={currentEnv.default_sandbox} />,
                        },
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} description={item.description} />
                            <div>{item.value}</div>
                        </List.Item>
                    )}
                />

                <List
                    size="small"
                    className="mt-4"
                    header={
                        <div className="font-weight-700 d-flex justify-content-between">
                            Pricing
                            <Button type="primary" size="small">
                                <EditOutlined /> Edit
                            </Button>
                        </div>
                    }
                    bordered
                    dataSource={[
                        {
                            title: 'Pricing Bundle',
                            description: 'Strategy for pricing this environment',
                            value: String(currentEnv.payment_type).toUpperCase(),
                        },
                        {
                            title: 'Base Price',
                            description: 'Default cost per unit',
                            value: '$0.01',
                        },
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item.title} description={item.description} />
                            <div>{item.value}</div>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

export default AppEnvironments;
