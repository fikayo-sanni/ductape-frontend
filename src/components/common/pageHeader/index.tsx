import React, { ReactDOM, useState } from 'react';
import { Button, Card, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface Props {
    title?: string;
    extra?: any;
    secondExtra?: any;
    handleClick?: () => void;
    secondHandleClick?: () => void;
}

export const PageHeader: React.FC<Props> = ({ title, handleClick, secondHandleClick, extra, secondExtra }) => {
    return (
        <Card className="rounded-0 border border-top-0 border-start-0 border-end-0 py-2 m w-90 padding-header">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <Title className="mb-0" level={2}>
                    {title || app.app_name}
                </Title>

                <div className="title_extra">
                    {secondExtra && <Button onClick={secondHandleClick}>{secondExtra}</Button>} 
                    {extra && <Button onClick={handleClick}>{extra}</Button>}
                </div>
            </div>
        </Card>
    );
};

export default PageHeader;
