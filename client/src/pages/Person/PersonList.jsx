import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  bangThongTinThanNhanCanBo,
  searchThongTinThanNhanCanBo,
} from "../../api/person";
import SearchCaseThanNhanCanBo from "../../components/SearchCaseThanNhanCanBo";
import ThongBaoHetHanBaoHiemThanNhan from "../Home/ThongBaoHetHanBaoHiemThanNhan";
import { useHistory } from "react-router-dom";
import moment from "moment";

const PersonList = () => {
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
      title: "NGÀY SINH",
      dataIndex: "ngay_sinh",
      key: "ngay_sinh",
      align: "center",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      width: 100,
    },
    {
      title: "QUÊ QUÁN",
      dataIndex: "que_quan",
      key: "que_quan",
      align: "center",
    },
    {
      title: "THÂN NHÂN CÁN BỘ",
      dataIndex: "can_bo",
      key: "can_bo",
      align: "center",
    },
    {
      title: "ĐƠN VỊ CÔNG TÁC",
      dataIndex: "don_vi_cong_tac",
      key: "don_vi_cong_tac",
      align: "center",
      render: (text) => {
        return text === "0"
          ? "Lãnh đạo Phòng"
          : text === "1"
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
      title: "MÃ SỐ THẺ",
      dataIndex: "ma_so_the",
      key: "ma_so_the",
      align: "center",
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
              history.push(`/quan-ly-than-nhan-can-bo/chinh-sua/${record.id}`)
            }
            style={{ marginRight: 8 }}
          />
        </>
      ),
    },
  ];


  const DownloadColumns = [
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
      title: "NGÀY SINH",
      dataIndex: "ngay_sinh",
      key: "ngay_sinh",
      align: "center",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      width: 100,
    },
    {
      title: "QUÊ QUÁN",
      dataIndex: "que_quan",
      key: "que_quan",
      align: "center",
    },
    {
      title: "THÂN NHÂN CÁN BỘ",
      dataIndex: "can_bo",
      key: "can_bo",
      align: "center",
    },
    {
      title: "ĐƠN VỊ CÔNG TÁC",
      dataIndex: "don_vi_cong_tac",
      key: "don_vi_cong_tac",
      align: "center",
      render: (text) => {
        return text === "0"
          ? "Lãnh đạo Phòng"
          : text === "1"
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
      title: "MÃ SỐ THẺ",
      dataIndex: "ma_so_the",
      key: "ma_so_the",
      align: "center",
    },
  ]

  const onDownload = () => {
    const csvHeader =
      DownloadColumns.map(({ title }) => title).join("###") + "\r\n";

    const csvBody = cases.reduce((body, c) => {
      c.ngay_sinh = moment(c.ngay_sinh).format("DD/MM/YYYY");
      return (body +=
        DownloadColumns.map(({ key }) => {
          return c[key] === 0 ? c[key] : c[key] ? `${c[key]}` : "-";
        }).join("###") + "\r\n");
    }, "");

    const csvContent = csvHeader + csvBody;

    console.log(csvContent);

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "danh_sach_can_bo.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentRowNumber, setCurrentRowNumber] = useState(0);

  const calculateRowNumber = (index) => {
    return currentRowNumber + index + 1;
  };

  useEffect(() => {
    if (searchCondition) {
      searchThongTinThanNhanCanBo(searchCondition)
        .then((response) => {
          console.log("Search Response:", response.data);
          setTotalItems(response.data.length);
          setCases(response.data);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
        })
        .catch((err) => {
          console.error("Search Error:", err);
          setCases([]);
        });
    } else {
      bangThongTinThanNhanCanBo()
        .then((response) => {
          console.log("Response:", response.data.result);
          setTotalItems(response.data.result.length);
          setCases(response.data.result);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
        })
        .catch((err) => {
          console.error("Error:", err);
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
        QUẢN LÝ THÂN NHÂN CÁN BỘ
      </div>
      <br />
      <ThongBaoHetHanBaoHiemThanNhan />
      <SearchCaseThanNhanCanBo
        onSearch={onSearch}
        cases={cases}
        onDownload={onDownload} />
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

export default PersonList;
