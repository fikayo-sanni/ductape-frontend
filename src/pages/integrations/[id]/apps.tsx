import Integration_Layout from "../../../components/layout/integration_layout";
import AppsList from "../../../components/integrations/integration/apps";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import { Loading } from "../../../components/config/constant";
import { RootState } from '../../../redux/store';
import { fetchIntegrationApps } from "../../../components/services/integrations.service";
import toast from "react-hot-toast";

import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import { Button, Card, Input, Modal, Typography } from 'antd';
import dynamic from 'next/dynamic';
const PageHeader = dynamic(() => import('../../../components/common/pageHeader'));

const Apps = (props) => {
  const config = useSelector((state: RootState) => state.app);
  const { _id } = config.integration;

  const [apps, setApps] = useState([]);
  const [user, setUser] = useState(config.user);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchApps = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;
      const apps = await fetchIntegrationApps({
        token,
        user_id,
        public_key,
        _id,
      });
      
      console.log(apps.data.data);
      setApps(apps.data.data); 
      setLoading(false);
      //alert(JSON.stringify(apps.data.data));
    } catch (err) {
      //alert(e);
      setLoading(false);
      const error = err.response ? err.response.data.errors : err.toString();
      toast.error(error);
    }
  };
  fetchApps();
}, [apps]);

  const refreshApps = (data) => {
    setApps(data);
  };

  /*{loading ? (
    <Loading />
  ) : (
    <AppsList
      apps={apps}
      refreshApps={refreshApps}
      integration_id={integration_id}
    />
  )}*/

  return (
    <Dashboard_Layout showSidebar={true} title="Integration" integrationPage="Apps">
      <PageHeader title="Apps" />
      <Card className="no_background no_border  ">
        <AppsList
          apps={apps}
          refreshApps={refreshApps}
          integration_id={_id}
        />
      </Card>
   </Dashboard_Layout>
  );
};

export default Apps;


