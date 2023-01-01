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
    <Dashboard_Layout title={integration.name || "Integrations"}  type="integration" id={integration_id} info={integration}>
      <section className="padding_20 row">
        <div className="row">
          <div className="padding_10">{children}</div>
        </div>
      </section>
    </Dashboard_Layout>
  );
};

export default Integration_Layout;
