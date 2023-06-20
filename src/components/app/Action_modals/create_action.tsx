import { Modal, Select, Button, Form, Space, Input, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { createActions, fetchFolders } from '../../services/actions.service';
import { HttpMethods } from '../../config/constant'
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select; 

interface Props {
    showModal: any;
    showCreateFolder
}

const { TextArea } = Input;
export const CreateActionModal: React.FC<Props> = ({ showModal, showCreateFolder }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({});
    const [appFolders, setAppFolders] = useState([]);

    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
    };

    const handleSelectChange = async (name, value) => {
        await setInput({ ...input, [name]: value });
    };
    const createAction = async (data) => {
        try {
            const response = await createActions({
                ...data,
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
                type: 'CREATE',
            });
            console.log(response.data.data);
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            console.log(error || e.toString());
            throw e;
        }
    };
    const handleSave = () => {
        showModal(false);
        createAction(input);
    };

    useEffect(() => {
        const fetchAppFolders = async () => {
            const response = await fetchFolders({
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
            });
            console.log(response.data.data);
            setAppFolders(response.data.data);
        };
        fetchAppFolders();
    }, []);


    const folderOptions = appFolders.map((folder) => (
        <option value={folder._id}>{folder.name}</option>
    ));

    const httpOptions = HttpMethods.map((method)=>(
        <option value={method}>{method}</option>
    ))

    return (
        <Modal
            style={{ top: 150 }}
            width={600}
            visible={true}
            onCancel={() => {
                showModal(false);
            }}
            title={<Title level={3}>Create Action</Title>}
            footer={
                <div className="col mt-5">
                    <Button type="default" onClick={()=> showModal(false)}>Cancel</Button>
                    <Button type="primary" onClick={handleSave}>Create</Button>
                </div>
            }
        >
            <div className="col mt-4 mb-5"></div>
            <Form>
                <div className="form-floating">
                    <Input name="name" placeholder="Action Name" className="form-control" onChange={handleTextAreaChange} />
                    <label className="text-muted">Action Name</label>
                </div>
                <div className="form-floating mt-3 input-group">
                    <select
                        placeholder="Select Action Folder"
                        className="form-control"
                        onChange={(value) => {
                            handleSelectChange('folder_id', value);
                        }}
                        
                    >
                        <option></option>
                        {folderOptions}
                    </select>
                    <label>Select Action Folder</label>
                    <span className="input-group-text small-text-btn"><Button type="default" onClick={()=> {showModal(false);showCreateFolder(true)}}>+</Button></span>
                </div>
                <div className="row">
                    <div className='col-9'></div>
                </div>
                <div className="form-floating mt-3">
                    <select
                        placeholder="Select HTTP Method"
                        className="form-control"
                        onChange={(value) => {
                            handleSelectChange('folder_id', value);
                        }}
                    >
                        <option></option>
                        {httpOptions}
                    </select>
                    <label>Select HTTP Method</label>
                </div>
                <div className="form-floating mt-3">
                    <Input name="resource" className="form-control" placeholder="Resource" onChange={handleTextAreaChange} />
                    <label className="text-muted">Resource</label>
                </div>
                <div className="form-floating mt-3">
                    <Input className="form-control" name="tag" placeholder="Tag" onChange={handleTextAreaChange} />
                    <label className="text-muted">Action Tag</label>
                </div>
                <div className="form-floating mt-3">
                    <Input.TextArea  rows={3} placeholder="Description" name="description" onChange={handleTextAreaChange} />
                </div>
            </Form>
        </Modal>
    );
};
