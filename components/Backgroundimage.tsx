type BackgroundImageProps = {
  isExpanded: boolean;
  calculateRows: () => number;
  backgroundImageUrl: string;
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  isExpanded,
  calculateRows,
  backgroundImageUrl,
}) => {
  const baseHeight =
    backgroundImageUrl ===
    "/assets/backgrounds/background-athlete-selections-page.svg"
      ? "75.44rem"
      : "68.38rem";

  // Rendering area
  return (
    <img
      className="absolute top-0 left-0 w-[100vw] h-[100vh] opacity-[1.0] cursor-pointer"
      alt=""
      src={backgroundImageUrl}
    />
  );
};

export default BackgroundImage;
