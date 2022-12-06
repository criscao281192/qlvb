import React, { useState, useEffect } from "react";
import { Table } from "antd";
import SearchCase from "../../components/SearchCase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteCase, searchCases } from "../../api";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  let history = useHistory();

  const CaseColumns = [
    {
      title: "ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
    },
    {
      title: "NGÀY BAN HÀNH",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NGÀY TIẾP NHẬN",
      key: "ngay_tiep_nhan",
      dataIndex: "ngay_tiep_nhan",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NỘI DUNG",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "YÊU CẦU",
      key: "yeu_cau",
      dataIndex: "yeu_cau",
    },
    {
      title: "ĐỘI BÁO CÁO",
      key: "doi_bao_cao",
      dataIndex: "doi_bao_cao",
    },
    {
      title: "NGÀY HẾT HẠN",
      key: "ngay_het_han",
      dataIndex: "ngay_het_han",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NGÀY TRẢ LỜI",
      key: "ngay_van_ban_tra_loi",
      dataIndex: "ngay_van_ban_tra_loi",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "TRẠNG THÁI",
      key: "trang_thai_van_ban",
      dataIndex: "trang_thai_van_ban",
    },
    {
      title: "LÃNH ĐẠO PHỤ TRÁCH",
      key: "lanh_dao_phu_trach",
      dataIndex: "lanh_dao_phu_trach",
    },
    {
      title: "CÁN BỘ THEO DÕI",
      key: "phu_trach",
      dataIndex: "phu_trach",
      render: (data) => data && data.name,
    },
    {
      title: "",
      key: "",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <EditOutlined
            onClick={() => history.push(`/quan-ly-van-ban/edit/${record.id}`)}
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
      title: "SỐ TÀI LIỆU",
      dataIndex: "so_tai_lieu",
      key: "so_tai_lieu",
    },
    {
      title: "CƠ QUAN BAN HÀNH",
      dataIndex: "co_quan_ban_hanh",
      key: "co_quan_ban_hanh",
      render: (data) => data && data.name,
    },
    {
      title: "ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
    },
    {
      title: "NGÀY BAN HÀNH",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NGÀY TIẾP NHẬN",
      key: "ngay_tiep_nhan",
      dataIndex: "ngay_tiep_nhan",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "ĐỘ MẬT",
      key: "do_mat",
      dataIndex: "do_mat",
    },
    {
      title: "ĐỘ KHẨN",
      key: "do_khan",
      dataIndex: "do_khan",
    },
    {
      title: "NỘI DUNG VĂN BẢN",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "YÊU CẦU CỦA VĂN BẢN",
      key: "yeu_cau",
      dataIndex: "yeu_cau",
    },
    {
      title: "NGÀY HẾT HẠN",
      key: "ngay_het_han",
      dataIndex: "ngay_het_han",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NGƯỜI KÍ",
      key: "nguoi_ki",
      dataIndex: "nguoi_ki",
    },
    {
      title: "ĐỘI BÁO CÁO",
      key: "doi_bao_cao",
      dataIndex: "doi_bao_cao",
    },
    {
      title: "LÃNH ĐẠO PHỤ TRÁCH",
      key: "lanh_dao_phu_trach",
      dataIndex: "lanh_dao_phu_trach",
    },
    {
      title: "CÁN BỘ - ĐỘI",
      key: "phu_trach",
      dataIndex: "phu_trach",
      render: (data) => data && data.name,
    },
    {
      title: "SỐ BC/KH TRẢ LỜI",
      key: "so_van_ban_tra_loi",
      dataIndex: "so_van_ban_tra_loi",
    },
    {
      title: "NGÀY TRẢ LỜI",
      key: "ngay_van_ban_tra_loi",
      dataIndex: "ngay_van_ban_tra_loi",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "TRẠNG THÁI",
      key: "trang_thai_van_ban",
      dataIndex: "trang_thai_van_ban",
    },
  ];

  useEffect(() => {
    searchCases(searchCondition)
      .then((response) => {
        setCases(response.data);
      })
      .catch((err) => {
        setCases([]);
      });
  }, [searchCondition]);

  const onDownload = () => {
    const csvHeader =
      DownloadColumns.map(({ title }) => title).join("###") + "\r\n";

    const csvBody = cases.reduce((body, c) => {
      c.loai_tai_lieu = c.loai_tai_lieu.name;
      c.co_quan_ban_hanh = c.co_quan_ban_hanh.name;
      c.phu_trach = c.phu_trach.name;

      c.ngay_ban_hanh = moment(c.ngay_ban_hanh).format("DD/MM/YYYY");
      c.ngay_tiep_nhan = moment(c.ngay_tiep_nhan).format("DD/MM/YYYY");
      c.ngay_het_han = moment(c.ngay_het_han).format("DD/MM/YYYY");
      c.ngay_van_ban_tra_loi = moment(c.ngay_van_ban_tra_loi).format("DD/MM/YYYY");

      return (body +=
        DownloadColumns.map(({ key }) => {
          return c[key] === 0 ? c[key] : c[key] ? `${c[key]}` : "-";
        }).join("###") + "\r\n");
    }, "");

    const csvContent = csvHeader + csvBody;

    console.log(csvContent);

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
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

  const DownloadColumns1 = [
    {
      title: "SỐ TÀI LIỆU",
      dataIndex: "so_tai_lieu",
      key: "so_tai_lieu",
    },
    {
      title: "ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
    },
    {
      title: "NGÀY BAN HÀNH",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NGÀY TIẾP NHẬN",
      key: "ngay_tiep_nhan",
      dataIndex: "ngay_tiep_nhan",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
    },
    {
      title: "NỘI DUNG VĂN BẢN",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "ĐỘI BÁO CÁO",
      key: "doi_bao_cao",
      dataIndex: "doi_bao_cao",
    },
    {
      title: "LÃNH ĐẠO PHỤ TRÁCH",
      key: "lanh_dao_phu_trach",
      dataIndex: "lanh_dao_phu_trach",
    },
    {
      title: "CÁN BỘ THEO DÕI",
      key: "phu_trach",
      dataIndex: "phu_trach",
      render: (data) => data && data.name,
    },
    {
      title: "KÝ NHẬN",
    },
  ];

  useEffect(() => {
    searchCases(searchCondition)
      .then((response) => {
        setCases(response.data);
      })
      .catch((err) => {
        setCases([]);
      });
  }, [searchCondition]);

  const onDownload1 = () => {
    const csvHeader =
      DownloadColumns1.map(({ title }) => title).join("###") + "\r\n";

    const csvBody = cases.reduce((body, c) => {
      c.loai_tai_lieu = c.loai_tai_lieu.name;
      c.co_quan_ban_hanh = c.co_quan_ban_hanh.name;
      c.phu_trach = c.phu_trach.name;

      c.ngay_ban_hanh = moment(c.ngay_ban_hanh).format("DD/MM/YYYY");
      c.ngay_tiep_nhan = moment(c.ngay_tiep_nhan).format("DD/MM/YYYY");
      c.ngay_het_han = moment(c.ngay_het_han).format("DD/MM/YYYY");
      c.ngay_van_ban_tra_loi = moment(c.ngay_van_ban_tra_loi).format("DD/MM/YYYY");

      return (body +=
        DownloadColumns1.map(({ key }) => {
          return c[key] === 0 ? c[key] : c[key] ? `${c[key]}` : "-";
        }).join("###") + "\r\n");
    }, "");

    const csvContent = csvHeader + csvBody;

    console.log(csvContent);

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
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

  return (
    <div>
      <br/>
      <h1>QUẢN LÝ CÔNG VĂN</h1>
      <SearchCase
        onSearch={(values) => setSearchCondition(values)}
        onDownload={onDownload}
        onDownload1={onDownload1}
      />
      <br />

      <Table rowKey={"id"} columns={CaseColumns} dataSource={cases} />
    </div>
  );
};

export default Cases;