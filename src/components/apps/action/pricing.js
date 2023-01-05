import { List, Avatar, Card } from "antd";
import Link from "next/link";
import {
    fetchInitials,
    capitalize,
  } from "../../config/constant";

const Pricing = (props) => {
    const { data } = props
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
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item className="p-2">
                <Link href={`/apps/${item._id}`}>
                  <Card
                    title={
                      <span>
                        {item.title}
                      </span>
                    }
                    className="hover-blue"
                  >
                    <div className="row">
                      <label className="mt-2 text-muted col-9">
                        <label className="btn btn-light text-muted">
                          0 envs
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

export default Pricing