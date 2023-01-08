import React, { useState } from 'react';
import { Card, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface Props {
    title: string;
    extra?: any;
}

export const PageHeader: React.FC<Props> = ({ title, extra }) => {
    return (
        <Card className="rounded-0 py-2">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <Title className="mb-0" level={2}>
                    {title}
                </Title>

                <div className="title_extra">{extra}</div>
            </div>
        </Card>
    );
};

export default PageHeader;
