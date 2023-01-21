import { Breadcrumb, Button, Card } from 'antd';
import MdEditor from 'react-markdown-editor-lite';
import dynamic from 'next/dynamic';
import MarkdownIt from 'markdown-it';
import {
    EditOutlined,
    FilterFilled,
    LoadingOutlined,
    PlusOutlined,
    SaveOutlined,
    SettingFilled,
} from '@ant-design/icons';
import { changeSelectedApp } from '../../../data/applicationSlice';
import { useEffect, useState } from 'react';
import { Loading } from '../../config/constant';
const mdParser = new MarkdownIt(/* Markdown-it options */);
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { updateApp } from '../../services/apps.service';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import NProgress from 'nprogress';
import MDEditor from '@uiw/react-md-editor';

const Overview = (props) => {
    const { app_id, defaultHTML, defaultText } = props;
    const [editor, showEditor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [html, setHTML] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const config = useSelector((state) => state.app);
    const handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        setHTML(html);
        setText(text);
    };

    useEffect(async () => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);

        setHTML(defaultHTML);
        setText(defaultText);

        //alert(defaultHTML)
    }, [defaultHTML, defaultText]);

    const handleEditSave = async () => {
        if (!editor) {
            showEditor(true);
        } else {
            showEditor(false);

            try {
                const { auth_token: token, _id: user_id, public_key } = config.user;
                NProgress.start();
                const data = await updateApp({
                    aboutText: text,
                    aboutHTML: html,
                    token,
                    user_id,
                    public_key,
                    app_id,
                });

                dispatch(changeSelectedApp(data));
                NProgress.done();
                toast.success('App Updated');
            } catch (e) {
                NProgress.done();
                const error = e.response ? e.response.data.errors : e.toString();
                toast.error(error || e.toString());
            }
        }
    };
    /**          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              handleEditSave();
            }}
          >
            {!editor ? <EditOutlined /> : <SaveOutlined />}
          </Button> */

    return (
        <span>
            <div className="padding_10">
                <div className="row">
                    <h2 className="mb-0">About</h2>
                    <span className="row">
                        <span className="col-11">
                            <label className="text-muted mt-2">
                                Tell us about your app, what it does, and how to use it
                            </label>
                        </span>
                        <span className="col-1">
                            <Button
                                onClick={() => {
                                    handleEditSave();
                                }}
                            >
                                {!editor ? 'Edit' : 'Save'}{' '}
                                {!editor ? (
                                    <EditOutlined style={{ color: '#0746A6' }} />
                                ) : (
                                    <SaveOutlined style={{ color: '#0746A6' }} />
                                )}
                            </Button>
                        </span>
                    </span>
                </div>
                <br />

                <div className="row">
                    <div className="col-2"></div>
                    {editor ? (
                        <span>
                            {loading ? (
                                <center>
                                    <Loading />
                                </center>
                            ) : (
                                <span className="h-100 col-8">
                                    <MDEditor
                                        //style={{ height: '700px' }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={handleEditorChange}
                                        value={text}
                                    />
                                    <MDEditor value={value} onChange={setValue} />
                                    <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
                                </span>
                            )}
                        </span>
                    ) : (
                        <Card className="col-8 h-100 padding_10">{ReactHtmlParser(html)}</Card>
                    )}
                    <div className="col-2"></div>
                </div>
            </div>
        </span>
    );
};

export default Overview;
