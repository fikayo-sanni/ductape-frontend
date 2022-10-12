import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useEffect, useState } from "react";
import AppList from "../../components/apps/appList";
import {
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Input,
  Menu,
  Breadcrumb,
} from "antd";
import { toast } from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { Loading } from "../../components/config/constant";
import {
  fetchWorkspaceApps,
} from "../../components/services/apps.service";
import { useDispatch, useSelector } from "react-redux";
import { changeApps } from "../../data/applicationSlice";
import CreateAppModal from "../../components/apps/createAppModal";
import CreateEnvsModal from "../../components/apps/createEnvsModal";


const { TextArea } = Input;

const Index = observer((props) => {
  const config = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [user, setUser] = useState(config.user);
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDefaultsModalVisible, setIsDefaultsModalVisible] = useState(false);

  const showModal = (bool) => {
    setIsModalVisible(bool);
  };

  const refreshApps = (apps) => {
    setApps(apps);
  }

  const showDefaultsModal = (bool) => {
    setIsDefaultsModalVisible(bool);
  };

  useEffect(async () => {

    const { auth_token: token, _id: user_id, public_key } = user;

    const configApps = config.apps;

    if (
      configApps &&
      configApps.length &&
      configApps[0].workspace_id === config.defaultWorkspaceId
    )
      setApps(configApps);
    try {
      const apps = await fetchWorkspaceApps({
        token,
        user_id,
        public_key,
        workspace_id: config.defaultWorkspaceId,
      });
      dispatch(changeApps(apps.data.data));
      if (apps.data.data.length) {
        setApps(apps.data.data);
      } else {
        setError("No Apps");
        toast.error("No Apps");
      }
    } catch (e) {
      // alert(config.defaultWorkspaceId);
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error || e.toString());
      toast.error(error);
    }
  }, []);

  return (
    <Dashboard_Layout title="Apps">

      {isModalVisible?<CreateAppModal showModal={showModal} refreshApps={refreshApps}/>: <></>}
      {isDefaultsModalVisible?<CreateEnvsModal showModal={showDefaultsModal}/>:<></>}

      <section className="padding_10">
        <div className="padding_20">
          <Breadcrumb>
            <Breadcrumb.Item>Apps</Breadcrumb.Item>
            <Breadcrumb.Item className="text-white">""</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-2">
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="border-none"
            >
              <Menu.Item key="1">
                <span>All</span>
              </Menu.Item>
              <Menu.Item key="2">
                <span>Draft</span>
              </Menu.Item>
              <Menu.Item key="3">
                <span>Private</span>
              </Menu.Item>
              <Menu.Item key="4">
                <span>Public</span>
              </Menu.Item>
            </Menu>
            <button
              className="btn btn-outline-primary w-100 mb-3 mt-3 text-uppercase"
              onClick={()=>{showModal(true)}}
            >
              Apps <PlusOutlined />
            </button>
            <button
              className="btn btn-outline-danger w-100 text-uppercase"
              onClick={()=>{showDefaultsModal(true)}}
            >
              Envs <SettingOutlined />
            </button>
          </div>
          <div className="col-10">
            {!apps.length && !error ? <Loading /> : <AppList apps={apps}/>}
            {error && !apps.length ? <></> : ""}
          </div>
        </div>
      </section>
    </Dashboard_Layout>
  );
});

export default Index;
