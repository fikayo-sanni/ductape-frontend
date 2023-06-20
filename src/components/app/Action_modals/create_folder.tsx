import { Modal, Select, Button, Form, Space, Input, Divider, Typography } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-hot-toast';
import { createFolder } from '../../services/actions.service';

interface Props {
    showModal: any;
}

const { Title } = Typography;

export const CreateFolderModal: React.FC<Props> = ({ showModal }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({});
    const [appFolders, setAppFolders] = useState([]);

    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
    };

    const createFolderFunction = async (data) => {
        try {
            const response = await createFolder({
                ...data,
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
            });
            console.log(response.data.data);
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            console.log(error || e.toString());
            toast.error(error);
            throw e;
        }
    };
    const handleSave = () => {
        showModal(false);
        createFolderFunction(input);
    };

    const folderOptions = appFolders.map((folder) => (
        <option value={folder._id}>{folder.name}</option>
    ));
    return (
        <Modal
            style={{ top: 150 }}
            width={700}
            visible={true}
            onCancel={() => {
                showModal(false);
            }}
            title={<Title level={3}>Create Folder</Title>}
            footer={
                <div className="col mt-5">
                    <Button onClick={() => showModal(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} type="primary" disabled={!input.name}>
                        Create
                    </Button>
                </div>
            }
        >
            <Form className="mt-5">
            <div className="form-floating mt-3">
                    <select
                        placeholder="Parent Folder"
                        className="form-control"
                        onChange={(value) => {
                            handleSelectChange('folder_id', value);
                        }}
                    >
                        <option></option>
                        {folderOptions}
                    </select>
                    <label>Parent Folder</label>
                </div>
                <div className="form-floating mt-3">
                    <Input
                        name="name"
                        className="form-control"
                        placeholder="Folder Name"
                        onChange={handleTextAreaChange}
                    />
                    <label className="text-muted">Folder Name</label>
                </div>
            </Form>
        </Modal>
    );
};
