import {
  CaretDownOutlined,
  DownOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Badge } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchResponses } from "../../services/actions.service";
import EmptyList from "../emptyList";
import { Loading } from "../../config/constant";
import { toast } from "react-hot-toast";
import CreateResponseModal from "./createResponseModal";
import Body from "./editBody";

const EditResponse = (props) => {
  const { Panel } = Collapse;
  const { envs, action_id } = props;
  const [dialog, showDialog] = useState(false);
  const [error, setError] = useState("");
  const [fetched, setFetched] = useState(false);

  const config = useSelector((state) => state.app);
  const [user, setUser] = useState(config.user);
  const [responses, setResponses] = useState([]);

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(async () => {
    try {
      const data = await fetchResponses({
        token: user.auth_token,
        public_key: user.public_key,
        user_id: user._id,
        action_id,
      });

      setFetched(true)

      if(data.data.data.length){
        setResponses(data.data.data);
      }else {
        setError("No Data")
      }
    } catch (e) {
      setError(e.toString());
      toast.error(e.toString());
    }
  }, []);

  const genExtra = () => (
    <Button shape="circle">
      <SettingOutlined
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    </Button>
  );

  const Rows = responses.map((data, index) => {
    return (
      <Panel
        header={
          <label>
            <b>{data.name}</b>{" "}
            {data.success ? (
              <label className="text-primary">[{data.status_code}]</label>
            ) : (
              <label className="text-dark">[{data.status_code}]</label>
            )}{" "}
            {!data.success ? (
              <Badge color="#f50" />
            ) : (
              <Badge color="hwb(205 6% 9%)" />
            )}
          </label>
        }
        key={index + 1}
        extra={genExtra()}
      >
        <Body
          envs={envs}
          action_id={action_id}
          type="response"
          entity_id={data._id}
        />
      </Panel>
    );
  });
  return (
    <div>
      {dialog ? (
        <CreateResponseModal
          showDialog={showDialog}
          envs={envs}
          action_id={action_id}
          setResponses={setResponses}
        />
      ) : (
        <></>
      )}
      <div className="row pb-2">
        <div className="col-11"></div>
        <div className="col-1">
          <Button shape="circle" type="primary">
            <PlusOutlined onClick={() => showDialog(true)} />
          </Button>
        </div>
      </div>
      {fetched && (!responses.length || error) ? <EmptyList /> : <></>}

      {responses.length ? (
        <Collapse defaultActiveKey={["1"]} onChange={onChange}>
          {Rows}
        </Collapse>
      ) : (
        <></>
      )}

      {!fetched && !error? <Loading/>: <></>}
    </div>
  );
};

export default EditResponse;
