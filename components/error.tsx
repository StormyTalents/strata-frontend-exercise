import { FC } from "react";

const ErrorMsg: FC<{ text?: string }> = ({ text = "Sample Error Text" }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-base font-bold text-red-600 text-center">{text}</p>
    </div>
  );
};

export default ErrorMsg;
