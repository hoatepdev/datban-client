"use client";

import { useRef } from "react";
import AuthWrap from "@/components/auth/auth-wrap";
import { TYPE_AUTH } from "@/constants/auth";

export default function Onboard() {
  const ref = useRef<{ open: () => void; close: () => void }>(null);

  return (
    <div>
      <button
        onClick={() => {
          ref.current?.open();
        }}
      >
        Open login dialog
      </button>
      <AuthWrap ref={ref} type={TYPE_AUTH.DIALOG} />
    </div>
  );
}
