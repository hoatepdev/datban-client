import React from "react";
import Header from "@/components/header";
import Nav from "@/components/common/nav";
import Footer from "@/components/common/footer";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Header />
      <div className="">{children}</div>
      <div className="block md:hidden">
        <Nav />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutProvider;
