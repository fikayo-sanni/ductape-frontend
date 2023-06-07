import React, { useEffect, useState } from 'react';
// import * as Api from '../../api';

import {
    Alert,
    Button,
    Card,
    Image,
    Upload,
    Input,
    Collapse,
    Select,
    Space,
    Steps,
    Tag,
    theme,
    Typography,
} from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import dynamic from 'next/dynamic';

const { Title, Text } = Typography;

const AppInfo = dynamic(() => import('./appInfo'));
const Envs = dynamic(() => import('./environments'));
const Pricing = dynamic(() => import('./pricing'));

export const GetStarted: React.FC = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const { token } = theme.useToken();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);

    const contentStyle: React.CSSProperties = {
        padding: 30,
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const onChange = (value: number) => {
        console.log('onChange:', current);
        setCurrent(value);
    };

    useEffect(() => {}, []);
    return (
        <section className=" container">
            <Card>
                <Steps
                    current={current}
                    onChange={onChange}
                    type="navigation"
                    items={[
                        {
                            title: 'Read Me',
                            description: 'Update app readme.md and FAQ',
                        },
                        {
                            title: 'Environments',
                            description: 'Create app environments',
                        },
                        {
                            title: 'Pricing',
                            description: 'Create app pricing plans',
                        },
                        {
                            title: 'Actions',
                            description: 'Create app endpoints',
                        },
                        {
                            title: 'Webhooks',
                            description: 'Create app webhooks',
                        },
                    ]}
                />

                <div style={contentStyle} className="my-4">
                    {current === 0 ? <AppInfo /> : current === 1 ? <Envs /> : current === 2 ? <Pricing /> : null}
                </div>
            </Card>
        </section>
    );
};

export default GetStarted;
