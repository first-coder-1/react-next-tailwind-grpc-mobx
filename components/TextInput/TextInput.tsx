"use client";

import classNames from "classnames";
import { OutlinedInput, Typography } from "@mui/material";
import { forwardRef } from "react";

interface TextInputProps {
  value: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  className?: string;
  type?: string;
  name?: number;
  align?: "center" | "left";
  placeholder?: string;
}

export const TextInput = forwardRef(
  (
    {
      value,
      label,
      onChange,
      className,
      type,
      name,
      align,
      placeholder,
    }: TextInputProps,
    ref
  ) => {
    return (
      <div className={classNames("flex flex-col gap-[2px]", className)}>
        {label && (
          <Typography className="text-[#B0B0B0] font-semibold text-[14px]">
            {label}
          </Typography>
        )}
        <OutlinedInput
          placeholder={placeholder}
          inputRef={ref}
          type={type ?? "text"}
          value={value}
          name={String(name)}
          onChange={onChange}
          classes={{
            root: "bg-white w-full rounded-[10px] w-[343px] h-[50px] px-[2px]",
            input: `h-[17px] text-${align ?? "left"}`,
          }}
        />
      </div>
    );
  }
);
