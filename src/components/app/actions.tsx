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

import { fetchActionFolders, fetchApp, fetchPricing } from '../services/apps.service';

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

    const [loading, setLoading] = useState(false);

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

        console.log(data);

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
                            info.type === 'POST'
                                ? 'text-warning text-start font-xxs'
                                : info.type === 'GET'
                                ? 'text-success text-start font-xxs'
                                : info.type === 'PUT' || info.type === 'UPDATE'
                                ? 'text-primary text-start font-xxs'
                                : info.type === 'DELETE'
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

    return loading ? (
        <Loading />
    ) : (
        <div className="container ">
            <div className="row">
                <div className="col-lg-3">
                    <Card title="Navigation" size="small">
                        <DirectoryTree
                            multiple
                            showLine
                            onSelect={onSelect}
                            // onExpand={onExpand}
                            treeData={treeData}
                        />
                    </Card>
                </div>

                {currentData && (
                    <div className="col-lg-9">
                        {currentData.isFolder ? <FolderView data={currentData} /> : <FileView data={currentData} />}
                    </div>
                )}
            </div>
        </div>
    );
};

const FolderView = ({ data }) => {
    const [folder, setfolder] = useState(data);

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

            <Button type="primary">Save</Button>
        </Card>
    );
};

const FileView = ({ data }) => {
    const [file, setFile] = useState(data);

    useEffect(() => {
        setFile(data);
    }, [data.name]);

    return (
        <Card title="Action">
            <Text>Name</Text>
            <Input
                size="large"
                className="mb-3"
                value={file.name}
                onChange={(e) => setFile({ ...file, ['name']: e.target.value })}
            />

            <Text>Endpoint</Text>
            <Input.Group compact size="large">
                <Select
                    value={file.type}
                    onChange={(value) => setFile({ ...file, ['type']: value })}
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
                    value={file.resource}
                    onChange={(e) => setFile({ ...file, ['resource']: e.target.value })}
                />
            </Input.Group>

            <Button type="primary" className="mt-3">
                Save
            </Button>
        </Card>
    );
};

export default ActionsView;
