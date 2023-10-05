import ReactLoading from "react-loading";

interface LoadingModalProps {
  open?: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ open }) => {
  return (
    <div
      className={`fixed z-[70] w-full h-full ${
        open ? "translate-y-0 ease-out" : "translate-y-full ease-in"
      } duration-300 bg-black/80 overflow-y-hidden flex justify-center items-center`}
    >
      <div className="flex flex-col items-center">
        <ReactLoading type="bars" color="#fff" height={60} width={60} />
      </div>
    </div>
  );
};

export default LoadingModal;
