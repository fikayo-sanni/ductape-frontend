import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card,Typography, Upload,Space,Modal,Input} from 'antd';
import {  DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import SetupsView from '../../../../components/app/setups'
import type { MenuProps, UploadProps } from 'antd';

const { Dragger } = Upload;

const { Title, Text } = Typography;
//const setupsView = dynamic(() => import('../../../../components/app/setups'));

const Setups = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState({}); 
    const [setups, setSetups] = useState([
        {
          "_id": "6381eab6f26803d2b679b17a",
          "user_id": "62cc17ec5a62fd899d256de0",
          "app_id": "631d792aa5ed5e9c6b74dc58",
          "name": "Token Access",
          "setup_type": "credential_access",
          "expiry": 500,
          "period": "hours",
          "resource": "/resource/setups",
          "method": "POST",
          "description": "Lamar",
          "__v": 0
        }
      ]);

    const dispatch = useDispatch();
    const handleClick = () => {
        setVisible(!visible);
    };
    const handleSave = () => {
    
        setVisible(false);
    }
    
    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
        
      }
    useEffect(() => {
    console.log(app.setups, app);
    
    }, []);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Setups">
            <PageHeader
                title="Setups"
                extra={
                    <>
                            <Space onClick={handleClick}>
                                create setup
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
                <div className="mb-3">
                    <label>Name</label>
                    <Input className="mb-3" name="name"  onChange={handleTextAreaChange} />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <Input.TextArea className="mb-3" rows={5} name="description"  onChange={handleTextAreaChange} />
                </div>

                <Button type="primary" onClick={handleSave}>Save</Button>
            </Modal>
        </Dashboard_Layout>
    );
};

export default Setups;
