import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Input,
  Col,
  Select,
  DatePicker,
  Button,
  Radio,
  TreeSelect,
} from "antd";
import moment from "moment";
import { getConfigs } from "../api";
import { useHistory } from "react-router-dom";
import { NOI_NHAN } from "../shared/constants/index";

const SearchCase = ({ onSearch, cases, onDownloadVanBanDen }) => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    const selectedNoiNhan =
      values["noi_nhan"] && values["noi_nhan"].length > 0
        ? values["noi_nhan"][0].value
        : null;
    onSearch({
      ...values,
      noi_nhan: selectedNoiNhan,
      ngay_ban_hanh_1:
        values["ngay_ban_hanh"] &&
        values["ngay_ban_hanh"][0] &&
        values["ngay_ban_hanh"][0].format("yyyy-MM-DD"),
      ngay_ban_hanh_2:
        values["ngay_ban_hanh"] &&
        values["ngay_ban_hanh"][1] &&
        values["ngay_ban_hanh"][1].format("yyyy-MM-DD"),
      ngay_tiep_nhan_1:
        values["ngay_tiep_nhan"] &&
        values["ngay_tiep_nhan"][0] &&
        values["ngay_tiep_nhan"][0].format("yyyy-MM-DD"),
      ngay_tiep_nhan_2:
        values["ngay_tiep_nhan"] &&
        values["ngay_tiep_nhan"][1] &&
        values["ngay_tiep_nhan"][1].format("yyyy-MM-DD"),
      ngay_het_han_1:
        values["ngay_het_han"] &&
        values["ngay_het_han"][0] &&
        values["ngay_het_han"][0].format("yyyy-MM-DD"),
      ngay_het_han_2:
        values["ngay_het_han"] &&
        values["ngay_het_han"][1] &&
        values["ngay_het_han"][1].format("yyyy-MM-DD"),
    });
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
    });
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Option } = Select;

  const searchControls = [
    {
      name: "van_ban_den_id",
      label: "VĂN BẢN ĐẾN",
      render: () => {
        return (
          <Select>
            {config &&
              config["van_ban_den"] &&
              config["van_ban_den"].map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        );
      },
    },
    {
      name: "ten_don_vi",
      label: "ĐƠN VỊ",
      render: () => {
        return <Input placeholder="PC01; PC02; PX01; PX02... " />;
      },
    },
    {
      name: "van_ban_den_so",
      label: "SỐ ĐẾN",
      render: () => {
        return <Input placeholder="123/TLĐ" />;
      },
    },
    {
      name: "so_van_ban",
      label: "SỐ VĂN BẢN",
      render: () => {
        return <Input placeholder="123" />;
      },
    },
    {
      name: "ngay_tiep_nhan",
      label: "NGÀY NHẬN",
      render: () => {
        return (
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
          />
        );
      },
    },
    {
      name: "noi_dung_van_ban",
      label: "TRÍCH YẾU",
      render: () => {
        return <Input placeholder="A.B.C" />;
      },
    },
    {
      name: "noi_nhan",
      label: "NƠI NHẬN",
      render: () => {
        return (
          <TreeSelect
            treeData={NOI_NHAN}
            placeholder="NƠI NHẬN"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "trang_thai_van_ban",
      label: "TRẠNG THÁI VĂN BẢN",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid" style={{ width: "100%" }}>
            <Radio.Button value="LƯU">LƯU</Radio.Button>
            <Radio.Button value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</Radio.Button>
            <Radio.Button value="XONG">XONG</Radio.Button>
          </Radio.Group>
        );
      },
    },
    {
      name: "ngay_het_han",
      label: "NGÀY HẾT HẠN",
      render: () => {
        return (
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
          />
        );
      },
    },
  ];

  const getFields = () => {
    return searchControls.map((control, i) => {
      return (
        <Col span={8} key={i}>
          <Form.Item name={control.name} label={control.label}>
            {control.render()}
          </Form.Item>
        </Col>
      );
    });
  };

  const onReset = () => {
    form.resetFields();
    window.location.reload();
  };

  const onPrint = () => {
    const printWindow = window.open("", "_blank");
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
                size: A4 landscape;
                margin: 2cm 1.5cm 2cm 2cm;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 5px;
                font-size: 14px;
              }
              th {
                background-color: #66FF33;
                font-weight: bold;
                border: 2px double black;
              }
              tr:nth-child(odd) {
                background-color: #f9f9f9;
              }
              td {
                border-width: 1pt;
                border-style: solid;
                border-color: #000;
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
                text-align: center;
                border: 1px solid white;
                font-size: 14px;
                padding: 0px;
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
                <tr>
                  <th class="agency-info" style="font-weight: normal;">CÔNG AN TP HÀ NỘI</th>
                  <th class="agency-info" style="width: 250px;"></th>
                  <th class="agency-info">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</th>
                </tr>
                <tr>
                <th class="agency-info" style="text-decoration: underline;">PHÒNG KỸ THUẬT HÌNH SỰ</th>
                  <th class="agency-info" style="width: 250px;"></th>
                  <th class="agency-info" style="text-decoration: underline;">Độc lập - Tự do - Hạnh phúc</th>
                </tr>
            </thead>
            </table>
            <div class="print-caption">GIAO NHẬN VĂN BẢN</div>
            <div class="print-date">Ngày: ${formattedDate}</div>
            <table>
              <thead>
                <br/>
                <tr>
                  <th style="width: 30px;">TT</th>
                  <th>SỐ ĐẾN</th>
                  <th style="width: 100px;">ĐƠN VỊ</th>
                  <th>SỐ VĂN BẢN</th>
                  <th>NGÀY KÝ</th>
                  <th>NGÀY NHẬN</th>
                  <th>TRÍCH YẾU</th>
                  <th class="noi-nhan-header">NƠI NHẬN</th>
                  <th style="width: 150px;">KÝ NHẬN</th>
                </tr>
              </thead>
              <tbody>
                ${cases
                  .map(
                    (c, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${c.van_ban_den_so || "-"}</td>
                    <td>${c.ten_don_vi || "-"}</td>
                    <td>${c.so_van_ban || "-"}</td>
                    <td>${
                      c.ngay_ban_hanh
                        ? moment(c.ngay_ban_hanh).format("DD/MM/YYYY")
                        : "-"
                    }</td>
                    <td>${
                      c.ngay_tiep_nhan
                        ? moment(c.ngay_tiep_nhan).format("DD/MM/YYYY")
                        : "-"
                    }</td>
                    <td>${c.noi_dung_van_ban || "-"}</td>
                    <td class="noi-nhan" style="white-space: pre-wrap; width: 150px;">${(c.noi_nhan
                      ? c.noi_nhan.replace(/,/g, "<br>")
                      : "TB GIAO BAN(LƯU: H.Anh)"
                    ).replace(/,/g, "<br>")}</td>
                    <td> </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
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
    printWindow.document.close();
    printWindow.setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={12} style={{ textAlign: "left" }}>
            <Button
              onClick={() => {
                history.push("/quan-ly-van-ban/new");
              }}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              NHẬP VĂN BẢN ĐẾN
            </Button>
            <Button
              type="primary"
              style={{ margin: "0 8px" }}
              onClick={onPrint}
            >
              SỔ GIAO NHẬN CÔNG VĂN
            </Button>
            <Button
              onClick={onDownloadVanBanDen}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              TẢI DANH SÁCH
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <div>
              <Button type="primary" htmlType="submit">
                TÌM KIẾM
              </Button>
              <Button style={{ margin: "0 8px" }} onClick={onReset}>
                XÓA
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchCase;
