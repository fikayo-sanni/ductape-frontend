import { Modal, Select, Button,Form,Space, Input } from 'antd';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {createActions,fetchFolders } from '../../services/actions.service';


interface Props {
    showModal: any
}

const { TextArea } = Input;
export const CreateActionModal: React.FC<Props> = ({showModal}) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({}); 
    const [appFolders, setAppFolders] = useState([]);

    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
    }

    const handleSelectChange = async (name,value) => {
        await setInput({ ...input, [name]: value });
    }
    const createAction = async (data) => { 
        try {
            const response = await createActions({
                ...data,
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
                type: "CREATE",
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
        createAction(input)
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
        fetchAppFolders()
    }, []);


    return (
        <Modal
            style={{ top: 150 }}
            width={700}
            visible={true}
            onCancel={() => {
                showModal(false);
            }}
            footer={
                <div className="col mt-4 mb-5">
                    <Button onClick={handleSave}>
                        Create
                    </Button>
                </div>
            }
        >
            <div className="col mt-4 mb-5">
                    <h4>Create Event</h4>
                </div>
                <Form>
                    <Form.Item
                        label="Name"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input name="name" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item
                        label="Folder"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                    <Select
                        dropdownStyle={{zIndex: 1000000}}
                        placeholder="Select app folder"
                        onChange={value => {handleSelectChange("folder_id", value)}}
                        options={appFolders.map((folder) => ({
                            value: folder._id,
                            label: folder.name,
                        }))}
                    />
                    </Form.Item>
                    <Form.Item
                        label="HTTP Verb"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input name="httpVerb" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()} />
                    </Form.Item>
                    <Form.Item
                        label="Resource"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input name="resource" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item
                        label="Tag"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input name="tag" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input.TextArea rows={3} name="description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                </Form>
        </Modal>
    );
};