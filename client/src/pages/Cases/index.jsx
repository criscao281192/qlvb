import React, { useState, useEffect } from "react";
import { Table, Checkbox } from "antd";
import SearchCase from "../../components/SearchCase";
import {
  EditOutlined,
  SaveTwoTone,
  CheckCircleTwoTone,
  SyncOutlined,
  TeamOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { searchVanBanDen, bangVanBanDen } from "../../api";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  const [sortedInfo] = useState({});
  const [selectAll, setSelectAll] = useState(false);
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
      title: (
        <Checkbox
          checked={selectAll}
          onChange={(e) => handleSelectAll(e)}
        ></Checkbox>
      ),
      dataIndex: "selected",
      key: "selected",
      align: "center",
      width: 30,
      render: (text, record) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => handleCheckboxChange(e, record)}
        />
      ),
    },
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
      sorter: (a, b) => new Date(a.ngay_tiep_nhan) - new Date(b.ngay_tiep_nhan),
      sortOrder:
        sortedInfo.columnKey === "ngay_tiep_nhan"
          ? sortedInfo.order
          : "decrease",
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
        </>
      ),
    },
    // {
    //   title: "PDF",
    //   key: "",
    //   dataIndex: "action",
    //   align: "center",
    //   width: 50,
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
                history.push(`/quan-ly-van-ban/xu-ly-van-ban/${record.id}`)
              }
            />
          )}
          <EditOutlined
            className="icon-wrapper-2"
            onClick={() =>
              history.push(`/quan-ly-van-ban/xu-ly-van-ban/${record.id}`)
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
  ];

  const onDownloadVanBanDen = () => {
    let downloadColumns = DownloadColumns;
    if (!searchCondition.van_ban_den_id) {
      downloadColumns = [
        { title: "VĂN BẢN ĐẾN", dataIndex: "van_ban_den", key: "van_ban_den", render: (data) => data ? data.name : "" },
        ...DownloadColumns.slice(1)
      ];
    }
    const csvHeader = downloadColumns.map(({ title }) => title).join("###") + "\r\n";
    const csvBody = cases.reduce((body, c) => {
      c.van_ban_den = c.van_ban_den ? c.van_ban_den.name : "";
      c.ngay_ban_hanh = moment(c.ngay_ban_hanh).format("DD/MM/YYYY");
      c.ngay_tiep_nhan = moment(c.ngay_tiep_nhan).format("DD/MM/YYYY");
      c.ngay_het_han = moment(c.ngay_het_han).format("DD/MM/YYYY");
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

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    const updatedCases = cases.map((c) => {
      return { ...c, selected: checked };
    });
    setCases(updatedCases);
  };

  const handleCheckboxChange = (e, record) => {
    const updatedCases = cases.map((c) => {
      if (c.id === record.id) {
        return { ...c, selected: e.target.checked };
      }
      return c;
    });
    setCases(updatedCases);
  };

  const onPrint = (record) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow.printContentAdded) {
      const currentDate = new Date();
      const formattedDate = moment(currentDate).format("DD/MM/YYYY");
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
                  <td class="left-section">SỐ ĐẾN: <strong>${record.van_ban_den_so || "-"
        }</strong></td>
                  <td class="middle-section">ĐƠN VỊ: <strong>${record.ten_don_vi || "-"
        }</strong></td>
                  <td class="right-section">VĂN BẢN SỐ: <strong>${record.so_van_ban || "-"
        }</strong></td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td class="left-section">NGÀY KÝ: <strong>${record.ngay_ban_hanh
          ? moment(record.ngay_ban_hanh).format("DD/MM/YYYY")
          : "-"
        }</strong></td>
                  <td class="middle-section no-border">NGÀY NHẬN: <strong>${record.ngay_tiep_nhan
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
              }
              .proposal-section-1 {
                padding: 10px;
                margin: 5px;
                text-align: center;
                font-size: 20px;
              }
            </style>
            <div class="upper-section">
              <div class="left-section-2">
                <div class="proposal-section">
                  <strong>Ý KIẾN ĐỀ XUẤT CỦA ĐỘI THAM MƯU</strong>
                  <div class="summary-column">
                    <div class="summary-content">Tóm tắt: <strong>${record.noi_dung_van_ban || "-"
        }.</strong></div>
                  </div>
                  <div class="summary-column">
                    <div class="summary-content">Đề xuất: <em>${record.de_xuat || "-"}.</em></div>
                  </div>
                  <div class="summary-column">
                  <div class="summary-content">
                    ${record.ngay_het_han
          ? `Hạn B/C: <em>${moment(record.ngay_het_han).format(
            "DD/MM/YYYY"
          )}</em>`
          : "Lưu"
        }
                  </div>
                  </div>
                  <div class="proposal-section-1">
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
      searchVanBanDen(searchCondition)
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
          const allUnchecked = response.data.result.every((c) => !c.selected);
          if (allUnchecked) {
            const updatedCases = response.data.result.map((c) => {
              return { ...c, selected: true };
            });
            setCases(updatedCases);
            setSelectAll(true);
          }
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

  const onSearch = (searchParams) => {
    setSearchCondition(searchParams);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#237804" }}>
        QUẢN LÝ VĂN BẢN ĐẾN
      </div>
      <br />
      <SearchCase
        onSearch={onSearch}
        cases={cases}
        onDownloadVanBanDen={onDownloadVanBanDen}
      />
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

export default Cases;
