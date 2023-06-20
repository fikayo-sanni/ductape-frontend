import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Card, Typography, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { CreateFolderModal } from '../../../../components/app/Action_modals/create_folder';
import { CreateActionModal } from '../../../../components/app/Action_modals/create_action';

const ActionsView = dynamic(() => import('../../../../components/app/actions'));

const Actions = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [createFolder, setCreateFolder] = useState(false);
    const [createAction, setCreateAction] = useState(false);
    const [headerBtns, showHeaderBtns] = useState(false);

    useEffect(() => {
        if (app.actions.length) showHeaderBtns(true);
    }, []);


    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Actions">
            <PageHeader
                title="Actions"
                handleClick={() => {
                    setCreateAction(!createAction);
                }}
                secondHandleClick={() => {
                    setCreateFolder(!createFolder);
                }}
                showHeaderBtns={()=> showHeaderBtns(headerBtns)}

                headerBtns={headerBtns}

                extra={
                    <>
                        <PlusOutlined /> Create Action
                    </>
                }

                secondExtra={
                    <>
                        <PlusOutlined /> Create Folder
                    </>
                }
            />
            {createFolder ? <CreateFolderModal showModal={setCreateFolder} /> : <></>}
            {createAction ? (
                <CreateActionModal showModal={setCreateAction} showCreateFolder={setCreateFolder} />
            ) : (
                <></>
            )}
            <div className="no_background no_border">
                <ActionsView />
            </div>
        </Dashboard_Layout>
    );
};

export default Actions;
