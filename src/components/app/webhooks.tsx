import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../layout/dashboard_layout';
import PageHeader from '../common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Typography, Input, List, Modal, Tag,Form } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { RootState } from '../../redux/store';
import {updateAppWebhook} from '../services/actions.service';
import { useDispatch, useSelector } from 'react-redux';
const { Title, Text } = Typography;

interface Props {
  data: {
    _id: any,
    app_id: any,
    public_key: any,
    user_id: any,
    name: any,
    tag: any,
    method: any,
    setup_type: any,
    base_url: any,
    resource: any,
    description: any
}[];
}

const WebhooksView: React.FC<Props> = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({}); 
  const [selectedWebhook, setSelectedWebhook] = useState("");
  const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);

  const handleClick = (itemId: string) => {
    setSelectedWebhook(itemId);
    setVisible(!visible);
  };

  const updateWebhook= async (data) => {
    console.log({...data,
      public_key: user.public_key,
      user_id: user._id,
      token: user.auth_token,
      webhook_id: selectedWebhook});
    try{
    const response = await updateAppWebhook({
        ...data,
        public_key: user.public_key,
        user_id: user._id,
        token: user.auth_token,
        webhook_id: selectedWebhook,
    });
    console.log(response.data.data);
  } catch (e) {
    const error = e.response ? e.response.data.errors : e.toString();
    console.log(error || e.toString());
    throw e;
}
  };
const handleSave = () => {
    updateWebhook(input)
    setVisible(false);
}

const handleTextAreaChange = async (e) => {
  let value = e.target.value;
  await setInput({ ...input, [e.target.name]: value });
  console.log(input);
  
}

useEffect(() => {
  // Your code here
}, []);
  return (
    <>
      {data.length ? (
        <table className="table">
          <tbody>
            {data.map((item, index) => {
              return (
                <tr>
                  <td>
                  <Button shape="circle" onClick={() => handleClick(item._id)}>
                    <EditOutlined />
                  </Button>
                   
                  </td>
        <td>
          <label className="text-muted">
            <h5>{item.name}</h5>
            {item.description}
          </label>
        </td>
        <td>
          {" "}
          <label className="btn btn-light text-muted">{item.setup_type}</label>
        </td>
        <td>
          <Tag color="blue">{item.tag}</Tag>
        </td>
        <td>{(item._id)}</td>
        <td>
          <Button shape="circle">
            {/* <Link href={`/apps/${item.app_id}/webhooks/${item._id}`}>
              <SettingOutlined />
            </Link> */}
          </Button>
        </td>
      </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <List dataSource={[]} />
      )}
      <Modal
                title={
                    <div className="mb-3">
                        <Typography.Title level={2} className="m-0 text-capitalize">
                            Edit Webhooks
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            webhooks
                        </Text>
                    </div>
                }
                open={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Form.Item label="Name">
                        <Input name="name" onChange={handleTextAreaChange} />
                    </Form.Item>

                    <Form.Item label="tag">
                        <Input name="tag" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()} />
                    </Form.Item>
                    <Form.Item label="method">
                        <Input name="method" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                    </Form.Item>
                    <Form.Item label="setup_type">
                        <Input name="setup_type" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="base_url">
                        <Input name="base_url" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="resource">
                        <Input name="resource" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="description">
                        <Input name="description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" name="import" onClick={handleSave}>Save</Button>
                    </Form.Item>
                </Form>
            </Modal>
    </>

  );
};

export default WebhooksView;