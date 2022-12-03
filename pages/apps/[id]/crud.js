import App_Layout from "../../../components/layout/app_layout";
import { useState } from "react";
import CRUD from "../../../components/apps/app/crud";

const Auths = (props) => {
  const { app_id } = props;

  const [createList, setCreateList] = useState([]);
  const [readList, setReadList] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const [createAction, setCreateAction] = useState(false);

  return (
    <App_Layout
      app_id={app_id}
      selected={"5"}
      setCreateList={setCreateList}
      setReadList={setReadList}
      setUpdateList={setUpdateList}
      setDeleteList={setDeleteList}
      createAction={createAction}
      defaultActionType=""
      setCreateAction={setCreateAction}
    >
      <CRUD
        deleteList={deleteList}
        readList={readList}
        updateList={updateList}
        createList={createList}
        setCreateAction={setCreateAction}
      />
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
