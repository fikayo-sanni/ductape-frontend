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
import {CreateAuthModal} from '../../../../components/app/Authorization_Modals/createAuth';

import type { MenuProps, UploadProps } from 'antd';

const { Dragger } = Upload;

const { Title, Text } = Typography;
//const setupsView = dynamic(() => import('../../../../components/app/setups'));

const Setups = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [createAuth, setCreateAuth] = useState(false);
    const [input, setInput] = useState({}); 
    const [setups, setSetups] = useState([]);

    const dispatch = useDispatch();
    const handleClick = () => {
        setCreateAuth(!createAuth);
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
            {createAuth ?<CreateAuthModal showModal={setCreateAuth}/>:<></>}
        </Dashboard_Layout>
    );
};



export default Setups;
