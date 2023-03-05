import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useEffect, useState } from 'react';
import { Card, Divider, Tag, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const { Title, Text } = Typography;
const AppInfo = dynamic(() => import('../../../components/app/appInfo'));

const Index = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);

    useEffect(() => {
        console.log(app);
    }, []);
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="My App">
            <PageHeader title="My App" />

            <Card className="no_background no_border">
                <div className="container">
                    <Divider orientation="left" orientationMargin="0">
                        <Title level={4}> General Information</Title>
                    </Divider>

                    <div className="row mb-5">
                        <div className="col-lg-3">
                            <Text className="font-weight-700">App Name</Text> <br />
                            <Text>{app.app_name}</Text>
                        </div>
                        <div className="col-lg-3">
                            <Text className="font-weight-700">Status</Text> <br />
                            <Tag
                                className="text-uppercase"
                                color={app.status === 'active' ? 'green' : app.status === 'draft' ? 'orange' : 'red'}
                            >
                                {app.status}
                            </Tag>
                        </div>
                        <div className="col-lg-3">
                            <Text className="font-weight-700">App ID</Text> <br />
                            <Text>{app._id}</Text>
                        </div>
                        <div className="col-lg-3">
                            <Text className="font-weight-700">Workspace ID</Text> <br />
                            <Text>{app.workspace_id}</Text>
                        </div>
                    </div>
                </div>
                <AppInfo />
            </Card>
        </Dashboard_Layout>
    );
};

export default Index;
