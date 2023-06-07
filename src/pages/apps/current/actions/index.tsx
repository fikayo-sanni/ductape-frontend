import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../components/common/pageHeader';
import dynamic from 'next/dynamic';
import { Card,Typography,message, Upload } from 'antd';
import {  PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {CreateFolderModal} from '../../../../components/app/Action_modals/create_folder';
import {CreateActionModal} from '../../../../components/app/Action_modals/create_action';

const ActionsView = dynamic(() => import('../../../../components/app/actions'));

const Actions = () => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [createFolder, setCreateFolder] = useState(false);
    const [createAction, setCreateAction] = useState(false);
    
    useEffect(() => {
    }, []);
    

    return (
        <Dashboard_Layout showSidebar={true} title="Apps" appPage="Actions">
            <PageHeader
                title="Actions"
                handleClick={() => {setCreateAction(!createAction);}}
                secondHandleClick={() => {setCreateFolder(!createFolder);}}
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
            {createFolder ?<CreateFolderModal showModal={setCreateFolder}/>:<></>}
            {createAction ?<CreateActionModal showModal={setCreateAction}/>:<></>}
            <Card className="no_background no_border">
                <ActionsView />
            </Card>
        </Dashboard_Layout>
    );
};

export default Actions;
