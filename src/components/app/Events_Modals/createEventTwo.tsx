import { Modal, Typography, Button, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { createResponse} from '../../../components/services/actions.service';

interface Props {
    showModal: any
    showPrev: any
}
export const CreateEventTwo: React.FC<Props> = ({showModal,showPrev }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [jsonData, setJsonData] = useState({});
    const [jsonType, setJsonType] = useState('');

    const handleInputChange = (event) => {
        setJsonType(event.target.value);
    };

    const createResponseFunction = async (data) => {
        console.log(data);
        try {
            const response = await createResponse({
                ...data,
                token: user.auth_token,
            });
        console.log(response.data.data);
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            console.log(error || e.toString());
            throw e;
        }
    }
    const handleParseJson = () => {
        try {
        const parsedData = JSON.parse(jsonType);
        setJsonData(parsedData)
        // Do something with the parsed JSON data
        } catch (error) {
        console.error('Invalid JSON');
        //message.error('Invalid JSON');
        }
  };
    const handleSave = () => { 
        handleParseJson()
        showModal(false);
        createResponseFunction(jsonData)
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
                    <Button onClick={() =>{showModal(false); showPrev(true)}}>
                        prev
                    </Button>
                    <Button onClick={handleSave}>
                        create
                    </Button>
                </div>
            }
        >
            <div className="col mt-4 mb-5">
                    <h4>Create Event</h4>
                    <p>Provide a example request to register for this event</p>
                </div>
            
                <div>
                    <Input.TextArea rows={6} value={jsonType} onChange={handleInputChange} />
                </div>
        </Modal>
    );
};
