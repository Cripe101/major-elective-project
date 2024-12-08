import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="">
      <div className="m-10 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
