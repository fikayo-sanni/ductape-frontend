import React, { useState } from 'react';
import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import PageHeader from '../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Input, Modal, Typography } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { createAppEnv } from '../../../components/services/apps.service';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const { Title, Text } = Typography;
const AppEnvironments = dynamic(() => import('../../../components/app/environments'));

const Environments = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [visible, setVisible] = useState(false);
    const [newEnv, setNewEnv] = useState({
        name: '',
        description: '',
    });

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleChange = (e) => {
        setNewEnv({ ...newEnv, [e.target.name]: e.target.value });
    };

    const createApp = async () => {
        toast.loading('Creating environment');
        try {
            const { auth_token: token, _id: user_id, public_key } = user;
            const create = await createAppEnv({
                ...env,
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
                app_id: app._id,
                workspace_id: defaultWorkspaceId,
            });

            toast.success('Env Created');
            setLoading(false);
            refreshEnvs(create.data.data);
            closeCreateDialog();
            NProgress.done();
        } catch (e) {
            NProgress.done();
            setLoading(false);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
        // closeCreateDialog();
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
                <div className="mb-3">
                    <label>Name</label>
                    <Input value={newEnv.name} name="name" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label>Slug</label>
                    <Input value={newEnv.name} />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <Input.TextArea value={newEnv.description} name="description" onChange={handleChange} rows={3} />
                </div>

                <Button type="primary">Create</Button>
            </Modal>
        </Dashboard_Layout>
    );
};

export default Environments;
