import {
  PlusCircleOutlined,
  SaveOutlined,
  SettingOutlined,
  EditOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import EmptyList from "../emptyList";
import EditActionModal from "./editActionModal";
import SetValueProps from "./setValuePropsModal";
import { jsonToFields } from "../../config/constant";
import {
  fetchActionData,
  updateActionData,
} from "../../services/actions.service";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import NProgress from "nprogress";

const Body = (props) => {
  const { confirm } = Modal;
  const { type, envs, action_id, entity_id } = props;
  const [dialog, showDialog] = useState(false);
  const [headerCount, setHeaderCounter] = useState(0);
  const [selectedIndex, selectIndex] = useState();
  const [loadingButton, setLoadingButton] = useState(false);
  const config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);
  const [code, setCode] = useState("");
  const [presaved, setPreSaved] = useState([])
  const [defaultFields, setDefaultFields] = useState({
    key: "",
    value: "",
    sampleValue: "",
    origin: "",
    description: "",
    required: false,
    maxLength: 0,
    minLength: 0,
    decorator: "",
    decoratorPosition: "",
    type: "",
    defaultValue: "",
    defaultType: "",
  });
  const [valuePropsDialog, showValuePropsDialog] = useState(false);
  const [inputFields, setInputFields] = useState([{ ...defaultFields }]);
  const [edit, setEdit] = useState(false);
  const changeInputFields = (data) => {
    //alert(JSON.stringify(data))
    setInputFields(data);
  };

  const closeValueProps = () => {
    showValuePropsDialog(false);
  };

  const handleChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;

    if (!data[index]["defaultType"]) data[index]["defaultType"] = "input";
    // alert(JSON.stringify(data));
    setInputFields(data);
  };

  const handleModalChange = (index, values) => {
    let data = [...inputFields];
    data[index] = { ...data[index], ...values };
    //alert(JSON.stringify(data));
    setInputFields(data);
    showValuePropsDialog(false);
  };

  const showConfirm = () => {
    confirm({
      title: "Are you sure you want save updates",
      icon: <ExclamationCircleOutlined />,
      content: "Click OK to proceed",
      onOk() {
        submitBody();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const dataArr = [];

  const oneArr = [1];

  const Header = oneArr.map(() => {
    //const count = headerCount;
    //setHeaderCounter(count+1);
    return (
      <div className="row">
        <div className="width4 border p-2 pt-3 px-2 noBorderEnd">
          <Checkbox disabled={!edit} />
        </div>
        <div className="width30 border p-2 pt-3 px-2 pb-0 bold noBorderEnd font14">
          Key
        </div>
        <div className="width30 border p-2 pt-3 px-2 pb-0 bold noBorderEnd font14">
          Value
        </div>
        <div className="width30 border p-2 pt-3 px-2 pb-0 bold noBorderEnd font14">
          Description
        </div>
        <div className="width6 border p-1  pt-2 px-2">
          {headerCount < 2 ? (
            <center>
              {!edit ? (
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => {
                    setEdit(true);
                    showDialog(true);
                  }}
                >
                  <EditOutlined />
                </Button>
              ) : !loadingButton ? (
                <Button
                  shape="circle"
                  type="primary"
                  onClick={() => showConfirm()}
                >
                  <SaveOutlined />
                </Button>
              ) : (
                <LoadingOutlined />
              )}
            </center>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  });

  const Header2 = oneArr.map(() => {
    //const count = headerCount;
    //setHeaderCounter(count+1);
    return (
      <div className="row">
        <div className="width4 border p-2 pt-3 px-2 noBorderEnd">
          <Checkbox disabled={!edit} />
        </div>
        <div className="width30 border p-2 pt-3 px-2 pb-0 bold noBorderEnd font14">
          Key
        </div>
        <div className="width30 border p-2 pt-3 px-2 pb-0 bold noBorderEnd font14">
          Value
        </div>
        <div className="width30 border p-2 pt-3 px-2 pb-0 bold noBorderEnd font14">
          Description
        </div>
        <div className="width6 border p-1  pt-2 px-2"></div>
      </div>
    );
  });

  const fetchIndex = (parent_key, level, key) => {
    for (let i = 0; i < dataArr.length; i++) {
      if (
        dataArr[i].parent_key === parent_key &&
        dataArr[i].level === level &&
        dataArr[i].key === key
      ) {
        // alert(i+" "+JSON.stringify(dataArr[i])+" "+parent_key+" "+level)
        return i;
      }
    }

    return false
  };

  const fetchPresavedIndex = (parent_key, level, key) => {
    for (let i = 0; i <presaved.length; i++) {
      if (
        presaved[i].parent_key === parent_key &&
        presaved[i].level === level &&
        presaved[i].key === key
      ) {
        //alert(i+" "+JSON.stringify(presaved[i])+" "+parent_key+" "+level)
        return i;
      }
    }

    return false
  };

  const formsRender = (index, type, data, arr, parent_key, level) => {
    const valueCheck = data.sampleValue;
    //alert(level+" "+parent_key)

    //alert(JSON.stringify(inputFields))

    let noBorderEnd, noBorderTop, sampleValue;

    if (typeof valueCheck !== "object") {
      sampleValue = data.sampleValue;
      noBorderEnd = "noBorderEnd";
    } else {
      sampleValue = JSON.stringify(data.sampleValue);
    }

    const presavedIdx = fetchPresavedIndex(parent_key, level, data.key);

    //alert(idx+" idx1");

    if(presavedIdx || presavedIdx===0){
      dataArr.push(presaved[presavedIdx])
    }else {
      dataArr.push({
        ...data,
        parent_key,
        level,
        action_id,
        category: type,
        sampleValue,
      });      
    }

    //alert(idx+" idx1");

    const idx = fetchIndex(parent_key, level, data.key)

    

    if (
      index === 0 ||
      (arr[index - 1] && typeof arr[index - 1].sampleValue !== "object")
    )
      noBorderTop = "noBorderTop";

    return (
      <div>
        <div className="row">
          <div
            className={`width4 border p-2 pt-3 px-2 noBorderEnd ${noBorderTop}`}
          >
            <Checkbox disabled={!edit} />
          </div>
          <div
            className={`width30 border p-2 font14 ${noBorderEnd} ${noBorderTop}`}
          >
            <div>
              <Input
                type="text"
                value={dataArr[idx].key}
                required
                className="border-0 bg-background-alternate"
                disabled={!edit}
                onKeyPress={(e) => {
                  handleKeyPress(index, e, type);
                }}
                name="key"
              />
            </div>
          </div>
          {typeof valueCheck !== "object" || valueCheck === null ? (
            <div
              className={`width30 border p-2 font14 noBorderEnd ${noBorderTop} `}
            >
              <div>
                <Input
                  type="text"
                  value={`{{${dataArr[idx].type}}} ${dataArr[idx].defaultType}`}
                  required
                  className="border-0 bg-background-alternate text-primary"
                  onKeyPress={(e) => {
                    handleKeyPress(index, e, type);
                  }}
                  disabled={!edit}
                  name="value"
                />
              </div>
            </div>
          ) : (
            <label className="col-3 mt-3 text-primary">
              {`{{${dataArr[idx].type}}}`}
            </label>
          )}
          {typeof valueCheck !== "object" || valueCheck === null ? (
            <div
              className={`width30 border p-2 font14 ${noBorderTop} ${noBorderEnd}`}
            >
              <div>
                <Input
                  type="text"
                  value={dataArr[idx].description}
                  required
                  className="border-0 bg-background-alternate"
                  onKeyPress={(e) => {
                    handleKeyPress(index, e, type);
                  }}
                  disabled={!edit}
                  name="description"
                />
              </div>
            </div>
          ) : null}
          {typeof valueCheck !== "object" || valueCheck === null ? (
            <div className={`width6 border p-1 pt-2 px-2 ${noBorderTop}`}>
              <center>
                <Button
                  shape="circle"
                  disabled={!edit}
                  onClick={() => {
                    showValuePropsDialog(true);
                    selectIndex(idx);
                  }}
                >
                  <SettingOutlined />
                </Button>
              </center>
            </div>
          ) : (
            <></>
          )}
        </div>
        {typeof valueCheck === "object" && valueCheck !== null ? (
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11 border-start px-5 pt-3 pb-3">
              {Header2}
              {subQuery(jsonToFields(valueCheck), index, type, data.key, level)}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const subQuery = (data, index, type, parent_key, level) => {
    // alert(JSON.stringify(data));
    return data.map((d, i, arr) => {
      //alert(JSON.stringify(d))
      //if(headerCount==0)setHeaderCounter(1);
      return formsRender(i, type, d, arr, parent_key, level + 1);
    });
  };


  const Body = inputFields.map((data, index, arr) => {
    return formsRender(index, "body", data, arr, "", 0);
  });

  const submitBody = async (e) => {
    //e.preventDefault();
    try {
      NProgress.start();
      setLoadingButton(true);

      const { auth_token: token, _id: user_id, public_key } = user;

      const response = await updateActionData({
        token,
        user_id,
        action_id,
        data: dataArr,
        sample: code,
        public_key,
        category: type,
        entity_id,
      });

      toast.success(`${type} data updated`);
      //alert(JSON.stringify(response))

      NProgress.done();

      setEdit(false);
      setLoadingButton(false);
    } catch (e) {
      setLoadingButton(false);
      NProgress.done();
      console.log("An error occurred", e.response);
      const error = e.response ? e.response.data.errors : e.toString();
      toast.error(error || e.toString());
    }
  };

  useEffect(async () => {
    try {
      const { auth_token: token, _id: user_id, public_key } = user;

      const response = await fetchActionData({
        token,
        user_id,
        public_key,
        entity_id,
        category: type,
        action_id,
      });

      if (response.data.data.data.length){
        //dataArr.push(...response.data.data.data);
        setPreSaved(response.data.data.data);
      }


      // alert("normie "+JSON.stringify(response.data));

      const { sample } = response.data.data.sample;

      setCode(sample);
      //alert(typeof value)

      try {
        const fields = jsonToFields(JSON.parse(sample));
        // alert(JSON.stringify(fields))
        setInputFields([...fields]);
      } catch (e) {
        // alert(e);
        setInputFields([]);
      }
    } catch (e) {
      // alert(JSON.stringify(e));
    }
  }, []);

  //alert(JSON.stringify(dataArr))

  return (
    <div className="col-12 padding_10">
      {valuePropsDialog ? (
        <SetValueProps
          closeValueProps={closeValueProps}
          envs={envs}
          index={selectedIndex}
          handleChange={handleModalChange}
          data={dataArr[selectedIndex]}
        />
      ) : (
        <></>
      )}
      {dialog ? (
        <EditActionModal
          showDialog={showDialog}
          setInputFields={changeInputFields}
          code={code}
          setCode={setCode}
        />
      ) : (
        <></>
      )}
      {Header}
      <div>{Body}</div>
    </div>
  );
};

export default Body;
