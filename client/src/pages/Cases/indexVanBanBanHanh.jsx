import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EditOutlined, SendOutlined } from "@ant-design/icons";
import { searchVanBanDi, bangVanBanBanHanh } from "../../api";
import moment from "moment";
import { useHistory } from "react-router-dom";
import SearchCaseVanBanBanHanh from "../../components/SearchCaseVanBanBanHanh";

const CaseVanBanBanHanhs = () => {
  const [cases, setCases] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  const [sortedInfo] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [noi_nhan, setNoiNhan] = useState("");
  const [noi_dung_van_ban, setTrichYeu] = useState("");

  let history = useHistory();

  // const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
  // const [pdfURL, setPdfURL] = useState(null);
  // const openPDFModal = (pdfUrl) => {
  //   setPdfURL(pdfUrl);
  //   setIsPdfModalVisible(true);
  // };

  // const closePDFModal = () => {
  //   setPdfURL(null);
  //   setIsPdfModalVisible(false);
  // };

  const CaseColumns = [
    {
      title: "TT",
      render: (text, record, index) => {
        return calculateRowNumber(index);
      },
      align: "center",
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
      align: "center",
      width: 150,
    },
    {
      title: "NGÀY BAN HÀNH",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      sorter: (a, b) => new Date(a.ngay_ban_hanh) - new Date(b.ngay_ban_hanh),
      sortOrder:
        sortedInfo.columnKey === "ngay_ban_hanh"
          ? sortedInfo.order
          : "decrease",
      align: "center",
      width: 200,
    },
    {
      title: "TRÍCH YẾU",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "SOẠN THẢO",
      key: "noi_nhan",
      dataIndex: "noi_nhan",
      width: 200,
      align: "center",
    },
    // {
    //   title: "VĂN BẢN",
    //   key: "",
    //   dataIndex: "action",
    //   align: "center",
    //   width: 100,
    //   render: (text, record) => {
    //     const openPDF = () => {
    //       const caseData = cases.find((c) => c.id === record.id);
    //       if (caseData && caseData.file_van_ban) {
    //         const pdfData = caseData.file_van_ban.data;
    //         const blobData = new Blob([new Uint8Array(pdfData).buffer], {
    //           type: "application/pdf",
    //         });
    //         const pdfURL = URL.createObjectURL(blobData);
    //         openPDFModal(pdfURL);
    //       }
    //     };
    //     if (record.file_van_ban) {
    //       return (
    //         <EyeFilled
    //           className="icon-wrapper-1"
    //           onClick={openPDF}
    //           style={{ cursor: "pointer", color: "blue" }}
    //         />
    //       );
    //     } else {
    //       return <></>;
    //     }
    //   },
    // },
    {
      title: "GHI CHÚ",
      key: "",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <>
          <EditOutlined
            onClick={() =>
              history.push(`/quan-ly-van-ban-ban-hanh/chinh-sua/${record.id}`)
            }
          />
        </>
      ),
    },
  ];

  const DownloadColumns = [
    {
      title: "LOẠI TÀI LIỆU",
      dataIndex: "loai_tai_lieu",
      key: "loai_tai_lieu",
      render: (data) => data && data.name,
    },
    {
      title: "TÊN ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
    },
    {
      title: "SỐ VĂN BẢN",
      key: "so_van_ban",
      dataIndex: "so_van_ban",
    },
    {
      title: "NGÀY BAN HÀNH",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NỘI DUNG",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "XÂY DỰNG VĂN BẢN",
      key: "noi_nhan",
      dataIndex: "noi_nhan",
    },
  ];

  const onDownload = () => {
    let downloadColumns = DownloadColumns;
    if (!searchCondition?.loai_tai_lieu_id) {
      downloadColumns = [
        { title: "LOẠI TÀI LIỆU", dataIndex: "loai_tai_lieu", key: "loai_tai_lieu", render: (data) => data ? data.name : "" },
        ...DownloadColumns.slice(1)
      ];
    }
    const csvHeader = downloadColumns.map(({ title }) => title).join("###") + "\r\n";
    const csvBody = cases.reduce((body, c) => {
      c.loai_tai_lieu = c.loai_tai_lieu ? c.loai_tai_lieu.name : "";
      c.ngay_ban_hanh = moment(c.ngay_ban_hanh).format("DD/MM/YYYY");
      return (body +=
        downloadColumns.map(({ key }) => {
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
    link.setAttribute("download", "danh_sach_van_ban.csv");
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
      searchVanBanDi(searchCondition)
        .then((response) => {
          setTotalItems(response.data.length);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
          setCases(response.data);
        })
        .catch((err) => {
          setCases([]);
        });
    } else {
      bangVanBanBanHanh()
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

  const [loai_tai_lieu_content, setLoaiTaiLieuContent] =
    useState("VĂN BẢN CÁC LOẠI");
  const loaiTaiLieuContentMapping = {
    0: "VĂN BẢN CÁC LOẠI",
    1: "BÁO CÁO",
    2: "CHƯƠNG TRÌNH",
    3: "CÔNG VĂN",
    4: "TRÍCH SAO",
    5: "GIẤY MỜI",
    6: "HƯỚNG DẪN",
    7: "KẾ HOẠCH",
    8: "PHƯƠNG ÁN",
    10: "QUYẾT ĐỊNH",
    11: "THÔNG BÁO",
    12: "YÊU CẦU",
    13: "TỜ TRÌNH",
    14: "BÁO CÁO - ĐTN",
    15: "KẾ HOẠCH - ĐTN",
    16: "QUYẾT ĐỊNH - ĐTN",
    17: "TỜ TRÌNH - ĐTN",
    18: "NGHỊ QUYẾT - ĐTN",
    19: "CHƯƠNG TRÌNH - ĐTN",
    25: "GIẤY XÁC NHẬN",
    26: "GIẤY GIỚI THIỆU",
    27: "QUY CHẾ",
    28: "QUY ĐỊNH",
    29: "BẢN ĐỊNH THỜI HẠN BẢO QUẢN HỒ SƠ",
  };

  const onSearch = (searchParams) => {
    const { loai_tai_lieu_id, noi_nhan, noi_dung_van_ban, ngay_ban_hanh } = searchParams || {};
    const startDate = ngay_ban_hanh && ngay_ban_hanh[0] ? ngay_ban_hanh[0] : moment().startOf('year');
    const endDate = ngay_ban_hanh && ngay_ban_hanh[1] ? ngay_ban_hanh[1] : moment().endOf('year');

    setLoaiTaiLieuContent(
      loaiTaiLieuContentMapping[loai_tai_lieu_id] || "VĂN BẢN CÁC LOẠI"
    );
    setSearchCondition({
      ...searchParams,
      ngay_ban_hanh: [startDate, endDate]
    });
    setSelectedDateRange([startDate, endDate]);
    setNoiNhan(noi_nhan);
    setTrichYeu(noi_dung_van_ban);
  };


  const currentDate = moment().format("DD/MM/YYYY");
  const currentYear = moment().format("YYYY");
  const currentYearNow = `01/01/${currentYear}`;

  let displayContent = "";
  if (totalItems === 0) {
    displayContent = `${noi_nhan
      ? `ĐỒNG CHÍ ${noi_nhan.toUpperCase()} KHÔNG THAM MƯU BCH PHÒNG BAN HÀNH`
      : "PHÒNG PC09 KHÔNG BAN HÀNH"
      } 
    ${loai_tai_lieu_content} 
    ${noi_dung_van_ban
        ? `LIÊN QUAN TỚI "${noi_dung_van_ban.toUpperCase()}"`
        : ""
      } TRONG KHOẢNG THỜI GIAN NÀY!`;
  } else {
    displayContent = `TỪ NGÀY ${selectedDateRange && selectedDateRange[0]
      ? selectedDateRange[0].format("DD/MM/YYYY")
      : currentYearNow
      } 
    ĐẾN NGÀY ${selectedDateRange && selectedDateRange[1]
        ? selectedDateRange[1].format("DD/MM/YYYY")
        : currentDate
      }, 
    PC09-HN ĐÃ BAN HÀNH ${totalItems} ${loai_tai_lieu_content} 
    ${noi_dung_van_ban
        ? `LIÊN QUAN TỚI "${noi_dung_van_ban.toUpperCase()}"`
        : ""
      } 
    ${noi_nhan ? ` DO Đ/C ${noi_nhan.toUpperCase()} THAM MƯU XÂY DỰNG` : ""}!`;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#006d75" }}>
        QUẢN LÝ VĂN BẢN ĐI
      </div>
      <br />
      <SearchCaseVanBanBanHanh
        onSearch={onSearch}
        cases={cases}
        noi_nhan={noi_nhan}
        noi_dung_van_ban={noi_dung_van_ban}
        onDownload={onDownload}
      />
      <div>
        <p style={{ display: "flex", alignItems: "center" }}>
          <SendOutlined style={{ fontSize: "28px", marginRight: "8px" }} />
          <span style={{ fontWeight: "bold" }}>{displayContent}</span>
        </p>
      </div>
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
      {/* <Modal
        visible={isPdfModalVisible}
        onCancel={closePDFModal}
        footer={null}
        width={1800}
        style={{ top: 0, right: 0, left: 0 }}
        bodyStyle={{ height: "100vh", overflow: "auto" }}
      >
        <embed src={pdfURL} type="application/pdf" width="100%" height="100%" />
      </Modal> */}
    </div>
  );
};

export default CaseVanBanBanHanhs;
