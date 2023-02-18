import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Typography, Button, Result, Tag, Table, Modal, List, Switch, Card, Statistic } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import dynamic from 'next/dynamic';
import CountUp from 'react-countup';
import { EditOutlined } from '@ant-design/icons';
import { Env } from '@next/env';

const { Text, Title, Paragraph } = Typography;

interface Props {}

interface Environment {
    _id: string;
    env_name: string;
    base_url: string;
    slug: string;
    request_type: string;
    payment_type: any;
    description: string;
    active: boolean;
    whitelist: boolean;
}

const Loading = dynamic(() => import('../../components/common/loading'));
const formatter = (value: number) => <CountUp end={value} separator="," />;

export const AppEnvironments: React.FC<Props> = ({}) => {
    const { user, app } = useSelector((state: RootState) => state.app);

    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentEnv, setCurrentEnv] = useState<Environment>();

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
                bordered
                columns={columns}
                dataSource={app.envs}
                pagination={{
                    position: ['bottomRight'],
                    pageSize: 50,
                    pageSizeOptions: ['50', '100', '250', '500', '800'],
                }}
            />

            {currentEnv && (
                <Modal
                    title={
                        <div className="mb-3">
                            <Title level={2} className="m-0 text-capitalize">
                                {currentEnv.env_name}
                            </Title>
                            <Text type="secondary" className="text-uppercase">
                                Environment
                            </Text>
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

                    <Paragraph className="my-4">{currentEnv.description}</Paragraph>

                    <List
                        size="small"
                        header={
                            <div className="font-weight-700 d-flex justify-content-between">
                                Activation
                                <Link href={`/apps/current/env/${currentEnv._id}`}>
                                    <Button type="primary" size="small">
                                        <EditOutlined /> Edit
                                    </Button>
                                </Link>
                            </div>
                        }
                        bordered
                        dataSource={[
                            {
                                title: <div>Status</div>,
                                description: 'Activate to receive requests',
                                value: currentEnv.active ? (
                                    <Tag color="green">Active</Tag>
                                ) : (
                                    <Tag color="red">Inactive</Tag>
                                ),
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
                                <Link href={`/apps/current/env/${currentEnv._id}`}>
                                    <Button type="primary" size="small">
                                        <EditOutlined /> Edit
                                    </Button>
                                </Link>
                            </div>
                        }
                        bordered
                        dataSource={[
                            {
                                title: 'Base URL',
                                description: 'Base URL for all endpoints in this environment',
                                value: currentEnv.base_url ?? 'N/A',
                            },
                            {
                                title: 'Content Type',
                                description: 'Default content type',
                                value: currentEnv.request_type ?? 'N/A',
                            },
                            {
                                title: 'Whitelist',
                                description: null,
                                value: currentEnv.whitelist ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
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
                                <Link href={`/apps/current/env/${currentEnv._id}`}>
                                    <Button type="primary" size="small">
                                        <EditOutlined /> Edit
                                    </Button>
                                </Link>
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
            )}
        </div>
    );
};

export default AppEnvironments;
