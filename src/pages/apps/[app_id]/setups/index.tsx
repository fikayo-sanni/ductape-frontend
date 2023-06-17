import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card,Typography, Upload,Space,Modal,Input,Form} from 'antd';
import {  DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import SetupsView from '../../../../components/app/setups';
import { fetchApp, createAppSetup} from '../../../../components/services/apps.service'; 

import type { MenuProps, UploadProps } from 'antd';

const { Dragger } = Upload;

const { Title, Text } = Typography;
//const setupsView = dynamic(() => import('../../../../components/app/setups'));

const Setups = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState({}); 
    const [setups, setSetups] = useState([]);

    const dispatch = useDispatch();
    const handleClick = () => {
        setVisible(!visible);
    };
    const createSetup= async (data) => {
        console.log(data);
        try {
            const envIds = app.envs.map(env => env._id);
            const response = await createAppSetup({
                ...data,
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
                envs: envIds
            });
        console.log(response.data.data);
    } catch (e) {
        const error = e.response ? e.response.data.errors : e.toString();
        console.log(error || e.toString());
        throw e;
    }
      };
    const handleSave = () => {
        createSetup(input)
        setVisible(false);
    }
    
    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
        
      }
    useEffect(() => {
        const fetchAppDetails = async () => {
            const appDetails = await fetchApp({
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
                app_id: app._id,
                workspace_id: defaultWorkspaceId,
            });
    
            console.log(appDetails.data.data);
            setSetups(appDetails.data.data.setups)
        };
        fetchAppDetails()
    }, []);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Setups">
            <PageHeader
                title="Authorization"
                extra={
                    <>
                            <Space onClick={handleClick}>
                                create Authorization
                                <PlusCircleOutlined />
                            </Space>
                    </>
                }
            />
            <Card className="no_background no_border">
                <SetupsView data={setups}/>
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
                <Form>
                    <Form.Item label="Name">
                        <Input name="name" onChange={handleTextAreaChange} />
                    </Form.Item>

                    <Form.Item label="Period">
                        <Input name="period" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="Method">
                        <Input name="method" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                    </Form.Item>
                    <Form.Item label="Setup_type">
                        <Input name="setup_type" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="Base_url">
                        <Input name="base_url" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="Resource">
                        <Input name="resource" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input name="description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="Expiry">
                        <Input name="expiry" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" name="import" onClick={handleSave}>Save</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Dashboard_Layout>
    );
};



export default Setups;
