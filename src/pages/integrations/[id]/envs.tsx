import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Environments from "../../../components/integrations/integration/environments";
import Dashboard_Layout from '../../../components/layout/dashboard_layout';
import { fetchIntegrationEnvs } from "../../../components/services/integrations.service";
import { RootState } from '../../../redux/store';
import { Button, Card, Input, Modal, Typography } from 'antd';
import dynamic from 'next/dynamic';
const PageHeader = dynamic(() => import('../../../components/common/pageHeader'));

const Envs = (props) => {
  const config = useSelector((state: RootState) => state.app);
  const { _id } = config.integration;
  const [envs, setEnvs] = useState([]);
  const [user, setUser] = useState(config.user);

  useEffect(() => {
    const fetchIntegration = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;
      const envs = await fetchIntegrationEnvs({
        token,
        user_id, 
        public_key,
        _id,
      });
      
      setEnvs(envs.data.data);

      // alert(JSON.stringify(envs.data.data));
    } catch (e) {
      //alert(JSON.stringify(e));
    }
  };
  fetchIntegration()
}, [envs]);

  const refreshEnvs = (data) => {
    setEnvs(data);
  }

  return (
    <Dashboard_Layout showSidebar={true} title="Integration" integrationPage="Environments">
      <PageHeader title="Integrations" />
           <Card className="no_background no_border  ">
                    <Environments envs={envs} refreshEnvs={refreshEnvs} integration_id={_id}/>
            </Card>
      </Dashboard_Layout>
  );
};

export default Envs;

