import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Input, Tag, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { updateIntegration } from '../../../components/services/integrations.service';

const { Title, Text } = Typography;

const AppInfo = dynamic(() => import('../../../components/app/appInfo'));

const Index = () => {
    const { user, integration, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [description, setDescription] = useState(integration.description); 


    const updateIntegrationDescription = async (description) => {
        console.log(user.auth_token, description,integration._id );
        const response = await updateIntegration({
            token: user.auth_token,
            body: {
                description
            },
            integration_id: integration._id,
        });
        console.log(response.data.data);
      };

    useEffect(() => {
        console.log(integration);
    }, []);

    const handleSave = () => {
        updateIntegrationDescription(description);
    }

    const handleTextAreaChange = (e) => {
        setDescription(e.target.value);
    }
    return (
        <Dashboard_Layout showSidebar={true} title="Integrations" integrationPage="My Integration">
            <PageHeader title="My Integration" />

            <Card className="no_background no_border">
                <div className="container">
                    <Divider orientation="left" orientationMargin="0">
                        <Title level={4}> General Information</Title>
                    </Divider>

                    <div className="row mb-5">
                        <div className="col-lg-3">
                            <Text className="font-weight-700">App Name</Text> <br />
                            <Text>{integration.name}</Text>
                        </div>
                        <div className="col-lg-3">
                            <Text className="font-weight-700">Status</Text> <br />
                            <Tag
                                className="text-uppercase"
                                color={
                                    integration.status === 'active'
                                        ? 'green'
                                        : integration.status === 'draft'
                                        ? 'orange'
                                        : 'red'
                                }
                            >
                                {integration.status}
                            </Tag>
                        </div>
                        <div className="col-lg-3">
                            <Text className="font-weight-700">Integration ID</Text> <br />
                            <Text>{integration._id}</Text>
                        </div>
                        <div className="col-lg-3">
                            <Text className="font-weight-700">Workspace ID</Text> <br />
                            <Text>{integration.workspace_id}</Text>
                        </div>
                    </div>

                    <Divider orientation="left" orientationMargin="0">
                        <Title level={4}> Description</Title>
                    </Divider>
                    <Input.TextArea className="mb-3" rows={5} defaultValue={integration.description} onChange={handleTextAreaChange} />
                    <Button type="primary" onClick={handleSave}>Save</Button>
                </div>
            </Card>
        </Dashboard_Layout>
    );
};

export default Index;
