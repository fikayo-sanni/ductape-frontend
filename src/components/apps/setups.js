import { Breadcrumb, Switch, Tag } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loading } from "../config/constant";
import { useSelector } from "react-redux";
import { fetchSetup } from "../services/apps.service";

const Setups = (props) => {
  const { setup_id, envs, setSelected } = props;

  const config = useSelector((state) => state.app);

  const [user, setUser] = useState(config.user);
  const [error, setError] = useState("");
  const [setup, setSetup] = useState({setup_envs:[]});


  const envsMatch = (env_id) => {
    return setup.setup_envs.filter((data)=> data.env_id === env_id)
  }

  const fetchSetupInfo = async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;

      const data = await fetchSetup({ setup_id, token, user_id, public_key });

      return data;
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      setError(error);
      toast.error(error || e.toString());
    }
  };

  useEffect(async () => {
    try {
      const data = await fetchSetupInfo();

      setSetup(data.data.data);
    } catch (e) {
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  }, []);


  const EnvRows = envs.map((data, index) => {
    const pair = envsMatch(data._id)
    if (data.active && pair) {
      return (
        <tr>
          <td>{data.env_name}</td>
          <td>
            <a>{`${pair.base_url?pair.base_url:data.base_url}${setup.resource}`}</a>
          </td>
          <td><Tag color="red">{setup.method}</Tag></td>
          <td>
            <Switch />
          </td>
        </tr>
      );
    }
  });
  /**
   
              <div className="padding_20 border">{JSON.stringify(setup)}</div>
              <div className="padding_20 border">{JSON.stringify(envs)}</div>
   */

  return (
    <div>
      <div className="padding_20">{JSON.stringify(envs)}</div>
      <div className="padding_20">{JSON.stringify(setup)}</div>
      <Breadcrumb>
        <Breadcrumb.Item> </Breadcrumb.Item>
        <Breadcrumb.Item className="text-muted">{"Setup"}</Breadcrumb.Item>
        <Breadcrumb.Item className="text-muted">
          {setup.name || "Setup"}
        </Breadcrumb.Item>
      </Breadcrumb>
      <section className="padding_10 row border-start">
        <div className="row">
          {Object.keys(setup).length === 0 && !error ? <Loading /> : <></>}
          {Object.keys(setup).length > 0 ? (
            <span>
              <br />
              <h3>{setup.name} </h3>
              <br />
              <table className="table border-0">
                <thead>
                  <tr>
                    <th>Env</th>
                    <th>URL</th>
                    <th>Method</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>{EnvRows}</tbody>
              </table>
            </span>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
};

export default Setups;
