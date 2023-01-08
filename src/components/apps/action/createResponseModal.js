import { Modal, Button, Switch } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import NProgress, { remove } from 'nprogress';
import { toast } from 'react-hot-toast';
import { jsonToFields, statusCodes } from '../../config/constant';
import { useSelector, useDispatch } from 'react-redux';
import { createResponse } from '../../services/actions.service';
// const CodeEditor = dynamic(
//   () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
//   { ssr: false }
// );

const CreateResponseModal = (props) => {
    const { showDialog, envs, action_id, setResponses } = props;

    const config = useSelector((state) => state.app);
    const [user, setUser] = useState(config.user);

    const [response, setResponse] = useState({});
    const [loadingButton, setLoadingButton] = useState(false);

    const closeDialog = () => {
        showDialog(false);
    };

    const handleChange = (e) => {
        setResponse({ ...response, [e.target.name]: e.target.value });
    };

    //alert(JSON.stringify(statusCodes));

    const EnvRows = envs.map((data, index) => {
        return <option value={data._id}>{data.env_name}</option>;
    });

    const StatusCodesRows = statusCodes.map((data, index) => {
        return (
            <option value={data.code}>
                {data.name} {data.code ? '-' : ''} {data.code}
            </option>
        );
    });

    const createResponseData = async () => {
        try {
            setLoadingButton(true);
            NProgress.start();

            //...response.active_envs

            const data = {
                ...response,
                envs: [],
                token: user.auth_token,
                public_key: user.public_key,
                user_id: user._id,
                action_id,
            };

            delete data.active_envs;

            const result = await createResponse(data);

            setLoadingButton(false);
            NProgress.done();

            if (result) {
                toast.success('Response Created');
                showDialog(false);
                alert(JSON.stringify(result.data.data));
                setResponses(result.data.data);
            } else {
                toast.error('Something unexpected happened');
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
            title="Create Response"
            visible={true}
            footer={[
                <Button key="submit" onClick={closeDialog}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loadingButton} onClick={createResponseData}>
                    Save
                </Button>,
            ]}
        >
            <div className="col-12 mb-4">
                <div className="form-floating">
                    <input
                        type="text"
                        value={response.name}
                        required
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Name"
                        name="name"
                    />
                    <label>Name</label>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="form-floating">
                    <select
                        className="form-control"
                        name="response_format"
                        onChange={handleChange}
                        value={response.response_format}
                    >
                        <option disabled selected value="">
                            -- Select Response Format --
                        </option>
                        <option value="application/json">application/json</option>
                        <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                        <option value="multipart/form-data">multipart/form-data</option>
                        <option value="SOAP">SOAP</option>
                    </select>
                    <label>Response Format:</label>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="form-floating">
                    <select
                        className="form-control"
                        name="status_code"
                        onChange={handleChange}
                        value={response.status_code}
                        mode="multiple"
                    >
                        <option disabled selected value="">
                            -- Select Status Code --
                        </option>
                        {StatusCodesRows}
                    </select>
                    <label>Status Code:</label>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="form-floating">
                    <select
                        className="form-control"
                        name="active_envs"
                        onChange={handleChange}
                        value={response.active_envs}
                        mode="multiple"
                    >
                        <option disabled value="">
                            -- Select Active Envs --
                        </option>
                        <option value="[]" selected>
                            All
                        </option>
                        {EnvRows}
                    </select>
                    <label>Envs</label>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="form-floating">
                    <select className="form-control" name="success" onChange={handleChange} value={response.success}>
                        <option disabled selected value="">
                            -- Select Success Status --
                        </option>
                        <option value={true}>Success</option>

                        <option value={false}>Failed</option>
                    </select>
                    <label>Success Status</label>
                </div>
            </div>
        </Modal>
    );
};

export default CreateResponseModal;
