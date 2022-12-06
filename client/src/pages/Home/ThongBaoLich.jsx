import React from 'react';
import { Badge, Calendar } from 'antd';

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 14:
      listData = [
        { type: 'warning', content: 'PHÂN LOẠI CÁN BỘ ĐƠN VỊ.',},
        { type: 'success', content: '...',},
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'GỬI BC QLCB VỀ PX01.',},
        { type: 'success', content: '...',},
      ];
      break;
    case 18:
      listData = [
        { type: 'warning', content: 'GỬI PHÂN LOẠI CÁN BỘ SANG CATP',},
        { type: 'success', content: '...',},
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 10) {
    return "Tháng 11";
  }
};

const ThongBaoLich = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>TỔNG KẾT NĂM</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
    <h2>CÔNG VIỆC ĐẾN HẠN BÁO CÁO</h2>
    <Calendar width={1000} 
    height={300} 
    margin={{
      top: 5,
      right: 50,
      left: 50,
      bottom: 10,
    }}
    dateCellRender={dateCellRender} 
    monthCellRender={monthCellRender} />;
    </div>
  );
};

export default ThongBaoLich;