import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useEffect, useState } from 'react';
import { Card, Divider, Tag, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Integration_Layout from "../../../components/layout/integration_layout";


const { Title, Text } = Typography;
const AppInfo = dynamic(() => import('../../../components/app/appInfo'));


const Index = (props) => {
    const { user,integration, defaultWorkspaceId } = useSelector((state: RootState) => state.app);

    useEffect(() => {
    }, []);
  return (
    
    <Dashboard_Layout showSidebar={false} title="Integrations" appPage="Integration">
    <PageHeader title="Integration" />

    <Card className="no_background no_border">
        <div className="container">
            <Divider orientation="left" orientationMargin="0">
                <Title level={4}> General Information</Title>
            </Divider>

            <div className="row mb-5">
                <div className="col-lg-3">
                    <Text className="font-weight-700">{integration.name}</Text> <br />
                </div>
                <div className="col-lg-3">
                    <Text className="font-weight-700">Status</Text> <br />
                    <Tag
                        className="text-uppercase"
                    >
                    </Tag>
                </div>
                <div className="col-lg-3">
                    <Text className="font-weight-700">Integration ID</Text> <br />
                </div>
                <div className="col-lg-3">
                    <Text className="font-weight-700">Workspace ID</Text> <br />
                </div>
            </div>
        </div>
    </Card>
</Dashboard_Layout>
);
};

export default Index; 