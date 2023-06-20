import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useEffect, useState } from 'react';
import { Card, Divider, List, Radio, Space, Statistic, Tag, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import CountUp from 'react-countup';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

/*const LineGraph = dynamic(() => import('../../../components/common/lineGraph'));
const RingGraph = dynamic(() => import('../../../components/common/ringGraph'));
const TimeGraph = dynamic(() => import('../../../components/common/timeGraph'));*/

const { Title, Text } = Typography;
const AppInfo = dynamic(() => import('../../../components/app/appInfo'));

const Index = (props) => {
    const {app_id} = props;
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);

    const myData = [
        { type: 'success', percent: 0.75 },
        { type: 'failure', percent: 0.25 },
    ];
    const myContent = {
        siteCode: '电商',
        title: '注册成功率',
        percent: '66.66%',
    };

    const formatter = (value: number) => <CountUp className="font-black" end={value} separator="," />;
    useEffect(() => {
        console.log(app);
        // alert(JSON.stringify(app));
    }, []);

    // <LineGraph />

    // <RingGraph data={myData} content={myContent} color="#00875A" />

    // <TimeGraph />

    // <RingGraph data={myData} content={myContent} color="#0746a6" />

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="My App" type="app" id={app_id}>
            <div className="overflow-hidden">
                <PageHeader title={'App'} app={app} />
                <section
                    className=""
                    style={{ position: 'relative', marginTop: -60, paddingLeft: 120, paddingRight: 120 }}
                >
                    <div className="row">
                        <div className="col-lg-4 padding-right">
                            <Card className="bg-white border border-1">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Actions</Text>}
                                    value={10}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card className="bg-white border border-1">
                                <Statistic
                                    className="font-black"
                                    title={
                                        <Text className="font-gray font-weight-500 text-uppercase">Integrations</Text>
                                    }
                                    value={112893}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>

                        <div className="col-lg-4">
                            <Card className="bg-white border border-1">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Workloads</Text>}
                                    value={93}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-12">
                            <Card>
                                <div className="py-3">
                                    <Text className="mb-0">
                                        <Space style={{ marginBottom: 15 }}>
                                            <Radio.Group value={'top'}>
                                                <Radio.Button value="top">Actions</Radio.Button>
                                                <Radio.Button value="right">Events</Radio.Button>
                                                <Radio.Button value="bottom">Finances</Radio.Button>
                                            </Radio.Group>
                                        </Space>
                                    </Text>
                                </div>
                                <div className="pt-5">
                                    
                                </div>
                            </Card>
                        </div>
                    </div>

                    <div className="row mt-4 mb-4">
                        <div className="col-lg-6">
                            <Card className="m-0">
                                <div className="row">
                                    <div className="col-4">
                                        
                                    </div>
                                    <div className="col-5 pt-1">
                                        <Title className="pt-2" level={4}>
                                            75%
                                        </Title>
                                        <Text className="text-muted">Request Success Rate</Text>
                                    </div>
                                    <div className="col-3 mt-2">
                                        <div
                                            className="row bold"
                                            style={{ color: '#00875A', marginTop: 50, fontWeight: 600 }}
                                        >
                                            <div className="col-1 me-2">
                                                <ArrowUpOutlined style={{ color: '#00875A', fontWeight: 900 }} />
                                            </div>{' '}
                                            15.78%
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                                <div className="row">
                                    <div className="col-4">
                                        
                                    </div>
                                    <div className="col-5 pt-1">
                                        <Title className="pt-2" level={4}>
                                            75%
                                        </Title>
                                        <Text className="text-muted">Request Success Rate</Text>
                                    </div>
                                    <div className="col-3 mt-4">
                                        <div
                                            className="row bold"
                                            style={{ color: '#DE350B', marginTop: 50, fontWeight: 600 }}
                                        >
                                            <div className="col-1 me-2">
                                                <ArrowDownOutlined style={{ color: '#DE350B', fontWeight: 900 }} />
                                            </div>{' '}
                                            15.78%
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-lg-6">
                            <Card>
                                <div className="col-12">
                                    <br />
                                    
                                    <div className="mt-4 row">
                                        <div className="col-9">
                                            <Title level={5}>$21.2k</Title>
                                            <Text className="text-muted">Visitors this year</Text>
                                        </div>
                                        <div className="col-3">
                                            <div>
                                                <div
                                                    className="row bold"
                                                    style={{ color: '#0746a6', marginTop: 20, fontWeight: 600 }}
                                                >
                                                    <div className="col-1 me-2">
                                                        <ArrowUpOutlined
                                                            style={{ color: '#0746a6', fontWeight: 900 }}
                                                        />
                                                    </div>{' '}
                                                    15.78%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </Dashboard_Layout>
    );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
    const app_id = params.app_id;

    return {
        props: { app_id },
    };
};
