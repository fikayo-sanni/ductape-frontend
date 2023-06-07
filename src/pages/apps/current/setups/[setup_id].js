import App_Layout from "../../../../components/layout/app_layout";
import { useState } from "react";
import Setups from "../../../../components/apps/setups";

const Setup = (props) => {
  const { setup_id, app_id } = props;
  const [envs, setEnvs] = useState([]);
  const [selected, setSelected] = useState();

  return (
    <App_Layout
      setEnvs={setEnvs}
      app_id={app_id}
      selected={"3"}
    >
        <Setups setup_id={setup_id} envs={envs}/>
    </App_Layout>
  );
};

export default Setup;

export const getServerSideProps = async ({ params }) => {
  const { id: app_id, setup_id } = params;

  return {
    props: { setup_id, app_id },
  };
};
