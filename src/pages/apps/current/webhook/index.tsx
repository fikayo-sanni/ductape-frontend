import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card,Typography, Upload,Space,Modal,Input,Form} from 'antd';
import {  DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import WebhooksView from '../../../../components/app/webhooks'
import type { MenuProps, UploadProps } from 'antd';
import { createAppWebhook} from '../../../../components/services/actions.service';

const { Dragger } = Upload;

const { Title, Text } = Typography;
//const setupsView = dynamic(() => import('../../../../components/app/setups'));

const Webhooks = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState({});
    const [setups, setSetups] = useState([
        {
            "_id": "63d4d9a52a11769b530d5324",
            "app_id": "634416c83ce5731f54301e4f",
            "user_id": "62cc17ec5a62fd899d256de0",
            "name": "Account Created",
            "tag": "ACCOUNT_CREATED",
            "setup_type": "registered",
            "description": "React when an account gets created successfully",
            "resource": "/summaria",
            "method": "POST",
            "private_key": "7b797d0d-e955-461a-9a60-2d7ff1289975",
            "created": "2023-01-28T08:15:33.055Z",
            "__v": 0,
            "pairings": [
              {
                "_id": "63d4d9a52a11769b530d5326",
                "webhook_id": "63d4d9a52a11769b530d5324",
                "env_id": "62e41dd25efa8a33c23d4cc5",
                "__v": 0
              },
              {
                "_id": "63d4d9a52a11769b530d5327",
                "webhook_id": "63d4d9a52a11769b530d5324",
                "env_id": "62e41dd25efa8a33c23d4cc6",
                "__v": 0
              }
            ]
          } 
      ]);

    const dispatch = useDispatch();
    const handleClick = () => {
        setVisible(!visible);
    };

    const createWebhook= async (data) => {
        console.log(data);
        
        const response = await createAppWebhook({
            ...data,
            token: user.auth_token,
            app_id: app._id,
            public_key: user.public_key,
            user_id: user._id,
            envs: app.envs
        });
        console.log(response.data.data);
      };

    const handleSave = () => {
        createWebhook(input)
        setVisible(false);
    }
    
    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
        
      }
    useEffect(() => {
    
    }, []);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Webhooks">
            <PageHeader
                title="Webhooks"
                extra={
                    <>
                            <Space onClick={handleClick}>
                                create webhook
                                <PlusCircleOutlined />
                            </Space>
                    </>
                }
            />
            <Card className="no_background no_border">
                <WebhooksView data={setups}/>
            </Card>
            
            <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Create Webhook
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            webhooks
                        </Text>
                    </div>
                }
                open={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Form.Item label="Name">
                        <Input name="name" onChange={handleTextAreaChange} />
                    </Form.Item>

                    <Form.Item label="tag">
                        <Input name="tag" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()} />
                    </Form.Item>
                    <Form.Item label="method">
                        <Input name="method" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                    </Form.Item>
                    <Form.Item label="setup_type">
                        <Input name="setup_type" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="base_url">
                        <Input name="base_url" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="resource">
                        <Input name="resource" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="description">
                        <Input name="description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" name="import" onClick={handleSave}>Save</Button>
                    </Form.Item>
                </Form>

            </Modal>
        </Dashboard_Layout>
    );
};

export default Webhooks;
