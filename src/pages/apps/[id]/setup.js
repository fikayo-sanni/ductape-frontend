import App_Layout from "../../../components/layout/app_layout";
import Onboarding from "../../../components/apps/app/onboarding";
import { useState } from "react";

const Onboard = (props) => {
  const { app_id } = props;

  const [setupList, setSetupList] = useState([]);
  const [setupEnvsList, setSetupEnvsList] = useState([]);
  const [createSetup, setCreateSetup] = useState(false);
  const [envs, setEnvs] = useState([]);

  //if(envs.length) alert(JSON.stringify(envs));

  return (
    <App_Layout
      app_id={app_id}
      selected={"3"}
      setSetupList={setSetupList}
      setSetupEnvsList={setSetupEnvsList}
      defaultActionType="SETUP"
      createSetup = {createSetup}
      setEnvs={setEnvs}
      setCreateSetup={setCreateSetup}
    >
      <Onboarding
        setupList={setupList}
        setCreateSetup={setCreateSetup}
        setupEnvsList={setupEnvsList}
        envs={envs}
      />
    </App_Layout>
  );
};

export default Onboard;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
