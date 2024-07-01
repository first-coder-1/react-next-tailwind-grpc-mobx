import React from "react";

import { Typography, Chip } from "@mui/material";

import { observer } from "mobx-react-lite";

import { AddIcon, RemoveIcon } from "components/Icons";
import { useStore } from "stores/RootStore";

import { POSITION_FILTER_OPTIONS, Position } from "types/selections";
import { useTranslations } from "next-intl";

const PositionGrid = React.memo(function PositionGrid() {
  return (
    <svg width="228" height="291" viewBox="0 0 228 291" fill="none">
      <path
        d="M62.4285 0.339157V41.0385H166.929V0.339157M92.2857 0.339157V13.9056H137.071V0.339157M114.679 26.7937V29.1678M129.705 41.0385C127.805 46.5271 121.819 50.535 114.728 50.535C107.637 50.535 101.65 46.5271 99.75 41.0385M0.339233 144.822H228M166.929 290.322V249.622L62.4285 249.622V290.322M137.071 290.322V276.755H92.2857V290.322M114.679 263.867V261.493M99.7499 249.622C101.65 244.134 107.637 240.126 114.728 240.126C121.819 240.126 127.805 244.134 129.705 249.622M137.75 144.822C137.75 157.559 127.421 167.885 114.679 167.885C101.937 167.885 91.6071 157.559 91.6071 144.822C91.6071 132.084 101.937 121.759 114.679 121.759C127.421 121.759 137.75 132.084 137.75 144.822Z"
        stroke="#3E3E3E"
        strokeWidth="2"
      />
    </svg>
  );
});

interface PositionChipProps {
  className?: string;
  positions: Position[];
  label: string;
  isSelected: boolean;
}

const PositionChip = observer(
  ({ positions, label, className, isSelected }: PositionChipProps) => {
    const {
      filtersStore: { setPositions },
    } = useStore();

    return (
      <Chip
        className={`h-[28px] ${className} text-white ${
          isSelected ? "bg-[#FF4A01]" : "bg-[#848484]"
        } `}
        classes={{ deleteIcon: "!mr-[3px]" }}
        label={
          <Typography
            className={`font-archivoRegular text-4 ml-[-4px] mr-[-2px] ${
              isSelected && "font-[600]"
            }`}
          >
            {label}
          </Typography>
        }
        onDelete={() => setPositions(positions)}
        deleteIcon={
          isSelected ? (
            <RemoveIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )
        }
      />
    );
  }
);

const POSITION_ROW_MAP = [1, 2, 1, 1, 2, 1, 1];

export const PositionBlock = observer(() => {
  const {
    filtersStore: {
      filterSettings: { positions },
    },
  } = useStore();
  const translations = useTranslations("filters");

  const options = POSITION_FILTER_OPTIONS.map((option) => ({
    ...option,
    label: translations(`positionList.${option.label}`),
  }));

  const MT_MAP = [4, 2, 1, 5, 1, 0, 5];

  return (
    <div className="flex flex-col items-stretch gap-2 px-[22px]">
      <Typography className="text-neutral-100 font-archivoRegular text-[14px] leading-[26px] flex justify-between items-center">
        {translations("positions")}
      </Typography>
      <div className="relative w-[229px] h-[292px] border-2 border-solid border-neutral-500 flex flex-col items-stretch">
        <div className="absolute top-0 left-0 w-fit h-fit">
          <PositionGrid />
        </div>
        <div className="flex-1 flex flex-col items-stretch gap-2 pt-4">
          {POSITION_ROW_MAP.map((num, index) => {
            const rowOptions = options.splice(0, num);
            const justify =
              index === 1 || index === 4 ? "justify-between" : "justify-center";
            return (
              <div
                key={index}
                className={`px-2 flex items-end ${justify} mt-${MT_MAP[index]}`}
              >
                {rowOptions.map(({ value, label }) => (
                  <PositionChip
                    className=""
                    key={label}
                    label={label}
                    positions={value}
                    isSelected={positions.includes(value[0])}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
