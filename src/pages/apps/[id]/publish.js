import App_Layout from "../../../components/layout/app_layout";
import PublishComponent from "../../../components/apps/app/publish";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDomains } from "../../../components/services/apps.service";
import toast from "react-hot-toast";
import { changeDomains } from "../../../data/applicationSlice";
import NProgress from "nprogress";

const Publish = (props) => {
  const { app_id} = props;

  const config = useSelector((state) => state.app);

  const [domains, setDomains] = useState([]);
  const [app_domains, setAppDomains] = useState([]);

  useEffect(async () => {
    try {
      const { domains } = config;
      //if (!domains.length) {
        NProgress.start();
        const { auth_token: token, _id: user_id, public_key } = config.user;
        const d = await fetchDomains({
          token,
          user_id,
          public_key,
        });

        setDomains(d.data.data)
        //useDispatch(changeDomains(d.data.data));
        NProgress.done()

      //}
    } catch (e) {
      NProgress.done();
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  }, []);
  return (
    <App_Layout app_id={app_id} selected="8" setAppDomains={setAppDomains}>
      <PublishComponent domains={domains} presetDomains={app_domains} app_id={app_id} />
    </App_Layout>
  );
};

export default Publish;

export const getServerSideProps = async ({ params }) => {
  const app_id = params.id;

  return {
    props: { app_id },
  };
};
