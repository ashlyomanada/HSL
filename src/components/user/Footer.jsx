import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[darkBlue] flex items-center py-10 px-5 xl:px-20 text-white">
      <div className="flex flex-col-reverse  gap-10 lg:gap-5 xl:gap-0 lg:flex-row">
        <div className="grid md:grid-cols-4 lg:w-[70%]">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">LOGO</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              corporis?
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">About us</h1>
            <ul className="flex flex-col gap-1">
              <li>
                <a href="">Results</a>
              </li>
              <li>
                <a href="">Schedules</a>
              </li>
              <li>
                <a href="">Standings</a>
              </li>
              <li>
                <a href="">News</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">League</h1>
            <ul className="flex flex-col gap-1">
              <li>
                <a href="">Teams</a>
              </li>
              <li>
                <a href="">Our Photos</a>
              </li>
              <li>
                <a href="">Tournament</a>
              </li>
              <li>
                <a href="">Sports</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">Contact</h1>
            <ul className="flex flex-col gap-1">
              <li>
                <a href="">Lorem ipsum dolor sit amet.</a>
              </li>
              <li>
                <a href="">09876543210</a>
              </li>
              <li>
                <a href="">contact@gmail.com</a>
              </li>
              <li>
                <a href=""></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex lg:w-[30%] flex-col gap-3">
          <h1 className="text-xl font-semibold">Join Our Newsletter</h1>
          <div className="flex items-center justify-start w-full">
            <input
              type="text"
              placeholder="Your email address"
              className="bg-white text-black px-3 py-2 ring-0 w-full md:w-auto lg:w-full"
            />
            <button className="px-4 py-2 bg-[#004be1]">Subscribe</button>
          </div>
          <p className="text-[#fabb00]">* Will send you weekly updates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
