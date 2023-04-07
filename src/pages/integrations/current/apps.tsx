import Integration_Layout from "../../../components/layout/integration_layout";
import AppsList from "../../../components/integrations/integration/apps";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import { Loading } from "../../../components/config/constant";
import { RootState } from '../../../redux/store';
import { fetchIntegrationApps } from "../../../components/services/integrations.service";
import toast from "react-hot-toast";

const Apps = (props) => {
  const config = useSelector((state: RootState) => state.app);
  const { integration_id } = props;

  const [apps, setApps] = useState([]);
  const [user, setUser] = useState(config.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;
      const apps = await fetchIntegrationApps({
        token,
        user_id,
        public_key,
        integration_id,
      });

      setApps(apps.data.data); 
      setLoading(false);
      //alert(JSON.stringify(apps.data.data));
    } catch (err) {
      //alert(e);
      setLoading(false);
      const error = err.response ? err.response.data.errors : err.toString();
      toast.error(error);
    }
  };
  fetchApps();
}, [apps]);

  const refreshApps = (data) => {
    setApps(data);
  };

  /*{loading ? (
    <Loading />
  ) : (
    <AppsList
      apps={apps}
      refreshApps={refreshApps}
      integration_id={integration_id}
    />
  )}*/

  return (
    <Integration_Layout integration_id={integration_id} selected={"2"}>
      <AppsList
        apps={apps}
        refreshApps={refreshApps}
        integration_id={integration_id}
      />
    </Integration_Layout>
  );
};

export default Apps;

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { integration_id: id },
  };
};
