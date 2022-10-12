import { List, Card, Avatar, Button, Switch, Tag, Divider } from "antd";
import { fetchInitials } from "../../../config/constant";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const Lists = (props) => {
  const { list, setActionSelected } = props;
  // alert(list);

  const Row = list.map((item, index) => {
    return (
      <div className="hover-blue w-100 m-3">
        <span className="row">
          <span className="col-10">
            <span className="me-4">
              <AppstoreOutlined style={{ fontSize: "150%" }} color="primary" />
            </span>
            <label className="text-big">{item.name}</label>
            <span className="mx-2">
              <Tag color="blue">{item.tag}</Tag>

              <Tag color="red">{item.httpVerb}</Tag>
            </span>
          </span>
          <span className="col-1 row">
            <span className="col-6"></span>
            <span className="col-6 mt-2">
              <Button
                onClick={() => {
                  // toast.error(item._id)
                  setActionSelected(item._id);
                }}
              >
                Configure <SettingOutlined />
              </Button>
            </span>
          </span>
        </span>
        <Divider />
      </div>
    );
  });

  return (
    <section className="" style={{ height: "100vh", overflowY: "auto" }}>
      <div>
        <div className="row padding_20">
          <div>{Row}</div>
        </div>
      </div>
    </section>
  );
};

export default Lists;
