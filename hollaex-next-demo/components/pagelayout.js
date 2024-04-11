import React from "react";
import AppBar from "./appbar";

const PageLayout = ({ children, hideMenu }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar hideMenu={hideMenu} />
      <div className="items-center justify-center flex py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
