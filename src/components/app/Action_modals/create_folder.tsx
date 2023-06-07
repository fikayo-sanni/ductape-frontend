import { Modal, Select, Button,Form,Space, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-hot-toast';
import { createFolder} from '../../services/actions.service';

interface Props {
    showModal: any
}

export const CreateFolderModal: React.FC<Props> = ({showModal}) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({}); 


    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
    }
 
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
}
    const handleSave = () => { 
        showModal(false);
        createFolderFunction(input)
    };
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
                <h4>Create Folder</h4>
            </div>
            <Form>
                    <Form.Item >
                        <Input name="name" placeholder="Folder Name" onChange={handleTextAreaChange} />
                    </Form.Item>
                </Form>
        </Modal>
    );
};
