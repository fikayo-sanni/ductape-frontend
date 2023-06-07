import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useState } from 'react';
import { Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';

const GetStartedView = dynamic(() => import('../../../components/app/getStarted'));

const GetStarted = (props) => {
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Get Started">
            <PageHeader title="Get Started" />

            <Card className="no_background no_border">
                <GetStartedView />
            </Card>
        </Dashboard_Layout>
    );
};

export default GetStarted;
