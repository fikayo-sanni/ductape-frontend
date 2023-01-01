import { useState } from "react";

const Overview = (props) => {

  return <></>
};

export default Overview;

export const getServerSideProps = async ({ params }) => {
  const { id: app_id } = params;

  return {
    props: { app_id },
  };
};
