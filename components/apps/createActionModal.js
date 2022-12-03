import { Modal, Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InfoCircleOutlined } from "@ant-design/icons";
import { tagify, resourcify } from "../config/constant";
import NProgress from "nprogress";
import { toast } from "react-hot-toast";
import { createActions } from "../services/actions.service";

const { TextArea } = Input;
const CreateActionModal = (props) => {
  const config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);

  const { setCreateActionDialog, defaultActionType, app_id } = props;
  const [action, setAction] = useState({});

  const [loadingActionButton, setLoadingActionButton] = useState(false);

  const closeCreateActionDialog = () => {
    //alert(defaultActionType);
    setCreateActionDialog(false);
  };

  const createActionData = async () => {
    try {
      setLoadingActionButton(true);
      //alert(JSON.stringify(action))
      NProgress.start();
      const result = await createActions({
        ...action,
        token: user.auth_token,
        public_key: user.public_key,
        user_id: user._id,
        app_id,
      });

      setLoadingActionButton(false);
      NProgress.done();
      if (result) {
        // const app = await fetchAppData();
        // setApp(app);

        toast.success("Action Added");
        //setApp(result.data.data);
        closeCreateActionDialog();
        setAction({});
        //setCreateAction(false);
      } else {
        toast.error("Something unexpected happened");
      }
    } catch (e) {
      setLoadingActionButton(false);
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  };

  const handleChangeTag = (e) => {
    const tag = tagify(e.target.value);
    setAction({ ...action, tag });
  };

  const handleChangeName = (e) => {
    const name = e.target.value;
    // alert(name);
    setAction({ ...action, name });
  };

  const handleChangeResource = (e) => {
    const resource = resourcify(e.target.value);
    setAction({ ...action, resource });
  };

  const handleChangeAction = (e) => {
    setAction({ ...action, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (defaultActionType) setAction({ ...action, type: defaultActionType });
  }, []);

  // {defaultActionType?<option value="AUTH">Authorization</option>: null}
  return (
    <Modal
      title="Create Action"
      visible={true}
      onCancel={closeCreateActionDialog}
      footer={[
        <Button key="submit" onClick={closeCreateActionDialog}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={
            !(
              action.resource &&
              action.tag &&
              action.httpVerb &&
              action.type &&
              action.description
            )
          }
          loading={loadingActionButton}
          onClick={createActionData}
        >
          SAVE
        </Button>,
      ]}
    >
      <div className="row">
        <div className="col-12 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={action.name || ""}
              onChange={handleChangeName}
              required
              className="form-control"
              placeholder="Name"
              name="name"
            />
            <label>Action Name</label>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={action.tag || ""}
              onChange={handleChangeTag}
              required
              className="form-control"
              placeholder="action"
              name="tag"
            />
            <label>Action Tag</label>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={action.resource || ""}
              onChange={handleChangeResource}
              required
              className="form-control"
              placeholder="resource"
              name="resource"
            />
            <label>Resource</label>
          </div>
          <label className="text-muted">
            {" "}
            <small>
              <InfoCircleOutlined /> resource e.g /v1/user/create, url extension
              that performs an action. Please delimit variable url parameters
              using the : operator. e.g /v1/user/:user_id/fetch
            </small>
          </label>
        </div>
        <div className="col-12 mb-4">
          <div className="form-floating">
            <select
              className="form-control"
              onChange={handleChangeAction}
              value={action.httpVerb || ""}
              name="httpVerb"
            >
              <option disabled selected value="">
                -- HTTP Action Verbs --
              </option>
              <option value="POST">POST</option>
              <option value="GET">GET</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
            <label>HTTP Action Verb</label>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="form-floating">
            <select
              className="form-control"
              onChange={handleChangeAction}
              value={action.type || defaultActionType || ""}
              disabled={Boolean(defaultActionType)}
              name="type"
            >
              <option disabled selected value="">
                -- Select Action Type --
              </option>
              {defaultActionType ? <option value="SETUP">Set Up</option> : null}
              <option value="CREATE">Create</option>
              <option value="READ">Read</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
            </select>
            <label>Action Type</label>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="form-floating">
            <TextArea
              type="text"
              value={action.description || ""}
              onChange={handleChangeAction}
              required
              maxLength={50}
              minLength={10}
              placeholder="Description"
              name="description"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateActionModal;
