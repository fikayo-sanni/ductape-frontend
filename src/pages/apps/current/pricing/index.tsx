import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Input, Modal, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { slug } from 'github-slugger';

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
