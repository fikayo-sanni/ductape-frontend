import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../layout/dashboard_layout';
import PageHeader from '../common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Typography, Input, List, Modal, Tag } from 'antd';
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

  const updateSetup= async (data) => {
    console.log(data);
    
    const response = await updateAppWebhook({
        ...data,
        token: user.auth_token,
        webhook_id: selectedWebhook
    });
    console.log(response.data.data);
  };
const handleSave = () => {
    updateSetup(input)
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
                <div className="mb-3">
                    <label>user id</label>
                    <Input className="mb-3" name="name"  onChange={handleTextAreaChange} />
                </div>
                <div className="mb-3">
                    <label>public key</label>
                    <Input className="mb-3" name="name"  onChange={handleTextAreaChange} />
                </div>
                <div className="mb-3">
                    <label>Name</label>
                    <Input className="mb-3" name="name"  onChange={handleTextAreaChange} />
                </div>

                <Button type="primary" onClick={handleSave}>Save</Button>
            </Modal>
    </>

  );
};

export default WebhooksView;