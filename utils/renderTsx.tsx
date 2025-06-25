export const renderMessageToastTsx = (message: string | string[]) => {
  if (typeof message === "string") {
    return <div>{message}</div>;
  }
  return message.map((item, index) => <div key={index}>{item}</div>);
};
