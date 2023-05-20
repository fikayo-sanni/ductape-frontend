import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { createApp } from "../../components/services/apps.service";
import { useSelector } from "react-redux";
import NProgress from "nprogress";
import toast from 'react-hot-toast';
import { RootState } from '../../redux/store';
import { LeftOutlined} from '@ant-design/icons';
import Router, {useRouter} from "next/router"; 


const CreateApp = ({ visible, onClose }) => {
    const { user, app, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
    const router = useRouter();
    const [data, setData] = useState({
        description: "",
        app_name: ""
    }); 

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
      title="Create App"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
      name="myForm"
      onFinish={handleCreateApp}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="App Name"
        name="app_name"
        rules={[{ required: true, message: 'Please input the app name!' }]}
      >
        <Input onChange={handleTextAreaChange} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input.TextArea onChange={handleTextAreaChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Modal>
  );
};

export default CreateApp;