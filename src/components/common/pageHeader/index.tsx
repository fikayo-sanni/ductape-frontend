import React, { ReactDOM, useState } from 'react';
import { Button, Card, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface Props {
    title?: string;
    extra?: any;
    app?: any;
    handleClick?: () => void;
}

export const PageHeader: React.FC<Props> = ({ title, handleClick, extra, app }) => {
    return (
        <Card className="rounded-0 border border-top-0 border-start-0 border-end-0 py-2 m w-90 padding-header">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <Title className="mb-0" level={2}>
                    {title || app.app_name}
                </Title>

                <div className="title_extra">{extra && <Button onClick={handleClick}>{extra}</Button>}</div>
            </div>
        </Card>
    );
};

export default PageHeader;
