import { Avatar, Card, Switch, Tag, Button } from "antd";
import { LeftOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { fetchInitials, capitalize } from "../../config/constant"

const { Meta } = Card;
const EnvInfo = (props) => {
  const { env, showEnvDialog, toggleSelectedPage, selectedPage } = props;

  // alert(JSON.stringify(env))
  return (
    <span className="padding_10">
      <br />
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <Card
            bordered={false}
            style={{
              width: "100%",
            }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              title={
                <span>
                  <span className="me-2"><Button shape="circle" icon={<LeftOutlined/>} size="large" onClick={toggleSelectedPage}/></span>
                  <Avatar
                    className="bg-gray text-primary me-2 border_radius font-weight-500"
                    shape="square"
                  >
                    {fetchInitials(capitalize(env.env_name))}
                  </Avatar>{" "}
                  {capitalize(env.env_name)}
                </span>
              }
              description={env.description}
            />
            <br />

            <table className="table border">
              <tbody>
                <tr>
                  <td>Base URL:</td>
                  <td>
                    <a href={env.base_url} target="blank">
                      {env.base_url || "undefined"}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Default Content-Type:</td>
                  <td>
                    <label className="text-primary">
                      {env.request_type || "undefined"}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>Pricing Strategy:</td>
                  <td>
                    <Tag color="geekblue">
                      {String(env.payment_type).toUpperCase()}
                    </Tag>
                  </td>
                </tr>
                <tr>
                  <td>Base Price:</td>
                  <td>${env.cost || "undefined"}</td>
                </tr>
                <tr>
                  <td>Inbound Requests:</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Inbound Responses:</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Average Latency:</td>
                  <td>
                    <label className="text-muted">0ms</label>
                  </td>
                </tr>
                <tr>
                  <td>Success Rate:</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>
                    <Switch
                      checked={env.active}
                      onChange={(e) => {
                        showEnvDialog(selectedPage, e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Require Whitelist:</td>
                  <td>
                    <Switch
                      checked={env.active}
                      onChange={(e) => {
                        showEnvDialog(selectedPage, e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Default Test Environment:</td>
                  <td>
                    <Switch
                      checked={env.default_sandbox}
                      onChange={(e) => {
                        showEnvDialog(selectedPage, e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Default Live Environment:</td>
                  <td>
                    {" "}
                    <Switch
                      checked={env.default_prod}
                      onChange={(e) => {
                        showEnvDialog(selectedPage, e);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
        <div className="col-1"></div>
      </div>
    </span>
  );
};

export default EnvInfo;
