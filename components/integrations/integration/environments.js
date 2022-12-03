import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, List, Switch } from "antd";
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
        <div className="col-4">
          <Breadcrumb>
            <Breadcrumb.Item>Environments</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Button type="primary" shape="circle" onClick={() => {setCreateEnvDialog(true)}}>
                <PlusOutlined />
              </Button>{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      {createEnvDialog ? (
        <CreateIntegrationEnvModal closeCreateDialog={closeCreateDialog}  integration_id={integration_id} refreshEnvs={refreshEnvs}/>
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
            xl: 6,
            xxl: 3,
          }}
          dataSource={envs}
          renderItem={(item, index) => (
            <List.Item className="p-2">
              <Card
                className="hover-blue"
                title={
                  <span>
                    <Avatar
                      className="bg-gray text-primary me-2 border_radius font-weight-500"
                      shape="square"
                    >
                      {fetchInitials(capitalize(item.env_name))}
                    </Avatar>{" "}
                    {capitalize(item.env_name)}
                  </span>
                }
              >
                <label>{item.description}</label>
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
