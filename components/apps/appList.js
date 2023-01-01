import { List, Avatar, Card } from "antd";
import Link from "next/link";
import { EditOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { fetchInitials, capitalize } from "../config/constant";

const AppList = (props) => {
  const { apps } = props;
  return (
    <div>
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
        dataSource={apps}
        renderItem={(item, index) => {
          return (
            <List.Item className="p-2">
              <Link href={`/apps/${item._id}/environments`}>
                <Card className="hover-blue">
                  <span>
                    <Avatar
                      className="bg-gray text-primary me-2 border_radius font-weight-500"
                      shape="square"
                    >
                      {fetchInitials(capitalize(item.app_name))}
                    </Avatar>{" "}
                    {capitalize(item.app_name)}
                  </span>
                  {item.description}
                  <div className="row">
                    <label className="mt-2 text-muted col-9">
                      <label className="btn btn-light text-muted">
                        {item.envs.length} envs
                      </label>
                      {item.status ? (
                        <label
                          className={`btn mx-2 bold btn-light text-primary`}
                        >
                          {capitalize(item.status)} 
                          {item.status==="public"?<EyeOutlined />: item.status==="private"? <EyeInvisibleOutlined/>: <EditOutlined/>}
                        </label>
                      ) : (
                        <></>
                      )}
                    </label>
                  </div>
                </Card>
              </Link>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default AppList;
