import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createApp } from "../services/apps.service";
import NProgress from "nprogress";
import { toast } from "react-hot-toast";
import { Modal, Button, Input } from "antd";
import FileUpload from "../fileUpload";

const { TextArea } = Input;
const CreateAppModal = (props) => {
  const { showModal, refreshApps } = props;
  const config = useSelector((state) => state.app);
  //const dispatch = useDispatch();

  // const [isModalVisible, setIsModalVisible] = useState(visible);
  const [user, setUser] = useState(config.user);
  const [loading, setLoading] = useState(false);
  const [app, setApp] = useState({});

  const handleChange = (e) =>
    setApp({ ...app, [e.target.name]: e.target.value });

  const handleOk = async () => {
    if (app.app_name) {
      setLoading(true);
      try {
        NProgress.start();
        const { auth_token: token, _id: user_id, public_key } = user;
        const create = await createApp({
          ...app,
          token,
          user_id,
          public_key,
          workspace_id: config.defaultWorkspaceId,
        });
        toast.success("App Created");
        setLoading(false);
        refreshApps(create.data.data);
        showModal(false);
        NProgress.done();
      } catch (e) {
        setLoading(false);
        NProgress.done();
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
      }
    } else {
      toast.error("App Name Required");
    }
  };

  const handleCancel = () => {
    showModal(false);
  };

  // return (<div>Better</div>)
  return (
    <Modal
      title="Create App"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Create
        </Button>,
      ]}
    >
      <form id="login_form" onSubmit={(e) => login(e, "login_button")}>
        <p className="text-muted">
          Each app defines its own environments, workflows and rules for
          authorization, authentication and integration. Allowing for secure
          communication between your webservices and integration partners
        </p>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={app.app_name}
                required
                onChange={handleChange}
                className="form-control"
                placeholder="App Name"
                name="app_name"
              />
              <label>App Name</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <TextArea
                rows={5}
                value={app.description}
                onChange={handleChange}
                placeholder="Describe your app... (optional)"
                maxLength={200}
                name="description"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAppModal;
