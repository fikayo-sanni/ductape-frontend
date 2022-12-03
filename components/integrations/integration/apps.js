import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, List, Switch } from "antd";
import { useEffect, useState } from "react";
import { capitalize, fetchInitials } from "../../config/constant";
import CreateIntegrationAppModal from "../createIntegrationAppModal";

const Apps = (props) => {
  const { apps, integration_id, refreshApps } = props;

  const [createAppsDialog, setCreateAppsDialog] = useState(false);

  const closeCreateDialog = () => {
    setCreateAppsDialog(false);
  };

  return (
    <span>
      <div className="row">
        <div className="col-4">
          <Breadcrumb>
            <Breadcrumb.Item>Apps</Breadcrumb.Item>
            <Breadcrumb.Item><CreateIntegrationAppModal closeCreateDialog={closeCreateDialog} integration_id={integration_id} refreshApps={refreshApps}/>
              {" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

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
          dataSource={apps}
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
                      {fetchInitials (capitalize(item.app_data[0].app_name))}
                    </Avatar>{" "}
                    {capitalize(item.app_data[0].app_name)}
                  </span>
                }
              >
                <label>{item.description}</label>
                <br />
                <div className="row">
                  <label className="mt-4 text-muted col-7">
                    <Switch checked={item.status} />
                  </label>
                  <div className="col-5 mt-4">
                    <Button className="btn-outline-primary" href="">Setup Envs</Button>
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

export default Apps;
