import React, { useEffect, useState } from 'react';
import Dashboard_Layout from '../layout/dashboard_layout';
import PageHeader from '../common/pageHeader';
import dynamic from 'next/dynamic';
import { Button, Card, Typography, Input, List, Modal, Tag,Form } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {updateAppSetup} from '../services/apps.service';
const { Title, Text } = Typography;

interface Props {
  data: {
    _id: string,
    user_id: string,
    app_id: string,
    name: string,
    setup_type: string,
    expiry: any,
    period: string,
    resource: string,
    method: string,
    description: string,
    __v: any
  }[];
}

const SetupsView: React.FC<Props> = ({ data }) => {
  const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
  const [selectedSetup, setSelectedSetup] = useState("");
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({}); 

  useEffect(() => {
    // Your code here
  }, []);
  const handleClick = (itemId: string) => {
    setSelectedSetup(itemId);
    setVisible(!visible);
  };
const updateSetup= async (data) => {
  console.log(data);
  try{
    const response = await updateAppSetup({
      ...data,
      public_key: user.public_key,
      user_id: user._id,
      token: user.auth_token,
        setup_id: selectedSetup
    });
    console.log(response.data.data);
  } catch (e) {
    const error = e.response ? e.response.data.errors : e.toString();
    console.log(error || e.toString());
    throw e;
  }
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
  return (
    <>
      {data.length ? (
        <table className="table">
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
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
                    <label className="btn btn-light text-muted">
                      {item.setup_type}
                    </label>
                  </td>
                  <td>
                    <Tag color="blue">
                      {`${item.expiry || 'forever'} ${
                        item.period ? item.period.toUpperCase() : ''
                      }`}
                    </Tag>
                  </td>
                  <td>{item._id}</td>
                  <td>
                    <Button shape="circle">
                    <SettingOutlined />
                      {/* <Link href={`/apps/${item.app_id}/setup/${item._id}`}>
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
                            Edit Setup
                        </Typography.Title>
                        <Text type="secondary" className="text-uppercase">
                            Setups
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

                    <Form.Item label="Period">
                        <Input name="period" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="Method">
                        <Input name="method" onChange={handleTextAreaChange} onInput={e => e.target.value = e.target.value.toUpperCase()}/>
                    </Form.Item>
                    <Form.Item label="Setup_type">
                        <Input name="setup_type" onChange={handleTextAreaChange} />
                    </Form.Item>
                    <Form.Item label="Base_url">
                        <Input name="base_url" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="Resource">
                        <Input name="resource" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input name="description" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item label="Expiry">
                        <Input name="expiry" onChange={handleTextAreaChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" name="import" onClick={handleSave}>Save</Button>
                    </Form.Item>
                </Form>
            </Modal>
    </>

  );
};

export default SetupsView;