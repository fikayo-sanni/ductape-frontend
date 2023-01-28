import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Typography, Button, Result } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentWorkspace, logoutUser } from '../../redux/applicationSlice';
import dynamic from 'next/dynamic';
import MDEditor from '@uiw/react-md-editor';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { updateApp } from '../services/apps.service';
import { changeSelectedApp } from '../../data/applicationSlice';
import toast from 'react-hot-toast';

const { Text, Title } = Typography;

interface Props {}

const Loading = dynamic(() => import('../../components/common/loading'));

export const AppInfo: React.FC<Props> = ({}) => {
    const { user, app } = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [dApp, setDApp] = useState(app);
    const [edit, setEdit] = useState(false);

    const toggleEdit = async () => {
        if (edit) {
            toast.loading('Updating App');
            try {
                const data = await updateApp({
                    aboutHTML: dApp.aboutHTML,
                    token: user.auth_token,
                    user_id: user._id,
                    public_key: user.public_key,
                    app_id: app._id,
                });

                dispatch(changeSelectedApp(data.data.data));

                toast.success('App Updated');
            } catch (e) {
                NProgress.done();
                const error = e.response ? e.response.data.errors : e.toString();
                toast.error(error || e.toString());
            }
        }

        setEdit(!edit);
    };

    useEffect(() => {}, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="padding_20">
            <div className="d-flex mb-3 justify-content-between">
                <div>
                    <Title level={4} className="mb-0">
                        Readme
                    </Title>
                    <Text type="secondary">Tell us about your app, what it does, and how to use it</Text>
                </div>
                <div>
                    <Button onClick={() => toggleEdit()}>
                        {edit ? (
                            <>
                                <SaveOutlined /> Save
                            </>
                        ) : (
                            <>
                                <EditOutlined /> Edit
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {edit ? (
                <MDEditor
                    className="p-3"
                    value={dApp.aboutHTML}
                    onChange={(value) => {
                        setDApp({ ...dApp, aboutHTML: value });
                    }}
                />
            ) : (
                <MDEditor.Markdown className="p-3" source={dApp.aboutHTML} style={{ whiteSpace: 'pre-wrap' }} />
            )}

            <div className="d-flex mb-3 mt-5 justify-content-between">
                <div>
                    <Title level={4} className="mb-0">
                        FAQ
                    </Title>
                    <Text type="secondary">Frequently asked questions about your app</Text>
                </div>
            </div>
            <Result
                status="info"
                title="Coming soon"
                subTitle="Soon you will be able to add featured questionaires about your app/product"
            />
        </div>
    );
};

export default AppInfo;
