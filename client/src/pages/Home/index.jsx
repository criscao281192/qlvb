import React, { useEffect, useState } from "react";

import { getConfigs } from "../../api";
import ThongKeVanBanTheoThang from "./ThongKeVanBanTheoThang";
import ThongKeCanBoPhuTrach from "./ThongKeCanBoPhuTrach";
import ThongKeTheoCoQuanBanHanh from "./ThongKeTheoCoQuanBanHanh";
import ThongBaoLich from "./ThongBaoLich";

const Home = () => {
  

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
     
    });
  }, []);

  return (
    <div>
      <br />
      <ThongBaoLich config={config} />
      <br />
      <ThongKeVanBanTheoThang config={config} />
      <br />
      <ThongKeCanBoPhuTrach config={config} />
      <br />
      <ThongKeTheoCoQuanBanHanh config={config} />
    </div>
  );
};

export default Home;
