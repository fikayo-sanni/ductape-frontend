import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NProgress from "nprogress";
import { updateDefaultEnvs } from "../services/workspaces.service";
import { cleanFields } from "../config/constant";
import { changeWorkspaces } from "../../data/applicationSlice";

const CreateEnvsModal = (props) => {
  const { showModal } = props;
  const dispatch = useDispatch();
  const [defaultLoading, setDefaultLoading] = useState(false);
  const config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);
  const [defaultEnvs, setDefaultEnvs] = useState([{ ...defaultValue }]);
  const [inputFields, setInputFields] = useState([
    ...defaultEnvs,
    { ...defaultValue },
  ]);

  const defaultValue = {
    env_name: "",
    slug: "",
    description: "",
  };

  const handleDefaultOk = async () => {
    if (allFieldsDefaultSet()) {
      setDefaultLoading(true);
      try {
        NProgress.start();
        const { auth_token: token, _id: user_id, public_key } = user;
        const create = await updateDefaultEnvs({
          token,
          user_id,
          public_key,
          workspace_id: config.defaultWorkspaceId,
          envs: cleanFields(inputFields),
        });
        dispatch(changeWorkspaces(create.data.data));
        toast.success("Default Environments Updated");
        setDefaultLoading(false);
        showModal(false);
        NProgress.done();
      } catch (e) {
        setDefaultLoading(false);
        NProgress.done();
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
      }
    }
  };

  const handleChangeEnv = (index, e) => {
    //alert("Brah");
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const handleKeyPress = (index, e) => {
    if (index === inputFields.length - 1) {
      // toast.error( index+" bossbaby "+(inputFields.length - 1));
      setInputFields([...inputFields, { ...defaultValue }]);
    }
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
  });

  const allFieldsDefaultSet = () => {
    let valid = true;
    let exists = false;
    inputFields.map((data, index) => {
      const { env_name, slug } = data;
      if (env_name && !slug) {
        valid = false;
        toast.error(`Slug is required for ${env_name}`);
      }
      if (slug && !env_name) {
        valid = false;
        toast.error(`Environment name is required for ${slug}`);
      }

      if (env_name && slug && slug.length !== 3) {
        valid = false;
        toast.error(`Slugs should ony be 3 characters`);
      } else if (env_name && slug && slug.length === 3) {
        exists = true;
      }
    });

    if (!exists) {
      toast.error(`There should be atleast one valid default environment`);
      return exists;
    }

    return valid;
  };

  return (
    <Modal
      title="Default Environments"
      visible={true}
      onOk={handleDefaultOk}
      onCancel={() => {
        showModal(false);
      }}
      width={900}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={defaultLoading}
          onClick={handleDefaultOk}
        >
          Save
        </Button>,
      ]}
    >
      <form id="login_form" onSubmit={(e) => login(e, "login_button")}>
        <p className="text-muted">
          Configure which environments are created automatically for new apps
        </p>
        {inputFields.map((input, index) => {
          // alert(index)
          return (
            <div className="row">
              <div className="col-4 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={input.env_name}
                    onChange={(e) => {
                      // alert("Tumininu")
                      /** handleChangeEnv(index, e)*/
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

export default CreateEnvsModal;
