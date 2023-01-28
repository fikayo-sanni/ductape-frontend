import React, { useState } from 'react';
import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Modal, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const AppEnvironments = dynamic(() => import('../../../components/app/environments'));

const Environments = () => {
    const [visible, setVisible] = useState(true);

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Environments">
            <Card className="rounded-0 border-top-0 border-start-0 border-end-0 py-2">
                <div className="container d-flex flex-row justify-content-between align-items-center">
                    <Typography.Title className="mb-0" level={2}>
                        Environments
                    </Typography.Title>

                    <div className="title_extra">
                        dd
                        <Button onClick={() => setVisible(true)}>
                            <PlusCircleOutlined /> Create Environment
                        </Button>
                    </div>
                </div>
            </Card>

            <AppEnvironments />

            <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Create New Environment
                        </Typography.Title>
                        <Text type="secondary text-uppercase">Environment</Text>
                    </div>
                }
                width={1000}
                open={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                yes
            </Modal>
        </Dashboard_Layout>
    );
};

export default Environments;
