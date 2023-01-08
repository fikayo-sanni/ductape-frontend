import App_Layout from "../../../components/layout/app_layout";
import { useState } from "react";
import Hooks from "../../../components/apps/app/webhooks"

const Webhooks = (props) => {
  const { app_id } = props;

  const [webhooksList, setWebhooksList] = useState([]);
  const [webhookEnvsList, setWebhookEnvsList] = useState([]);
  const [createWebhooks, setCreateWebhooks] = useState(false);
  const [envs, setEnvs] = useState([])

  // if(webhooksList.length) alert("WEBHOOKS "+JSON.stringify(webhooksList));
  // if(webhookEnvsList.length) alert("WEBHOOKS ENVS "+JSON.stringify(webhookEnvsList));

  // alert(JSON.stringify(envs))
  return (
    <App_Layout
      app_id={app_id}
      selected={"6"}
      setWebhooksList={setWebhooksList}
      setWebhookEnvsList={setWebhookEnvsList}
      defaultActionType="WEBHOOKS"
      createWebhooks = {createWebhooks}
      setCreateWebhooks={setCreateWebhooks}
      setEnvs={setEnvs}
    >
        <Hooks
            setCreateWebhooks={setCreateWebhooks}
            createWebhooks={createWebhooks}
            webhooksList={webhooksList}
            webhookEnvsList={webhookEnvsList}
            envs={envs}
        />
    </App_Layout>
  );
};

export default Webhooks;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
