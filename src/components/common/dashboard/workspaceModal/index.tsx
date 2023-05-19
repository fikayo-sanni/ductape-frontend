import { Modal, Typography, Button, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspace } from '../../../services/workspaces.service';
import toast from 'react-hot-toast';
import { setCurrentWorkspace, setWorkspaces } from '../../../../redux/applicationSlice';
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export const WorkspaceModal: React.FC = (props: unknown) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { showWorkspaceModal } = props;

    // @ts-ignore
    const config = useSelector((state) => state.app);

    const [user, setUser] = useState(config.user);
    const [workspaces, setUserWorkspaces] = useState(config.workspaces)

    const [loadingButton, setLoadingButton] = useState(false);

    const [workspace, setWorkspace] = useState({ name: '' });

    const handleCreateWorkspace = async (e) => {
        e.preventDefault();
        try {
            setLoadingButton(true);
            // NProgress.start();
            const { auth_token: token, _id: user_id, public_key } = user;
            const { name } = workspace;
            const {data} = await createWorkspace({ token, user_id, public_key, name });

            // @ts-ignore
            dispatch(setWorkspaces([...workspaces, data.data]))
            dispatch(setCurrentWorkspace(data.data));
            setLoadingButton(false);
            showWorkspaceModal(false);
            toast.success('Workspace created');
        } catch (err) {
            setLoadingButton(false);
            console.log('An error occurred', err);
            const error = err.response ? err.response.data.errors : err.toString();
            toast.error(error || err.toString());
        }
    };

    const handleChange = (e) => setWorkspace({ name: e.target.value });
    return (
        <Modal
            style={{ top: 150 }}
            width={700}
            footer={
                <div className="col mt-4 mb-5">
                    <center className="mt-4">
                        <a className="text-primary mt-4 font-weight-600">
                            Or join an existing workspace <ArrowRightOutlined />{' '}
                        </a>
                    </center>
                </div>
            }
            visible={true}
            onCancel={() => {
                showWorkspaceModal(false);
            }}
        >
            <div className="p-5">
                <section className="col-12">
                    <div className="mb-4">
                        <Title level={3} className="mb-0 font-weight-500 pt-3">
                            Welcome to Ductape
                        </Title>
                        <Paragraph type="secondary" className="mb-5 mt-2 fs-6 font-weight-300">
                            To get started. you need to create a workspace or join an existing workspace.
                        </Paragraph>
                    </div>
                    <form
                        id="create_form"
                        onSubmit={(e) => {
                            handleCreateWorkspace(e);
                        }}
                    >
                        <div className="row">
                            <div className="col-12 mb-2">
                                <div>
                                    <Input
                                        size="large"
                                        required
                                        onChange={handleChange}
                                        value={workspace.name}
                                        className="form-control"
                                        placeholder="Workspace Name"
                                        name="name"
                                    />
                                </div>
                            </div>

                            <div>
                                <Button size="large" disabled={!workspace.name || loadingButton} type="primary" className="w-100 mt-4" onClick={(e)=>handleCreateWorkspace(e)}>
                                    {!loadingButton?"Create Workspace": <LoadingOutlined className="text-primary" rotate={180} />}
                                </Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </Modal>
    );
};
