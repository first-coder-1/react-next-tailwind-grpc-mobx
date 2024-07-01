import React from "react";

type VerticalMenuProps = {
  teamIconUrl: string;
  backgroundImageUrl: string;
};

const VerticalMenu = ({
  teamIconUrl,
  backgroundImageUrl,
}: VerticalMenuProps) => {
  // Rendering area
  return (
    <div className="relative vertical-menu w-[4.81rem] h-full z-30 overflow-hidden">
      <div className="absolute top-[0rem] left-[0rem] w-[4.81rem] h-full">
        <img
          className="absolute top-[0rem] left-[0rem] w-[4.81rem] h-full"
          alt=""
          src={backgroundImageUrl}
        />
        <div className="absolute top-[12.5rem] left-[4.44rem] bg-orangered w-[0.38rem] h-[3.81rem]" />
        <img
          className="absolute h-auto w-[51.53%]"
          style={{ top: "1.31rem", left: "1.19rem" }}
          alt=""
          src={teamIconUrl} // Using the URL user context icon
        />
      </div>
      <div className="absolute top-[9.19rem] left-[1.5rem] w-[1.75rem] h-[27.63rem]">
        <nav className="m-0 absolute top-[0rem] left-[0rem] flex flex-col items-center justify-start gap-[2.75rem]">
          <img
            className="relative w-[1.74rem] h-[1.74rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-01.svg"
          />
          <img
            className="relative w-[1.88rem] h-[1.88rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-02.svg"
          />
          <img
            className="relative w-[1.56rem] h-[1.66rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-03.svg"
          />
          <img
            className="relative w-[1.57rem] h-[1.57rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-04.svg"
          />
          <img
            className="relative w-[1.25rem] h-[1.63rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-05.svg"
          />
          <img
            className="relative w-[1.69rem] h-[1.69rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-06.svg"
          />
          <img
            className="relative w-[1.63rem] h-[1.63rem]"
            alt=""
            src="/assets/icons/icon-vertical-menu-07.svg"
          />
        </nav>
      </div>
    </div>
  );
};

export default VerticalMenu;
