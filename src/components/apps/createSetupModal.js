import { Button, Modal, Input, Switch } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import Headers from "./action/editHeaders";
import { tagify, resourcify, capitalize } from "../config/constant";
import { InfoCircleOutlined } from "@ant-design/icons";
import { createAppSetup } from "../services/apps.service";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const CreateSetupModal = (props) => {
  const config = useSelector((state) => state.app);
  const [setup, setSetup] = useState({});
  const [error, setError] = useState("");
  const [loadingSetupButton, setLoadingSetupButton] = useState(false);
  const [envsList, setEnvList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [fields, setFields] = useState([]);
  const [user, setUser] = useState(config.user);
  const { setCreateSetupDialog, envs, app_id } = props;

  const closeCreateSetupDialog = () => {
    setCreateSetupDialog(false);
  };

  const createSetupData = async () => {
    try {
      NProgress.start();
      setLoadingSetupButton(true);
      const { auth_token: token, _id: user_id, public_key } = user;

      // alert(JSON.stringify(body))

      const create = await createAppSetup({
        ...setup,
        envs: envsList,
        fields,
        token,
        app_id,
        user_id,
        public_key,
      });

      toast.success("Setup Created");
      setLoadingSetupButton(true);
      //refreshApps(create.data.data);
      closeCreateSetupDialog();
      NProgress.done();
    } catch (e) {
      setLoadingSetupButton(false);
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error)
      toast.error(error || e.toString());
    }
  };

  const incEnvDialog = () => {
    const value = selectedPage + 1;
    setSelectedPage(value);
  };

  const decEnvDialog = () => {
    const value = selectedPage - 1;
    setSelectedPage(value);
  };

  const handleChangeTag = (e) => {
    const tag = tagify(e.target.value);
    setSetup({ ...setup, tag });
  };

  const handleChangeName = (e) => {
    const name = e.target.value;
    // alert(name);
    setSetup({ ...setup, name });
  };

  const handleChangeResource = (e) => {
    const resource = resourcify(e.target.value);
    setSetup({ ...setup, resource });
  };

  const handleChangeSetup = (e) => {
    setSetup({ ...setup, [e.target.name]: e.target.value });
  };

  const checkEnvList = (idx) => {
    //alert(envsList.indexOf(idx))
    //if()
    return envsList.indexOf(idx) > -1;
  };

  const Envs = envs.map((data, index) => {
    return (
      <span className="m-3">
        <Switch
          onChange={(e) => {
            if (e) {
              setEnvList([...envsList, data._id]);
            } else {
              const d = envsList;
              const index = d.indexOf(data._id);
              if (index > -1) d.splice(index, 1);

              setEnvList([...d]);
            }
          }}
          checked={checkEnvList(data._id)}
        />{" "}
        {capitalize(data.env_name)}
        <br />
      </span>
    );
  });

  /**
    <option value="fetch_token_access">
      FETCH TOKEN ACCESS
    </option>
    <option value="fetch_credential_access">
      FETCH CREDENTIAL ACCESS Redirect to URL to Fetch Credentials
      to Periodically Fetch Token{" "}
    </option>
   */

  return (
    <Modal
      title={
        selectedPage === 1
          ? "Setup Configs"
          : selectedPage === 2
          ? "Setup Custom Feids"
          : "Select Environments"
      }
      visible={true}
      onCancel={closeCreateSetupDialog}
      footer={[
        <Button key="submit" onClick={closeCreateSetupDialog}>
          Cancel
        </Button>,
        <Button
          key="submit"
          onClick={decEnvDialog}
          disabled={selectedPage <= 1}
        >
          Prev
        </Button>,
        <Button
          key="submit"
          onClick={incEnvDialog}
          disabled={
            selectedPage > 2 ||
            (selectedPage === 1 &&
              !(
                (setup.setup_type &&
                  setup.setup_type === "token_access" &&
                  setup.name &&
                  setup.description) ||
                (setup.setup_type === "credential_access" &&
                  setup.name &&
                  setup.expiry &&
                  setup.period &&
                  setup.method &&
                  setup.resource &&
                  setup.description)
              )) ||
            (selectedPage === 2 && !fields.length)
          }
        >
          Next
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={
            !(
              ((setup.setup_type &&
                setup.setup_type === "token_access" &&
                setup.name &&
                setup.description) ||
                (setup.setup_type === "credential_access" &&
                  setup.name &&
                  setup.expiry &&
                  setup.period &&
                  setup.method &&
                  setup.resource &&
                  setup.description)) &&
              fields.length &&
              envsList.length
            )
          }
          loading={loadingSetupButton}
          onClick={createSetupData}
        >
          SAVE
        </Button>,
      ]}
    >
      {selectedPage === 1 ? (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={setup.name || ""}
                onChange={handleChangeName}
                required
                className="form-control"
                placeholder="action"
                name="name"
              />
              <label>Policy Name</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <select
                className="form-control"
                onChange={handleChangeSetup}
                value={setup.setup_type || ""}
                name="setup_type"
              >
                <option disabled selected value="">
                  -- Setup Type --
                </option>
                <option value="token_access">FIXED TOKEN ACCESS</option>
                <option value="credential_access">CREDENTIAL ACCESS</option>
              </select>
              <label>Setup Type</label>
            </div>
          </div>

          {setup.setup_type === "token_access" ? (
            <label className="text-danger mb-3">
              <small>
                <InfoCircleOutlined /> Setup policy type requires permanent
                access token(s) to be supplied by your clients. In this
                scenario, these token(s) would never need to renewed
              </small>
            </label>
          ) : (
            <></>
          )}

          {setup.setup_type === "credential_access" ? (
            <label className="text-danger mb-3">
              <small>
                <InfoCircleOutlined /> Setup policy type allows clients to
                supply credentials they can use to renew their access token(s).
                In this scenario, you need to provide info for renewing the
                token(s)
              </small>
            </label>
          ) : (
            <></>
          )}

          {setup.setup_type !== "token_access" &&
          setup.setup_type !== "fetch_token_access" ? (
            <div className="row">
              <div className="col-9 mb-4">
                <div className="form-floating">
                  <input
                    type="number"
                    value={setup.expiry || ""}
                    onChange={handleChangeSetup}
                    required
                    className="form-control"
                    placeholder="Token Expiry"
                    name="expiry"
                  />
                  <label>Token Expiry</label>
                </div>
              </div>
              <div className="col-3 mb-4">
                <div className="form-floating">
                  <select
                    className="form-control"
                    onChange={handleChangeSetup}
                    value={setup.period || ""}
                    name="period"
                  >
                    <option disabled selected value="">
                      Period
                    </option>
                    <option value="secs">secs</option>
                    <option value="mins">mins</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                  </select>
                  <label>Period</label>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {setup.setup_type !== "token_access" ? (
            <div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={setup.resource || ""}
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
                    <InfoCircleOutlined /> resource e.g /v1/user/create, url
                    extension that performs an setup. Please delimit variable
                    url parameters using the : operator. e.g
                    /v1/user/:user_id/fetch
                  </small>
                </label>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-control"
                    onChange={handleChangeSetup}
                    value={setup.method || ""}
                    name="method"
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
            </div>
          ) : (
            <></>
          )}
          <div className="col-12">
            <div className="form-floating">
              <TextArea
                type="text"
                value={setup.description || ""}
                onChange={handleChangeSetup}
                required
                maxLength={50}
                minLength={10}
                placeholder="Description"
                name="description"
              />
            </div>
          </div>
        </div>
      ) : selectedPage === 2 ? (
        <div>
          <Headers envs={envs} setExtFields={setFields} presets={fields} />
        </div>
      ) : (
        <div>
          <div className="col-12">{Envs}</div>
        </div>
      )}
    </Modal>
  );
};

export default CreateSetupModal;
