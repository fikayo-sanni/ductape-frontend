import { List, Avatar, Card } from "antd";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { fetchInitials, capitalize } from "../config/constant";

const IntegrationList = (props) => {
  const { integrations } = props;
  return (
    <div>
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
        dataSource={integrations}
        renderItem={(item, index) => {
          //alert(item)
          return (
            <List.Item className="p-2">
              <Link href={`/integrations/${item._id}/features`}>
                <Card
                  title={
                    <span>
                      <Avatar
                        className="bg-gray text-primary me-2 border_radius font-weight-500"
                        shape="square"
                      >
                        {fetchInitials(capitalize(item.name))}
                      </Avatar>{" "}
                      {capitalize(item.name)}
                    </span>
                  }
                  className="hover-blue"
                >
                  <div className="row">
                    <label className="mt-2 text-muted col-9">
                      <label className="btn btn-light text-muted">
                        {item.envs.length} envs
                      </label>
                      {item.status ? (
                        <label className={`btn mx-2 bold btn-light text-primary`}>
                           {capitalize(item.status)} <EyeOutlined/>
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

export default IntegrationList;
