import { useCallback, useState } from "react";

interface UploadWidgetProps {
  setUrl: (url: string) => void;
  loading?: boolean;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ setUrl, loading }) => {
  const [image, setImage] = useState<string>("");
  const url = useCallback(
    (url: string) => {
      setUrl(url);
    },
    [setUrl]
  );
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        setImage(result.info.url);
        url(result.info.url);
      }
    }
  );
  return (
    <>
      {image.length === 0 ? (
        <button
          disabled={loading}
          className="w-full md:w-[50%] h-full bg-[#DC6A00] duration-500 hover:bg-[#DC6A00]/60 p-3"
          onClick={() => {
            myWidget.open();
          }}
        >
          Upload Image
        </button>
      ) : (
        <>
          <img
            src={image}
            alt=""
            className="object-cover h-[400px] mt-3 cursor-pointer"
            onClick={() => {
              if (!loading) myWidget.open();
            }}
          ></img>
          <p className="text-green-600 text-center">
            Picture added successfully
          </p>
        </>
      )}
    </>
  );
};

export default UploadWidget;
