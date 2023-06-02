import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button, Input, Switch, Select } from 'antd';
import { LoadingOutlined, SettingOutlined } from '@ant-design/icons';
import UpdateAppEnvModal from './updateAppEnvModal';
import { toast } from 'react-hot-toast';
import { createAppEnv } from '../services/apps.service';
import { changeSelectedApp } from '../../data/applicationSlice';
import { setCurrentApp } from '../../redux/applicationSlice';

interface Environment {
    _id: string;
    env_name: string;
    base_url: string;
    slug: string;
    request_type: string;
    payment_type: any;
    description: string;
    active: boolean;
    whitelist: boolean;
}
interface Props {}
// {JSON.stringify(env)}
export const EnvSetup: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const { user, app } = useSelector((state: RootState) => state.app);
    const defaultValue = {
        env_name: '',
        slug: '',
        description: '',
        fresh: true
    };

    // @ts-ignore
    const config = useSelector((state) => state.app);

    const handleChangeEnv = (index, e) => {
        //alert("Brah");
        let data = [...inputFields];
        data[index][e.target.name] = e.target.value;
        setInputFields(data);
    };

    const [ modal, showModal ] = useState(false);
    const [envSelected, setEnvSelected] = useState({});

    const handleCreate = async (e, index) => {
        try {
            let envs = inputFields;
          envs[index].loading = true;
          setInputFields(envs);

          const env = envs[index];

          const { auth_token: token, _id: user_id, public_key } = user;
          const create = await createAppEnv({
            ...env,
            token,
            app_id: app._id,
            user_id,
            public_key,
            workspace_id: config.defaultWorkspaceId,
          });
          toast.success("Env Created");

          envs[index].loading = false;
          envs[index].fresh = false;
          setInputFields(envs);

          alert(JSON.stringify(create.data.data));
          dispatch(setCurrentApp({...app, envs: create.data.data}));
          /*setLoading(false);
          refreshEnvs(create.data.data);
          closeCreateDialog();*/
        } catch (e) {
          // setLoading(false);
          const error = e.response ? e.response.data.errors : e.toString();
          toast.error(error || e.toString());
        }
        // closeCreateDialog();
      };

    const showUpdateEnv = (e, index) => {
        // e.preventDefault()

        if (!modal) {
            showModal(true);
            setEnvSelected(app.envs[index]);

        }else{
            showModal(false);
        }

    }

    const [inputFields, setInputFields] = useState([...app.envs, { ...defaultValue }]);

    const rows = inputFields.map((env, index) => {
        const { env_name, slug, description, fresh, loading } = env;
        const newEnv = !(env_name && slug && description);
        return (
            <tr className="p-2">
                <td className="col-3 p-2">
                    <Input
                        type="text"
                        value={env_name}
                        required
                        className="form-control"
                        placeholder="environment name"
                        name="env_name"
                        onChange={(e) => {
                            handleChangeEnv(index, e);
                        }}
                    />
                </td>
                <td className="col-2 p-2">
                    <Input
                        type="text"
                        value={slug}
                        required
                        className="form-control"
                        maxLength={3}
                        minLength={3}
                        placeholder="slug"
                        name="slug"
                        onChange={(e) => {
                            handleChangeEnv(index, e);
                        }}
                    />
                </td>
                <td className="p-2">
                    {fresh}
                    <Input
                        type="text"
                        value={description}
                        required
                        className="form-control"
                        placeholder="description"
                        name="description"
                        onChange={(e) => {
                            handleChangeEnv(index, e);
                        }}
                    />
                </td>
                <td className="col-1 p-2">
                    {!newEnv && !fresh? (
                        <Switch onChange={(e)=>{showUpdateEnv(e, index)}} checked={env.active}/>
                    ) : (
                        <Button type="primary" disabled={newEnv || loading} onClick={(e)=> handleCreate(e, index)}>
                            {!loading? 'Save' : <LoadingOutlined className="text-primary" rotate={180} />}
                        </Button>
                    )}
                </td>
            </tr>
        );
    });

    return <><table className="p-4">{rows}</table>{modal?<UpdateAppEnvModal showDialog={showModal} env={envSelected}/>:<></>}</>;
};
