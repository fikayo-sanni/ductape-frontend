import App_Layout from "../../../../components/layout/app_layout";
import { useState } from "react";

const Webhook = (props) => {

  return (<></>)
};

export default Webhook;

export const getServerSideProps = async ({ params }) => {
  const { id: app_id, webhook_id } = params;

  return {
    props: { webhook_id, app_id },
  };
};
