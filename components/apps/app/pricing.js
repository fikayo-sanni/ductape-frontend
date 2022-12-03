import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Lists from "./webhooksList";

const Pricing = (props) => {
  const {
    envs,
    setCreatePrices
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
              <Breadcrumb.Item>Pricing</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="padding_10">
        <h2 className="pt-3">
          Pricing{" "}
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              setCreatePrices(true);
            }}
          >
            <PlusOutlined />
          </Button>
        </h2>

        
      </div>
    </span>
  );
};

export default Pricing;
