import React, { useState } from 'react';
import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Modal, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const AppEnvironments = dynamic(() => import('../../../components/app/environments'));

const Environments = () => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Environments">
            <PageHeader
                title="Environments"
                handleClick={handleClick}
                extra={
                    <>
                        <PlusCircleOutlined /> Create Environment
                    </>
                }
            />
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
