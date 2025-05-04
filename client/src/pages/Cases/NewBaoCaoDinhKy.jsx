import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    TreeSelect,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import "./styles.css";
import { getCase, getConfigs, postCase, lay_so_van_ban_den } from "../../api";
import { DINH_KY, NOI_PHAT_HANH } from "../../shared/constants";
import { jwtDecode } from "jwt-decode";

const NewBaoCaoDinhKy = () => {
    const [form] = Form.useForm();
    let history = useHistory();
    let { id } = useParams();

    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

    const onFinish = (values) => {
        if (typeof values.noi_dung_van_ban === "string") {
            values.noi_dung_van_ban = values.noi_dung_van_ban
                .split("\n")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join("\n");
        }

        if (Array.isArray(values.ten_don_vi)) {
            values.ten_don_vi = values.ten_don_vi
                .map((item) => item.value)
                .join(", ");
        }
        if (Array.isArray(values.noi_nhan)) {
            values.noi_nhan = values.noi_nhan.map((item) => item.value).join(", ");
        }

        const currentDate = moment();
        values.createdAt = currentDate.format("YYYY-MM-DDT13:00:00.000Z");
        values.createdBy = userUserId;

        postCase(values).then((res) => {
            history.push("/quan-ly-van-ban");
            window.location.href = "/quan-ly-van-ban";
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const [config, setConfig] = useState();

    const [userUserId, setuserUserId] = useState(null);
    useEffect(() => {
        const userInfo = jwtDecode(localStorage.getItem("accessToken"));
        console.log(userInfo);
        if (userInfo) {
            setuserUserId(userInfo.userId);
        }
    }, []);

    useEffect(() => {
        getConfigs().then((data) => {
            setConfig(data);
        });

        if (id) {
            getCase(id).then((res) => {
                form.setFieldsValue({
                    id: res.data.id,
                    loai_tai_lieu: res.data.loai_tai_lieu_id,
                    van_ban_den: res.data.van_ban_den_id,
                    ten_don_vi: res.data.ten_don_vi,
                    noi_dung_van_ban: res.data.noi_dung_van_ban,
                    ngay_het_han: moment(res.data.ngay_het_han),
                    noi_nhan: res.data.noi_nhan,
                    createdAt: res.data.createdAt,
                    createdBy: res.data.createdBy,
                });
            });
        }
    }, [id, form]);

    const { Option } = Select;
    const laysovanbanden = async (van_ban_den_id) => {
        const result = await lay_so_van_ban_den({
            van_ban_den_id: van_ban_den_id,
        });
        if (result.data.result) {
            console.log(result.data.result);
        }

        let tenviettatvanbanden = "";
        switch (van_ban_den_id) {
            case 3:
                tenviettatvanbanden = "BCĐK";
                break;
            default:
                break;
        }

        form.setFieldsValue({
            van_ban_den_so: `${tenviettatvanbanden}`,
        });
    };
    const searchControls = [
        {
            name: "id",
            render: () => {
                return <Input style={{ display: "none" }} />;
            },
        },
        {
            name: "van_ban_den",
            label: "TÀI LIỆU",
            render: () => {
                return (
                    <Select onChange={laysovanbanden}>
                        {config &&
                            config["van_ban_den"] &&
                            config["van_ban_den"].map((item) => {
                                return (
                                    <Option key={item.id} value={item.id} disabled={item.id === 1 || item.id === 2}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                    </Select>
                );
            },
            rules: [
                {
                    required: true,
                    message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
                },
            ],
        },
        {
            name: "van_ban_den_so",
            label: "LOẠI",
            render: () => {
                return <Input placveholder="" disabled />;
            },
            rules: [
                {
                    required: true,
                    message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
                },
            ],
        },
        {
            name: "ten_don_vi",
            label: "ĐƠN VỊ",
            render: () => {
                return (
                    <TreeSelect
                        treeData={NOI_PHAT_HANH}
                        placeholder="TÊN ĐƠN VỊ"
                        treeCheckable={true}
                        treeCheckStrictly={true}
                    />
                );
            },
            rules: [
                {
                    required: true,
                    message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
                },
            ],
        },
        {
            name: "noi_dung_van_ban",
            label: "TRÍCH YẾU",
            render: () => {
                return <Input />
            },
            rules: [
                {
                    required: true,
                    message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
                },
            ],
        },
        {
            name: "ngay_het_han",
            label: "NGÀY BÁO CÁO ĐỊNH KỲ",
            render: () => {
                return <DatePicker format={dateFormatList} placeholder={"NGÀY"} />;
            },
            rules: [
                {
                    required: true,
                    message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
                },
            ],
        },
        {
            name: "noi_nhan",
            label: "THỰC HIỆN",
            render: () => {
                return (
                    <TreeSelect
                        treeData={DINH_KY}
                        placeholder="CÁN BỘ"
                        treeCheckable={true}
                        treeCheckStrictly={true}
                    />
                );
            },
            rules: [
                {
                    required: true,
                    message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
                },
            ],
        },
    ];

    const getFields = () => {
        return searchControls.map((control, i) => {
            return (
                <Form.Item
                    name={control.name}
                    label={control.label}
                    wrapperCol={{
                        offset: 3,
                        span: 10,
                    }}
                    rules={control.rules}
                    validateTrigger="onBlur"
                >
                    {control.render()}
                </Form.Item>
            );
        });
    };

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                marginTop: 0,
            }}
        >
            {getFields()}
            <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
                <Button type="primary" htmlType="submit">
                    HOÀN THÀNH
                </Button>
                <Button
                    type="default"
                    style={{ margin: "0 16px" }}
                    onClick={() => {
                        form.resetFields();
                    }}
                >
                    RESET
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewBaoCaoDinhKy;
