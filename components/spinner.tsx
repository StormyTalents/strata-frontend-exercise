import { FC } from "react";

const SpinnerBox: FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
    </div>
  );
};

export default SpinnerBox;
