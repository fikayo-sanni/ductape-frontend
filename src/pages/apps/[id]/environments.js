import App_Layout from "../../../components/layout/app_layout";
import Environments from "../../../components/apps/app/environments";
import { useState } from "react";

const Environment = (props) => {
  const { app_id } = props;

  const [envs, setEnvs] = useState([]);

  const refreshEnvs = (data) => {
    setEnvs(data);
  }

  return (
    <App_Layout app_id={app_id} selected={"2"} setEnvs={setEnvs}>
      <Environments envs={envs} app_id={app_id} refreshEnvs={refreshEnvs}/>
    </App_Layout>
  );
};

export default Environment;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
