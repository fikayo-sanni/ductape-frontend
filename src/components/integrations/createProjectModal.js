import { Modal, Button, Input } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { createIntegration } from "../services/integrations.service";

const { TextArea } = Input;
const CreateProjectModal = (props) => {
  const { setIsModalVisible, refreshIntegrations } = props;
  const config = useSelector((state) => state.app);

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const [user, setUser] = useState(config.user);

  const handleOk = async () => {
    if (project.name) {
      setLoading(true);
      try {
        NProgress.start();
        const { auth_token: token, _id: user_id, public_key } = user;

        const create = await createIntegration({
          ...project,
          token,
          user_id,
          public_key,
          workspace_id: config.defaultWorkspaceId,
        });

        toast.success("Integration Created");
        setLoading(false);
        refreshIntegrations(create.data.data);
        showModal(false);
      } catch (e) {
        setLoading(false);
        NProgress.done();
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
      }
    } else {
      toast.error("Project Name Required");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      title="Create Project"
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
          Define your input data, define actions and reactions. Build
          integrations very quickly
        </p>
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={project.name}
                required
                onChange={handleChange}
                className="form-control"
                placeholder="Project Name"
                name="name"
              />
              <label>Project Name</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <TextArea
                rows={5}
                value={project.description}
                onChange={handleChange}
                placeholder="Describe your project... (optional)"
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

export default CreateProjectModal;
