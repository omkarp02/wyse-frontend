import Loader from "./Loader";

interface IScreenLoader {
  open: boolean;
}

const ScreenLoader = ({ open }: IScreenLoader) => {
  if (!open) return "";

  return (
    <div className="flex-center fixed top-0 left-0 min-h-screen h-full bg-[rgba(0,0,0,0.5)] z-[1000]  w-full">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
