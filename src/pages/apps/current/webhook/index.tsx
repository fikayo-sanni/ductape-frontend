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
import { fetchApp} from '../../../../components/services/apps.service';
import {CreateEventOne} from '../../../../components/app/Events_Modals/createEventOne'
import {CreateEventTwo} from '../../../../components/app/Events_Modals/createEventTwo'

const { Dragger } = Upload;

const { Title, Text } = Typography;
//const setupsView = dynamic(() => import('../../../../components/app/setups'));

const Webhooks = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [stepOne, showStepOne] = useState(false)
    const [stepTwo, showStepTwo] = useState(false)
    const [input, setInput] = useState({});
    const [webhooks, setWebhooks] = useState([]);

    const dispatch = useDispatch();

    const createWebhook= async (data) => {
        console.log(data);
        try {
            const envIds = app.envs.map(env => env._id);
            console.log({
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
});
            
            const response = await createAppWebhook({
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
            setWebhooks(appDetails.data.data.webhooks)
        };
        fetchAppDetails()
    }, []);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Webhooks">
            <PageHeader
                title="Webhooks"
                extra={
                    <>
                            <Space onClick={() =>{showStepOne(true);}}>
                                create webhook
                                <PlusCircleOutlined />
                            </Space>
                    </>
                }
            />
            <Card className="no_background no_border">
                <WebhooksView data={webhooks}/>
            </Card>
            {stepOne ?<CreateEventOne showModal={showStepOne} showNext={showStepTwo}/>:<></>}
            {stepTwo ?<CreateEventTwo showModal={showStepTwo} showPrev={showStepOne}/>:<></>}
        </Dashboard_Layout>
    );
};

export default Webhooks;
