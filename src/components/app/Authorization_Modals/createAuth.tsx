import { Button, Select, Typography, Input, List, Modal, Tag,Form } from 'antd';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {createAppSetup } from '../../services/apps.service';
const { Title, Text } = Typography;

interface Props {
    showModal: any
}

const { TextArea } = Input;
export const CreateAuthModal: React.FC<Props> = ({showModal}) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({}); 

    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
    }

    const handleSelectChange = async (name, value) => {
        await setInput({ ...input, [name]: value });
    }

    const createSetup = async (data) => {
        console.log(data);
        try {
            const envIds = app.envs.map(env => env._id);
            const response = await createAppSetup({
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
    };
    const handleSave = () => { 
        createSetup(input)
        showModal(false);
    };

    useEffect(() => {
    }, []);


    return (
        <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Create Authorization
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            Authorizations
                        </Text>
                    </div>
                }
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
                <Form>
                    <Form.Item>
                        <Input name="name" placeholder="Authorization Sceme Name" onChange={handleTextAreaChange} />
                    </Form.Item>

                    <Form.Item>
                        <Select
                            mode="multiple"
                            placeholder="Authorization Environments"
                            onChange={value => {handleSelectChange("envs", value)}}
                            style={{ width: '100%' }}
                            options={app.envs.map((item) => ({
                                value: item._id,
                                label: item.name,
                            }))}
                            />
                    </Form.Item>
                    <Form.Item>
                    <Select
                        dropdownStyle={{zIndex: 1000000}}
                        placeholder="Select auth type"
                        onChange={value => {handleSelectChange("setup_type", value)}}
                        options={[]}
                    />
                    </Form.Item>
                    <Form.Item >
                        <Input.TextArea name="description" placeholder="Description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                </Form>
            </Modal>
    );
};
//  options={appFolders.map((folder) => ({
//     value: folder._id,
//     label: folder.name,
// }))}


//https://apply.umanitoba.ca/account/login?eid=dSiVBCRRnI8BGeXep0197RYfbWZJT9SeihCPEr3FZzHrvj27boAVGg%3D%3D&r=/apply/status