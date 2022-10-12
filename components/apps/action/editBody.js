import { PlusCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useState } from "react";
import EmptyList from "../emptyList";
import EditActionModal from "./editActionModal";
import { jsonToFields } from "../../config/constant";

const Body = (props) => {
  const [dialog, showDialog] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const changeInputFields = (data) => {
    //alert(JSON.stringify(data))
    setInputFields(data);
  };
  const formsRender = (index, type, data) => {
    const valueCheck = data.sampleValue;

    //alert(JSON.stringify(valueCheck))

    return (
      <div>
        <div className="row">
          <div className="col-1  border p-1">
            <Checkbox />
          </div>
          <div className="col-3 border p-1">
            <div>
              <Input
                type="text"
                value={data.key}
                required
                className="border-0 bg-background-alternate"
                placeholder="key"
                onKeyPress={(e) => {
                  handleKeyPress(index, e, type);
                }}
                name="key"
              />
            </div>
          </div>
          {typeof valueCheck !== "object" ? (
            <div className="col-4 border p-1">
              <div className="m-1">
                <Input
                  type="text"
                  value={data.value}
                  required
                  className="border-0 bg-background-alternate text-primary"
                  onKeyPress={(e) => {
                    handleKeyPress(index, e, type);
                  }}
                  placeholder="Value"
                  name="value"
                />
              </div>
            </div>
          ) : (
            <label className="col-3 mt-3 text-primary text-capitalize">
              {data.type}
            </label>
          )}
          {typeof valueCheck !== "object" ? (
            <div className="col-4 border p-1">
              <div>
                <Input
                  type="text"
                  value={data.description}
                  required
                  className="border-0 bg-background-alternate"
                  placeholder="description"
                  onKeyPress={(e) => {
                    handleKeyPress(index, e, type);
                  }}
                  name="key"
                />
              </div>
            </div>
          ) : null}
        </div>
        {typeof valueCheck === "object" ? (
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11 border-start">
              {subQuery(jsonToFields(valueCheck), index, type)}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const subQuery = (data, index, type) => {
    // alert(JSON.stringify(data));
    return data.map((d, i) => {
      //alert(JSON.stringify(d))
      return formsRender(i, type, d);
    });
  };

  const Body = inputFields.map((data, index) => {
    return formsRender(index, "body", data);
  });

  //if(inputFields.length) alert(JSON.stringify(Body))

  return (
    <div className="col-12">
      {dialog ? (
        <EditActionModal
          showDialog={showDialog}
          setInputFields={changeInputFields}
        />
      ) : (
        <></>
      )}
      <div className="row">
        <div className="col-11"></div>
        <div className="col-1">
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              showDialog(true);
            }}
          >
            <PlusCircleOutlined />
          </Button>
        </div>
      </div>
      <div>{Body}</div>
      <div>{!inputFields.length ? <EmptyList /> : <></>}</div>
    </div>
  );
};

export default Body;
