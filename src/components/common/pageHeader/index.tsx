import React, { ReactDOM, useState } from 'react';
import { Button, Card, Typography } from 'antd';

const { Title, Text, Paragraph } = Typography;

interface Props {
    title?: string;
    extra?: any;
    secondExtra?: any;
    handleClick?: () => void;
    secondHandleClick?: () => void;
    showHeaderBtns?: () => void;
    headerBtns?: boolean;
}

export const PageHeader: React.FC<Props> = ({ title, handleClick, secondHandleClick, extra, secondExtra, showHeaderBtns, headerBtns }) => {
    return (
        <Card className="rounded-0 border border-top-0 border-start-0 border-end-0 py-2 m w-90 padding-header">
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <Title className="mb-0 ms-5" level={2}>
                    {title || app.app_name}
                </Title>

                {headerBtns?<div className="title_extra">
                    {secondExtra && <Button onClick={secondHandleClick}>{secondExtra}</Button>} 
                    {extra && <Button onClick={handleClick}  className="ms-2" type="primary">{extra}</Button>}
                </div>: <></>}
            </div>
        </Card>
    );
};

export default PageHeader;
