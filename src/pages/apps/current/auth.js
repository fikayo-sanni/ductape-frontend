import App_Layout from "../../../components/layout/app_layout";
import Auth from "../../../components/apps/app/auth";
import { useState } from "react";

const Auths = (props) => {
  const { app_id } = props;

  const [authList, setAuthList] = useState([]);
  const [createAction, setCreateAction] = useState(false);

  return (
    <App_Layout
      app_id={app_id}
      selected={"4"}
      setAuthList={setAuthList}
      createAction={createAction}
      defaultActionType="AUTH"
      setCreateAction={setCreateAction}
    >
      <Auth authList={authList} setCreateAction={setCreateAction} />
    </App_Layout>
  );
};

export default Auths;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
