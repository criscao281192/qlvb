import React, { useEffect, useState } from "react";
import { Form, Row, Input, Col, DatePicker, Button, TreeSelect } from "antd";
import { getConfigPersonnel } from "../api/personnel";
import { useHistory } from "react-router-dom";
import {
  DON_VI,
  CHUC_VU,
  LINH_VUC,
  TRINH_DO,
  DAO_TAO,
} from "../shared/constants/index";

const SearchCaseCanBo = ({ onSearch, onDownload }) => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    const selectedDoiCongTac =
      values["doi_cong_tac"] && values["doi_cong_tac"].length > 0
        ? values["doi_cong_tac"][0].value
        : null;
    const selectedChucVu =
      values["chuc_vu"] && values["chuc_vu"].length > 0
        ? values["chuc_vu"][0].value
        : null;
    const selectedLinhVuc =
      values["linh_vuc_cong_tac"] && values["linh_vuc_cong_tac"].length > 0
        ? values["linh_vuc_cong_tac"][0].value
        : null;
    const selectedTrinhDoCongAn =
      values["trinh_do_cong_an"] && values["trinh_do_cong_an"].length > 0
        ? values["trinh_do_cong_an"][0].value
        : null;
    const selectedTrinhDoLyLuan =
      values["trinh_do_ly_luan"] && values["trinh_do_ly_luan"].length > 0
        ? values["trinh_do_ly_luan"][0].value
        : null;
    const selectedTrinhDoDaoTao =
      values["trinh_do_dao_tao"] && values["trinh_do_dao_tao"].length > 0
        ? values["trinh_do_dao_tao"][0].value
        : null;
    onSearch({
      ...values,
      doi_cong_tac: selectedDoiCongTac,
      linh_vuc_cong_tac: selectedLinhVuc,
      chuc_vu: selectedChucVu,
      trinh_do_cong_an: selectedTrinhDoCongAn,
      trinh_do_ly_luan: selectedTrinhDoLyLuan,
      trinh_do_dao_tao: selectedTrinhDoDaoTao,
      ngay_sinh_1:
        values["ngay_sinh"] &&
        values["ngay_sinh"][0] &&
        values["ngay_sinh"][0].format("yyyy-MM-DD"),
      ngay_sinh_2:
        values["ngay_sinh"] &&
        values["ngay_sinh"][1] &&
        values["ngay_sinh"][1].format("yyyy-MM-DD"),
      ngay_vao_nganh_1:
        values["ngay_vao_nganh"] &&
        values["ngay_vao_nganh"][0] &&
        values["ngay_vao_nganh"][0].format("yyyy-MM-DD"),
      ngay_vao_nganh_2:
        values["ngay_vao_nganh"] &&
        values["ngay_vao_nganh"][1] &&
        values["ngay_vao_nganh"][1].format("yyyy-MM-DD"),
      ngay_vao_dang_1:
        values["ngay_vao_dang"] &&
        values["ngay_vao_dang"][0] &&
        values["ngay_vao_dang"][0].format("yyyy-MM-DD"),
      ngay_vao_dang_2:
        values["ngay_vao_dang"] &&
        values["ngay_vao_dang"][1] &&
        values["ngay_vao_dang"][1].format("yyyy-MM-DD"),
      ngay_bo_nhiem_1:
        values["ngay_bo_nhiem"] &&
        values["ngay_bo_nhiem"][0] &&
        values["ngay_bo_nhiem"][0].format("yyyy-MM-DD"),
      ngay_bo_nhiem_2:
        values["ngay_bo_nhiem"] &&
        values["ngay_bo_nhiem"][1] &&
        values["ngay_bo_nhiem"][1].format("yyyy-MM-DD"),
    });
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigPersonnel().then((data) => {
      setConfig(data);
    });
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const searchControls = [
    {
      name: "ho_ten",
      label: "HỌ VÀ TÊN",
      render: () => {
        return <Input placeholder="Nguyễn Văn A" />;
      },
    },
    {
      name: "que_quan",
      label: "QUÊ QUÁN",
      render: () => {
        return <Input placeholder="xã - huyện - tỉnh" />;
      },
    },
    {
      name: "so_hieu",
      label: "SỐ HIỆU",
      render: () => {
        return <Input placeholder="123 - 456" />;
      },
    },
    {
      name: "ngay_sinh",
      label: "NGÀY SINH",
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
      name: "ngay_vao_nganh",
      label: "NGÀY VÀO NGÀNH",
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
      name: "ngay_vao_dang",
      label: "NGÀY VÀO ĐẢNG",
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
      name: "doi_cong_tac",
      label: "ĐƠN VỊ CÔNG TÁC",
      render: () => {
        return (
          <TreeSelect
            treeData={DON_VI}
            placeholder="ĐƠN VỊ"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "linh_vuc_cong_tac",
      label: "LĨNH VỰC CÔNG TÁC",
      render: () => {
        return (
          <TreeSelect
            treeData={LINH_VUC}
            placeholder="LĨNH VỰC CÔNG TÁC"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "chuc_vu",
      label: "CHỨC VỤ",
      render: () => {
        return (
          <TreeSelect
            treeData={CHUC_VU}
            placeholder="CHỨC VỤ"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "ngay_bo_nhiem",
      label: "NGÀY BỔ NHIỆM",
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
      name: "trinh_do_ly_luan",
      label: "TRÌNH ĐỘ LÝ LUẬN",
      render: () => {
        return (
          <TreeSelect
            treeData={TRINH_DO}
            placeholder="TRÌNH ĐỘ LÝ LUẬN"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "trinh_do_dao_tao",
      label: "TRÌNH ĐỘ ĐÀO TẠO",
      render: () => {
        return (
          <TreeSelect
            treeData={DAO_TAO}
            placeholder="TRÌNH ĐỘ ĐÀO TẠO"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "trinh_do_cong_an",
      label: "NGHIỆP VỤ CÔNG AN",
      render: () => {
        return (
          <TreeSelect
            treeData={DAO_TAO}
            placeholder="NGHIỆP VỤ CÔNG AN"
            treeCheckable={true}
            treeCheckStrictly={true}
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
                history.push("/quan-ly-can-bo/tao-moi");
              }}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              NHẬP CÁN BỘ MỚI
            </Button>
            <Button
              onClick={onDownload}
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

export default SearchCaseCanBo;
