import { Breadcrumb, Tabs, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Lists from "./lists";

const { TabPane } = Tabs;

const CRUD = (props) => {
  const { readList, createList, deleteList, updateList, showCreateActionDialog, setActionSelected } = props;

  //alert(JSON.stringify(props));
  return (
    <span>
      <div className="row">
        <div className="col-4">
          <Breadcrumb>
            <Breadcrumb.Item>CRUD Actions</Breadcrumb.Item>
            <Breadcrumb.Item> </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="padding_10">
        <Tabs
          defaultActiveKey="1"
          className="page_tabs"
          //onChange={callback}
          tabBarExtraContent={
            <div>
              <button className="btn btn-primary text-uppercase" onClick={()=>showCreateActionDialog("")}>
                ADD CRUD ACTION <PlusOutlined />
              </button>
            </div>
          }
        >
          <TabPane
            tab={
              <span className="align-items-center d-flex">
                Create Actions{" "}
                <Badge
                  count={createList.length}
                  style={{ backgroundColor: "#E9ECF1" }}
                />
              </span>
            }
            key="4"
          >
            <Lists list={createList} setActionSelected={setActionSelected} />
          </TabPane>
          <TabPane
            tab={
              <span className="align-items-center d-flex">
                Read Actions{" "}
                <Badge
                  count={readList.length}
                  style={{ backgroundColor: "#E9ECF1" }}
                />
              </span>
            }
            key="5"
          >
            <Lists list={readList} setActionSelected={setActionSelected}/>
          </TabPane>
          <TabPane
            tab={
              <span className="align-items-center d-flex">
                Update Actions{" "}
                <Badge
                  count={updateList.length}
                  style={{ backgroundColor: "#E9ECF1" }}
                />
              </span>
            }
            key="6"
          >
            <Lists list={updateList} setActionSelected={setActionSelected} />
          </TabPane>
          <TabPane
            tab={
              <span className="align-items-center d-flex">
                Delete Actions{" "}
                <Badge
                  count={deleteList.length}
                  style={{ backgroundColor: "#E9ECF1" }}
                />
              </span>
            }
            key="7"
          >
            <Lists list={deleteList} setActionSelected={setActionSelected} />
          </TabPane>
        </Tabs>
      </div>
    </span>
  );
};

export default CRUD;
