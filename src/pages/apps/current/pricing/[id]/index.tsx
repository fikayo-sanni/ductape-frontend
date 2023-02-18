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

interface Pricing {
    _id: string;
    app_id: string;
    name: string;
    envs: string[];
    interval: string;
    limits: any;
    pricing_mode: string;
}

const EditPricing = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [env, setEnv] = useState<Pricing>();
    const [loading, setLoading] = useState(true);
    const envId = Router.query.id;

    const handleClick = () => {
        Router.push(`/apps/current/pricing`);
    };

    const fetchPricing = async () => {
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

            {loading ? (
                <Loading />
            ) : (
                <div className="container py-5">
                    <Button type="primary" onClick={() => updateEnvironment()} className="mt-3">
                        Update
                    </Button>
                </div>
            )}
        </Dashboard_Layout>
    );
};

export default EditPricing;
