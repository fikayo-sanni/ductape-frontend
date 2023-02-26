import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Avatar,
    Typography,
    Button,
    Tree,
    Tag,
    Table,
    Modal,
    List,
    Switch,
    Card,
    Statistic,
    Input,
    Select,
} from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import dynamic from 'next/dynamic';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import {
    createPricing,
    fetchAction,
    fetchActionFolders,
    fetchApp,
    fetchAppEnv,
    fetchPricing,
    updateAction,
    updateFolder,
} from '../services/apps.service';
import toast from 'react-hot-toast';
import Router from 'next/router';

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;
const { DirectoryTree } = Tree;

interface Props {}

interface Actions {
    _id: string;
    app_id: string;
    name: string;
    envs: string[];
    interval: string;
    currency: string;
    unit_price: string | number;
    limits: any;
    pricing_mode: string;
}

const Loading = dynamic(() => import('../../components/common/loading'));

export const ActionsView: React.FC<Props> = ({}) => {
    const { user, app } = useSelector((state: RootState) => state.app);
    const [loading, setLoading] = useState(true);
    const [treeData, setTreeData] = useState<DataNode[]>();
    const [currentData, setCurrentData] = useState<any>();

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        // console.log('Trigger Select', keys, info);
        setCurrentData(info.selectedNodes[0]);
    };

    const fetchFolders = async () => {
        const response = await fetchActionFolders({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
        });

        await generateStructure(response.data.data);
    };

    const generateStructure = async (data) => {
        let tree = [];

        for (const [index, info] of data.entries()) {
            tree.push({
                ...info,
                title: info.name,
                key: `0-0-0-0-0-0-0-0-0-0-${index}`,
                isFolder: true,
                children: await generateSubElements(`0-${index}`, info.folders, info.actions),
            });
        }

        setTreeData(tree);
        setLoading(false);
    };

    const generateSubElements = async (mainIndex, folders, actions) => {
        let tree = [];

        for (const [index, info] of folders.entries()) {
            tree.push({
                ...info,
                title: info.name,
                key: `${mainIndex}-${index}`,
                isFolder: true,
                children: await generateSubElements(index, info.folders, info.actions),
            });
        }

        for (const [index, info] of actions.entries()) {
            tree.push({
                ...info,
                title: info.name,
                isFolder: false,
                key: `${mainIndex}-${index}`,
                isLeaf: true,
                icon: (
                    <Text
                        className={
                            info.httpVerb === 'POST'
                                ? 'text-warning text-start font-xxs'
                                : info.httpVerb === 'GET'
                                ? 'text-success text-start font-xxs'
                                : info.httpVerb === 'PUT' || info.httpVerb === 'UPDATE'
                                ? 'text-primary text-start font-xxs'
                                : info.httpVerb === 'DELETE'
                                ? 'text-danger text-start font-xxs'
                                : 'font-xxs text-start'
                        }
                    >
                        {info.type}
                    </Text>
                ),
            });
        }

        return tree;
    };

    useEffect(() => {
        // getPricing();
        fetchFolders();
    }, []);

    return (
        <div className="container ">
            <div className="row">
                <div className="col-lg-3">
                    <Card title="Navigation" size="small">
                        {loading ? (
                            <Loading />
                        ) : (
                            <DirectoryTree
                                multiple
                                showLine
                                onSelect={onSelect}
                                // onExpand={onExpand}
                                treeData={treeData}
                            />
                        )}
                    </Card>
                </div>

                {currentData && (
                    <div className="col-lg-9">
                        {currentData.isFolder ? (
                            <FolderView data={currentData} refresh={fetchFolders} />
                        ) : (
                            <ActionView data={currentData} refresh={fetchFolders} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

interface FolderProps {
    data: any;
    refresh?: () => void;
}

const FolderView: React.FC<FolderProps> = ({ data, refresh }) => {
    const { user, app } = useSelector((state: RootState) => state.app);
    const [folder, setfolder] = useState(data);

    const updateFolderDetails = async () => {
        if (!folder.name || !folder.description) {
            toast.error('You must provide a folder name and description');
        }

        toast.loading('Updating folder');

        const response = await updateFolder({
            name: folder.name,
            description: folder.description,
            folder_id: folder._id,
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
        }).catch((error) => {
            toast.error(error.response.data.error);
            return true;
        });

        if (response.data.status === true) {
            toast.success('Folder Details Updated');
            await refresh();
        }
    };

    useEffect(() => {}, [data.name]);

    return (
        <Card title="Folder">
            <Text>Name:</Text>
            <Input
                size="large"
                className="mb-3"
                value={folder.name}
                onChange={(e) => setfolder({ ...folder, ['name']: e.target.value })}
            />

            <Text>Description:</Text>
            <Input.TextArea
                size="large"
                rows={5}
                className="mb-3"
                value={folder.description}
                onChange={(e) => setfolder({ ...folder, ['description']: e.target.value })}
            />

            <Button type="primary" onClick={() => updateFolderDetails()}>
                Save
            </Button>
        </Card>
    );
};

const ActionView: React.FC<FolderProps> = ({ data, refresh }) => {
    const { user, app } = useSelector((state: RootState) => state.app);
    const [loading, setLoading] = useState(true);
    const [envs, setEnvs] = useState([]);
    const [action, setAction] = useState(data);
    const [actionEnvs, setActionEnvs] = useState([]);

    const fetchActionDetails = async () => {
        setLoading(true);
        const response = await fetchAction({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            action_id: data._id,
        });

        console.log('action', response.data.data);
        setAction(response.data.data);
        let v = [];

        for (const ev of response.data.data.app_envs) {
            v.push(ev._id);
        }
        setActionEnvs(v);
        setLoading(false);
    };

    const updateActionDetails = async () => {
        toast.loading('Updating action');

        let newAction = { ...action, app_envs: actionEnvs };

        const response = await updateAction({
            ...newAction,
            action_id: action._id,
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
        }).catch((error) => {
            toast.error(error.response.data.error);
            return true;
        });

        if (response.data.status === true) {
            toast.success('Action Details Updated');
            await refresh();
        }
    };

    useEffect(() => {
        let environments = [];

        app.envs.map((env) => {
            environments.push({ label: env.env_name, value: env._id });
        });

        setEnvs(environments);

        fetchActionDetails();
    }, [data.name]);

    return loading ? (
        <Loading />
    ) : (
        <Card title="Action">
            <div className="row">
                <div className="col-6">
                    <Text>Name</Text>
                    <Input
                        size="large"
                        className="mb-3"
                        value={action.name}
                        onChange={(e) => setAction({ ...action, ['name']: e.target.value })}
                    />
                </div>
                <div className="col-6">
                    <Text>Available For</Text>
                    <Select
                        mode="multiple"
                        allowClear
                        className="mb-3"
                        size="large"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={actionEnvs}
                        onChange={(value: string[]) => setActionEnvs(value)}
                        options={envs}
                    />
                </div>
            </div>

            <Text>Endpoint</Text>
            <Input.Group compact size="large">
                <Select
                    value={action.type}
                    onChange={(value) => setAction({ ...action, ['type']: value })}
                    size="large"
                    style={{ width: '20%' }}
                >
                    <Option value="GET">GET</Option>
                    <Option value="POST">POST</Option>
                    <Option value="PUT">PUT</Option>
                    <Option value="PATCH">PATCH</Option>
                    <Option value="DELETE">DELETE</Option>
                    <Option value="COPY">COPY</Option>
                    <Option value="HEAD">HEAD</Option>
                    <Option value="OPTIONS">OPTIONS</Option>
                    <Option value="LINK">LINK</Option>
                    <Option value="UNLINK">UNLINK</Option>
                    <Option value="PURGE">PURGE</Option>
                    <Option value="LOCK">LOCK</Option>
                    <Option value="UNLOCK">UNLOCK</Option>
                    <Option value="PROPFIND">PROPFIND</Option>
                    <Option value="VIEW">VIEW</Option>
                </Select>
                <Input
                    style={{ width: '80%' }}
                    value={action.resource}
                    onChange={(e) => setAction({ ...action, ['resource']: e.target.value })}
                />
            </Input.Group>

            <Button type="primary" onClick={() => updateActionDetails()} className="mt-3">
                Save
            </Button>
        </Card>
    );
};

export default ActionsView;
