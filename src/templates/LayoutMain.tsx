import React from "react";

interface LayoutProps {
  title: string;
  content: React.ReactNode;
}

const LayoutMain = (props: LayoutProps) => {
  const { title, content } = props;
  return (
    <div className="p-3">
      <div id="header" className="w-full">
        <h1 className="text-2xl m-2 font-semibold">{title}</h1>
      </div>
      <div className="">{content}</div>
    </div>
  );
};

export default LayoutMain;
