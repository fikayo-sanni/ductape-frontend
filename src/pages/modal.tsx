import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { createWorkspace } from "../components/services/workspaces.service";
import { useSelector } from "react-redux";
import NProgress from "nprogress";
import toast from 'react-hot-toast';
import { RootState } from '../redux/store';
import { LeftOutlined} from '@ant-design/icons';
import Router, {useRouter} from "next/router"; 


const CreateWorkspaceModal = ({ visible, onClose }) => {
    const router = useRouter();
    const config = useSelector((state: RootState) => state.app);

  const [form] = Form.useForm();
  const [loadingButton, setLoadingButton] = useState(false);

  const handleCreateWorkspace = async () => {
    try {
      setLoadingButton(true);
      NProgress.start();

      const { auth_token: token, _id: user_id, public_key } = config.user;
      const { name } = form.getFieldsValue();

      const create = await createWorkspace({ token, user_id, public_key, name });
      toast.success('Workspace created')
      onClose();
    } catch (err) {
      setLoadingButton(false)
      NProgress.done();
      console.log('An error occurred', err);
      const error = err.response ? err.response.data.errors : err.toString();
      toast.error(error || err.toString())
    }
  };

  const handleOk = () => {
    form.validateFields().then(() => {
      handleCreateWorkspace();
    });
  };

  const handleCancel = () => {
    router.back()
  };

  return (
    <Modal
      title="Create a Workspace"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleCreateWorkspace}>
        <Form.Item
          label="Workspace Name"
          name="name"
          rules={[
            { required: true, message: "Please enter a workspace name" },
          ]}
        >
          <Input placeholder="Workspace Name" />
        </Form.Item>

        <div className="text-center mt-5">
          <Button className="me-3" onClick={handleCancel}>
            <LeftOutlined /> Back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingButton}
          >
            Create Workspace
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateWorkspaceModal;