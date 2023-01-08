import { List, Card, Avatar, Button, Switch } from "antd";

const CreateActions = async (props) => {
  return (
    <section className="" style={{ height: "83vh", overflowY: "auto" }}>
      <div>
        <div className="row padding_20">
          <div className="col-1"></div>
          <div className="col-10">
            <List
              dataSource={createList}
              renderItem={(item, index) => (
                <List.Item className="pb-4 pt-4">
                  <Card
                    className="hover-blue w-100"
                    title={
                      <span className="row">
                        <span className="col-10">
                          <Avatar
                            className="bg-skyblue text-primary me-2 border_radius font-weight-500"
                            shape="square"
                          >
                            {fetchInitials(item.tag)}
                          </Avatar>{" "}
                          <label>{item.tag}</label>
                        </span>
                        <span className="col-2">
                          <Button
                            className="btn-outline-primary"
                            onClick={() => {
                              //alert("Boom!!")
                              setActionSelected(item._id);
                            }}
                          >
                            Configure <SettingOutlined />
                          </Button>
                        </span>
                      </span>
                    }
                  >
                    <div className="row">
                      <span className="col-11">
                        <label>{item.description}</label>
                      </span>
                      <span className="text-muted col-1">
                        <Switch checked={false} />
                      </span>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </section>
  );
};

export default CreateActions;
