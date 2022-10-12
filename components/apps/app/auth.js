import { Breadcrumb, List, Avatar, Button, Switch } from "antd";
import { fetchInitials } from "../../config/constant";
import { SettingOutlined, PlusOutlined } from "@ant-design/icons";
import Lists from "./crud/lists";

const Auth = (props) => {
    const {authList, showCreateActionDialog} = props;
    return <span>
    <div>
      <div className="row">
        <div className="col-4">
          <Breadcrumb>
            <Breadcrumb.Item>Auth</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <span className="col-6"></span>
        <span className="col-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              showCreateActionDialog("AUTH");
            }}
          >
            ADD AUTH <PlusOutlined />
          </button>
        </span>
      </div>
      <Lists list={authList}/>
    </div>
  </span>
}

export default Auth