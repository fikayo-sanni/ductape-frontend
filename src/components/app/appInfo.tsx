import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Typography, Button, Popconfirm, Modal, Input, Collapse, Space, Divider } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentWorkspace, logoutUser, setCurrentApp } from '../../redux/applicationSlice';
import dynamic from 'next/dynamic';
// import MDEditor from '@uiw/react-md-editor';
import { CloseCircleOutlined, EditOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { createAppFaq, deleteAppFaq, fetchApp, updateApp, updateAppEnv, updateAppFaq } from '../services/apps.service';
import { changeSelectedApp } from '../../data/applicationSlice';
import toast from 'react-hot-toast';
import MarkdownIt from 'markdown-it';
import ReactHtmlParser from 'react-html-parser';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});

const { Text, Title } = Typography;
const { Panel } = Collapse;

interface Props {}

const Loading = dynamic(() => import('../../components/common/loading'));

export const AppInfo: React.FC<Props> = ({}) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    // alert(JSON.stringify(app))
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [dApp, setDApp] = useState(app);
    const [edit, setEdit] = useState(false);
    const [newVisible, setNewVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [html, setHTML] = useState(app.aboutHTML || '');
    const [text, setText] = useState(app.aboutText || '');
    const [newFaq, setNewFaq] = useState({
        question: '',
        answer: '',
    });
    const [editFaq, setEditFaq] = useState({
        id: '',
        question: '',
        answer: '',
    });

    const toggleEdit = async () => {
        if (edit) {
            toast.loading('Updating App');
            try {
                const data = await updateApp({
                    aboutHTML: html,
                    aboutText: text,
                    token: user.auth_token,
                    user_id: user._id,
                    public_key: user.public_key,
                    app_id: app._id,
                });

                toast.success('App Updated');

                await fetchAppDetails();
            } catch (e) {
                const error = e.response ? e.response.data.errors : e.toString();
                toast.error(error || e.toString());
            }
        }

        setEdit(!edit);
    };

    const createFaq = async () => {
        if (!newFaq.question.trim() || !newFaq.answer.trim()) {
            toast.error('Fill in all details');
            return true;
        }

        toast.loading('Saving Faq');
        await createAppFaq({
            ...newFaq,
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
        });

        toast.success('FAQ Saved');
        await fetchAppDetails();
    };

    const updateFaq = async () => {
        if (!editFaq.question.trim() || !editFaq.answer.trim()) {
            toast.error('Fill in all details');
            return true;
        }

        toast.loading('Updating Faq');
        await updateAppFaq({
            question: editFaq.question,
            answer: editFaq.answer,
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
            faq_id: editFaq.id,
        });

        toast.success('FAQ Updated');
        await fetchAppDetails();
    };

    const deleteFaq = async (id) => {
        toast.loading('Deleting Faq');
        await deleteAppFaq({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
            faq_id: id,
        });

        toast.success('FAQ Deleted');
        await fetchAppDetails();
    };

    const initiateEditFaq = async (faq) => {
        await setEditFaq({ id: faq._id, question: faq.question, answer: faq.answer });

        setEditVisible(true);
    };

    const fetchAppDetails = async () => {
        const appDetails = await fetchApp({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
            workspace_id: defaultWorkspaceId,
        });

        console.log(appDetails.data.data);
        dispatch(setCurrentApp(appDetails.data.data));
    };

    const handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        setHTML(html);
        setText(text);
    };

    useEffect(() => {}, []);

    return loading ? (
        <Loading />
    ) : (
        <div className="container">
            <Divider orientation="left" orientationMargin="0">
                <Title level={4}> Read me</Title>
            </Divider>

            <div className="border p-4">
                <div className="d-flex mb-2 w-100 justify-content-between">
                    <div>
                        <Text type="secondary">Tell us about your app, what it does, and how to use it</Text>
                    </div>
                    <div>
                        {edit ? (
                            <Button onClick={() => setEdit(!edit)}>
                                Hide <CloseCircleOutlined />
                            </Button>
                        ) : (
                            <></>
                        )}
                        <Button onClick={() => toggleEdit()} type="primary" className="ms-1">
                            {edit ? (
                                <>
                                    <SaveOutlined /> Save
                                </>
                            ) : (
                                <>
                                    <EditOutlined /> Edit
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {edit ? (
                    <MdEditor
                        style={{ height: '400px', border: 0 }}
                        value={text}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                ) : (
                    <>{ReactHtmlParser(mdParser.render(text))}</>
                )}
            </div>

            <Divider orientation="left" orientationMargin="0">
                <Title level={4}>FAQ</Title>
            </Divider>
            <div className="p-4 border">
                <div className="d-flex w-100 mb-3 justify-content-between">
                    <div>
                        <Text type="secondary">Frequently asked questions about your app</Text>
                    </div>
                    <div>
                        <Button onClick={() => setNewVisible(true)} type="primary">
                            <PlusCircleOutlined /> Add
                        </Button>
                    </div>
                </div>

                {app.FAQS && app.FAQS.length ? (
                    <Collapse defaultActiveKey={[0]}>
                        {app.FAQS.map((faq, index) => (
                            <Panel
                                header={<Text className="font-weight-700">{faq.question}</Text>}
                                key={index}
                                extra={
                                    <Space>
                                        <Button
                                            className="text-primary"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                initiateEditFaq(faq);
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Popconfirm
                                            title="Are you sure you want to delete this FAQ?"
                                            onConfirm={(event) => {
                                                event.stopPropagation();
                                                deleteFaq(faq._id);
                                            }}
                                            onCancel={null}
                                            okText="Confirm"
                                            okButtonProps={{ type: 'primary' }}
                                            cancelText="No"
                                        >
                                            <Button
                                                className="text-danger"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                }
                            >
                                <p>{faq.answer}</p>
                            </Panel>
                        ))}
                    </Collapse>
                ) : (
                    <></>
                )}
            </div>
            <Modal title="Add Faq" visible={newVisible} footer={null} onCancel={() => setNewVisible(false)}>
                <div className="mt-4 mb-3">
                    <Text>Question</Text>
                    <Input
                        value={newFaq.question}
                        onChange={(e) => setNewFaq({ ...newFaq, ['question']: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <Text>Answer</Text>
                    <Input.TextArea
                        value={newFaq.answer}
                        onChange={(e) => setNewFaq({ ...newFaq, ['answer']: e.target.value })}
                        rows={3}
                    />
                </div>

                <Button type="primary" onClick={() => createFaq()}>
                    Save
                </Button>
            </Modal>

            <Modal title="Edit Faq" visible={editVisible} footer={null} onCancel={() => setEditVisible(false)}>
                <div className="mt-4 mb-3">
                    <Text>Question</Text>
                    <Input
                        value={editFaq.question}
                        onChange={(e) => setEditFaq({ ...editFaq, ['question']: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <Text>Answer</Text>
                    <Input.TextArea
                        value={editFaq.answer}
                        onChange={(e) => setEditFaq({ ...editFaq, ['answer']: e.target.value })}
                        rows={3}
                    />
                </div>

                <Button type="primary" onClick={() => updateFaq()}>
                    Update
                </Button>
            </Modal>
        </div>
    );
};

export default AppInfo;
