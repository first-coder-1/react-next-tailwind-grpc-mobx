import React from "react";

import MuiButton from "@mui/material/Button";
import { Typography } from "@mui/material";

import { FilterOptionWithArray } from "types/filters";

interface SelectButtonsProps {
  variant?: "small" | "large";
  buttonColorList?: string[];
  options: FilterOptionWithArray[];
  onChange?: (value: string[]) => void;
  value: string[];
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
}

export const SelectButtons = ({
  options,
  onChange,
  value: selectedValue,
  className,
  buttonClassName,
  labelClassName,
}: SelectButtonsProps) => {
  return (
    <div className={className}>
      {options?.map(({ value, label }) => (
        <MuiButton
          key={label}
          variant={selectedValue.includes(value[0]) ? "contained" : "outlined"}
          className={
            selectedValue.includes(value[0])
              ? `${buttonClassName} bg-[#FF4A01] hover:bg-[#FF5A01] `
              : `${buttonClassName} text-[#D4D4D4]  border-[#D4D4D4] hover:border-[#F4F4F4] border-2`
          }
          onClick={() => onChange && onChange(value)}
        >
          <Typography
            className={`${labelClassName} font-archivoRegular text-[12px] mx-[-8px]`}
          >
            {label}
          </Typography>
        </MuiButton>
      ))}
    </div>
  );
};
