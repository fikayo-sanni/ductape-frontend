import { PlusOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import AppList from "../appList";
import EmptyList from "../emptyList";
import Pricing from "./pricing";

const EditPricing = (props) => {
  const { Panel } = Collapse;

  const onChange = (key) => {
    console.log(key);
  };
  const data = [
    {
      _id: 0,
      title: "Standard Pricing",
    },
    {
      _id: 1,
      title: "Express Bouquet",
    },
    {
      _id: 2,
      title: "Cheap Rate",
    },
  ];

  return (
    <div>
      <div className="row pb-2">
        <div className="col-11"></div>
        <div className="col-1">
          <Button shape="circle">
            <PlusOutlined />
          </Button>
        </div>
      </div>
      <Pricing data={data} />
    </div>
  );
};

export default EditPricing;
