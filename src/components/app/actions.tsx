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
    Result,
    Tabs,
    Badge,
    Space,
    Collapse,
} from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import dynamic from 'next/dynamic';
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';

import {
    createPricing,
    fetchAction,
    fetchActionEntity,
    fetchActionFolders,
    fetchApp,
    fetchAppEnv,
    fetchPricing,
    updateAction,
    updateFolder,
} from '../services/apps.service';
import toast from 'react-hot-toast';
import Router from 'next/router';
import { DownOutlined, FolderOpenOutlined } from '@ant-design/icons';

const { Text, Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { DirectoryTree } = Tree;
const { Panel } = Collapse;

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
        <div className="container padding-0 h-100">
            <div className="row h-100">
                <div className="col-lg-3 h-100">
                    <Card title="Navigation" size="small" className="p-2 no-radius h-100 border border-top-0 border-start-0">
                        {loading ? (
                            <Loading />
                        ) : (
                            <DirectoryTree
                                multiple
                                showLine
                                switcherIcon={<DownOutlined />}
                                onSelect={onSelect}
                                // onExpand={onExpand}
                                treeData={treeData}
                            />
                        )}
                    </Card>
                </div>

                {currentData ? (
                    <div className="col-lg-9">
                        {currentData.isFolder ? (
                            <FolderView data={currentData} refresh={fetchFolders} />
                        ) : (
                            <ActionView data={currentData} refresh={fetchFolders} />
                        )}
                    </div>
                ) : (
                    <div className="col-lg-9">
                        <Result
                            status="info"
                            icon={<FolderOpenOutlined />}
                            title={`${app.app_name} Actions Directory`}
                            subTitle="Click to open a folder or action from the navigation pane"
                            extra={[
                                <Button type="primary" key="console">
                                    Create Folder
                                </Button>,
                                <Button key="buy">Create Action</Button>,
                            ]}
                        />
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
    const [bodydata, setBodyData] = useState<string[]>([]);
    const [bodySample, setBodySample] = useState<any>(null);
    const [paramsdata, setParamsData] = useState<string[]>([]);
    const [action, setAction] = useState(data);
    const [actionEnvs, setActionEnvs] = useState([]);

    const fetchActionDetails = async () => {
        setLoading(true);

        // Fetch action data
        const response = await fetchAction({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            action_id: data._id,
        });

        setAction(response.data.data);
        let v = [];

        for (const ev of response.data.data.app_envs) {
            v.push(ev._id);
        }
        setActionEnvs(v);

        // fetch body data
        const response2 = await fetchActionEntity({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            action_id: data._id,
            category: 'body',
        });

        setBodyData(response2.data.data.data);
        if (response2.data.data.data.length) {
            setBodySample(response2.data.data.sample);
        }

        // fetch params data
        const response3 = await fetchActionEntity({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            action_id: data._id,
            category: 'params',
        });

        setParamsData(response3.data.data.data);

        setLoading(false);
    };

    const GenerateEntityStructure = ({ data }) =>
        data.map(
            (info, index) =>
                info.level === 0 && (
                    <Card size="small" className="mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <Space size={50}>
                                <div>
                                    <Title className="mb-0" level={5}>
                                        {info.key}
                                    </Title>
                                    <Text className="mb-0 font-xxs">
                                        Min. Length: {info.minLength} | Max. Length: {info.maxLength}
                                    </Text>
                                </div>

                                <div>
                                    <Title className="mb-0" level={5}>
                                        {info.type}
                                    </Title>
                                    <Text className={info.required ? 'text-danger font-xxs' : 'font-xxs'}>
                                        {info.required ? 'Required' : 'Optional'}
                                    </Text>
                                </div>
                            </Space>

                            <Space>
                                <Button>Edit</Button>
                                <Button danger>Delete</Button>
                            </Space>
                        </div>

                        {['object', 'array'].includes(info.type) && (
                            <Collapse ghost className="p-0 m-0 mt-3">
                                <Panel header="Entries" className="m-0 p-0 border-top body_panel" key="1">
                                    <GenerateSubEntities parent={info} data={bodydata} />
                                </Panel>
                            </Collapse>
                            // <td colSpan="100">
                            //     <GenerateSubEntities parent={info} data={bodydata} />
                            // </td>
                        )}
                    </Card>
                ),
        );

    const GenerateSubEntities = ({ parent, data }) => {
        return (
            <div>
                {data.map(
                    (info, index) =>
                        info.parent_key === parent.key &&
                        info.level === parent.level + 1 && (
                            <Card size="small" className="mb-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <Space size={50}>
                                        <div>
                                            <Title className="mb-0" level={5}>
                                                {info.key}
                                            </Title>
                                            <Text className="mb-0 font-xxs">
                                                Min. Length: {info.minLength} | Max. Length: {info.maxLength}
                                            </Text>
                                        </div>

                                        <div>
                                            <Title className="mb-0" level={5}>
                                                {info.type}
                                            </Title>
                                            <Text className={info.required ? 'text-danger font-xxs' : 'font-xxs'}>
                                                {info.required ? 'Required' : 'Optional'}
                                            </Text>
                                        </div>
                                    </Space>

                                    <Space>
                                        <Button>Edit</Button>
                                        <Button danger>Delete</Button>
                                    </Space>
                                </div>

                                {['object', 'array'].includes(info.type) && (
                                    <Collapse ghost className="p-0 m-0 mt-3">
                                        <Panel header="Entries" className="m-0 p-0 border-top body_panel" key="1">
                                            <GenerateSubEntities parent={info} data={bodydata} />
                                        </Panel>
                                    </Collapse>
                                    // <td colSpan="100">
                                    //     <GenerateSubEntities parent={info} data={bodydata} />
                                    // </td>
                                )}
                            </Card>
                        ),
                )}
            </div>
        );
    };

    const updateActionDetails = async () => {
        toast.loading('Updating action');

        let newAction = { ...action, app_envs: actionEnvs };

        console.log(newAction);

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
        <div className="mt-4 me-4">
        <Card title="Action" className="border">
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

            <div>
                <Tabs defaultActiveKey={action.httpVerb === 'POST' ? '0' : '1'} className="page_tabs ">
                    <TabPane tab="Body" key="0">
                        {bodySample && (
                            <Collapse className="mb-3">
                                <Panel key="request" header="Sample Request">
                                    <pre className="mb-0">{JSON.stringify(JSON.parse(bodySample.sample), null, 4)}</pre>
                                </Panel>
                            </Collapse>
                        )}

                        <GenerateEntityStructure data={bodydata} />

                        {/*<table className="table">*/}
                        {/*    <thead>*/}
                        {/*        <tr>*/}
                        {/*            <th>Key</th>*/}
                        {/*            <th>Type</th>*/}
                        {/*            /!*<th>Value</th>*!/*/}
                        {/*            /!*<th>Min. Length</th>*!/*/}
                        {/*            /!*<th>Max. Length</th>*!/*/}
                        {/*            /!*<th>Description</th>*!/*/}
                        {/*            <th>Required</th>*/}
                        {/*        </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*        <GenerateEntityStructure data={bodydata} />*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </TabPane>
                    <TabPane tab="Params" key="1">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>Key</th>
                                    <th>Type</th>
                                    {/*<th>Value</th>*/}
                                    {/*<th>Min. Length</th>*/}
                                    {/*<th>Max. Length</th>*/}
                                    {/*<th>Description</th>*/}
                                    <th>Required</th>
                                </tr>
                            </thead>
                            <tbody>
                                <GenerateEntityStructure data={paramsdata} />
                            </tbody>
                        </table>
                    </TabPane>
                </Tabs>
            </div>

            <Button type="primary" onClick={() => updateActionDetails()} className="mt-3">
                Save
            </Button>
        </Card>
        </div>
    );
};

export default ActionsView;
