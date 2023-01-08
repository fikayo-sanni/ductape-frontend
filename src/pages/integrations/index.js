import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Integrations_Layout from "../../components/layout/integrations_layout";
import { fetchWorkspaceIntegrations } from "../../components/services/integrations.service";
import toast from "react-hot-toast";
import { changeIntegrations } from "../../data/applicationSlice";
import IntegrationList from "../../components/integrations/integrationList";
import Dashboard_Layout from "../../components/layout/dashboard_layout";

const Index = (props) => {
  const { selected } = props;
  const config = useSelector((state) => state.app);
  const [displayed, setDisplayed] = useState([]);
  const dispatch = useDispatch();

  const [user, setUser] = useState(config.user);
  const [integrations, setIntegrations] = useState([]);
  const [error, setError] = useState("");

  const displayIntegrations = (integrations) => {
    let show = "all";

    if (selected === "2") show = "draft";
    if (selected === "3") show = "active";

    if (show === "all") {
      setDisplayed(integrations);
    } else {
      const data = integrations.filter((data) => {
        return data.status === show;
      });
      setDisplayed(data);
    }
  };

  useEffect(async () => {
    const { auth_token: token, _id: user_id, public_key } = user;

    const configIntegrations = config.integrations;

    if (
      configIntegrations &&
      configIntegrations.length &&
      configIntegrations[0].workspace_id === config.defaultWorkspaceId
    ) {
      setIntegrations(configIntegrations);
      displayIntegrations(configIntegrations);
    } else {
      try {
        const integrations = await fetchWorkspaceIntegrations({
          token,
          user_id,
          public_key,
          workspace_id: config.defaultWorkspaceId,
        });
        dispatch(changeIntegrations(integrations.data.data));
        if (integrations.data.data.length) {
          setIntegrations(integrations.data.data);
          displayIntegrations(integrations.data.data);
        } else {
          setError("No Integrations");
          toast.error("No Integrations");
        }
      } catch (e) {
        // alert(config.defaultWorkspaceId);
        const error = e.response ? e.response.data.errors : e.toString();
        setError(error || e.toString());
        toast.error(error);
      }
    }
  }, []);

  const refreshIntegrations = (integrations) => {
    setIntegrations(integrations);
  };

  // alert(JSON.stringify(displayed))

  return (
    <Integrations_Layout refreshIntegrations={refreshIntegrations} selected={selected}>
      <div>
        {!integrations && !displayed.length && !error ? (
          <Loading />
        ) : (
          <IntegrationList integrations={displayed} />
        )}
        {error && !displayed.length ? <></> : ""}
      </div>
    </Integrations_Layout>
  );
};

export default Index;
