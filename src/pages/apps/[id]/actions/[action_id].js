import App_Layout from "../../../../components/layout/app_layout";
import Actions from "../../../../components/apps/actions";
import { useState } from "react";

const Action = (props) => {
  const {action_id, app_id} = props;

  const [envs, setEnvs] = useState([]); 
  const [selected, setSelected] = useState();

  //alert("SELECTING: "+selected);
  return (
    <App_Layout setEnvs={setEnvs} app_id={app_id} selected={selected}>
      <Actions action_id={action_id} envs={envs} setSelected={setSelected}/>
    </App_Layout>
  );
};

export default Action;

export const getServerSideProps = async ({ params }) => {
  const {id: app_id, action_id} = params;

  return {
    props: { action_id, app_id },
  };
};
