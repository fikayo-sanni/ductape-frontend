import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useState } from 'react';
import PageHeader from '../../../components/common/pageHeader';

const Index = (props) => {
    const { app_id } = props;

    //alert(JSON.stringify(props));

    const [text, setText] = useState('');
    const [html, setHTML] = useState('');

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="About">
            <PageHeader title="App Info." />

            <Overview app_id={app_id} defaultText={text} defaultHTML={html} />
        </Dashboard_Layout>
    );
};

export default Index;
