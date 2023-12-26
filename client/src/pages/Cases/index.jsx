import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import SearchCase from "../../components/SearchCase";
import {
  EditOutlined,
  EyeFilled,
  SaveTwoTone,
  CheckCircleTwoTone,
  SyncOutlined,
  CloudDownloadOutlined,
  TeamOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { searchCases, bangVanBanDen } from "../../api";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [selectedDateOut, setSelectedDateOut] = useState(null);
  const [ten_don_vi, setTenDonVi] = useState("");
  const [noi_nhan, setNoiNhan] = useState("");
  const [noi_dung_van_ban, setTrichYeu] = useState("");
  const [trang_thai_van_ban, setTrangThai] = useState("");

  let history = useHistory();

  const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);
  const [pdfURL, setPdfURL] = useState(null);
  const openPDFModal = (pdfUrl) => {
    setPdfURL(pdfUrl);
    setIsPdfModalVisible(true);
  };

  const closePDFModal = () => {
    setPdfURL(null);
    setIsPdfModalVisible(false);
  };

  const CaseColumns = [
    {
      title: "TT",
      render: (text, record, index) => {
        return calculateRowNumber(index);
      },
      align: "center",
      width: 15,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
      align: "center",
      width: 100,
    },
    {
      title: "SỐ ĐẾN",
      dataIndex: "van_ban_den_so",
      key: "van_ban_den_so",
      align: "center",
      width: 100,
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
      align: "center",
      width: 130,
    },
    {
      title: "NGÀY KÝ",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      align: "center",
      width: 120,
    },
    {
      title: "NGÀY NHẬN",
      key: "ngay_tiep_nhan",
      dataIndex: "ngay_tiep_nhan",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      align: "center",
      width: 130,
    },
    {
      title: "TRÍCH YẾU",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
      align: "justify",
    },
    {
      title: "NƠI NHẬN",
      key: "noi_nhan",
      dataIndex: "noi_nhan",
      align: "justify",
      width: 310,
    },
    {
      title: "THỜI HẠN",
      key: "ngay_het_han",
      dataIndex: "ngay_het_han",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      align: "center",
      width: 30,
    },
    {
      title: "TRẠNG THÁI",
      key: "trang_thai_van_ban",
      dataIndex: "trang_thai_van_ban",
      align: "center",
      width: 100,
      render: (text, record) => (
        <>
          {text === "ĐANG XỬ LÝ" && (
            <SyncOutlined spin className="icon-wrapper-load" />
          )}
          {text === "LƯU" && <SaveTwoTone className="icon-wrapper" />}
          {text === "XONG" && (
            <CheckCircleTwoTone
              className="icon-wrapper"
              twoToneColor="#52c41a"
            />
          )}
          <EditOutlined
            className="icon-wrapper-2"
            onClick={() =>
              history.push(`/quan-ly-van-ban/editmember/${record.id}`)
            }
          />
        </>
      ),
    },
    {
      title: "PDF",
      key: "",
      dataIndex: "action",
      align: "center",
      width: 50,
      render: (text, record) => {
        const openPDF = () => {
          const caseData = cases.find((c) => c.id === record.id);
          if (caseData && caseData.file_van_ban) {
            const pdfData = caseData.file_van_ban.data;
            const blobData = new Blob([new Uint8Array(pdfData).buffer], {
              type: "application/pdf",
            });
            const pdfURL = URL.createObjectURL(blobData);
            openPDFModal(pdfURL);
          }
        };
        if (record.file_van_ban) {
          return (
            <EyeFilled
              className="icon-wrapper-1"
              onClick={openPDF}
              style={{ cursor: "pointer", color: "blue" }}
            />
          );
        } else {
          return <></>;
        }
      },
    },
    {
      title: "XỬ LÝ",
      key: "",
      dataIndex: "action",
      align: "center",
      width: 80,
      render: (text, record) => (
        <>
          {record.de_xuat ? (
            <FileDoneOutlined
              className="icon-wrapper-1"
              onClick={() => onPrint(record)}
            />
          ) : (
            <TeamOutlined
              className="icon-wrapper-1"
              onClick={() =>
                history.push(`/quan-ly-van-ban/edithandle/${record.id}`)
              }
            />
          )}
          <EditOutlined
            className="icon-wrapper-2"
            onClick={() =>
              history.push(`/quan-ly-van-ban/edithandle/${record.id}`)
            }
          />
        </>
      ),
    },
  ];

  const DownloadColumns = [
    {
      title: "VĂN BẢN ĐẾN",
      dataIndex: "van_ban_den",
      key: "van_ban_den",
      render: (data) => data && data.name,
    },
    {
      title: "ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
    },
    {
      title: "SỐ ĐẾN",
      dataIndex: "van_ban_den_so",
      key: "van_ban_den_so",
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
    },
    {
      title: "NGÀY KÝ",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NGÀY NHẬN",
      key: "ngay_tiep_nhan",
      dataIndex: "ngay_tiep_nhan",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "TRÍCH YẾU",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "NƠI NHẬN",
      key: "noi_nhan",
      dataIndex: "noi_nhan",
    },
    {
      title: "THỜI HẠN",
      key: "ngay_het_han",
      dataIndex: "ngay_het_han",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "TRẠNG THÁI",
      key: "trang_thai_van_ban",
      dataIndex: "trang_thai_van_ban",
    },
    {
      title: "ĐỀ XUẤT",
      key: "de_xuat",
      dataIndex: "de_xuat",
    },
  ];

  const onDownloadVanBanDen = () => {
    const csvHeader =
      DownloadColumns.map(({ title }) => title).join("###") + "\r\n";

    const csvBody = cases.reduce((body, c) => {
      c.van_ban_den = c.van_ban_den.name;
      c.ngay_ban_hanh = moment(c.ngay_ban_hanh).format("DD/MM/YYYY");
      c.ngay_tiep_nhan = moment(c.ngay_tiep_nhan).format("DD/MM/YYYY");
      c.ngay_het_han = moment(c.ngay_het_han).format("DD/MM/YYYY");
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
    link.setAttribute("download", "danh_sach_van_ban.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onPrint = (record) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow.printContentAdded) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`;
      printWindow.document.open();
      printWindow.document.write(`
      <html>
        <head>
          <style>
            @media print {
              @page {
                size: A4 portrait;
                margin: 2cm 1.5cm 2cm 1.5cm;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                padding: 5px;
                font-size: 14px;
              }
              th {
                background-color: #66FF33;
                font-weight: bold;
                border: 2px double black;
                text-align: left;
              }
              tr:nth-child(odd) {
                background-color: #f9f9f9;
              }
              td {
                padding: 5px;
              }
              .print-caption {
                font-weight: bold;
                font-size: 24px;
                text-align: center;
                margin-top: 20px;
              }
              .print-date {
                font-weight: bold;
                font-style: italic;
                font-size: 18px;
                text-align: center;
              }
              .agency-info {
                text-align: left;
                border: 1px solid white;
                font-size: 16px;
                padding: 0px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .left-section, .middle-section, .right-section {
                width: 33.33%;
                vertical-align: top;
                font-size: 16px;
              }
              .no-border {
                border: none !important;
              }
              .summary-column {
                text-align: justify;
                font-size: 18px;
              }
  
              .summary-column strong {
                display: block;
              }
  
              .summary-content {
                 margin-top: 1em;
              }
            }
            </style>
          </head>
          <body>
            <style type="text/css">
              @media screen {
                body::before {
                  content: "Đội 1 - PC09" !important;
                  display: block !important;
                }
              }
            </style>
            <table class="border-white">
            <thead>
                  <th class="agency-info">ĐỘI THAM MƯU PHÒNG KỸ THUẬT HÌNH SỰ</th>
            </thead>
            </table>
            <br/>
            <div class="left-section"><em>Kính gửi: </em></div>
            <hr/>
            <div class="print-caption">PHIẾU XỬ LÝ VĂN BẢN</div>
            <br/>
            <table class="border-white">
              <tbody>
                <tr>
                  <td class="left-section">SỐ ĐẾN: <strong>${
                    record.van_ban_den_so || "-"
                  }</strong></td>
                  <td class="middle-section">ĐƠN VỊ: <strong>${
                    record.ten_don_vi || "-"
                  }</strong></td>
                  <td class="right-section">VĂN BẢN SỐ: <strong>${
                    record.so_van_ban || "-"
                  }</strong></td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td class="left-section">NGÀY KÝ: <strong>${
                    record.ngay_ban_hanh
                      ? moment(record.ngay_ban_hanh).format("DD/MM/YYYY")
                      : "-"
                  }</strong></td>
                  <td class="middle-section no-border">NGÀY NHẬN: <strong>${
                    record.ngay_tiep_nhan
                      ? moment(record.ngay_tiep_nhan).format("DD/MM/YYYY")
                      : "-"
                  }</strong></td>
                  <td class="right-section">NGÀY IN PHIẾU: <strong>${formattedDate}</strong></td>
                </tr>
              </tbody>
            </table>
            <hr />
            <br/>
            <style>
              .upper-section {
                display: flex;
                width: 100%;
              }
              .left-section-2,
              .right-section-2 {
                display: flex;
                flex-direction: column;
                width: 50%;
              }
              .left-section-2 {
                border-right: 1px solid #000;
              }
              .proposal-section,
              .leadership-section {
                padding: 10px;
                margin: 5px;
                text-align: center;
                font-size: 14px;
            </style>
            <div class="upper-section">
              <div class="left-section-2">
                <div class="proposal-section">
                  <strong>Ý KIẾN ĐỀ XUẤT CỦA ĐỘI THAM MƯU</strong>
                  <div class="summary-column">
                    <div class="summary-content">Tóm tắt: <strong>${
                      record.noi_dung_van_ban || "-"
                    }.</strong></div>
                  </div>
                  <div class="summary-column">
                    <div class="summary-content">Đề xuất: <em>${(
                      record.de_xuat || "-"
                    ).replace(/;/g, "<br>")}.</em></div>
                  </div>
                  <div class="summary-column">
                  <div class="summary-content">
                    ${
                      record.ngay_het_han
                        ? `Hạn B/C: <em>${moment(record.ngay_het_han).format(
                            "DD/MM/YYYY"
                          )}</em>`
                        : "Lưu"
                    }
                  </div>
                  </div>
                  <div class="proposal-section">
                  <strong>Kính!</strong>
                </div>
              </div>
            </div>
              <div class="right-section-2">
                <div class="leadership-section">
                  <strong>Ý KIẾN CỦA LÃNH ĐẠO PHÒNG</strong>
                </div>
              </div>
            </div>
            <style>
              .noi-nhan-header {
                line-height: 1.5;
              }
              .noi-nhan {
                line-height: 2;
              }
            </style>
            <script>
              const content = document.querySelector('body::before');
              content.innerHTML = "Đội 1 - PC09";
              content.style.display = 'block';
            </script>
          </body>
        </html>
      `);
      printWindow.printContentAdded = true;

      printWindow.document.close();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
      printWindow.print();
    }
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
      searchCases(searchCondition)
        .then((response) => {
          setTotalItems(response.data.length);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
          setCases(response.data);
        })
        .catch((err) => {
          setCases([]);
        });
    } else {
      bangVanBanDen()
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

  const handleTableChange = (pagination, filters) => {
    setCurrentPage(pagination.current);
    setItemsPerPage(pagination.pageSize);
  };

  const [van_ban_den_content, setVanBanDenContent] =
    useState("CÔNG VĂN CÁC LOẠI");
  const vanBanDenContentMapping = {
    1: "TÀI LIỆU 'THƯỜNG'",
    2: "TÀI LIỆU 'MẬT'",
    3: "TÀI LIỆU KHÁC",
  };

  const onSearch = (searchParams) => {
    const {
      van_ban_den_id,
      ten_don_vi,
      noi_nhan,
      noi_dung_van_ban,
      trang_thai_van_ban,
    } = searchParams;
    setVanBanDenContent(
      vanBanDenContentMapping[van_ban_den_id] || "CÔNG VĂN CÁC LOẠI"
    );
    setSearchCondition(searchParams);
    setSelectedDateRange(searchParams.ngay_tiep_nhan);
    setSelectedDateOut(searchParams.ngay_het_han);
    setTenDonVi(ten_don_vi);
    setNoiNhan(noi_nhan);
    setTrichYeu(noi_dung_van_ban);
    setTrangThai(trang_thai_van_ban);
  };

  const currentDate = moment().format("DD/MM/YYYY");
  const currentMonthStartDate = moment().startOf("month").format("DD/MM/YYYY");

  let displayContent = "";

  if (selectedDateOut) {
    const dateText = `TỪ NGÀY ${
      selectedDateOut && selectedDateOut[0]
        ? selectedDateOut[0].format("DD/MM/YYYY")
        : currentMonthStartDate
    } 
  ĐẾN NGÀY ${
    selectedDateOut && selectedDateOut[1]
      ? selectedDateOut[1].format("DD/MM/YYYY")
      : currentDate
  }`;

    if (totalItems === 0) {
      displayContent = `PC09-HN KHÔNG CÒN ${van_ban_den_content} 
    ${
      noi_nhan ? ` GIAO Đ/C ${noi_nhan.toUpperCase()} THỰC HIỆN` : ""
    } ĐẾN HẠN BÁO CÁO TRONG KHOẢNG THỜI GIAN NÀY!`;
    } else {
      displayContent = `PC09-HN CÓ ${totalItems} ${van_ban_den_content} ${
        noi_dung_van_ban
          ? `LIÊN QUAN TỚI "${noi_dung_van_ban.toUpperCase()}"`
          : ""
      }
    ${
      noi_nhan ? ` GIAO Đ/C ${noi_nhan.toUpperCase()} THỰC HIỆN` : ""
    } ĐẾN HẠN BÁO CÁO
    ${
      trang_thai_van_ban
        ? `CÓ TRẠNG THÁI "${trang_thai_van_ban.toUpperCase()}"`
        : ""
    }`;
      displayContent = `${dateText} ${displayContent}`;
    }
  } else {
    const dateText = `TỪ NGÀY ${
      selectedDateRange && selectedDateRange[0]
        ? selectedDateRange[0].format("DD/MM/YYYY")
        : currentMonthStartDate
    } 
  ĐẾN NGÀY ${
    selectedDateRange && selectedDateRange[1]
      ? selectedDateRange[1].format("DD/MM/YYYY")
      : currentDate
  }`;

    if (totalItems === 0) {
      displayContent =
        "KHÔNG CÒN VĂN BẢN NÀO ĐƯỢC TIẾP NHẬN TRONG KHOẢNG THỜI GIAN NÀY!";
    } else {
      displayContent = `PC09-HN ĐÃ TIẾP NHẬN ${totalItems} ${van_ban_den_content} ${
        ten_don_vi ? `TỪ ${ten_don_vi.toUpperCase()}` : ""
      }
    ${
      noi_dung_van_ban
        ? `LIÊN QUAN TỚI "${noi_dung_van_ban.toUpperCase()}"`
        : ""
    }
    ${
      noi_nhan
        ? ` GIAO Đ/C ${noi_nhan.toUpperCase()} XỬ LÝ THEO PHIẾU GIAO VIỆC!`
        : ""
    }`;
      displayContent = `${dateText} ${displayContent}`;
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#237804" }}>
        QUẢN LÝ VĂN BẢN ĐẾN
      </div>
      <br />
      <SearchCase
        onSearch={onSearch}
        cases={cases}
        ten_don_vi={ten_don_vi}
        noi_nhan={noi_nhan}
        noi_dung_van_ban={noi_dung_van_ban}
        onDownloadVanBanDen={onDownloadVanBanDen}
      />
      <div>
        <p style={{ display: "flex", alignItems: "center" }}>
          <CloudDownloadOutlined
            style={{ fontSize: "28px", marginRight: "8px" }}
          />
          <span style={{ fontWeight: "bold" }}>{displayContent}</span>
        </p>
      </div>
      <Table
        rowKey={"id"}
        columns={CaseColumns}
        dataSource={cases}
        loading={cases.length === 0}
        defaultSortOrder={"DECREASE"}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalItems,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        rowClassName={(record) =>
          record.noi_nhan === null || record.noi_nhan === undefined
            ? "blinking-row"
            : ""
        }
      />
      <Modal
        visible={isPdfModalVisible}
        onCancel={closePDFModal}
        footer={null}
        width={1800}
        style={{ top: 0, right: 0, left: 0 }}
        bodyStyle={{ height: "100vh", overflow: "auto" }}
      >
        <embed src={pdfURL} type="application/pdf" width="100%" height="100%" />
      </Modal>
    </div>
  );
};

export default Cases;
