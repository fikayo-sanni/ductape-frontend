import { Modal, Input, Checkbox, Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { capitalize, isValidHttpUrl } from "../config/constant";
import { toast } from "react-hot-toast";
import { InfoCircleOutlined } from "@ant-design/icons";
import NProgress from "nprogress";
import { updateAppEnv } from "../services/apps.service";

const { TextArea } = Input;
const UpdateAppEnvModal = (props) => {
  const { env, envSelected, showDialog } = props;
  //alert(JSON.stringify(env))
  const [envSelectedPage, setEnvSelectedPage] = useState(1);
  const [envSelectedData, setEnvSelectedData] = useState(env);
  const [loadingButton, setLoadingButton] = useState(false)
  const config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);

  const handleChange = (e) =>
    setEnvSelectedData({ ...envSelectedData, [e.target.name]: e.target.value });

  const handleChangeLimits = (e) => {
    const Limits = envSelectedData.limits;
    const limits = { ...Limits, [e.target.name]: e.target.value };
    setEnvSelectedData({ ...envSelectedData, limits });
  };

  const handleChangeWhiteList = (e) => {
    setEnvSelectedData({
      ...envSelectedData,
      whitelist: !envSelectedData.whitelist,
    });
  };

  const handleChangeActive = (e) => {
    setEnvSelectedData({ ...envSelectedData, active: !envSelectedData.active });
  };

  const incEnvDialog = () => {
    let next = true;
    if (envSelectedPage === 1) {
      if (!envSelectedData.base_url) {
        next = false;
        toast.error("base url is required");
      } else if (!isValidHttpUrl(envSelectedData.base_url)) {
        next = false;
        toast.error("base url is invalid");
      } else if (!envSelectedData.request_type) {
        next = false;
        toast.error("default request-type is required");
      }
    }

    if (envSelectedPage === 3) {
      if (!envSelectedData.payment_type) {
        next = false;
        toast.error("payment type is required");
      }
    }

    if (next) {
      const value = envSelectedPage + 1;
      setEnvSelectedPage(value);
    }
  };

  const decEnvDialog = () => {
    const value = envSelectedPage - 1;
    setEnvSelectedPage(value);
  };

  const closeEnvDialog = () => {
    showDialog(false);
  }

  const updateEnvData = async () => {
    try {
      setLoadingButton(true);
      NProgress.start();
      const data = {
        ...envSelectedData,
        token: user.auth_token,
        public_key: user.public_key,
        user_id: user._id,
        env_id: envSelectedData._id,
      }

      // alert(JSON.stringify(data))
      const result = await updateAppEnv(data);

      setLoadingButton(false);
      NProgress.done();
      if (result) {
        toast.success("Environment Updated");
        setApp(result.data.data);
        setEnvDialog(false);
      } else {
        toast.error("Something unexpected happened");
      }
    } catch (e) {
      setLoadingButton(false);
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  };

  return (
    <Modal
      title={
        `${capitalize(envSelectedData.env_name)} Env`
      }
      visible={true}
      onCancel={closeEnvDialog}
      footer={[
        <Button key="submit" onClick={closeEnvDialog}>
          Cancel
        </Button>,
        <Button
          key="submit"
          onClick={decEnvDialog}
          disabled={envSelectedPage <= 1}
        >
          Prev
        </Button>,
        <Button
          key="submit"
          onClick={incEnvDialog}
          disabled={envSelectedPage >= 4}
        >
          Next
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={envSelectedPage !== 4}
          loading={loadingButton}
          onClick={updateEnvData}
        >
          SAVE
        </Button>,
      ]}
    >
      <label>
        {envSelectedPage}/4:{" "}
        {envSelectedPage === 1
          ? "Setup"
          : envSelectedPage == 2
          ? "Request Limits"
          : envSelectedPage == 3
          ? "Billing"
          : envSelectedPage == 4
          ? "Finish"
          : ""}
      </label>
      {envSelectedPage === 1 ? (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="text"
                value={envSelectedData.base_url || ""}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="baseUrl"
                name="base_url"
              />
              <label>Base Url:</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <select
                className="form-control"
                name="request_type"
                onChange={handleChange}
                value={envSelectedData.request_type || ""}
              >
                <option disabled selected value="">
                  -- Select Request Type --
                </option>
                <option value="application/json">application/json</option>
                <option value="application/x-www-form-urlencoded">
                  application/x-www-form-urlencoded
                </option>
                <option value="multipart/form-data">multipart/form-data</option>
                <option value="SOAP">SOAP</option>
              </select>
              <label>Default Request Type:</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <TextArea
                type="text"
                value={envSelectedData.description || ""}
                onChange={handleChange}
                required
                placeholder="Description"
                name="description"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {envSelectedPage === 2 ? (
        <div className="row">
          <label className="text-muted">
            {" "}
            <InfoCircleOutlined /> Set as 0 for unlimited requests
          </label>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="number"
                value={envSelectedData.limits.per_minute || 0}
                onChange={handleChangeLimits}
                required
                className="form-control"
                placeholder="Max Requests Per Minute: "
                name="per_minute"
              />
              <label>Max Requests Per Minute: </label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="number"
                value={envSelectedData.limits.per_hour || 0}
                onChange={handleChangeLimits}
                required
                className="form-control"
                placeholder="Max Requests Per Hour: "
                name="per_hour"
              />
              <label>Max Requests Per Hour: </label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="number"
                value={envSelectedData.limits.per_day || 0}
                onChange={handleChangeLimits}
                required
                className="form-control"
                placeholder="Max Requests Per Day: "
                name="per_day"
              />
              <label>Max Requests Per Day: </label>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {envSelectedPage === 3 ? (
        <div className="row">
          <label className="text-muted">
            {" "}
            <InfoCircleOutlined /> We charge 20% on revenue generated; and
            charge you $0.002 per request on the free tier
          </label>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <select
                className="form-control"
                name="payment_type"
                onChange={handleChange}
                value={envSelectedData.payment_type || ""}
              >
                <option disabled selected value="">
                  -- Select Request Type --
                </option>
                <option value="per_action">Per Action</option>
                <option value="monthly_subscription">
                  Subscriptions (Monthly)
                </option>
                <option value="custom">Custom</option>
                <option value="free">Free</option>
              </select>
              <label>Payment Type</label>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div className="form-floating">
              <input
                type="number"
                value={envSelectedData.cost || ""}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="cost"
                name="cost"
              />
              <label>Default Cost ($)</label>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {envSelectedPage === 4 ? (
        <div className="row">
          <div className="col-12 mb-4">
            <label className="text-muted">
              <InfoCircleOutlined /> Require Whitelisted IPs
            </label>
            <br />
            <br />
            <div className="">
              <Checkbox
                onChange={handleChangeWhiteList}
                checked={envSelectedData.whitelist}
              >
                Require IP Whitelist
              </Checkbox>
            </div>
          </div>
          <label className="text-muted mb-4"> </label>
          <div className="col-12 mb-4">
            <label className="text-muted">
              <InfoCircleOutlined /> Activate and place environment online
            </label>
            <br />
            <br />
            <div className="">
              <Checkbox onChange={handleChangeActive} checked={envSelectedData.active}>
                Active
              </Checkbox>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default UpdateAppEnvModal;
