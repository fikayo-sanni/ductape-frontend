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
import { fetchInitials } from "../../../config/constant";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import EmptyList from "../../emptyList";
import Link from "next/link";

const Lists = (props) => {
  const { list, setActionSelected } = props;
  // alert(list);

  const Row = list.map((item, index) => {
    return (
      <tr>
        <td>
          <Switch />
        </td>
        <td>
          <label className="text-muted"><h5>{item.name}</h5>{item.description}</label>
        </td>
        <td>
          <Tag color="blue">{item.tag}</Tag>
        </td>
        <td>
          <Tag color="red">{item.httpVerb}</Tag>
        </td>
        <td className="mx-auto">
          <a>{item.resource}</a>
        </td>
        <td>
          <Button
            shape="circle"
          >
            <Link href={`/apps/${item.app_id}/actions/${item._id}`}><SettingOutlined /></Link>
          </Button>
        </td>
      </tr>
    );
  });
  /**
   * <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Resource</th>

            <th></th>
            <th></th>
          </tr>
        </thead>
   */

  return (
    <section
      className="padding_20"
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {list.length? <table className="table">
        <tbody>{Row}</tbody>
      </table>: <EmptyList/>}
    </section>
  );
};

export default Lists;
