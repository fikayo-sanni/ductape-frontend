import Dashboard_Layout from '../../components/layout/dashboard_layout';
import React, { useContext, Component, useEffect, useState } from 'react';
import Icon, { ArrowUpOutlined, PoweroffOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';
import { WorkspaceModal } from '../../components/common/dashboard/workspaceModal';
import { ConfigProvider, theme, Tabs, Typography, Card, Breadcrumb, Button, Statistic, Modal } from 'antd';
import { RootState } from '../../redux/store';
import { logoutUser } from '../../redux/applicationSlice';
import CountUp from 'react-countup';
import CreateWorkspaceModal from '../modal';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { darkAlgorithm } = theme;

export default function Dashbboard() {
    const { user, workspaces } = useSelector((state: RootState) => state.app);
    // alert(JSON.stringify(user))
    let modal = false
    if(workspaces.length===0) modal = true;

    const [workspaceModal, showWorkspaceModal] = useState(modal)

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const formatter = (value: number) => <CountUp className="font-black" end={value} separator="," />;

    useEffect(() => {
        if(workspaces.length === 0){
            console.log(workspaces);

            setVisible(true)
        }
        else{
            console.log("workspaces");
            console.log(workspaces);
        }

    }, []);

    return (
        <Dashboard_Layout title="Dashboard">
            <div className="h-full row overflow-hidden">
                <Card className="border border-1 border-top-0 border-start-0 border-end-0 rounded-0 px-5 pt-3 padding_50-bottom ">
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <Breadcrumb className="mb-3 ">
                                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                <Breadcrumb.Item>{moment().format('dddd DD MMMM, YYYY')}</Breadcrumb.Item>
                            </Breadcrumb>
                            <Title className=" mb-0">
                                <span className="font-weight-200">Welcome Back,</span> {user.firstname}
                            </Title>
                        </div>
                        <div>
                            <Button size="large" onClick={async () => await dispatch(logoutUser())}>
                                <PoweroffOutlined /> Logout
                            </Button>
                        </div>
                    </div>
                </Card>
                <section className="padding_50-left padding_50-right " style={{ position: 'relative', marginTop: -60 }}>
                    <div className="row">
                        <div className="col-lg-3 padding-right">
                            <Card className="bg-white border border-1">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Apps</Text>}
                                    value={10}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>
                        <div className="col-lg-3">
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

                        <div className="col-lg-3">
                            <Card className="bg-white border border-1">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Workloads</Text>}
                                    value={93}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>

                        <div className="col-lg-3">
                            <Card className="bg-white border border-1">
                                <Statistic
                                    className="font-black"
                                    title={<Text className="font-gray font-weight-500 text-uppercase">Events</Text>}
                                    value={93}
                                    formatter={formatter}
                                />
                            </Card>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-8">
                            <Card
                                title={
                                    <div className="py-3">
                                        <Title className="mb-0" level={4}>
                                            Requests Overtime
                                        </Title>
                                        <Text type="secondary" className="font-weight-300">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor Some text
                                            content here
                                        </Text>
                                    </div>
                                }
                                className="border"
                            >
                                <div className="padding_50 text-center">BIG CHART HERE</div>
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card
                                title={
                                    <div className="py-3">
                                        <Title className="mb-0" level={4}>
                                            Integrations
                                        </Title>
                                        <Text type="secondary" className="font-weight-300">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor Some text
                                            content here
                                        </Text>
                                    </div>
                                }
                                className="border"
                            >
                                <div className="padding_50 text-center">SMALL CHART HERE</div>
                            </Card>
                        </div>
                    </div>
                </section>
                {workspaceModal ?<WorkspaceModal showWorkspaceModal={showWorkspaceModal}/>:<></>}
            </div>
        </Dashboard_Layout>
    );
}
