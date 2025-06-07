const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex-col justify-center lg:flex-row lg:justify-between relative flex">
        <img
          className="h-full w-full object-cover absolute"
          src="https://indiansportsassociation.org/wp-content/uploads/2019/06/banner.jpg"
          alt=""
        />
        <div className="bg-[rgba(0,0,0,0.3)] h-full w-full z-10 absolute"></div>

        <div className="grid grid-cols-2 pt-10 md:pt-0 h-[40%] lg:h-auto lg:gap-5 lg:w-[40%] z-10 lg:pl-20">
          <div className="flex justify-center lg:justify-start items-center">
            <img
              className="aspect-[2/3] h-[75%] lg:h-auto object-contain lg:-translate-y-10 border-4 border-white"
              src="https://ultimateexposures.com/wp-content/uploads/2020/03/01-KrumVBallTemplate-scaled.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-center lg:justify-start items-center">
            <img
              className="aspect-[2/3] h-[75%] lg:h-auto object-contain lg:translate-y-10 border-4 border-white"
              src="https://media.istockphoto.com/id/168621331/photo/streetball-players-portrait-_-vertical.jpg?s=612x612&w=0&k=20&c=dW54AbrNFERF4ufXAK4cmmPdC4pxQuftwShrn5l0jdI="
              alt=""
            />
          </div>
        </div>
        <div className="z-10 flex flex-col justify-center items-center">
          <h1 className="text-5xl text-center w-20% text-white font-semibold tracking-wider">
            Sports League
          </h1>
        </div>
        <div className="grid grid-cols-2 h-[40%] lg:h-auto lg:gap-5 lg:w-[40%] z-10 lg:pr-20">
          <div className="flex justify-center lg:justify-start items-center">
            <img
              className="aspect-[2/3] h-2/3 lg:h-auto object-contain lg:translate-y-10 border-4 border-white"
              src="https://www.charletonchurchill.com/wp-content/uploads/2010/08/IMG_9761.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-center lg:justify-start items-center">
            <img
              className="aspect-[2/3] h-2/3 lg:h-auto object-contain lg:-translate-y-10 border-4 border-white"
              src="https://www.charletonchurchill.com/wp-content/uploads/2010/08/IMG_9761.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
