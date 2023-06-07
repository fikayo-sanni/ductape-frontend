import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import Overview from '../../../components/apps/app/overview';
import { setCurrentApp } from '../../../redux/applicationSlice';
import React, { useState } from 'react';
import { Button, Card, Divider, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';

import 'react-markdown-editor-lite/lib/index.css';
import AppInfo from '../../../components/app/appInfo';
import AppEnvironments from '../../../components/app/environments';
import { EnvSetup } from '../../../components/app/envSetup';
import { updateApp } from '../../../components/services/apps.service';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ImportActions } from '../../../components/app/importActions';

const { Text, Title, Paragraph } = Typography;
// const GetStartedView = dynamic(() => import('../../../components/app/getStarted'));
//<GetStartedView />

const Header = ({ index }) => {
    const headerInfo = [
        {
            step: 'General Information',
            description: 'Update App Description and Frequently asked questions',
        },
        {
            step: 'Environments',
            description: 'Define and Setup app Environments',
        },
        {
            step: 'Actions',
            description: 'Import app actions and their specifications from API Docs',
        },
        {
            step: 'Pricing',
            description: 'Define app integration financials specifications',
        },
        {
            step: 'Events',
            description: 'Setup app events, webhooks and callbacks',
        },
    ];
    const step = 'General Information';
    const description = 'Update App Description and Frequently asked questions';
    return (
        <div className="row p-4">
            <div className="col-5 row">
                <Button type="primary" className="text-uppercase col-4 ps-1 pe-1">
                    Step {index} of 5
                </Button>{' '}
                <Title level={5} className="col-6 pt-1">
                    {headerInfo[index - 1].step}
                </Title>
            </div>
            <div className="pt-3 ps-0">
                <Text className="text-muted pt-4 font-weight-300">{headerInfo[index - 1].description}</Text>
            </div>
        </div>
    );
};

const Footer = ({ index, setIndex }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    const updateIndex = async (newState) => {
        try {
            await updateApp({
                get_started: newState,
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
                app_id: app._id,
            });

            setIndex(newState);

            dispatch(setCurrentApp({ ...app, get_started: newState }));
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    return (
        <div className="row p-5 pb-2">
            <div className="col-9"></div>
            <div className="col-3 row ms-2">
                <Button
                    className="text-uppercase col-4 me-4"
                    disabled={index == 1}
                    onClick={() => updateIndex(index - 1)}
                >
                    Prev
                </Button>
                <Button
                    type="primary"
                    className="text-uppercase col-4 ps-1 pe-1"
                    disabled={index == 5}
                    onClick={() => updateIndex(index + 1)}
                >
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
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [index, setIndex] = useState(app.get_started);
    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Get Started">
            <PageHeader title="Get Started" />

            <section className="" style={{ position: 'relative', marginTop: 60, paddingLeft: 120, paddingRight: 120 }}>
                <Card className="border mb-4" title={<Header index={index} />}>
                    {index === 1 ? (
                        <AppInfo />
                    ) : index === 2 ? (
                        <EnvSetup />
                    ) : index === 3 ? (
                        <ImportActions title="Setup Actions From API Docs" />
                    ) : (
                        <></>
                    )}

                    <Footer index={index} setIndex={setIndex} />
                </Card>
            </section>
        </Dashboard_Layout>
    );
};

export default GetStarted;
