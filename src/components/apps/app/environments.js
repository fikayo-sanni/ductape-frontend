import { Breadcrumb, List, Card, Avatar, Switch, Button, Dropdown } from "antd";
import { useState } from "react";
import { capitalize, fetchInitials } from "../../config/constant";
import EnvInfo from "./envInfo";
import UpdateAppEnvModal from "../updateAppEnvModal";
import {
  EyeOutlined,
  FilterFilled,
  PlusOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import CreateAppEnvModal from "../createAppEnvModal";

const Environments = (props) => {
  const { envs, app_id, refreshEnvs } = props;
  const [envSelectedData, setEnvSelectedData] = useState({});
  const [envDialog, setEnvDialog] = useState(false);
  const [envSelected, setEnvSelected] = useState({});
  const [selectedPage, setSelectedPage] = useState(-1);
  const [createEnvDialog, setCreateEnvDialog] = useState(false);

  const showEnvDialog = (index, e) => {
    setEnvSelected(index);
    setEnvSelectedData(envs[index]);
    showDialog(true);
  };

  const showDialog = (bool) => {
    setEnvDialog(bool);
  };

  const toggleSelectedPage = () => {
    setSelectedPage(-1);
  };

  const closeCreateDialog = () => {
    setCreateEnvDialog(false);
  };

  /**

                      <div className="col-3 mt-4">
                        <Button
                          className="btn-outline-primary"
                          onClick={(e) => {
                            showEnvDialog(index, e);
                          }}
                        >
                          Setup <SettingOutlined />
                        </Button>
                      </div>
   */

  return (
    <span>
      <div className="padding_20">
        {createEnvDialog ? (
          <CreateAppEnvModal
            closeCreateDialog={closeCreateDialog}
            app_id={app_id}
            refreshEnvs={refreshEnvs}
          />
        ) : (
          <></>
        )}

        {envDialog ? (
          <UpdateAppEnvModal
            env={envSelectedData}
            envSelected={envSelected}
            showDialog={showDialog}
          />
        ) : (
          <></>
        )}
        {selectedPage === -1 ? (
          <span>
            <div className="row">
              <h2 className="mb-0">App Environments</h2>
              <span className="row">
                <span className="col-10">
                  <label className="text-muted mt-2">
                    Manage your app environments
                  </label>
                </span>
                <span className="col-2">
                  <Button className="mt-0 me-2">
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
                        <Switch checked={item.active} onChange={(e) => {}} />
                      </label>
                      <div className="col-3 mt-4">
                        <Button
                          className="btn-outline-primary"
                          onClick={() => {
                            setSelectedPage(index);
                          }}
                        >
                          View <EyeOutlined />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </span>
        ) : (
          <EnvInfo
            env={envs[selectedPage]}
            showEnvDialog={showEnvDialog}
            toggleSelectedPage={toggleSelectedPage}
            selectedPage={selectedPage}
          />
        )}
      </div>
    </span>
  );
};

export default Environments;
