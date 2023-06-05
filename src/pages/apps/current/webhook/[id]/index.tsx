import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../../components/common/pageHeader';
import { Button, Card,Typography, Upload,Space,Select,Modal,Input,Form} from 'antd';
import {  DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import {updateAppWebhook, fetchEvent} from '../../../../../components/services/actions.service';

import Router from 'next/router';



const { Dragger } = Upload;

const { Title, Text } = Typography;

const { TextArea } = Input;
const SingleEvent = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({});
    const [webhooks, setWebhooks] = useState({});
    const webhookId = Router.query.id;

    const updateWebhook= async (data) => {
        console.log({...data,
          public_key: user.public_key,
          user_id: user._id,
          token: user.auth_token,
          webhook_id: Router.query.id});
        try{
        const response = await updateAppWebhook({
            ...data,
            public_key: user.public_key,
            user_id: user._id,
            token: user.auth_token,
            webhook_id: Router.query.id,
        });
        console.log(response.data.data);
      } catch (e) {
        const error = e.response ? e.response.data.errors : e.toString();
        console.log(error || e.toString());
        throw e;
    }
      };
    const handleSave = () => {
        updateWebhook(input)
    }
    
    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
    }
    const handleSelectChange = async (name,value) => {
        await setInput({ ...input, [name]: value });
    }

    const fetchData = async () => {
        const event = await fetchEvent({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            webhook_id: webhookId,
        });
        setWebhooks(event.data.data)
    };
    useEffect(() => {
        fetchData()
    }, [Router.query.id]);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Webhooks">
            <PageHeader
                title="Webhooks"
            />
            <Card className="no_background ">
            <Form>
                    <Form.Item >
                        <Input name="name" placeholder="Event Name" onChange={handleTextAreaChange} />
                    </Form.Item>

                    <Form.Item>
                        <Input name="tag" placeholder="Event Tag" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()} />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            dropdownStyle={{zIndex: 1000000}}
                            onChange={value => {handleSelectChange("action_id", value)}}
                            placeholder="Select Action For This Event"
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            dropdownStyle={{zIndex: 1000000}}
                            onChange={value => {handleSelectChange("method", value)}}
                            placeholder="Event Method"
                            options={[
                                { value: 'POST', label: 'POST' },
                                { value: 'GET', label: 'GET' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            dropdownStyle={{zIndex: 1000000}}
                            onChange={value => {handleSelectChange("setup_type", value)}}
                            placeholder="Choose Setup Type"
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input name="resource" placeholder="Resource" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Select
                                mode="tags"
                                dropdownStyle={{zIndex: 1000000}}
                                onChange={value => {handleSelectChange("envs", value)}}
                                placeholder="Event Environments"
                                options={[
                                    { value: 'jack', label: 'Jack' },
                                    { value: 'lucy', label: 'Lucy' },
                                ]}
                            />
                    </Form.Item>
                    <Form.Item>
                        <TextArea name="description" placeholder="Description" onChange={handleTextAreaChange}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" name="import" onClick={handleSave}>Save</Button>
                    </Form.Item>
                </Form>
            </Card>
            
        </Dashboard_Layout>
    );
};

export default SingleEvent;
