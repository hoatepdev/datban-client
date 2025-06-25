"use client";

import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { useState, useEffect } from "react";

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const isMobileLocalStorage = getLocalStorage("isMobile", false);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      setIsMobile(isMobileLocalStorage);
    } else {
      const isMobileUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator?.userAgent || "",
        );
      if (isMobileUserAgent && !isMobile) {
        setIsMobile(true);
        setLocalStorage("isMobile", true);
      } else {
        const checkMobile = () => {
          const isMobileWidth = window.innerWidth < 768;
          if (isMobileWidth !== isMobile && isMobileUserAgent === false) {
            setIsMobile(isMobileWidth);
            setLocalStorage("isMobile", isMobileWidth);
          }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
      }
    }
  }, [isFirstRender]);

  return { isMobile: isFirstRender ? isMobileLocalStorage : isMobile };
};
