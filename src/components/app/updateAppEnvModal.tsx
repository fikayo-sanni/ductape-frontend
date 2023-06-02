import { Modal, Input, Checkbox, Button, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize, isValidHttpUrl } from '../config/constant';
import { toast } from 'react-hot-toast';
import { InfoCircleOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { createAppEnv, updateAppEnv } from '../services/apps.service';
import { setCurrentApp } from '../../redux/applicationSlice';

const { TextArea } = Input;
interface Props {
    env: any;
    showDialog: any;
}
const UpdateAppEnvModal: React.FC<Props> = (props) => {
    const { env, showDialog } = props;
    //alert(JSON.stringify(env))
    const [envSelectedPage, setEnvSelectedPage] = useState(1);
    const [envSelectedData, setEnvSelectedData] = useState(env);
    const [loadingButton, setLoadingButton] = useState(false);
    const dispatch = useDispatch();

    // @ts-ignore
    const config = useSelector((state) => state.app);
    const [user, setUser] = useState(config.user);

    const handleChange = (e) => setEnvSelectedData({ ...envSelectedData, [e.target.name]: e.target.value });

    const handleChangeWhiteList = (e) => {
        setEnvSelectedData({
            ...envSelectedData,
            whitelist: !envSelectedData.whitelist,
        });
    };

    const handleChangeActive = (e) => {
        setEnvSelectedData({ ...envSelectedData, active: !envSelectedData.active });
    };


    const closeEnvDialog = () => {
        showDialog(false);
    };

    const updateEnvData = async () => {
        try {
            if (!envSelectedData.base_url) {
                toast.error('base url is required');
            } else if (!isValidHttpUrl(envSelectedData.base_url)) {
                toast.error('base url is invalid');
            } else if (!envSelectedData.request_type) {
                toast.error('default request-type is required');
            } else {
                setLoadingButton(true);
                NProgress.start();
                const data = {
                    ...envSelectedData,
                    token: user.auth_token,
                    public_key: user.public_key,
                    user_id: user._id,
                    env_id: envSelectedData._id,
                };

                // alert(JSON.stringify(data))
                const result = await updateAppEnv(data);

                setLoadingButton(false);
                NProgress.done();
                if (result) {
                    // alert(JSON.stringify(result.data.data))
                    toast.success('Environment Updated');
                    dispatch(setCurrentApp(result.data.data));
                    /* setApp(result.data.data);
        setEnvDialog(false);*/
                }
            }
        } catch (e) {
            setLoadingButton(false);
            NProgress.done();
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    return (
        <Modal
            title={`${capitalize(envSelectedData.env_name)} Env`}
            visible={true}
            width={500}
            onCancel={closeEnvDialog}
            footer={[
                <Button key="submit" onClick={closeEnvDialog}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loadingButton} onClick={updateEnvData}>
                    SAVE
                </Button>,
            ]}
        >
            <span className="ps-3 pe-3">
                <div className="row">
                    <div className="col-12 mb-4">
                        <Input
                            type="text"
                            value={envSelectedData.base_url || ''}
                            onChange={handleChange}
                            required
                            className="form-control"
                            placeholder="Base Url"
                            name="base_url"
                        />
                    </div>
                    <div className="col-12 mb-4">
                        <select
                            className="form-control"
                            name="request_type"
                            onChange={handleChange}
                            value={envSelectedData.request_type || ''}
                            required
                        >
                            <option disabled selected value="">
                                -- Select Request Type --
                            </option>
                            <option value="application/json">application/json</option>
                            <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                            <option value="multipart/form-data">multipart/form-data</option>
                            <option value="SOAP">SOAP</option>
                        </select>
                    </div>
                    <div className="col-12 mb-4">
                        <div className="form-floating">
                            <TextArea
                                value={envSelectedData.description || ''}
                                onChange={handleChange}
                                required
                                placeholder="Description"
                                name="description"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <label className="text-muted">
                            <InfoCircleOutlined /> Require Whitelisted IPs
                        </label>
                        <div className="">
                            <br />
                            <Switch onChange={handleChangeWhiteList} checked={envSelectedData.whitelist} />
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <label className="text-muted">
                            <InfoCircleOutlined /> Active and open to connections?
                        </label>
                        <div className="">
                            <br />
                            <Switch
                                disabled={!envSelectedData.base_url || !envSelectedData.request_type}
                                onChange={handleChangeActive}
                                checked={envSelectedData.active}
                            />
                        </div>
                    </div>
                </div>
            </span>
        </Modal>
    );
};

export default UpdateAppEnvModal;
