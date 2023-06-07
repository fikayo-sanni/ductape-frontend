import { Modal, Select, Button,Form,Space, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { createAppWebhook} from '../../../components/services/actions.service';

interface Props {
    showModal: any
    showNext: any
}

const { TextArea } = Input;
export const CreateEventOne: React.FC<Props> = ({showModal,showNext }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({}); 


    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
        console.log(input);
    }

    const handleSelectChange = async (name,value) => {
        await setInput({ ...input, [name]: value });
    }
    const createWebhook= async (data) => {
        console.log(data);
        try {
            const envIds = app.envs.map(env => env._id);

            
            const response = await createAppWebhook({
                ...data,
                token: user.auth_token,
                app_id: app._id,
                public_key: user.public_key,
                user_id: user._id,
                envs: envIds
            });
        console.log(response.data.data);
    } catch (e) {
        const error = e.response ? e.response.data.errors : e.toString();
        console.log(error || e.toString());
        throw e;
    }
}
    const handleSave = () => { 
        showModal(false);
        showNext(true)
        createWebhook(input)
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
                        next
                    </Button>
                </div>
            }
        >
            <div className="col mt-4 mb-5">
                    <h4>Create Event</h4>
                </div>
            <Form>
                    <Form.Item >
                        <Input name="name" placeholder="Event Name" onChange={handleTextAreaChange} />
                    </Form.Item>

                    <Form.Item>
                        <Input name="tag" placeholder="Event Tag" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()} />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            dropdownStyle={{zIndex: 1000000}}
                            onChange={value => {handleSelectChange("action_id", value)}}
                            placeholder="Select Action For This Event"
                            options={app.actions.map((item) => ({ value: item._id, label: item.name }))}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            dropdownStyle={{zIndex: 1000000}}
                            onChange={value => {handleSelectChange("method", value)}}
                            placeholder="Event Method"
                            options={[
                                { value: 'POST', label: 'POST' },
                                { value: 'GET', label: 'GET' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            dropdownStyle={{zIndex: 1000000}}
                            onChange={value => {handleSelectChange("setup_type", value)}}
                            placeholder="Choose Setup Type"
                            options={[
                                { value: 'Registered', label: 'Registered' },
                                { value: 'Example', label: 'Example' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input name="resource" placeholder="Resource" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Select
                                mode="tags"
                                dropdownStyle={{zIndex: 1000000}}
                                onChange={value => {handleSelectChange("envs", value)}}
                                placeholder="Event Environments"
                                options={[
                                    { value: 'Production', label: 'production' },
                                    { value: 'Test', label: 'Test' },
                                    { value: 'SandBox', label: 'SandBox' },
                                ]}
                            />
                    </Form.Item>
                    <Form.Item>
                        <TextArea name="description" placeholder="Description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                </Form>
        </Modal>
    );
};
