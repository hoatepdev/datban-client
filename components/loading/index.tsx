import React, { forwardRef, useImperativeHandle, useState } from "react";

const Loading = (props: any, ref: any) => {
  const [loading, setLoading] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => {
      setLoading(true);
    },
    hide: () => {
      setLoading(false);
    },
  }));
  if (loading) return <div>Loading...</div>;
  return null;
};

export default forwardRef(Loading);
