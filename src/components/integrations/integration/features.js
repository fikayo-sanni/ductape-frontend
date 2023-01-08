import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, List, Switch } from "antd";
import { useState } from "react";
import { capitalize, fetchInitials } from "../../config/constant";
import CreateIntegrationEnvModal from "../createIntegrationEnvModal";

const Features = (props) => {
  const { features, integration_id, refreshFeatures } = props;

  const [createFeatureDialog, setCreateFeatureDialog] = useState(false);

  const closeCreateDialog = () => {
    setCreateFeatureDialog(false);
  };

  /* {createEnvDialog ? (
    <CreateIntegrationEnvModal closeCreateDialog={closeCreateDialog}  integration_id={integration_id} refreshEnvs={refreshEnvs}/>
    ) : (
      <></>
    )}*/
  // alert(JSON.stringify(envs))
  return (
    <span>
      <div className="row">
        <div className="col-4">
          <Breadcrumb>
            <Breadcrumb.Item>Features</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Button type="primary" shape="circle" onClick={() => {setCreateFeatureDialog(true)}}>
                <PlusOutlined />
              </Button>{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <span>
        <br />

      </span>
    </span>
  );
};

export default Features;
