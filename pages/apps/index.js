import React, { useEffect, useState } from "react";
import AppList from "../../components/apps/appList";
import { Input } from "antd";
import { toast } from "react-hot-toast";
import { observer } from "mobx-react-lite";
import { Loading } from "../../components/config/constant";
import { fetchWorkspaceApps } from "../../components/services/apps.service";
import { useDispatch, useSelector } from "react-redux";
import { changeApps } from "../../data/applicationSlice";
import Apps_Layout from "../../components/layout/apps_layout";
import Dashboard_Layout from "../../components/layout/dashboard_layout";

const { TextArea } = Input;

const Index = observer((props) => {
  const { selected } = props;
  const config = useSelector((state) => state.app);
  const [displayed, setDisplayed] = useState([]);
  const dispatch = useDispatch();

  const [user, setUser] = useState(config.user);
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");

  const refreshApps = (apps) => {
    setApps(apps);
  };

  const displayApps = (apps) => {
    let show = "all";

    if (selected === "2") show = "draft";
    if (selected === "3") show = "private";
    if (selected === "4") show = "public";

    //alert(show)
    if (show === "all") {
      //alert("APPS "+JSON.stringify(apps))
      setDisplayed(apps);
    } else {
      const data = apps.filter((data) => {
        //alert("data "+data.status+" "+show)
        return data.status === show;
      });

      //alert("BAM " + selected + JSON.stringify(data));
      setDisplayed(data);
    }
  };

  useEffect(async () => {
    const { auth_token: token, _id: user_id, public_key } = user;

    const configApps = config.apps;

    if (
      configApps &&
      configApps.length &&
      configApps[0].workspace_id === config.defaultWorkspaceId
    ) {
      setApps(configApps);
      displayApps(configApps);
    } else {
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
          displayApps(apps.data.data);
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
    }
  }, []);

  return (
    <Apps_Layout refreshApps={refreshApps} selected={selected}>
      <div>
        {!apps && !displayed.length && !error ? (
          <Loading />
        ) : (
          <AppList apps={displayed} />
        )}
        {error && !displayed.length ? <></> : ""}
      </div>
    </Apps_Layout>
  );
});

export default Index;

/**
 * 
 * <Dashboard_Layout title="Apps">

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
            
          </div>
        </div>
      </section>
    </Dashboard_Layout>
 */
