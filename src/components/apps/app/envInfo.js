import { Avatar, Card, Switch, Tag, Button } from "antd";
import {
  LeftOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  FilterFilled,
  SettingFilled,
} from "@ant-design/icons";
import { fetchInitials, capitalize } from "../../config/constant";

const { Meta } = Card;
const EnvInfo = (props) => {
  const { env, showEnvDialog, toggleSelectedPage, selectedPage } = props;

  // alert(JSON.stringify(env))
  return (
    <span>
      <div className="row">
        <h2 className="mb-0 mt-2">
          <span onClick={toggleSelectedPage}>
            <LeftOutlined />
          </span>{" "}
          {` ${capitalize(env.env_name)}`}
        </h2>
        <span className="row">
          <span className="col-11">
            <label className="text-muted mt-2 ms-4">{env.description}</label>
          </span>
          <span className="col-1">
            <Button
              onClick={() => {
                setCreateEnvDialog(true);
              }}
            >
              Edit <EditOutlined style={{ color: "#0746A6" }} />
            </Button>
          </span>
        </span>
      </div>
      <br />
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <Card
            bordered={false}
            style={{
              width: "100%",
            }}
            className="padding_10"
          >
            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Base URL</h6>
                  <label className="text-muted">
                    Base URL for all endpoints in this environment
                  </label>
                </div>
                <div className="col-3 text-primary">
                  <span className="float-end">
                    {env.base_url || "undefined"}{" "}
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Content Type</h6>
                  <label className="text-muted">Default Content Type</label>
                </div>
                <div className="col-3">
                  <span className="float-end">
                    {env.request_type || "undefined"}{" "}
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Pricing Bundle</h6>
                  <label className="text-muted">
                    Strategy for pricing this environment
                  </label>
                </div>
                <div className="col-3 text-primary">
                  <span className="float-end">
                    <Tag color="geekblue">
                      {String(env.payment_type).toUpperCase()}
                    </Tag>
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Base Price</h6>
                  <label className="text-muted">Default cost per unit</label>
                </div>
                <div className="col-3 text-primary">
                  <span className="float-end">
                    $0.01
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Default Live Environment</h6>
                  <label className="text-muted">
                    Is this your production environment?
                  </label>
                </div>
                <div className="col-3 text-muted">
                  <span className="float-end">
                    <Switch checked={env.default_prod} onChange={(e) => {}} />
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Default Sandbox Environment</h6>
                  <label className="text-muted">
                    Is this your primary sandbox environment?
                  </label>
                </div>
                <div className="col-3 text-muted">
                  <span className="float-end">
                    <Switch
                      checked={env.default_sandbox}
                      onChange={(e) => {}}
                    />
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Active</h6>
                  <label className="text-muted">
                    Activate to receive requests
                  </label>
                </div>
                <div className="col-3 text-muted">
                  <span className="float-end">
                    <Switch checked={env.active} onChange={(e) => {}} />
                  </span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Inbound Requests</h6>
                  <label className="text-muted">Requests Received</label>
                </div>
                <div className="col-3">
                  <span className="float-end">0</span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Outbound Requests</h6>
                  <label className="text-muted">Requests Sent</label>
                </div>
                <div className="col-3">
                  <span className="float-end">0</span>
                </div>
              </span>
            </div>

            <div className="padding_5 mb-2 border-bottom pb-2">
              <span className="row">
                <div className="col-9">
                  <h6>Average Latency</h6>
                  <label className="text-muted">
                    Average Time Per Requests
                  </label>
                </div>
                <div className="col-3 text-muted">
                  <span className="float-end">0 ms</span>
                </div>
              </span>
            </div>

          </Card>
        </div>
        <div className="col-1"></div>
      </div>
    </span>
  );
};

export default EnvInfo;
