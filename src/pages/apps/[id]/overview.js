import App_Layout from "../../../components/layout/app_layout";
import Overview from "../../../components/apps/app/overview";
import toast from "react-hot-toast";
import { useState } from "react";

const Index = () => {
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

        </App_Layout>
    );
};

export default Index;

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
