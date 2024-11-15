import React from 'react'
import { BreadCrumb, ComingSoon } from "../../../../components";


const ShortLinks = () => {
  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Short Links", href: "/dashboard/auto-faucet" },
  ];

  return (
    <>
      <BreadCrumb title="Short Links" breadcrumbs={breadcrumbs} />
      <ComingSoon title={"Short Links"} time={"soon"} />
    </>
  );
}

export default ShortLinks