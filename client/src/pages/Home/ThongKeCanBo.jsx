import React, { useEffect, useState } from "react";
import { countCanBo } from "../../api";
import { DAO_TAO, TRINH_DO, DOAN_THE, GIOI_TINH, CHUC_DANH, TRINH_DO_LY_LUAN, CAP_BAC } from "../../shared/constants";

const ThongKeCanBo = () => {
    const [caseCanBos, setCaseCanBos] = useState([]);
    const [queryConditions, setQueryConditions] = useState({
        trinh_do_ly_luan: "",
        trinh_do_dao_tao: "",
        trinh_do_cong_an: "",
        doan_the: "",
        chuc_danh: "",
        gioi_tinh: "",
        cap_bac: "",
    });

    useEffect(() => {
        countCanBo(queryConditions)
            .then((response) => {
                setCaseCanBos(response.data);
            })
            .catch((err) => {
                console.error(err);
                setCaseCanBos([]);
            });
    }, [queryConditions]);

    const mapDoiCongTac = (don_vi_cong_tac) => {
        switch (don_vi_cong_tac) {
            case "0":
                return "Lãnh đạo Phòng";
            case "1":
                return "Đội 1";
            case "2":
                return "Đội 2";
            case "3":
                return "Đội 3";
            case "4":
                return "Đội 4";
            case "5":
                return "Đội 5";
            default:
                return "Không xác định";
        }
    };

    const totalCanBo = caseCanBos.reduce(
        (total, item) => total + item.so_luong_can_bo,
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQueryConditions((prevConditions) => ({
            ...prevConditions,
            [name]: value,
        }));
    };

    return (
        <div style={{ textAlign: "center", minHeight: 350 }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#0958d9" }}>
                THỐNG KÊ CÁN BỘ
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold", color: "#006241" }}>
                <div style={{ marginRight: "20px" }}>
                    <label >TRÌNH ĐỘ LÝ LUẬN:</label>
                    <select
                        name="trinh_do_ly_luan"
                        value={queryConditions.trinh_do_ly_luan}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN TRÌNH ĐỘ --</option>
                        {TRINH_DO_LY_LUAN.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginRight: "20px" }}>
                    <label>TRÌNH ĐỘ ĐÀO TẠO:</label>
                    <select
                        name="trinh_do_dao_tao"
                        value={queryConditions.trinh_do_dao_tao}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN TRÌNH ĐỘ --</option>
                        {DAO_TAO.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>NGHIỆP VỤ CÔNG AN:</label>
                    <select
                        name="trinh_do_cong_an"
                        value={queryConditions.trinh_do_cong_an}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN TRÌNH ĐỘ --</option>
                        {TRINH_DO.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>CHỨC DANH:</label>
                    <select
                        name="chuc_danh"
                        value={queryConditions.chuc_danh}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN CHỨC DANH --</option>
                        {CHUC_DANH.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>ĐOÀN THỂ:</label>
                    <select
                        name="doan_the"
                        value={queryConditions.doan_the}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN ĐOÀN THỂ --</option>
                        {DOAN_THE.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>GIỚI TÍNH:</label>
                    <select
                        name="gioi_tinh"
                        value={queryConditions.gioi_tinh}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN GIỚI TÍNH --</option>
                        {GIOI_TINH.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>CẤP BẬC:</label>
                    <select
                        name="cap_bac"
                        value={queryConditions.cap_bac}
                        onChange={handleInputChange}
                    >
                        <option value="">-- CHỌN CẤP BẬC HÀM --</option>
                        {CAP_BAC.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <br />
            <table style={{ margin: "auto" }}>
                <thead>
                    <tr>
                        <th>ĐƠN VỊ CÔNG TÁC</th>
                        <th>SỐ LƯỢNG CÁN BỘ</th>
                    </tr>
                </thead>
                <tbody>
                    {caseCanBos.map((item, index) => (
                        <tr key={index}>
                            <td>{mapDoiCongTac(item.don_vi_cong_tac)}</td>
                            <td>{item.so_luong_can_bo}</td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <strong>TỔNG</strong>
                        </td>
                        <td>
                            <strong>{totalCanBo}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ThongKeCanBo;