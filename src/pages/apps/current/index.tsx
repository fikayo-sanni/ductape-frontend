import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useState } from 'react';
import { Card } from 'antd';

const Index = (props) => {
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="My App">
            WELCOME
            <Card className="no_background no_border  body_card"></Card>
        </Dashboard_Layout>
    );
};

export default Index;
