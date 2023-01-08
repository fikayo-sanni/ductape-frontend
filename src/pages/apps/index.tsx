import React, { useEffect, useState } from 'react';
import AppList from '../../components/apps/appList';
import { Avatar, Card, Input, Tag, Typography, Select } from 'antd';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { fetchWorkspaceApps } from '../../components/services/apps.service';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard_Layout from '../../components/layout/dashboard_layout';
import { RootState } from '../../redux/store';

const { Title, Text, Paragraph } = Typography;

const PageHeader = dynamic(() => import('../../components/common/pageHeader'));
const Loading = dynamic(() => import('../../components/common/loading'));

export default function Apps(props) {
    const { user, workspace, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [apps, setApps] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    const fetchApps = async () => {
        const response = await fetchWorkspaceApps({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            workspace_id: defaultWorkspaceId,
        });

        console.log(response.data.data);
        if (response.data.status) {
            setApps(response.data.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <Dashboard_Layout title="Apps">
            <PageHeader title="Apps" />

            <section className="container my-5">
                {loading ? (
                    <Loading />
                ) : (
                    <div>
                        <Select
                            defaultValue="all"
                            style={{ width: 120 }}
                            onChange={null}
                            options={[
                                {
                                    value: 'all',
                                    label: 'All',
                                },
                                {
                                    value: 'public',
                                    label: 'Public',
                                },
                                {
                                    value: 'private',
                                    label: 'Private',
                                },
                                {
                                    value: 'draft',
                                    label: 'Draft',
                                },
                            ]}
                        />
                        <div className="row mt-4">
                            {apps.map((app) => (
                                <div className="col-xl-4">
                                    <Card
                                        className=" mb-4"
                                        actions={[
                                            <Text>{app.domains ? app.domains.length : 0} domains</Text>,
                                            <Text>{app.envs.length} environments</Text>,
                                        ]}
                                    >
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="d-flex flex-row gap-2">
                                                <Avatar className="font-sm-2" shape="square" size="large">
                                                    {app.app_name.charAt(0)}
                                                </Avatar>
                                                <div>
                                                    <Title className="mb-0" level={5}>
                                                        {app.app_name}
                                                    </Title>
                                                    <Text type="secondary" className="text-capitalize mb-0">
                                                        {app.status}
                                                    </Text>
                                                </div>
                                            </div>
                                            {app.active ? (
                                                <Tag color="green">Active</Tag>
                                            ) : (
                                                <Tag color="red">Inactive</Tag>
                                            )}
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </Dashboard_Layout>
    );
}

/**
 *
 * <Dashboard_layout title="Apps">

 {isModalVisible?<CreateAppModal showModal={showModal} refreshApps={refreshApps}/>: <></>}
 {isDefaultsModalVisible?<CreateEnvsModal showModal={showDefaultsModal}/>:<></>}

 <section className="padding_10">
 <div className="padding_20">
 <Breadcrumb>
 <Breadcrumb.Item>Apps</Breadcrumb.Item>
 <Breadcrumb.Item className="text-white">""</Breadcrumb.Item>
 </Breadcrumb>
 </div>
 <div className="row">
 <div className="col-2">
 <Menu
 defaultSelectedKeys={["1"]}
 mode="inline"
 theme="light"
 inlineCollapsed={false}
 className="border-none"
 >
 <Menu.Item key="1">
 <span>All</span>
 </Menu.Item>
 <Menu.Item key="2">
 <span>Draft</span>
 </Menu.Item>
 <Menu.Item key="3">
 <span>Private</span>
 </Menu.Item>
 <Menu.Item key="4">
 <span>Public</span>
 </Menu.Item>
 </Menu>
 <button
 className="btn btn-outline-primary w-100 mb-3 mt-3 text-uppercase"
 onClick={()=>{showModal(true)}}
 >
 Apps <PlusOutlined />
 </button>
 <button
 className="btn btn-outline-danger w-100 text-uppercase"
 onClick={()=>{showDefaultsModal(true)}}
 >
 Envs <SettingOutlined />
 </button>
 </div>
 <div className="col-10">

 </div>
 </div>
 </section>
 </Dashboard_layout>
 */
