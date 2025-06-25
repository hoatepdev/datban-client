"use client";

import React, { createContext } from "react";
import { useMobileDetect } from "@/hooks/useMobileDetect";

export const DeviceContext = createContext(false);

const DeviceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useMobileDetect();

  return (
    <DeviceContext.Provider value={isMobile}>{children}</DeviceContext.Provider>
  );
};

export default DeviceContextProvider;
