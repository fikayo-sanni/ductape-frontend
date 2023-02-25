import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Input, Modal, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { createAppEnv, fetchApp } from '../../../../components/services/apps.service';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { slug } from 'github-slugger';
import { setCurrentApp } from '../../../../redux/applicationSlice';
import Router from 'next/router';

const { Title, Text } = Typography;
const PricingView = dynamic(() => import('../../../../components/app/pricing'));

const Pricing = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [newEnv, setNewEnv] = useState({
        env_name: '',
        slug: '',
        description: '',
    });

    const handleClick = () => {
        Router.push(`/apps/current/pricing/new`);
    };

    const handleChange = async (e) => {
        let value = e.target.value;

        if (e.target.name === 'slug') {
            value = slug(e.target.value);
        }

        await setNewEnv({ ...newEnv, [e.target.name]: value });
    };

    const createEnv = async () => {
        try {
            if (!newEnv.env_name.trim() || !newEnv.slug.trim() || !newEnv.description.trim()) {
                toast.error('Fill in all details');
                return true;
            }
            toast.loading('Creating environment');

            await createAppEnv({
                ...newEnv,
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
                app_id: app._id,
                workspace_id: defaultWorkspaceId,
            });

            const appDetails = await fetchApp({
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
                app_id: app._id,
                workspace_id: defaultWorkspaceId,
            });

            dispatch(setCurrentApp(appDetails.data.data));

            toast.success('Environment Created');

            setNewEnv({ env_name: '', slug: '', description: '' });
            setVisible(false);
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    useEffect(() => {});

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Pricing">
            <PageHeader
                title="Pricing"
                handleClick={handleClick}
                extra={
                    <>
                        <PlusCircleOutlined /> Create Pricing Plan
                    </>
                }
            />
            <Card className="no_background no_border">
                <PricingView />
            </Card>
        </Dashboard_Layout>
    );
};

export default Pricing;
