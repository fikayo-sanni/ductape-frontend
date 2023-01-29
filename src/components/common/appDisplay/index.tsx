import React, { useState } from 'react';
import { Avatar, Card, Tag, Typography } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setCurrentApp } from '../../../redux/applicationSlice';
import Router from 'next/router';

const { Title, Text, Paragraph } = Typography;

interface Props {
    app: any;
    orientation: string;
}

const AppDisplay: React.FC<Props> = ({ app, orientation = 'grid' }) => {
    const dispatch = useDispatch();

    const { user, defaultWorkspaceId } = useSelector((state: RootState) => state.app);

    const openApp = async (app) => {
        await dispatch(setCurrentApp(app));
        Router.push(`/apps/current`);
    };

    return orientation === 'grid' ? (
        <div className="col-xl-4 cursor_pointer" onClick={() => openApp(app)}>
            <Card
                className=" mb-4"
                actions={[
                    <Text>{app.domains ? app.domains.length : 0} domains</Text>,
                    <Text>{app.envs.length} environments</Text>,
                ]}
            >
                <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex flex-row gap-2">
                        <Avatar className="font-sm-2" shape="square" size="large">
                            {app.app_name.charAt(0)}
                        </Avatar>
                        <div>
                            <Title className="mb-0" level={5}>
                                {app.app_name}
                            </Title>
                            <Text type="secondary" className="text-capitalize mb-0">
                                {app.status}
                            </Text>
                        </div>
                    </div>
                    {app.active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
                </div>
            </Card>
        </div>
    ) : (
        <div className="col-xl-12">
            <Card className="mb-4">
                <div className="d-flex flex-row w-100 gap-3 justify-content-between align-items-center">
                    <div className="d-flex flex-row gap-3 w-25">
                        <Avatar className="font-sm-2" shape="square" size="large">
                            {app.app_name.charAt(0)}
                        </Avatar>

                        <div>
                            <Title className="mb-0" level={5}>
                                {app.app_name}
                            </Title>
                            <Text type="secondary" className="text-capitalize mb-0">
                                {app.status}
                            </Text>
                        </div>
                    </div>

                    <div>
                        <ul className="mb-0">
                            <li>
                                <Text className="mb-0">{app.domains ? app.domains.length : 0} domains</Text>
                            </li>
                            <li>
                                <Text className="mb-0">{app.envs.length} environments</Text>
                            </li>
                        </ul>
                    </div>

                    {app.active ? (
                        <Tag className="mb-0" color="green">
                            Active
                        </Tag>
                    ) : (
                        <Tag className="mb-0" color="red">
                            Inactive
                        </Tag>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AppDisplay;
