import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Input,Modal, Tag, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { updateIntegration } from '../../../components/services/integrations.service';
import { EditOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;

const AppInfo = dynamic(() => import('../../../components/app/appInfo'));

const Index = () => {
    const { user, integration, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [data, setData] = useState({
        name: "",
        description : ""
    }); 
    const [visible, setVisible] = useState(false);

 
    const updateIntegrationDescription = async (data) => {
        console.log(data);
        
        const response = await updateIntegration({
            token: user.auth_token,
            body: data,
            integration_id: integration._id,
        });
        console.log(response.data.data);
      };

    useEffect(() => {
        console.log(integration);
    }, []);
    
    const handleClick = () => {
        setVisible(!visible);
    };

    const handleSave = () => {
        updateIntegrationDescription(data);
        setVisible(false);
    }

    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setData({ ...data, [e.target.name]: value });
    }
    return (
        <Dashboard_Layout showSidebar={true} title="Integrations" integrationPage="My Integration">
            <PageHeader title="My Integration"
             handleClick={handleClick}
            extra={
                <>
                    <EditOutlined /> Edit Integration
                </>
            }
             />

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
                    <Input.TextArea className="mb-3" rows={5} name="description" defaultValue={integration.description} onChange={handleTextAreaChange} />
                    <Button type="primary" onClick={handleSave}>Save</Button>
                </div>
            </Card>

            <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Edit Integration
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            Integration
                        </Text>
                    </div>
                }
                open={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <div className="mb-3">
                    <label>Name</label>
                    <Input className="mb-3" name="name" defaultValue={integration.name} onChange={handleTextAreaChange} />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <Input.TextArea className="mb-3" rows={5} name="description" defaultValue={integration.description} onChange={handleTextAreaChange} />
                </div>

                <Button type="primary" onClick={handleSave}>Save</Button>
            </Modal>
        </Dashboard_Layout>
    );
};

export default Index;
