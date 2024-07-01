import React from "react";

import MuiCheckbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";

import { CheckBoxIcon } from "components/Icons";

interface CheckBoxProps {
  label?: React.ReactNode;
  onChange?: (value: boolean) => void;
  checked?: boolean;
}

export const Checkbox = ({ label, onChange, checked }: CheckBoxProps) => {
  return (
    <FormControlLabel
      classes={{
        root: "flex flex-row-reverse justify-between mx-0 pl-6 pr-2 h-5",
        label: "text-white text-sm font-['Archivo Expanded'] tracking-tight",
      }}
      control={
        <MuiCheckbox
          onChange={onChange && ((_, value) => onChange(value))}
          checkedIcon={
            <div className="w-[24px] h-[24px] text-[18px] flex justify-center items-center">
              <CheckBoxIcon fontSize="inherit" />
            </div>
          }
          style={{
            color: "#FF4A01",
          }}
          checked={checked ?? false}
        />
      }
      label={label}
      className={!!label ? "" : "mx-0"}
    />
  );
};
