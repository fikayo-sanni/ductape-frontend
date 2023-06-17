import { List, Avatar, Card } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
//import { fetchInitials, capitalize } from "../config/constant";
import { RootState } from '../../redux/store';
import { changeSelectedIntegration } from '../../redux/applicationSlice';
import Router from 'next/router';
import { fetchIntegration } from '../services/integrations.service';

const IntegrationList = (props) => {
  const { integrations } = props;
  const { user, defaultWorkspaceId } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const openIntegration = async (integration) => {
    const response = await fetchIntegration({
        token: user.auth_token,
        user_id: user._id,
        public_key: user.public_key,
        integration_id: integration._id,
    });
    console.log(response.data.data);
    await dispatch(changeSelectedIntegration(response.data.data));
    Router.push(`/integrations/integration`);
  };

  return ( 
    <div>
      <List
        grid={{
          gutter: 20,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={integrations}
        renderItem={(item: any, index: number) => {
          //alert(item)
          return (
           
            <List.Item className="p-2">
              
                <Card className="hover-blue" onClick={() => openIntegration(item)}>
                  <span>
                    <Avatar
                      className="bg-gray text-primary me-2 border_radius font-weight-500"
                      shape="square"
                    >
                      {((item.name))}
                    </Avatar>{" "}
                    {(item.name)}
                  </span>
                  <div className="row">
                    <label className="mt-2 text-muted col-9">
                      <label className="btn btn-light text-muted">
                        {item.envs.length} envs
                      </label>
                      {item.status ? (
                        <label
                          className={`btn mx-2 bold btn-light text-primary`}
                        >
                          {(item.status)} 
                          {item.status==="public"?<EyeOutlined />: item.status==="private"? <EyeInvisibleOutlined/>: <EditOutlined/>}
                        </label>
                      ) : (
                        <></>
                      )}
                    </label>
                  </div>
                </Card>
              
            </List.Item>


          );
        }}
      />
    </div>
  );
};

export default IntegrationList;
