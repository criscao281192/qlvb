import React, { useState, useEffect } from "react";
import { Table, Empty, Button, Col } from "antd";
import { bangBaoCaoDinhKy, updateStatusInDatabaseBC } from "../../api/case";
import { useHistory } from "react-router-dom";
import "./stylesHome.css";

const ThongBaoBaoCaoDinhKy = () => {
    const [cases, setCases] = useState([]);
    const [sortedInfo] = useState({});
    let history = useHistory();
    const handleButtonClick = () => {
        history.push("/quan-ly-van-ban/tao-moi-bao-cao-dinh-ky");
    };
    const moment = require("moment");

    const handleCaseBaocao = async (caseId) => {
        try {
            const currentDate = moment();
            const futureDate = currentDate.clone().add(1, 'months').format("YYYY-MM-DDT13:00:00.000Z");
            const updatedCases = cases.map((caseItem) =>
                caseItem.id === caseId
                    ? { ...caseItem, ngay_het_han: futureDate }
                    : caseItem
            );
            setCases(updatedCases);
            history.go(0);
            await updateStatusInDatabaseBC(caseId, futureDate);
        } catch (error) {
            console.error("LỖI THÊM DỮ LIỆU:", error);
        }
    };

    const CaseColumns = [
        {
            title: "ĐƠN VỊ",
            dataIndex: "ten_don_vi",
            key: "ten_don_vi",
            align: "center",
        },
        {
            title: "NỘI DUNG",
            key: "noi_dung_van_ban",
            dataIndex: "noi_dung_van_ban",
        },
        {
            title: "NGÀY HẾT HẠN",
            key: "ngay_het_han",
            dataIndex: "ngay_het_han",
            render: (data) => data && moment(data).format("DD/MM/YYYY"),
            sorter: (a, b) => new Date(a.ngay_het_han) - new Date(b.ngay_het_han),
            sortOrder:
                sortedInfo.columnKey === "ngay_het_han" ? sortedInfo.order : "ascend",
            align: "center",
        },
        {
            title: "THỰC HIỆN",
            key: "noi_nhan",
            dataIndex: "noi_nhan",
            align: "center",
        },
        {
            title: "HOÀN THÀNH",
            key: "",
            dataIndex: "action",
            align: "center",
            render: (text, record) => (
                <>
                    <Button danger onClick={() => handleCaseBaocao(record.id)}>
                        XONG
                    </Button>
                </>
            ),
        },
    ];

    const rowClassName = (record) => {
        const currentDate = new Date();
        const deadline = new Date(record.ngay_het_han);
        const diffTime = deadline - currentDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 1) {
            return "warning-row-error blink";
        }
        return "";
    };

    useEffect(() => {
        bangBaoCaoDinhKy()
            .then((response) => {
                setCases(response.data.result);
            })
            .catch((err) => {
                setCases([]);
            });
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#006d75" }}>
                QUẢN LÝ CÔNG VIỆC ĐỊNH KỲ
            </div>
            <br />
            <Col span={12} style={{ textAlign: "left" }}>
                <Button danger onClick={handleButtonClick} style={{ marginBottom: 16 }}>
                    BÁO CÁO ĐỊNH KỲ MỚI
                </Button>
            </Col>
            {cases.length === 0 ? (
                <Empty description="TẤT CẢ BÁO CÁO ĐẾN HẠN ĐÃ HOÀN THÀNH" />
            ) : (
                <Table
                    rowKey="id"
                    columns={CaseColumns}
                    dataSource={cases}
                    rowClassName={rowClassName}
                    loading={!cases.length}
                    defaultSortOrder="ascend"
                />
            )}
        </div>
    );
};

export default ThongBaoBaoCaoDinhKy;
