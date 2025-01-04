import { FC } from "react";
import { FallingLines } from "react-loader-spinner";

interface LoaderProps {
  color?: string;
  width?: string | number;
  visible?: boolean;
  ariaLabel?: string;
  homepage?: boolean;
}

const Loader: FC<LoaderProps> = ({ color = "#8159f3", homepage }) => {
  return (
    <div
      className={`w-full ${
        homepage ? "h-screen" : "h-full"
      }  flex justify-center items-center`}
    >
      <FallingLines color={color} />
    </div>
  );
};

export default Loader;
