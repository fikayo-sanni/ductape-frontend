import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Input, List, Modal, Switch, Tag, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined, SwapLeftOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { createAppEnv, fetchApp, fetchAppEnv, updateAppEnv } from '../../../../../components/services/apps.service';
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

interface Environment {
    _id: string;
    env_name: string;
    slug: string;
    base_url: string;
    request_type: string;
    payment_type: any;
    description: string;
    active: boolean;
    whitelist: boolean;
}

const EditEnvironments = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [env, setEnv] = useState<Environment>();
    const [loading, setLoading] = useState(true);
    const envId = Router.query.id;

    const handleClick = () => {
        Router.push(`/apps/current/env`);
    };

    const fetchEnv = async () => {
        const dEnv = await fetchAppEnv({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            env_id: envId,
        });

        setEnv(dEnv.data.data[0]);
        setLoading(false);
    };

    const updateEnvironment = async () => {
        toast.loading('Updating Environment');
        const response = await updateAppEnv({
            ...env,
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            env_id: envId,
        });

        toast.success('Environment Updated');
        console.log(response.data.data);
        dispatch(setCurrentApp(response.data.data));
    };

    useEffect(() => {
        fetchEnv();
    }, [Router.query.id]);
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Environments">
            <PageHeader
                title="Edit Environment"
                handleClick={handleClick}
                extra={
                    <>
                        <SwapLeftOutlined /> Back to Environments
                    </>
                }
            />

            {loading ? (
                <Loading />
            ) : (
                <div className="container py-5">
                    <List
                        size="small"
                        header={<div className="font-weight-700 d-flex justify-content-between">Title</div>}
                        bordered
                        dataSource={[
                            {
                                title: <div>Name</div>,
                                description: 'Environment name',
                                value: (
                                    <Input
                                        value={env.env_name}
                                        onChange={(e) => setEnv({ ...env, ['env_name']: e.target.value })}
                                        size="large"
                                    />
                                ),
                            },
                            {
                                title: <div>Description</div>,
                                description: 'Environment description',
                                value: (
                                    <Input.TextArea
                                        rows={3}
                                        value={env.description}
                                        onChange={(e) => setEnv({ ...env, ['description']: e.target.value })}
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

                    <List
                        size="small"
                        className="mt-4"
                        header={<div className="font-weight-700 d-flex justify-content-between">Activation</div>}
                        bordered
                        dataSource={[
                            {
                                title: <div>Status</div>,
                                description: 'Activate to receive requests',
                                value: (
                                    <Switch
                                        checked={env.active}
                                        onChange={(checked) => setEnv({ ...env, ['active']: checked })}
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
                        className="mt-4"
                        header={<div className="font-weight-700 d-flex justify-content-between">General</div>}
                        bordered
                        dataSource={[
                            {
                                title: 'Slug',
                                description: 'Environment short name',
                                value: (
                                    <Input
                                        value={env.slug}
                                        maxLength={3}
                                        onChange={(e) => setEnv({ ...env, ['slug']: slug(e.target.value) })}
                                        size="large"
                                        className="mb-4"
                                    />
                                ),
                            },
                            {
                                title: 'Base URL',
                                description: 'Base URL for all endpoints in this environment',
                                value: (
                                    <Input
                                        value={env.base_url}
                                        onChange={(e) => setEnv({ ...env, ['base_url']: e.target.value })}
                                        size="large"
                                        className="mb-4"
                                    />
                                ),
                            },
                            {
                                title: 'Content Type',
                                description: 'Default content type',
                                value: (
                                    <Input
                                        value={env.request_type}
                                        onChange={(e) => setEnv({ ...env, ['request_type']: e.target.value })}
                                        size="large"
                                        className="mb-4"
                                    />
                                ),
                            },
                            {
                                title: 'Whitelist',
                                description: null,
                                value: (
                                    <Switch
                                        checked={env.whitelist}
                                        onChange={(checked) => setEnv({ ...env, ['whitelist']: checked })}
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
                        className="mt-4"
                        header={<div className="font-weight-700 d-flex justify-content-between">Pricing</div>}
                        bordered
                        dataSource={[
                            {
                                title: 'Pricing Bundle',
                                description: 'Strategy for pricing this environment',
                                value: String(env.payment_type).toUpperCase(),
                            },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta title={item.title} description={item.description} />
                                <div>{item.value}</div>
                            </List.Item>
                        )}
                    />

                    <Button type="primary" onClick={() => updateEnvironment()} className="mt-3">
                        Update
                    </Button>
                </div>
            )}
        </Dashboard_Layout>
    );
};

export default EditEnvironments;
