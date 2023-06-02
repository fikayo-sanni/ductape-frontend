import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card,Dropdown,Select, Space, Input, Modal,Form, Typography,message, Upload } from 'antd';
import {  DownOutlined, InboxOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { importPostman, createActions,fetchFolders } from '../../../../components/services/actions.service';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { slug } from 'github-slugger';
import { setCurrentApp } from '../../../../redux/applicationSlice';
import Router from 'next/router';
import type { MenuProps, UploadProps } from 'antd';

const { Dragger } = Upload;

const { Title, Text } = Typography;
const ActionsView = dynamic(() => import('../../../../components/app/actions'));

const Actions = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [createVisible, setCreateVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [appFolders, setAppFolders] = useState([]);
    const [selectedData, setSelectedData] = useState("");
    const [data, setData] = useState({
        description: "",
        resource: "",
        httpVerb:"",
        tag: "",
        name: ""
    }); 

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if(e.key === "1")
        {
            setCreateVisible(true)
        }
        else if(e.key === "2")
        {
            setUpdateVisible(true)
        }
      };
    
    const items: MenuProps['items'] = [
        {
          label: 'Create Action',
          key: '1',

        },
        {
          label: 'Upload Actions',
          key: '2',
        }
      ];
    const menuProps = {
    items,
    onClick: handleMenuClick,
    };

    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setData({ ...data, [e.target.name]: value });
        console.log(data);
        
    }

    const onChange = (value) => {
            setSelectedData(value);        
      };
    
    const importPostmanCollection = async () => {
        try {
        const response = await importPostman({
            token: user.auth_token,
            app_id: app._id,
            public_key: user.public_key,
            user_id: user._id,
            files: selectedFiles[0],
            type: selectedData,
            workspace_id: defaultWorkspaceId,
        });
        console.log(response.data.data);
    } catch (e) {
        const error = e.response ? e.response.data.errors : e.toString();
        console.log(error || e.toString());
    }
    setUpdateVisible(false);
    };
    
    const createAction = async () => { 
        try {
            const response = await createActions({
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
                folder_id: selectedData,
                type: "CREATE",
                name: data.name,
                resource: data.resource,
                description: data.description ,
                tag: data.tag,
                httpVerb: data.httpVerb,
            });
            console.log(response.data.data); 
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            console.log(error || e.toString());
            throw e;
        }
        
    setCreateVisible(false);
    };
    const onFileChange = (e) => {
        const { status, originFileObj } = e.file;
        if (status !== 'uploading') {
          console.log(e.file, e.fileList);
        }
        if (status === 'done') {
          message.success(`${e.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${e.file.name} file upload failed.`);
        }
        setSelectedFiles([originFileObj]);
      }

    
    useEffect(() => {
        const fetchAppFolders = async () => {
            const response = await fetchFolders({
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
            });
            console.log(response.data.data);
            setAppFolders(response.data.data);
        };
        fetchAppFolders()
    }, []);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Actions">
            <PageHeader
                title="Actions"
                extra={
                    <>
                    <Dropdown menu={ menuProps }>
                            <Space>
                                Actions
                                <DownOutlined />
                            </Space>
                    </Dropdown>
                    </>
                }
            />
            <div className="no_background padding-0 h-100">
                <ActionsView />
            </div>

            <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Create Action
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            Action
                        </Text>
                    </div>
                }
                open={createVisible}
                footer={null}
                onCancel={() => setCreateVisible(false)}
            >
            
            <Form>

            <Form.Item
            label="Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input name="name" onChange={handleTextAreaChange} />
        </Form.Item>
        <Form.Item
            label="Folder"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Select
                placeholder="Select app folder"
                onChange={onChange}
                options={appFolders.map((folder) => ({
                    value: folder._id,
                    label: folder.name,
                }))}
            />
        </Form.Item>
        <Form.Item
            label="HTTP Verb"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input name="httpVerb" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()} />
        </Form.Item>
        <Form.Item
            label="Resource"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input name="resource" onChange={handleTextAreaChange} />
        </Form.Item>
        <Form.Item
            label="Tag"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input name="tag" onChange={handleTextAreaChange} />
        </Form.Item>
        <Form.Item
            label="Description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
        >
            <Input.TextArea rows={3} name="description" onChange={handleTextAreaChange}/>
        </Form.Item>
        <Form.Item>
            <Button type="primary" name="import" onClick={createAction}>Save</Button>
        </Form.Item>
    </Form>
            </Modal>
            

            <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Update Action
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            Import Postman Collection
                        </Text>
                    </div>
                }
                open={updateVisible}
                footer={null}
                onCancel={() => setUpdateVisible(false)}
                >
                <div className="">
                    <label>postman Type</label>
                </div>
                    <Select
                        className="mb-3"
                        placeholder="Select a type"
                        onChange={onChange}
                        options={[
                        {
                            value: 'v2.1',
                            label: ' postman v2.1',
                        },
                        {
                            value: 'v2.0',
                            label: ' postman v2.0',
                        },
                        {
                            value: 'openAPI 3.0.0',
                            label: 'openAPI 3.0.0',
                        },
                        ]}
                    />
                <div className="mb-3">
                    <Dragger onChange={onFileChange}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                        </p>
                    </Dragger>
                </div>
                <Button type="primary" name="import" onClick={importPostmanCollection}>Save</Button>
            </Modal>
            
        </Dashboard_Layout>
    );
};

export default Actions;
