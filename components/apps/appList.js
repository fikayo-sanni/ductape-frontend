import { List, Avatar, Card } from "antd";
import Link from "next/link";
import {
    fetchInitials,
    capitalize,
  } from "../config/constant";

const AppList = (props) => {
    const { apps } = props
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
            dataSource={apps}
            renderItem={(item, index) => (
              <List.Item className="p-2">
                <Link href={`/apps/${item._id}`}>
                  <Card
                    title={
                      <span>
                        <Avatar
                          className="bg-gray text-primary me-2 border_radius font-weight-500"
                          shape="square"
                        >
                          {fetchInitials(capitalize(item.app_name))}
                        </Avatar>{" "}
                        {capitalize(item.app_name)}
                      </span>
                    }
                    className="hover-blue"
                  >
                    <div className="row">
                      <label className="mt-2 text-muted col-9">
                        <label className="btn btn-light text-muted">
                          {item.envs.length} envs
                        </label>
                      </label>
                    </div>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        </div>
      );
}

export default AppList