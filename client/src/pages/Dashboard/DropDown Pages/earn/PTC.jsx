import React from 'react'
import { BreadCrumb, ComingSoon } from "../../../../components";
const PTC = () => {
  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "PTC", href: "/dashboard/ptc" },
  ];

  return (
    <>
      <BreadCrumb title="PTC - Paid to click" breadcrumbs={breadcrumbs} />
      <ComingSoon title={"PTC"} time={"soon"} />
    </>
  );
}

export default PTC