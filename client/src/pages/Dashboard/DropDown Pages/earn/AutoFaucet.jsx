import React from "react";
import { BreadCrumb, ComingSoon } from "../../../../components";

const AutoFaucet = () => {
  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Auto Faucet", href: "/dashboard/auto-faucet" },
  ];

  return (
    <>
      <BreadCrumb title="Auto Faucet" breadcrumbs={breadcrumbs} />
      <ComingSoon title={"Auto Faucet"} time={"soon"} />
    </>
  );
};

export default AutoFaucet;
