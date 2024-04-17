import React from "react";
import SidebarMain from "../components/SidebarMain";

interface LayoutProps {
  title: string;
  content: React.ReactNode;
}

const LayoutMain = (props: LayoutProps) => {
  const { title, content } = props;
  return (
    <div className="flex ">
      <SidebarMain />
      <div className="w-screen p-4">
        <div id="header" className="w-full">
          <h1 className="text-2xl m-2 font-semibold">{title}</h1>
        </div>
        <div className="m-2 w-100">{content}</div>
      </div>
    </div>
  );
};

export default LayoutMain;
