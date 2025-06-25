"use client";
import Dialog from "@/components/common/dialog";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import AuthForm from "../auth-form";
import { TYPE_AUTH } from "@/constants/auth";

const AuthWrap = (
  {
    type = TYPE_AUTH.DIALOG,
  }: { type?: (typeof TYPE_AUTH)[keyof typeof TYPE_AUTH] },
  ref: React.Ref<{ open: () => void; close: () => void }>,
) => {
  const [state, _setState] = useState({
    open: false,
  });
  const setState = (data = {}) => _setState((pre) => ({ ...pre, ...data }));

  useImperativeHandle(ref, () => ({
    open: () => {
      setState({ open: true });
    },
    close: () => setState({ open: false }),
  }));

  return (
    <div>
      {type === TYPE_AUTH.REDIRECT ? (
        <AuthForm />
      ) : (
        <>
          <Dialog
            open={state.open}
            handleClose={() => setState({ open: false })}
            className="max-w-4xl overflow-y-auto border-0 p-0 md:max-h-[90vh]"
          >
            <AuthForm />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default forwardRef(AuthWrap);
