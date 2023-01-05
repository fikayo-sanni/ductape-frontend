import {
  FilterFilled,
  PlusCircleOutlined,
  PlusOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, List, Switch, Dropdown } from "antd";
import { useState } from "react";
import { capitalize, fetchInitials } from "../../config/constant";
import CreateIntegrationEnvModal from "../createIntegrationEnvModal";

const Environments = (props) => {
  const { envs, integration_id, refreshEnvs } = props;

  const [createEnvDialog, setCreateEnvDialog] = useState(false);

  const closeCreateDialog = () => {
    setCreateEnvDialog(false);
  };

  // alert(JSON.stringify(envs))
  return (
    <span>
      <div className="row">
        <h2 className="mb-0">Environments</h2>
        <span className="row">
          <span className="col-10">
            <label className="text-muted mt-2">
              Setup your integration environments
            </label>
          </span>
          <span className="col-2">
            <Button
              className="mt-0 me-2"
              onClick={() => {
                showModal(true);
              }}
            >
              Filter <FilterFilled style={{ color: "#00875A" }} />
            </Button>
            <Button
              onClick={() => {
                setCreateEnvDialog(true);
              }}
            >
              Envs <SettingFilled style={{ color: "#dc3545" }} />
            </Button>
          </span>
        </span>
      </div>

      {createEnvDialog ? (
        <CreateIntegrationEnvModal
          closeCreateDialog={closeCreateDialog}
          integration_id={integration_id}
          refreshEnvs={refreshEnvs}
        />
      ) : (
        <></>
      )}

      <span>
        <br />
        <List
          grid={{
            gutter: 20,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
          dataSource={envs}
          renderItem={(item, index) => (
            <List.Item className="p-2">
              <Card className="hover-blue">
                <span>
                  <Avatar
                    className="bg-gray text-primary me-2 border_radius font-weight-500"
                    shape="square"
                  >
                    {fetchInitials(capitalize(item.env_name))}
                  </Avatar>{" "}
                  {capitalize(item.env_name)}
                </span>
                <br />
                <br />
                <label className="text-muted">{item.description}</label>
                <br />
                <div className="row">
                  <label className="mt-4 text-muted col-9">
                    <Switch checked={item.active} />
                  </label>
                  <div className="col-3 mt-4">
                    <Button className="btn-outline-primary">View</Button>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </span>
    </span>
  );
};

export default Environments;
