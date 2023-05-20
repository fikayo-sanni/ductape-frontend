import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useState } from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';

import 'react-markdown-editor-lite/lib/index.css';
import AppInfo from '../../../components/app/appInfo';

const { Text, Title, Paragraph } = Typography;
// const GetStartedView = dynamic(() => import('../../../components/app/getStarted'));
//<GetStartedView />

const Header = ({ index }) => {
    const num = 1;
    const step = 'General Information';
    const description = 'Update App Description and Frequently asked questions';
    return (
        <div className="row p-4">
            <div className="col-5 row">
                <Button type="primary" className="text-uppercase col-4 ps-1 pe-1">
                    Step {num} of 5
                </Button>{' '}
                <Title level={5} className="col-6 pt-1">
                    {step}
                </Title>
            </div>
            <div className="pt-3 ps-0">
                <Text className="text-muted pt-4 font-weight-300">{description}</Text>
            </div>
        </div>
    );
};

const Footer = ({ index }) => {
    return (
        <div className="row p-5">
            <div className="col-9"></div>
            <div className="col-3 row">
                <Button className="text-uppercase col-4 me-4">
                    Prev
                </Button>
                <Button type="primary" className="text-uppercase col-4 ps-1 pe-1">
                    Next
                </Button>
            </div>
        </div>
    );
};

/*const AppInfo = () => {
    return <div className="p-4 pt-1 col">
        <Title level={4} className="font-weight-500">Read Me</Title>
        <MdEditor style={{ height: '400px' }} />

        
    </div>;
};*/

const GetStarted = (props) => {
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Get Started">
            <PageHeader title="Get Started" />

            <section className="" style={{ position: 'relative', marginTop: 60, paddingLeft: 120, paddingRight: 120 }}>
                <Card className="border mb-4" title={<Header index={1} />}>
                    <AppInfo />

                    <Footer index={1} />
                </Card>
            </section>
        </Dashboard_Layout>
    );
};

export default GetStarted;
