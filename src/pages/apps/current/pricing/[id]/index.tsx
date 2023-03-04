import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Input, List, Modal, Select, Switch, Tag, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined, SwapLeftOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import {
    createAppEnv,
    fetchApp,
    fetchAppEnv,
    fetchSinglePricing,
    updateAppEnv,
    updatePricing,
} from '../../../../../components/services/apps.service';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { slug } from 'github-slugger';
import { setCurrentApp } from '../../../../../redux/applicationSlice';
import Link from 'next/link';
import Router from 'next/router';
import Loading from '../../../../../components/common/loading';

const { Title, Text, Paragraph } = Typography;
const AppEnvironments = dynamic(() => import('../../../../../components/app/environments'));

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

const EditPricing = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [pricing, setPricing] = useState<Pricing>();
    const [loading, setLoading] = useState(true);
    const pricingId = Router.query.id;

    const handleClick = () => {
        Router.push(`/apps/current/pricing`);
    };

    const fetchPricing = async () => {
        const pricingData = await fetchSinglePricing({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            pricing_id: pricingId,
        });

        //console.log(pricingData.data.data);
        setPricing(pricingData.data.data);
        setLoading(false);
    };

    const updatePricingPlan = async () => {
        toast.loading('Updating Pricing Plan');
        const response = await updatePricing({
            ...pricing,
            ...(pricing.pricing_mode === 'upfront' && { one_time: 'one-time' }),
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            pricing_id: pricingId,
        });

        toast.success('Pricing Plan Updated');
        // console.log(response.data.data);
        // dispatch(setCurrentApp(response.data.data));
    };

    useEffect(() => {
        fetchPricing();
    }, [Router.query.id]);
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Pricing">
            <PageHeader
                title="Edit Pricing"
                handleClick={handleClick}
                extra={
                    <>
                        <SwapLeftOutlined /> Back to Pricing
                    </>
                }
            />

            <Card className="no_background no_border">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="container ">
                        <List
                            size="small"
                            header={<div className="font-weight-700 d-flex justify-content-between">General</div>}
                            bordered
                            dataSource={[
                                {
                                    title: <div>Name</div>,
                                    description: '',
                                    value: (
                                        <Input
                                            value={pricing.name}
                                            onChange={(e) => setPricing({ ...pricing, ['name']: e.target.value })}
                                            size="large"
                                        />
                                    ),
                                },
                                {
                                    title: <div>Unit Price</div>,
                                    description: 'Cost',
                                    value: (
                                        <Input
                                            value={pricing.unit_price}
                                            onChange={(e) =>
                                                !isNaN(Number(e.target.value)) &&
                                                setPricing({ ...pricing, ['unit_price']: e.target.value })
                                            }
                                            size="large"
                                        />
                                    ),
                                },
                                {
                                    title: <div>Mode</div>,
                                    description: 'Type of charge',
                                    value: (
                                        <Select
                                            defaultValue={pricing.pricing_mode}
                                            style={{ width: 150 }}
                                            onChange={(value) => setPricing({ ...pricing, ['pricing_mode']: value })}
                                            options={[
                                                { value: 'per_request', label: 'Per Request' },
                                                { value: 'upfront', label: 'Upfront' },
                                                { value: 'intervals', label: 'Intervals' },
                                            ]}
                                        />
                                    ),
                                },

                                {
                                    title: <div>Interval</div>,
                                    description: 'When the customer will be charged',
                                    value:
                                        pricing.pricing_mode === 'upfront' ? (
                                            'One-Time'
                                        ) : (
                                            <Select
                                                defaultValue={pricing.interval}
                                                style={{ width: 150 }}
                                                onChange={(value) => setPricing({ ...pricing, ['interval']: value })}
                                                options={[
                                                    { value: 'daily', label: 'Daily' },
                                                    { value: 'weekly', label: 'Weekly' },
                                                    { value: 'bi-weekly', label: 'Bi-weekly' },
                                                    { value: 'monthly', label: 'Monthly' },
                                                    { value: 'quarterly', label: 'Quarterly' },
                                                    { value: 'yearly', label: 'Yearly' },
                                                ]}
                                            />
                                        ),
                                },

                                {
                                    title: <div>Currency</div>,
                                    description: 'When the customer will be charged',
                                    value: (
                                        <Select
                                            defaultValue={pricing.currency}
                                            style={{ width: 150 }}
                                            onChange={(value) => setPricing({ ...pricing, ['currency']: value })}
                                            options={[
                                                { value: 'USD', label: 'Dollar' },
                                                { value: 'GBP', label: 'Pounds' },
                                                { value: 'EUR', label: 'Euro' },
                                                { value: 'NGN', label: 'Naira' },
                                            ]}
                                        />
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
                            header="Limits"
                            className="mt-4"
                            bordered
                            dataSource={[
                                {
                                    title: <div>Per Minute</div>,
                                    description: 'Set as 0 for unlimited',
                                    value: (
                                        <Input
                                            value={pricing.limits.per_minute}
                                            onChange={(e) =>
                                                !isNaN(Number(e.target.value)) &&
                                                setPricing({
                                                    ...pricing,
                                                    limits: { ...pricing.limits, per_minute: e.target.value },
                                                })
                                            }
                                            size="large"
                                        />
                                    ),
                                },
                                {
                                    title: <div>Per Day</div>,
                                    description: 'Set as 0 for unlimited',
                                    value: (
                                        <Input
                                            value={pricing.limits.per_day}
                                            onChange={(e) =>
                                                !isNaN(Number(e.target.value)) &&
                                                setPricing({
                                                    ...pricing,
                                                    limits: { ...pricing.limits, per_day: e.target.value },
                                                })
                                            }
                                            size="large"
                                        />
                                    ),
                                },
                                {
                                    title: <div>Per Hour</div>,
                                    value: (
                                        <Input
                                            value={pricing.limits.per_hour}
                                            onChange={(e) =>
                                                !isNaN(Number(e.target.value)) &&
                                                setPricing({
                                                    ...pricing,
                                                    limits: { ...pricing.limits, per_hour: e.target.value },
                                                })
                                            }
                                            size="large"
                                        />
                                    ),
                                },
                                {
                                    title: <div>Per Week</div>,
                                    description: 'Set as 0 for unlimited',
                                    value: (
                                        <Input
                                            value={pricing.limits.per_week}
                                            onChange={(e) =>
                                                !isNaN(Number(e.target.value)) &&
                                                setPricing({
                                                    ...pricing,
                                                    limits: { ...pricing.limits, per_week: e.target.value },
                                                })
                                            }
                                            size="large"
                                        />
                                    ),
                                },
                                {
                                    title: <div>Per Month</div>,
                                    description: 'Set as 0 for unlimited',
                                    value: (
                                        <Input
                                            value={pricing.limits.per_month}
                                            onChange={(e) =>
                                                !isNaN(Number(e.target.value)) &&
                                                setPricing({
                                                    ...pricing,
                                                    limits: { ...pricing.limits, per_month: e.target.value },
                                                })
                                            }
                                            size="large"
                                        />
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

                        <Button type="primary" onClick={() => updatePricingPlan()} className="mt-3">
                            Update
                        </Button>
                    </div>
                )}
            </Card>
        </Dashboard_Layout>
    );
};

export default EditPricing;
