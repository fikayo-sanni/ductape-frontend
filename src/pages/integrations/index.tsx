import Dashboard_Layout from '../../components/layout/dashboard_layout';
import Overview from '../../components/apps/app/overview';
import { setCurrentApp } from '../../redux/applicationSlice';
import React, { useEffect, useState } from 'react';
import { Card, Divider, Input, Radio, Select, Tag, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Integration_Layout from '../../components/layout/integration_layout';
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
import { fetchWorkspaceApps } from '../../components/services/apps.service';
import { fetchWorkspaceIntegrations } from '../../components/services/integrations.service';

const { Title, Text } = Typography;

const AppInfo = dynamic(() => import('../../components/app/appInfo'));
const PageHeader = dynamic(() => import('../../components/common/pageHeader'));
const Loading = dynamic(() => import('../../components/common/loading'));
const IntegrationDisplay = dynamic(() => import('../../components/common/integrationDisplay'));

export default function Integrations(props) {
    const { user, integration, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [integrations, setIntegrations] = useState([]);
    const [filterIntegrations, setFilterIntegrations] = useState([]);
    const [search, setSearch] = useState('');
    const [orientation, setOrientation] = useState('grid');
    const [filter, setFilter] = useState<string[]>(['draft', 'public', 'private']);
    const [loading, setLoading] = useState(true);

    const fetchIntegratios = async () => {
        const response = await fetchWorkspaceIntegrations({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            workspace_id: defaultWorkspaceId,
        });

        console.log(response);
        if (response.data.status) {
            setIntegrations(response.data.data);
            setLoading(false);
        }
    };

    const onSearch = async (e) => {
        const keyword = e.target.value;

        let integrationList = [...integrations];

        integrationList = integrationList.filter((item) => {
            return item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        setFilter(['draft', 'public', 'private']);
        setSearch(e.target.value);
        setFilterIntegrations(integrationList);
    };

    useEffect(() => {
        fetchIntegratios();
    }, []);
    return (
        <Dashboard_Layout showSidebar={false} title="Integrations" appPage="Integration">
            <PageHeader title="Integrations" />

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
                                        setFilterIntegrations([]);
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
                                ? filterIntegrations.map((integration) => (
                                      <IntegrationDisplay orientation={orientation} integration={integration} />
                                  ))
                                : integrations.map(
                                      (integration) =>
                                          filter.includes(integration.status) && (
                                              <IntegrationDisplay orientation={orientation} integration={integration} />
                                          ),
                                  )}
                        </div>
                    </div>
                )}
            </section>
        </Dashboard_Layout>
    );
}
