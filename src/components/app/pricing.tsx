import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Typography, Button, Result, Tag, Table, Modal, List, Switch, Card, Statistic } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import dynamic from 'next/dynamic';
import CountUp from 'react-countup';
import { EditOutlined } from '@ant-design/icons';
import { Env } from '@next/env';
import { fetchApp, fetchPricing } from '../services/apps.service';

const { Text, Title, Paragraph } = Typography;

interface Props {}

interface Pricing {
    _id: string;
    app_id: string;
    name: string;
    envs: string[];
    interval: string;
    currency: string;
    unit_price: string | number;
    limits: any;
    pricing_mode: string;
}

const Loading = dynamic(() => import('../../components/common/loading'));

export const PricingView: React.FC<Props> = ({}) => {
    const { user, app } = useSelector((state: RootState) => state.app);
    const [pricing, setPricing] = useState<Pricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [currentPricing, setCurrentPricing] = useState<Pricing>();

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['lg'],

            render: (name) => <span className="text-capitalize">{name ?? 'Unnamed'}</span>,
        },
        {
            title: 'Unit Price',
            key: 'unit_price',
            dataIndex: 'unit_price',
            render: (unit_price) => unit_price && unit_price.toLocaleString(),
        },
        {
            title: 'Interval',
            key: 'interval',
            dataIndex: 'interval',
            responsive: ['lg'],
        },
        {
            title: 'Mode',
            key: 'pricing_mode',
            dataIndex: 'pricing_mode',
            render: (pricing_mode) => <span className="text-capitalize">{pricing_mode.replace('_', ' ')}</span>,
        },
    ];

    const getPricing = async () => {
        const pricingDetails = await fetchPricing({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
        });

        setPricing(pricingDetails.data.data);
        setLoading(false);
    };

    useEffect(() => {
        getPricing();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="container ">
            <Text>Showing {app.envs.length.toLocaleString()} environment(s)</Text>
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => {
                            setCurrentPricing(record);
                            setIsVisible(true);
                        },
                    };
                }}
                className="mt-3"
                loading={loading}
                bordered
                columns={columns}
                dataSource={pricing}
                pagination={{
                    position: ['bottomRight'],
                    pageSize: 50,
                    pageSizeOptions: ['50', '100', '250', '500', '800'],
                }}
            />

            {currentPricing && (
                <Modal
                    //width={1000}
                    visible={isVisible}
                    footer={null}
                    onCancel={() => setIsVisible(false)}
                >
                    <div className="text-center my-5">
                        <Title level={2} className="mb-0">
                            {currentPricing.name ?? 'Unnamed'}
                        </Title>
                        <Text type="secondary" className="text-uppercase">
                            Pricing Plan
                        </Text>{' '}
                        <br />
                        <Link href={`/apps/current/pricing/${currentPricing._id}`}>
                            <Button size="small" className="mt-2" type="primary">
                                Edit
                            </Button>
                        </Link>
                    </div>

                    <List
                        size="small"
                        bordered
                        dataSource={[
                            {
                                title: 'Unit Price',
                                description: 'Cost',
                                value: currentPricing.unit_price ? currentPricing.unit_price.toLocaleString() : 0,
                            },
                            {
                                title: 'Mode',
                                description: 'Type of charge',
                                value: currentPricing.pricing_mode,
                            },
                            {
                                title: 'Interval',
                                description: 'When the customer will be charged',
                                value: currentPricing.interval,
                            },
                            {
                                title: 'Currency',
                                description: 'Default currency',
                                value: currentPricing.currency,
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
                        header="Limits"
                        className="mt-4"
                        bordered
                        dataSource={[
                            {
                                title: 'Per Minute',
                                value: currentPricing.limits.per_minute,
                            },
                            {
                                title: 'Per Day',
                                value: currentPricing.limits.per_day,
                            },
                            {
                                title: 'Per Hour',
                                value: currentPricing.limits.per_hour,
                            },
                            {
                                title: 'Per Week',
                                value: currentPricing.limits.per_week,
                            },
                            {
                                title: 'Per Month',
                                value: currentPricing.limits.per_month,
                            },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta title={item.title} />
                                <div>{item.value}</div>
                            </List.Item>
                        )}
                    />
                </Modal>
            )}
        </div>
    );
};

export default PricingView;
