import App_Layout from "../../../components/layout/app_layout";
import Overview from "../../../components/apps/app/overview";
import toast from "react-hot-toast";
import { useState } from "react";

const Index = (props) => {
  const { app_id } = props;

  //alert(JSON.stringify(props));

  const [text, setText] = useState("");
  const [html, setHTML] = useState("");

  return (
    <App_Layout
      app_id={app_id}
      selected="1"
      setHTML={setHTML}
      setText={setText}
    >
      <Overview app_id={app_id} defaultText={text} defaultHTML={html}/>
    </App_Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
