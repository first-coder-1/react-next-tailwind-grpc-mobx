import { observer } from "mobx-react-lite";
import { Typography, Slider } from "@mui/material";
import { useTranslations } from "next-intl";

const BarChartImg = () => {
  return (
    <svg
      width="190"
      height="52"
      viewBox="0 0 190 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="47.2727" width="9" height="4.72727" fill="#464646" />
      <rect x="11" y="42.5454" width="8" height="9.45455" fill="#464646" />
      <rect x="21" y="36.2424" width="9" height="15.7576" fill="#464646" />
      <rect x="32" y="24.4242" width="9" height="27.5758" fill="#464646" />
      <rect x="43" y="14.9697" width="8" height="37.0303" fill="#464646" />
      <rect x="53" y="18.9091" width="8" height="33.0909" fill="#464646" />
      <rect x="63" y="7.87878" width="7" height="44.1212" fill="#464646" />
      <rect x="72" width="8" height="52" fill="#464646" />
      <rect x="82" y="18.9091" width="7" height="33.0909" fill="#464646" />
      <rect x="91" y="29.1515" width="8" height="22.8485" fill="#464646" />
      <rect x="101" y="14.9697" width="8" height="37.0303" fill="#464646" />
      <rect x="111" y="21.2727" width="7" height="30.7273" fill="#464646" />
      <rect x="120" y="5.51514" width="8" height="46.4848" fill="#464646" />
      <rect x="130" y="11.8182" width="7" height="40.1818" fill="#464646" />
      <rect x="139" y="26.7878" width="8" height="25.2121" fill="#464646" />
      <rect x="149" y="36.2424" width="8" height="15.7576" fill="#464646" />
      <rect x="159" y="38.6061" width="9" height="13.3939" fill="#464646" />
      <rect x="170" y="42.5454" width="9" height="9.45455" fill="#464646" />
      <rect x="181" y="48.0605" width="9" height="3.93939" fill="#464646" />
    </svg>
  );
};

export const IdadeBlock = observer(() => {
  const translations = useTranslations("filters");

  return (
    <div className="flex flex-col items-stretch px-[22px] mb-[-8px]">
      <Typography className="text-neutral-100 font-archivoRegular text-[14px] leading-[26px] flex justify-between items-center">
        {translations("age")}
      </Typography>
      <div className="px-3">
        <BarChartImg />
        <Slider
          classes={{
            root: "text-[#FF4A01] mt-[-20px]",
            thumb: "bg-white w-[25px] h-[25px] hover:shadow-none",
            rail: "bg-[#484848]",
            markLabel:
              "bg-transparent text-[#BABABA] font-archivoRegular text-[12px] top-8",
          }}
          value={[9, 23]}
          onChange={(_, value) => {}}
          valueLabelDisplay="off"
          aria-labelledby="range-slider"
          step={1}
          max={23}
          min={9}
          marks={[
            { value: 9, label: "9 anos" },
            { value: 23, label: "23 anos" },
          ]}
        />
      </div>
    </div>
  );
});
