import React from "react";
import MainContentContainer from "../common/MainContentContainer";
import Navbar from "../components/Navbar";

interface IProps {
  children?: React.ReactNode;
}

function HomePageLayout(props: IProps) {
  const { children } = props;
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
}

export default HomePageLayout;
