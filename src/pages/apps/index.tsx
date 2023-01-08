import React, { useEffect, useState } from 'react';
import AppList from '../../components/apps/appList';
import { Avatar, Card, Input, Tag, Typography, Select, Radio } from 'antd';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { fetchWorkspaceApps } from '../../components/services/apps.service';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard_Layout from '../../components/layout/dashboard_layout';
import { RootState } from '../../redux/store';
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const PageHeader = dynamic(() => import('../../components/common/pageHeader'));
const Loading = dynamic(() => import('../../components/common/loading'));
const AppDisplay = dynamic(() => import('../../components/common/appDisplay'));

export default function Apps(props) {
    const { user, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [apps, setApps] = useState([]);
    const [filterApps, setFilterApps] = useState([]);
    const [search, setSearch] = useState('');
    const [orientation, setOrientation] = useState('grid');
    const [filter, setFilter] = useState<string[]>(['draft', 'public', 'private']);
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

    const onSearch = async (e) => {
        const keyword = e.target.value;

        let appList = [...apps];

        appList = appList.filter((item) => {
            return item.app_name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        setFilter(['draft', 'public', 'private']);
        setSearch(e.target.value);
        setFilterApps(appList);
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
                        <div className="d-flex justify-content-between align-items-center gap-4">
                            <div className="col">
                                <Input
                                    onChange={onSearch}
                                    allowClear
                                    value={search}
                                    size="large"
                                    placeholder="Search"
                                    prefix={<SearchOutlined />}
                                />
                            </div>
                            <div className="col-auto">
                                <Radio.Group
                                    size="large"
                                    onChange={(e) => setOrientation(e.target.value)}
                                    value={orientation}
                                    className="ms-auto"
                                >
                                    <Radio.Button value="grid">
                                        <AppstoreOutlined />
                                    </Radio.Button>
                                    <Radio.Button value="list">
                                        <BarsOutlined />
                                    </Radio.Button>
                                </Radio.Group>
                            </div>
                            <div className="col-auto">
                                <Select
                                    defaultValue="All"
                                    size="large"
                                    style={{ width: 120 }}
                                    onChange={(value) => {
                                        setFilter(value.split(','));
                                        setFilterApps([]);
                                        setSearch('');
                                    }}
                                    options={[
                                        {
                                            value: 'draft,public,private',
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
                            </div>
                        </div>

                        <div className="row mt-4">
                            {search.length
                                ? filterApps.map((app) => <AppDisplay orientation={orientation} app={app} />)
                                : apps.map(
                                      (app) =>
                                          filter.includes(app.status) && (
                                              <AppDisplay orientation={orientation} app={app} />
                                          ),
                                  )}
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
