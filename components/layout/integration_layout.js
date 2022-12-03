import Dashboard_Layout from "../../components/layout/dashboard_layout";
import React, { useEffect, useState } from "react";
import { capitalize } from "../config/constant";
import { Breadcrumb, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchIntegration } from "../services/integrations.service";
import toast from "react-hot-toast";
import { changeSelectedIntegration } from "../../data/applicationSlice";

const Integration_Layout = (props) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.app);
  const { integration_id, setEnvs, selected, children } = props;
  const [error, setError] = useState();

  const [integration, setIntegration] = useState({});

  const fetchIntegrationData = async () => {
    const { auth_token: token, _id: user_id, public_key } = config.user;
    const data = await fetchIntegration({
      token,
      user_id,
      public_key,
      integration_id,
    });
    const integration = data.data.data;
    return integration;
  };

  useEffect(async () => {
    if (config.integration && config.integration._id === integration_id) {
      setIntegration(config.integration);
      if (setEnvs) setEnvs(config.integration.envs);
    } else {
      try {
        const integration = await fetchIntegrationData();
        if (integration.workspace_id === config.defaultWorkspaceId) {
          setIntegration(integration);
          dispatch(changeSelectedIntegration(integration));
          // categorizeActions(app.actions);
          if (setEnvs) setEnvs(integration.envs);
        } else {
          const error = "Access Denied";
          setError(error);
        }
      } catch (e) {
        //alert(JSON.stringify(e));
        const error = e.response ? e.response.data.errors : e.toString();
        toast.error(error || e.toString());
        setError(error);
      }
    }
  }, [integration]);

  return (
    <Dashboard_Layout title={integration.name || "Integrations"}>
      <div className="padding_10"></div>
      <section className="padding_10 row">
        <div className="row">
          <div className="col-2 h-100">
            <div className="padding_10">
              <Breadcrumb>
                <Breadcrumb.Item className="text-muted">
                  <Link href={"/integrations"}>Integrations</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="text-muted">{integration.name} </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Menu
              defaultSelectedKeys={selected}
              mode="inline"
              theme="light"
              inlineCollapsed={false}
              className="border-none"
            >
              <Menu.Item key="1">
                <Link href={`/integrations/${integration_id}/envs`}>
                  <span>Envs</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href={`/integrations/${integration_id}/apps`}>
                  <span>Apps</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link href={`/integrations/${integration_id}/features`}>
                  <span>Features</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link href={`/integrations/${integration_id}/keys`}>
                  <span>Access Keys</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link href={`/integrations/${integration_id}/caches`}>
                  <span>Data Caches</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link href={`/integrations/${integration_id}/activity`}>
                  <span>Activity</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="col-10 padding_10">{children}</div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default Integration_Layout;
