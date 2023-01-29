import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import { useState } from 'react';

const Index = (props) => {
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="My App">
            WELCOME
        </Dashboard_Layout>
    );
};

export default Index;
