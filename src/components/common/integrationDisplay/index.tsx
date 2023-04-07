import React, { useState } from 'react';
import { Avatar, Card, Tag, Typography } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { changeSelectedIntegration } from '../../../redux/applicationSlice';
import Router from 'next/router';
import { fetchIntegration } from '../../services/integrations.service';

const { Title, Text, Paragraph } = Typography;

interface Props {
    integration: any;
    orientation: string;
}

const IntegrationDisplay: React.FC<Props> = ({ integration, orientation = 'grid' }) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.app);

    const openIntegration = async (integration) => {
        const response = await fetchIntegration({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            integration_id: integration._id,
        });

        await dispatch(changeSelectedIntegration(response.data.data));
        Router.push(`/integrations/current`);
    };

    return orientation === 'grid' ? (
        <div className="col-xl-4 cursor_pointer" onClick={() => openIntegration(integration)}>
            <Card className=" mb-4" actions={[<Text>{integration.envs.length} environments</Text>]}>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex flex-row gap-2">
                        <Avatar className="font-sm-2" shape="square" size="large">
                            {integration.name.charAt(0)}
                        </Avatar>
                        <div>
                            <Title className="mb-0" level={5}>
                                {integration.name}
                            </Title>
                            <Text type="secondary" className="text-capitalize mb-0">
                                {integration.status}
                            </Text>
                        </div>
                    </div>
                    {integration.active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
                </div>
            </Card>
        </div>
    ) : (
        <div className="col-xl-12">
            <Card className="mb-4">
                <div className="d-flex flex-row w-100 gap-3 justify-content-between align-items-center">
                    <div className="d-flex flex-row gap-3 w-25">
                        <Avatar className="font-sm-2" shape="square" size="large">
                            {integration.name.charAt(0)}
                        </Avatar>

                        <div>
                            <Title className="mb-0" level={5}>
                                {integration.name}
                            </Title>
                            <Text type="secondary" className="text-capitalize mb-0">
                                {integration.status}
                            </Text>
                        </div>
                    </div>

                    <div>
                        <ul className="mb-0">
                            <li>
                                <Text className="mb-0">{integration.envs.length} environments</Text>
                            </li>
                        </ul>
                    </div>

                    {integration.active ? (
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

export default IntegrationDisplay;
