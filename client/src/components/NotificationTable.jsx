import React from "react";
import moment from "moment";
import styled from "styled-components";
import { List } from "antd";
import { useHistory } from "react-router-dom";

const NotificationPopup = styled.div`
  position: fixed;
  top: 50px;
  right: 20px;
  background-color: white;
  border-radius: 4px;
  z-index: 1;
  max-height: 100%;
  max-width: 300px;
  overflow-y: auto;

  &.visible {
    display: block;
  }
`;

const ListItem = styled(List.Item)`
  :hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const NotificationTable = ({ notifications, onClickItem }) => {
  const history = useHistory();

  const handleClickItem = (id) => {
    onClickItem();
    history.push(`/quan-ly-van-ban/xu-ly-van-ban/${id}`);
  };

  return (
    <NotificationPopup>
      <List
        size="small"
        bordered
        dataSource={notifications}
        renderItem={(item) => (
          <ListItem
            onClick={() => {
              handleClickItem(item.id);
            }}
          >
            Đã nhận văn bản số {item.van_ban_den_so} từ {item.ten_don_vi} ngay{" "}
            {item.ngay_tiep_nhan
              ? moment(item.ngay_tiep_nhan).format("DD/MM/YYYY")
              : "-"}
          </ListItem>
        )}
      />
    </NotificationPopup>
  );
};

export default NotificationTable;
