import { CaretDownOutlined, ExclamationCircleOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Space } from "antd";
import Link from "next/link";
import toast from "react-hot-toast";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createIntegrationApp } from "../services/integrations.service";
import { fetchWorkspaceApps } from "../services/apps.service";
import { changeApps } from '../../redux/applicationSlice';

const CreateIntegrationAppModal = (props) => {
  const { closeCreateDialog, integration_id, refreshApps } = props;
  const { confirm } = Modal;
  const config = useSelector((state) => state.app);
  const [error, setError] = useState("");

  const [user, setUser] = useState(config.user);
  const [app, setApp] = useState({});
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const { auth_token: token, _id: user_id, public_key } = user;

    const configApps = config.apps;

    if (
      configApps &&
      configApps.length &&
      configApps[0].workspace_id === config.defaultWorkspaceId
    ) {
      setApps(configApps);
      //displayApps(configApps);
    } else {
      try {
        const apps = await fetchWorkspaceApps({
          token,
          user_id,
          public_key, 
          workspace_id: config.defaultWorkspaceId,
        });
        changeApps(apps.data.data);
        if (apps.data.data.length) {
          setApps(apps.data.data);
          //displayApps(apps.data.data);
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

  const showConfirm = (app_id, app_name) => {
    confirm({
      title: `Add ${app_name} to Integration Project`,
      content: "Click OK to proceed",
      loading: {loading},
      onOk() {
        submitBody(app_id);
      },
      onCancel() {
        //console.log("Cancel");
      },
    });
  };

  const handleMenuClick = (e) => {
    console.log("click left button", e);
  };

  const submitBody = async(app_id) => {
    NProgress.start();

    try{

      NProgress.start();
      setLoading(true);

      const { auth_token: token, _id: user_id, public_key } = user;

      const create = await createIntegrationApp({
        app_id,
        integration_id,
        token,
        user_id,
        public_key,
        workspace_id: config.defaultWorkspaceId,
      });

      toast.success("App Added");
      setLoading(false);
      refreshApps(create.data.data)
      NProgress.done();


    } catch(e) {
      NProgress.done()
      const error = e.response? e.response.data.errors: e.toString();
      setError(error || e.toString());
      toast.error(error)
    }

  }

  const appsItems = apps.map((data, index) => {
    return <Menu.Item onClick={(e) => {showConfirm(data._id, data.app_name)}}>{data.app_name}</Menu.Item>;
  });

  const menu = (
    <Menu onClick={handleMenuClick}>
      {appsItems}
      <Link href="/marketplace">
        <a>
          <Menu.Item className="bg-muted">
            <Space className="text-primary">
              <PlusOutlined /> Find on MarketPlace
            </Space>
          </Menu.Item>
        </a>
      </Link>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        App
        <PlusCircleOutlined style={{ color: "#0746A6" }} />
      </Button>
    </Dropdown>
  );
};

export default CreateIntegrationAppModal;
