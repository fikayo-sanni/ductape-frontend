import { Button, Input, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import { useSelector } from "react-redux";
import { createAppEnv } from "../services/apps.service";

const { TextArea } = Input;
const CreateAppEnvModal = (props) => {
  const { closeCreateDialog, app_id, refreshEnvs } = props;
  const config = useSelector((state) => state.app);

  const [user, setUser] = useState(config.user)

  const [loading, setLoading] = useState(false);
  const [env, setEnv] = useState({});

  const handleChange = (e) => {
    setEnv({ ...env, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      NProgress.start();
      const { auth_token: token, _id: user_id, public_key } = user;
      const create = await createAppEnv({
        ...env,
        token,
        app_id,
        user_id,
        public_key,
        workspace_id: config.defaultWorkspaceId,
      });
      toast.success("Env Created");
      setLoading(false);
      refreshEnvs(create.data.data);
      closeCreateDialog();
      NProgress.done();
    } catch (e) {
      NProgress.done();
      setLoading(false);
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
    // closeCreateDialog();
  };
  return (
    <Modal
      title={"Create App Environment"}
      visible={true}
      onCancel={closeCreateDialog}
      width={900}
      onOk={handleCreate}
      footer={[
        <Button key="back" onClick={closeCreateDialog}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleCreate}
        >
          Create
        </Button>,
      ]}
    >
      <div className="row">
        <div className="col-4 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={env.env_name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Env Name"
              name="env_name"
            />
            <label>Env Name</label>
          </div>
        </div>

        <div className="col-4 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={env.slug}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Slug"
              name="slug"
            />
            <label>Slug</label>
          </div>
        </div>
        <div className="col-4 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={env.description}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Description"
              name="description"
            />
            <label>Description</label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAppEnvModal;
