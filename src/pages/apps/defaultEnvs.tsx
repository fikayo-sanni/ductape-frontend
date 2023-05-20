import { useState } from "react";
import { Modal, Form, Input, Button,Row, Col, Typography } from "antd";
import { createApp } from "../../components/services/apps.service";
import { useSelector } from "react-redux";
import NProgress from "nprogress";
import toast from 'react-hot-toast';
import { RootState } from '../../redux/store';
import { LeftOutlined} from '@ant-design/icons';
import Router, {useRouter} from "next/router"; 

const { Title, Text } = Typography;
const SetDefaultEnv = ({ visible, onClose }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const router = useRouter();
    const [data, setData] = useState([{},{},{}])

  const [form] = Form.useForm();
  const [loadingButton, setLoadingButton] = useState(false);

  const handleTextAreaChange = async (e) => {
    let value = e.target.value;
    await setData({ ...data, [e.target.name]: value });
    console.log(data);
    
}

  const handleCreateApp = async () => {
    try {


      const create = await createApp({
            public_key: user.public_key,
            user_id: user._id,
            workspace_id: defaultWorkspaceId,
      });
      toast.success('App created')
      onClose();
    } catch (err) {
      setLoadingButton(false)
      NProgress.done();
      console.log('An error occurred', err);
      const error = err.response ? err.response.data.errors : err.toString();
      toast.error(error || err.toString())
    }
  };


  return (
    <Modal
      title={
        <div className="mb-3">
                    <Typography.Title level={2} className="m-0 text-capitalize">
                    Default Environments
                        </Typography.Title >
                    </div>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Row gutter={16} >
        <Col span={8}>
        <Form.Item label="Name" name="name">
            <Input />
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Slug" name="slug">
            <Input />
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Description" name="description">
            <Input />
        </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} >
        <Col span={8}>
        <Form.Item label="Name" name="name">
            <Input />
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Slug" name="slug">
            <Input />
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Description" name="description">
            <Input />
        </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} >
        <Col span={8}>
        <Form.Item label="Name" name="name">
            <Input />
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Slug" name="slug">
            <Input />
        </Form.Item>
        </Col>
        <Col span={8}>
        <Form.Item label="Description" name="description">
            <Input />
        </Form.Item>
        </Col>
      </Row>
      <Button type="primary" >Save</Button>
    </Modal>
  );
};

export default SetDefaultEnv;
