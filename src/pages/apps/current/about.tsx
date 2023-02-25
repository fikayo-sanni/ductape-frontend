import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useState } from 'react';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Card } from 'antd';

const AppInfo = dynamic(() => import('../../../components/app/appInfo'));

const About = (props) => {
    const { app_id } = props;

    //alert(JSON.stringify(props));

    const [text, setText] = useState('');
    const [html, setHTML] = useState('');

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="About">
            <PageHeader title="App Info." />

            <Card className="no_background no_border  body_card">
                <AppInfo />
            </Card>
        </Dashboard_Layout>
    );
};

export default About;
