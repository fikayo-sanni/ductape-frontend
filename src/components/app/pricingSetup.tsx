import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { createPricing as createPrice, deletePricing, fetchPricing } from '../services/apps.service';
import { Table, Typography, Button, Modal, Input, Popconfirm } from 'antd';
import { DollarOutlined, InfoCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { updatePricing } from '../services/apps.service';
import toast from 'react-hot-toast';

const { Text, Title, Paragraph } = Typography;

interface Props {}
export interface Pricing {
    _id: string;
    app_id: string;
    name: string;
    envs: string[];
    interval: string;
    currency: string;
    unit_price: string | number;
    limits: any;
    pricing_mode: string;
}

export const PricingSetup: React.FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const { user, app } = useSelector((state: RootState) => state.app);
    const [dialog, setDialog] = useState(false);
    const [pricing, setPricing] = useState<Pricing[]>([]);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [page, setPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [currentPricing, setCurrentPricing] = useState<Pricing>();
    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['lg'],

            render: (name) => <span className="text-capitalize">{name ?? 'Unnamed'}</span>,
        },
        {
            title: 'Unit Price',
            key: 'unit_price',
            dataIndex: 'unit_price',
            render: (unit_price) => unit_price && unit_price.toLocaleString(),
        },
        {
            title: 'Interval',
            key: 'interval',
            dataIndex: 'interval',
            responsive: ['lg'],
        },
        {
            title: 'Mode',
            key: 'pricing_mode',
            dataIndex: 'pricing_mode',
            render: (pricing_mode) => <span className="text-capitalize">{pricing_mode.replace('_', ' ')}</span>,
        },
        {
            title: '',
            key: 'pricing_mode',
            dataIndex: 'pricing_mode',
            render: (_id, idx) => (
                <div className="row">
                    <center>
                        <Button className="col-4 me-2" onClick={() => editSetup(idx)}>
                            EDIT
                        </Button>{' '}
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this package?"
                            onConfirm={() => confirmDelete(idx)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className="col-4" danger>
                                DELETE
                            </Button>
                        </Popconfirm>
                    </center>
                </div>
            ),
        },
    ];

    const defaultPrice = {
        _id: '',
        name: '',
        unit_price: '',
        interval: '',
        currency: '$',
        pricing_mode: '',
        limits: {
            per_minute: '',
            per_day: '',
            per_hour: '',
            per_week: '',
            per_month: '',
        },
    };

    const [price, setPrice] = useState(defaultPrice);

    const confirmDelete = async (price) => {
        try {
            const { _id } = price;
            await deletePricing({
                token: user.auth_token,
                user_id: user._id,
                public_key: user.public_key,
                app_id: app._id,
                _id
            });
            getPricing();
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    const editSetup = async (index) => {
        setEdit(true);
        // @ts-ignore
        setPrice(index);
        // alert(JSON.stringify(index))
        setDialog(true);
    };

    const getPricing = async () => {
        const pricingDetails = await fetchPricing({
            token: user.auth_token,
            user_id: user._id,
            public_key: user.public_key,
            app_id: app._id,
        });

        setPricing(pricingDetails.data.data);
        setLoading(false);
    };

    const handleChange = (e) => {
        //console.log(e.t)
        setPrice({ ...price, [e.target.name]: e.target.value });
    };

    const handleChangeLimit = (e) => {
        let { limits } = price;

        limits = { ...limits, [e.target.name]: e.target.value };
        setPrice({ ...price, limits });
    };

    useEffect(() => {
        getPricing();
    }, []);

    const toggleDialog = () => {
        setEdit(false);
        setPage(1);
        setDialog(!dialog);
    };

    const decDialog = () => {
        setPage(page - 1);
    };

    const incDialog = () => {
        setPage(page + 1);
    };

    const createPricing = async () => {
        try {
            setLoadingButton(true);
            if (edit) {
                await updatePricing({
                    token: user.auth_token,
                    user_id: user._id,
                    public_key: user.public_key,
                    app_id: app._id,
                    ...price,
                });
            } else {
                delete price._id;
                await createPrice({
                    token: user.auth_token,
                    user_id: user._id,
                    public_key: user.public_key,
                    app_id: app._id,
                    ...price,
                });
            }

            setPrice(defaultPrice);
            setEdit(false);
            setLoadingButton(false);
            getPricing();
            toggleDialog();
        } catch (e) {
            setLoadingButton(false);
            const error = e.response ? e.response.data.errors : e.toString();
            toast.error(error || e.toString());
        }
    };

    return (
        <span>
            <div className="container ">
                <div className="row">
                    <Text className="col-10">Showing {pricing.length.toLocaleString()} pricing plan(s)</Text>
                    <div className="col-2">
                        <Button onClick={toggleDialog}>
                            <PlusCircleOutlined />
                            Add Pricing Plan
                        </Button>
                    </div>
                </div>
                <Table
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                setCurrentPricing(record);
                                setIsVisible(true);
                            },
                        };
                    }}
                    className="mt-3"
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={pricing}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 50,
                        pageSizeOptions: ['50', '100', '250', '500', '800'],
                    }}
                />
            </div>
            <Modal
                title={edit ? `Edit ${price.name} Plan` : page == 1 ? 'New Pricing Plan' : 'Request Limits'}
                visible={dialog}
                width={500}
                onCancel={toggleDialog}
                footer={[
                    <Button key="submit" onClick={toggleDialog}>
                        Cancel
                    </Button>,
                    <Button key="submit" onClick={decDialog} disabled={page == 1}>
                        Prev
                    </Button>,
                    <Button key="submit" onClick={incDialog} disabled={page == 2}>
                        Next
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        disabled={page !== 2}
                        loading={loadingButton}
                        onClick={createPricing}
                    >
                        SAVE
                    </Button>,
                ]}
            >
                {page === 1 ? (
                    <span>
                        <label className="text-muted">
                            {' '}
                            <InfoCircleOutlined /> Set pricing details
                        </label>
                        <div className="row p-2">
                            <div className="col-12 mb-4">
                                <Input
                                    type="text"
                                    value={price.name}
                                    required
                                    className="form-control"
                                    placeholder="Package Name"
                                    onChange={handleChange}
                                    name="name"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Input
                                    type="number"
                                    value={price.unit_price}
                                    required
                                    className="form-control"
                                    placeholder="($) Unit Price"
                                    onChange={handleChange}
                                    name="unit_price"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <select
                                    className="form-control"
                                    value={price.pricing_mode}
                                    name="pricing_mode"
                                    onChange={handleChange}
                                >
                                    <option>--- Pricing Mode ---</option>
                                    <option value="per_request">Per Request</option>
                                    <option value="upfront">Up Front</option>
                                    <option value="intervals">Interval</option>
                                </select>
                            </div>
                            <div className="col-12 mb-4">
                                <select
                                    className="form-control"
                                    value={price.interval}
                                    name="interval"
                                    onChange={handleChange}
                                >
                                    <option>--- Interval ---</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="bi-weekly">Bi-Weekly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </span>
                ) : (
                    <></>
                )}

                {page === 2 ? (
                    <span className="col">
                        <label className="text-muted">
                            {' '}
                            <InfoCircleOutlined /> Set as 0 for unlimited requests
                        </label>
                        <div className="p-3">
                            <div className="col-12 mb-4">
                                <Input
                                    type="number"
                                    required
                                    value={price.limits.per_minute}
                                    className="form-control"
                                    placeholder="Per Minute"
                                    onChange={handleChangeLimit}
                                    name="per_minute"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Input
                                    type="number"
                                    value={price.limits.per_hour}
                                    required
                                    className="form-control"
                                    placeholder="Per Hour"
                                    onChange={handleChangeLimit}
                                    name="per_hour"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Input
                                    type="number"
                                    value={price.limits.per_day}
                                    required
                                    className="form-control"
                                    onChange={handleChangeLimit}
                                    placeholder="Per Day"
                                    name="per_day"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Input
                                    type="number"
                                    value={price.limits.per_week}
                                    required
                                    className="form-control"
                                    placeholder="Per Week"
                                    onChange={handleChangeLimit}
                                    name="per_week"
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <Input
                                    type="number"
                                    value={price.limits.per_month}
                                    required
                                    className="form-control"
                                    placeholder="Per Month"
                                    onChange={handleChangeLimit}
                                    name="per_month"
                                />
                            </div>
                        </div>
                    </span>
                ) : (
                    <></>
                )}
            </Modal>
        </span>
    );
};
