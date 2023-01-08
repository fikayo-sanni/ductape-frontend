import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Lists from "./setupLists";

const Onboarding = (props) => {
  const {
    setupList,
    setCreateSetup,
    setSelectedPage,
    setActionSelected,
    envs,
    setupEnvsList,
  } = props;
  /** const changeActionSelected = () => {
    toast.error(boom)
  }*/

  // 95938356
  return (
    <span>
      <div>
        <div className="row">
          <div className="col-4">
            <Breadcrumb>
              <Breadcrumb.Item>Setup</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="padding_10">
        <h2 className="pt-3">
          Setup Policy{" "}
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              setCreateSetup(true);
            }}
          >
            <PlusOutlined />
          </Button>
        </h2>
        <Lists
          list={setupList}
          setSelectedPage={setSelectedPage}
          setActionSelected={setActionSelected}
          envsList={setupEnvsList}
          envs={envs}
        />
      </div>
    </span>
  );
};

export default Onboarding;
