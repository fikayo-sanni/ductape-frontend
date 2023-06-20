import Dashboard_Layout from '../../../../../components/layout/dashboard_layout';
import PageHeader from '../../../../../components/common/pageHeader';
import { RootState } from '../../../../../redux/store';
import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Input,Space, Tag, Typography,Form, Select } from 'antd';
import {updateAppSetup, fetchSetup} from '../../../../../components/services/apps.service';
import { useSelector } from 'react-redux';
import { EditOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;


const Index = (props) => {
    const {setup_id} = props;
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const [input, setInput] = useState({});  
    const [authorization, setAuthorization] = useState(app.setups[0]);
    
    const handleSelectChange = async (name, value) => {
        await setInput({ ...input, [name]: value });
    }

    const updateSetup= async (data) => {
        console.log(data);
        try{
          const response = await updateAppSetup({
            ...data,
            public_key: user.public_key,
            user_id: user._id,
            token: user.auth_token,
            setup_id: setup_id
          });
          console.log(response.data.data);
        } catch (e) {
          const error = e.response ? e.response.data.errors : e.toString();
          console.log(error || e.toString());
          throw e;
        }
      };

      const fetchSetupFunction = async () => {
        try{
          const response = await fetchSetup({
            public_key: user.public_key,
            user_id: user._id,
            token: user.auth_token,
            setup_id: setup_id
          });
          setAuthorization(response.data.data);
          console.log(authorization);
          
        } catch (e) {
          const error = e.response ? e.response.data.errors : e.toString();
          console.log(error || e.toString());
          throw e;
        }
      };

    useEffect(() => {
        fetchSetupFunction()
    }, []);
    
    const handleClick = () => {
        //setVisible(!visible);
    };

    const handleSave = () => {
        updateSetup(input);
    }
    
    const handleTextAreaChange = async (e) => {
        let value = e.target.value;
        await setInput({ ...input, [e.target.name]: value });
    }
    const selectedValues = authorization.setup_envs?.map((item) => item.name);
    return (
        <Dashboard_Layout showSidebar={true} title="Authorization" appPage="Authorization">
            <PageHeader title="Authorization"/>

            <Card className="no_background no_border">
                <div className="container">
                <Form>
                    <Space size="large">
                    <Form.Item label="Authorization Scheme Name" >
                        <Input name="name" placeholder="Authorization Scheme Name" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="Authorization Scheme Name"> 
                        <Input name="name" placeholder="Authorization Scheme Name" onChange={handleTextAreaChange} />
                    </Form.Item>
                    </Space>

                    <Form.Item label="Authorization Environments">
                        <Select
                            mode="multiple"
                            placeholder={selectedValues}
                            onChange={value => {handleSelectChange("envs", value)}}
                            style={{ width: '100%' }}
                            options={app.envs.map((item) => ({
                                value: item._id,
                                label: item.name,
                            }))}
                            />
                    </Form.Item>
                    <Form.Item label="Authorization Description">
                        <Input.TextArea className="mb-3" rows={5} name="description" defaultValue={authorization.description} onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Button type="primary" onClick={handleSave}>Save</Button>
                </Form>
                <Divider orientation = "left" orientationMargin="0">
                    <h4>Tokens</h4>
                </Divider>
                <Card className="no_background no_border">  
                 <h3>{authorization.setup_type}</h3>
                </Card>  

                
                    
                </div>
            </Card>
        </Dashboard_Layout>
    );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
    const setup_id = params.setup_id;

    return {
        props: { setup_id },
    };
};