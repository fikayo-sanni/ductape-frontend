import { Breadcrumb, List, Card, Avatar, Switch, Button } from "antd";
import { useState } from "react";
import { capitalize, fetchInitials } from "../../config/constant";
import EnvInfo from "./envInfo";
import UpdateAppEnvModal from "../updateAppEnvModal";

const Environments = (props) => {
  const { envs } = props;
  const [envSelectedData, setEnvSelectedData] = useState({});
  const [envDialog, setEnvDialog] = useState(false);
  const [envSelected, setEnvSelected] = useState({});
  const [selectedPage, setSelectedPage] = useState(-1);

  const showEnvDialog = (index, e) => {
    setEnvSelected(index);
    setEnvSelectedData(envs[index]);
    showDialog(true)
  }

  const showDialog = (bool) => {
    setEnvDialog(bool);
  }

  const toggleSelectedPage = () => {
    setSelectedPage(-1)
  }

  return (
    <span>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>Environments</Breadcrumb.Item>
          <Breadcrumb.Item> </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {envDialog?<UpdateAppEnvModal env={envSelectedData} envSelected={envSelected} showDialog={showDialog}/>:<></>}
      {selectedPage === -1? <span><br/><List
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
                  <Switch
                    checked={item.active}
                    onChange={(e) => {
                      showEnvDialog(index, e);
                    }}
                  />
                </label>
                <div className="col-3 mt-4">
                  <Button
                    className="btn-outline-primary"
                    onClick={() => {
                      setSelectedPage(index);
                    }}
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      /></span>: <EnvInfo env={envs[selectedPage]} showEnvDialog={showEnvDialog} toggleSelectedPage={toggleSelectedPage} selectedPage={selectedPage} />}
    </span>
  );
};

export default Environments;
