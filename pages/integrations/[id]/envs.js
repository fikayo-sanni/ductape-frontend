import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Environments from "../../../components/integrations/integration/environments";
import Integration_Layout from "../../../components/layout/integration_layout";
import { fetchIntegrationEnvs } from "../../../components/services/integrations.service";

const Envs = (props) => {
  const config = useSelector((state) => state.app);
  const { integration_id } = props;

  const [envs, setEnvs] = useState([]);
  const [user, setUser] = useState(config.user);

  useEffect(async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;
      const envs = await fetchIntegrationEnvs({
        token,
        user_id,
        public_key,
        integration_id,
      });

      setEnvs(envs.data.data);

      // alert(JSON.stringify(envs.data.data));
    } catch (e) {
      //alert(JSON.stringify(e));
    }
  }, [envs]);

  const refreshEnvs = (data) => {
    setEnvs(data);
  }

  return (
    <Integration_Layout integration_id={integration_id} selected={"1"}>
      <Environments envs={envs} refreshEnvs={refreshEnvs} integration_id={integration_id}/>
    </Integration_Layout>
  );
};

export default Envs;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { integration_id: id },
  };
};
