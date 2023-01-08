import { Breadcrumb, List, Avatar, Button, Switch, Space, Select, Modal } from "antd";
import { fetchInitials } from "../../config/constant";
import { SettingOutlined, PlusOutlined } from "@ant-design/icons";
import Lists from "./crud/lists";
import { useState } from "react";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import Upload from "../../../pages/upload";
import { useSelector, useDispatch } from "react-redux";
import { updateApp } from "../../services/apps.service";
import { changeSelectedApp } from "../../../data/applicationSlice";

const Publish = (props) => {
  // alert("cadillac")
  const {confirm} = Modal;
  const config = useSelector((state) => state.app);
  const { domains, presetDomains, app_id, state } = props;
  const [domainValues, setDomainValues] = useState(presetDomains);
  const dispatch = useDispatch();
  let defaultState = true;
  const [loading, setLoading] = useState(false)
  if(state === "private"){
    defaultState = false;
  }
  const {selectedState, setSelectedState} = useState(defaultState);
  /**
           */


  const handleChange = (value) => {
    setDomainValues(value);
  };

  const options = domains.map((data, index) => {
    return (
      <Option value={data._id} label={data.domain_name}>
        <div className="demo-option-label-item">{data.domain_name}</div>
      </Option>
    );
  });

  const publish = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = config.user;
      NProgress.start();
      const payload = {
        domains: domainValues,
        status: selectedState? "public": "private",
        token,
        user_id,
        public_key,
        app_id,
      }

      alert(JSON.stringify(payload))
      const data = await updateApp (payload);

      dispatch(changeSelectedApp(data));
      NProgress.done();
      toast.success("App Updated");
    } catch (e) {
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  };

  const showConfirm = (app_name) => {
    confirm({
      title: `Publish app`,
      content: "Click OK to proceed",
      loading: {loading},
      onOk() {
        publish();
      },
      onCancel() {
        //console.log("Cancel");
      },
    });
  };

  return (
    <span>
      <div>
        <div className="row">
          <div className="col-4">
            <Breadcrumb>
              <Breadcrumb.Item>Publish</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
            <div className="padding_10">
              <h2 className="pt-3">Publish App </h2>

              <label className="text-muted text-xl">
                Publish App to marketplace, are you good to go?
              </label>
              <br />
              <Upload/>
              <br />

              <label className="text-muted">Select related domains</label>
              <br />
              <div className="col-6">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="select one country"
                  defaultValue={domainValues}
                  onChange={handleChange}
                  optionLabelProp="label"
                >
                  {options}
                </Select>
              </div>
              <br />

              <label className="text-muted">
                Publish to Public Marketplace?
              </label>
              <br />

              <Switch
                checkedChildren="Public"
                unCheckedChildren="Private"
                defaultChecked={selectedState}
                onChange={()=>{setSelectedState(!selectedState)}}
              />
              <br />
              <br />
              <Button type="primary" onClick={()=>showConfirm(app_id)}>Publish App</Button>
            </div>
        </div>
      </div>
    </span>
  );
};

export default Publish;
