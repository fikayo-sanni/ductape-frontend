import {
  List,
  Card,
  Avatar,
  Button,
  Switch,
  Tag,
  Divider,
  Checkbox,
} from "antd";
import { fetchInitials } from "../../config/constant";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import EmptyList from "../emptyList";
import Link from "next/link";

const Lists = (props) => {
  const { list, setActionSelected, envs, envsList } = props;
  // alert(list);

  const envsTags = (id) => {
    return envsList.map((data, index) => {
      if (data.webhook_id === id) {
        return fetchEnvTag(data.env_id);
      }
    });
  };

  const fetchEnvTag = (env_id) => {
    return envs.map((data) => {
      if (data._id === env_id) return <Tag color="green">{data.env_name}</Tag>;
    });
  };

  const Row = list.map((item, index) => {
    return (
      <tr>
        <td>
          <Switch />
        </td>
        <td>
          <label className="text-muted">
            <h5>{item.name}</h5>
            {item.description}
          </label>
        </td>
        <td>
          {" "}
          <label className="btn btn-light text-muted">{item.setup_type}</label>
        </td>
        <td>
          <Tag color="blue">{item.tag}</Tag>
        </td>
        <td>{envsTags(item._id)}</td>
        <td>
          <Button shape="circle">
            <Link href={`/apps/${item.app_id}/webhooks/${item._id}`}>
              <SettingOutlined />
            </Link>
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <section
      className="padding_20"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {list.length ? (
        <table className="table">
          <tbody>{Row}</tbody>
        </table>
      ) : (
        <EmptyList />
      )}
    </section>
  );
};

export default Lists;
