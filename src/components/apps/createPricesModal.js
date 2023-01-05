import { Button, Modal, Input, Switch } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import Headers from "./action/editHeaders";
import { tagify, resourcify, capitalize } from "../config/constant";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { createAppPrices } from "../services/actions.service";

const { TextArea } = Input;

const CreatePricesModal = (props) => {
  const config = useSelector((state) => state.app);
  const [Prices, setPrices] = useState({});
  const [error, setError] = useState("");
  const [loadingPricesButton, setLoadingPricesButton] = useState(false);
  const [envsList, setEnvList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [user, setUser] = useState(config.user);
  const { setCreatePrices, envs, app_id } = props;

  const closeCreatePricesDialog = () => {
    setCreatePrices(false);
  };

  const createPricesData = async () => {
    try {
      NProgress.start();
      setLoadingPricesButton(true);
      const { auth_token: token, _id: user_id, public_key } = user;

      // alert(JSON.stringify(body))

      const create = await createAppPrices({
        ...Prices,
        envs: envsList,
        token,
        app_id,
        user_id,
        public_key,
      });

      toast.success("Prices Created");
      setLoadingPricesButton(true);
      //refreshApps(create.data.data);
      closeCreatePricesDialog();
      NProgress.done();
    } catch (e) {
      setLoadingPricesButton(false);
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error);
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
    setPrices({ ...Prices, tag });
  };

  const handleChangeName = (e) => {
    const name = e.target.value;
    // alert(name);
    setPrices({ ...Prices, name });
  };

  const handleChangeResource = (e) => {
    const resource = resourcify(e.target.value);
    setPrices({ ...Prices, resource });
  };

  const handleChangePrices = (e) => {
    setPrices({ ...Prices, [e.target.name]: e.target.value });
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
    <option value="fetch_registered">
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
          ? "Prices Configs"
          : selectedPage === 2
          ? "Prices Registration Feids"
          : "Select Environments"
      }
      visible={true}
      onCancel={closeCreatePricesDialog}
      footer={[
        <Button key="submit" onClick={closeCreatePricesDialog}>
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
            selectedPage > 1 ||
            (selectedPage === 1 &&
              !(
                (Prices.setup_type &&
                  Prices.setup_type === "callback" &&
                  Prices.name &&
                  Prices.description) ||
                (Prices.setup_type === "registered" &&
                  Prices.name &&
                  Prices.tag &&
                  Prices.method &&
                  Prices.resource &&
                  Prices.description)
              )) ||
            (selectedPage === 2)
          }
        >
          Next
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={
            !(
              ((Prices.setup_type &&
                Prices.setup_type === "callback" &&
                Prices.name &&
                Prices.description) ||
                (Prices.setup_type === "registered" &&
                  Prices.name &&
                  Prices.tag &&
                  Prices.method &&
                  Prices.resource &&
                  Prices.description)) &&
              envsList.length
            )
          }
          loading={loadingPricesButton}
          onClick={createPricesData}
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
                value={Prices.name || ""}
                onChange={handleChangeName}
                required
                className="form-control"
                placeholder="action"
                name="name"
              />
              <label>Event Name</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={Prices.tag || ""}
                onChange={handleChangeTag}
                required
                className="form-control"
                placeholder="action"
                name="tag"
              />
              <label>Event Tag</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <select
                className="form-control"
                onChange={handleChangePrices}
                value={Prices.setup_type || ""}
                name="setup_type"
              >
                <option disabled selected value="">
                  -- Prices Type --
                </option>
                <option value="registered">REGISTER AN ENDPOINT</option>
                <option value="callback">CODE URL CALLBACK</option>
              </select>
              <label>Prices Type</label>
            </div>
          </div>

          {Prices.setup_type === "registered" ? (
            <label className="text-danger mb-3">
              <small>
                <InfoCircleOutlined /> Prices type means that your clients have
                to register their Prices receiver endpoints with you, you would
                then store these endpoints and use them when event is triggered
              </small>
            </label>
          ) : (
            <></>
          )}

          {Prices.setup_type === "callback" ? (
            <label className="text-danger mb-3">
              <small>
                <InfoCircleOutlined /> Prices type means that for each action
                triggering these Prices, a callback URL is to be provided by
                your clients, and that url is used to process Prices events
              </small>
            </label>
          ) : (
            <></>
          )}

          {Prices.setup_type !== "callback" ? (
            <div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <input
                    type="text"
                    value={Prices.resource || ""}
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
                    extension that performs an Prices. Please delimit variable
                    url parameters using the : operator. e.g
                    /v1/user/:user_id/fetch
                  </small>
                </label>
              </div>
              <div className="col-12 mb-4">
                <div className="form-floating">
                  <select
                    className="form-control"
                    onChange={handleChangePrices}
                    value={Prices.method || ""}
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
                value={Prices.description || ""}
                onChange={handleChangePrices}
                required
                maxLength={50}
                minLength={10}
                placeholder="Description"
                name="description"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="col-12">{Envs}</div>
        </div>
      )}
    </Modal>
  );
};

export default CreatePricesModal;
