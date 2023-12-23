import React, { useEffect, useState } from "react";
import { getConfigs } from "../../api";
import ThongKeVanBanDi from "./ThongKeVanBanDi";
import ThongKeVanBanDen from "./ThongKeVanBanDen";
import ThongKeVanBanDenDifference from "./ThongKeVanBanDenDifference";
import ThongKeVanBanDiDifference from "./ThongKeVanBanDiDifference";

const ThongKe = () => {
  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
    });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gridGap: "5px",
        border: "1px solid transparent",
        position: "relative",
      }}
    >
      <div
        style={{
          gridColumn: "1 / 3",
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "1px",
          height: "100%",
          backgroundColor: "blue",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      />
      <div
        style={{
          gridRow: "1 / 3",
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "1px",
          backgroundColor: "blue",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      />
      <ThongKeVanBanDen config={config} />
      <ThongKeVanBanDi config={config} />
      <ThongKeVanBanDenDifference config={config} />
      <ThongKeVanBanDiDifference config={config} />
    </div>
  );
};

export default ThongKe;
