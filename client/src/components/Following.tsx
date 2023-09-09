import User from "./user/User";

const Following = () => {
  return (
    <div className="w-[30%] text-[#DC6A00] flex justify-center">
      <div className="w-full min-h-[10%]">
        <h1 className="text-2xl font-bold text-center my-6">Your following</h1>
        <div className="flex flex-col gap-4 px-8">
          <User
            firstName="Adam"
            lastName="Johanson"
            image="https://res.cloudinary.com/dofuctnlf/image/upload/v1688543310/a16jw08lzzrgt6ajpfi1.jpg"
          />
          <User
            firstName="Filip"
            lastName="Andersson"
            image="https://res.cloudinary.com/dofuctnlf/image/upload/v1688543310/a16jw08lzzrgt6ajpfi1.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Following;
