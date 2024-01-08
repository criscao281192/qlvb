import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { bangThongTinCanBo, searchThongTinCanBo } from "../../api/personnel";
import SearchCaseCanBo from "../../components/SearchCaseCanBo";
import ThongBaoBoNhiemLai from "../Home/ThongBaoBoNhiemLai";
import { useHistory } from "react-router-dom";

const PersonnelList = () => {
  const [cases, setCases] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  let history = useHistory();

  const CaseColumns = [
    {
      title: "TT",
      render: (text, record, index) => {
        return calculateRowNumber(index);
      },
      align: "center",
    },
    {
      title: "HỌ TÊN",
      dataIndex: "ho_ten",
      key: "ho_ten",
      align: "center",
    },
    {
      title: "QUÊ QUÁN",
      dataIndex: "que_quan",
      key: "que_quan",
      align: "center",
    },
    {
      title: "SỐ HIỆU",
      dataIndex: "so_hieu",
      key: "so_hieu",
      align: "center",
      width: 100,
    },
    {
      title: "CHỨC VỤ",
      dataIndex: "chuc_vu",
      key: "chuc_vu",
      align: "center",
      render: (text) => {
        return text === "1"
          ? "Trưởng phòng"
          : text === "2"
          ? "Phó Trưởng phòng"
          : text === "3"
          ? "Đội trưởng"
          : text === "4"
          ? "Phó Đội trưởng"
          : "Cán bộ";
      },
    },
    {
      title: "ĐƠN VỊ CÔNG TÁC",
      dataIndex: "doi_cong_tac",
      key: "doi_cong_tac",
      align: "center",
      render: (text) => {
        return text === "1"
          ? "Đội Tham mưu"
          : text === "2"
          ? "Đội Khám nghiệm hiện trường"
          : text === "3"
          ? "Đội Giám định KTHS truyền thống và tài liệu"
          : text === "4"
          ? "Đội Giám định hoá, KTPL và pháp y, sinh vật"
          : "Đội Kỹ thuật phòng, chống tội phạm";
      },
    },
    {
      title: "LĨNH VỰC CÔNG TÁC",
      dataIndex: "linh_vuc_cong_tac",
      key: "linh_vuc_cong_tac",
      align: "center",
      render: (text) => {
        const fields = text
          .split(";")
          .map((field, index) => <div key={index}>{field}</div>);
        return <div style={{ textAlign: "center" }}>{fields}</div>;
      },
    },

    {
      title: "GHI CHÚ",
      key: "",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <>
          <EditOutlined
            onClick={() =>
              history.push(`/quan-ly-can-bo/chinh-sua/${record.id}`)
            }
          />
        </>
      ),
    },
  ];
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentRowNumber, setCurrentRowNumber] = useState(0);

  const calculateRowNumber = (index) => {
    return currentRowNumber + index + 1;
  };
  useEffect(() => {
    if (searchCondition) {
      searchThongTinCanBo(searchCondition)
        .then((response) => {
          setTotalItems(response.data.length);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
          setCases(response.data);
        })
        .catch((err) => {
          setCases([]);
        });
    } else {
      bangThongTinCanBo()
        .then((response) => {
          setTotalItems(response.data.result.length);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
          setCases(response.data.result);
        })
        .catch((err) => {
          setCases([]);
        });
    }
  }, [searchCondition, currentPage, itemsPerPage]);
  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setItemsPerPage(pagination.pageSize);
  };

  const onSearch = (searchParams) => {
    setSearchCondition(searchParams);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#006d75" }}>
        QUẢN LÝ CÁN BỘ
      </div>
      <br />
      <ThongBaoBoNhiemLai />
      <SearchCaseCanBo onSearch={onSearch} cases={cases} />
      <Table
        rowKey={"id"}
        columns={CaseColumns}
        dataSource={cases}
        loading={cases.length === 0}
        defaultSortOrder={"decrease"}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalItems,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default PersonnelList;
