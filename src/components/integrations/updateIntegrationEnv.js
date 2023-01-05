import { Modal, Button, Input } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const UpdateIntegrationsEnvModal = (props) => {
  const { setIsDefaultModalVisible } = props;
  const config = useSelector((state) => state.app);

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const [user, setUser] = useState(config.user);
  const [inputFields, setInputFields] = useState([
    ...defaultEnvs,
    { ...defaultValue },
  ]);

  const defaultValue = {
    env_name: "",
    slug: "",
    description: "",
  };


  const handleOk = async () => {};

  const handleCancel = () => {
    setIsDefaultModalVisible(false);
  };

  const handleChangeEnv = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  useEffect(async () => {
    config.workspaces.map((data, index) => {
      if (data.workspace_id === config.defaultWorkspaceId) {
        // setDefaultWorkspace(data)
        if (data.defaultEnvs) {
          setInputFields([...data.defaultEnvs, { ...defaultValue }]);
          // alert(JSON.stringify(inputFields))
        }
      }
    });
  }, []);

  return (
    <Modal
      title="Default Environments"
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width={900}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <form id="login_form" onSubmit={(e) => login(e, "login_button")}>
        <p className="text-muted">
          Configure which environments are created automatically for new
          projects
        </p>
        {inputFields.map((input, index) => {
          return (
            <div className="row">
              <div className="col-4 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={input.env_name}
                    onChange={(e) => {
                      handleChangeEnv(index, e);
                    }}
                    onKeyPress={(e) => {
                      handleKeyPress(index, e);
                    }}
                    required
                    className="form-control"
                    placeholder="Env Name"
                    name="env_name"
                  />
                  <label>Env Name</label>
                </div>
              </div>

              <div className="col-2 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={input.slug}
                    onChange={(e) => {
                      handleChangeEnv(index, e);
                    }}
                    onKeyPress={(e) => {
                      handleKeyPress(index, e);
                    }}
                    required
                    className="form-control"
                    placeholder="Slug"
                    name="slug"
                  />
                  <label>Slug</label>
                </div>
              </div>
              <div className="col-6 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={input.description}
                    onChange={(e) => {
                      handleChangeEnv(index, e);
                    }}
                    onKeyPress={(e) => {
                      handleKeyPress(index, e);
                    }}
                    required
                    className="form-control"
                    placeholder="Description"
                    name="description"
                  />
                  <label>Description</label>
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </Modal>
  );
};

export default UpdateIntegrationsEnvModal;
