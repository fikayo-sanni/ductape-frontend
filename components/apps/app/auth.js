import { Breadcrumb, List, Avatar, Button, Switch } from "antd";
import { fetchInitials } from "../../config/constant";
import { SettingOutlined, PlusOutlined } from "@ant-design/icons";
import Lists from "./crud/lists";

const Auth = (props) => {
  const { authList, setCreateAction } = props;
  return (
    <span>
      <div>
        <div className="row">
          <div className="col-4">
            <Breadcrumb>
              <Breadcrumb.Item>Auth</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => {
                    setCreateAction(true);
                  }}
                >
                  <PlusOutlined />
                </Button>{" "}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Lists list={authList} />
      </div>
    </span>
  );
};

export default Auth;
