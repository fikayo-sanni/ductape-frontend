import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Lists from "./webhooksList";

const Webhooks = (props) => {
  const {
    envs,
    webhooksList,
    webhookEnvsList,
    setCreateWebhooks,
    setSelectedPage,
    setActionSelected,
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
              <Breadcrumb.Item>Webhooks</Breadcrumb.Item>
              <Breadcrumb.Item> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="padding_10">
        <h2 className="pt-3">
          Webhook Events{" "}
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              setCreateWebhooks(true);
            }}
          >
            <PlusOutlined />
          </Button>
        </h2>

        <Lists
          list={webhooksList}
          setSelectedPage={setSelectedPage}
          setActionSelected={setActionSelected}
          envs={envs}
          envsList={webhookEnvsList}
        />
      </div>
    </span>
  );
};

export default Webhooks;
