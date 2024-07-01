import { SvgIcon, SvgIconProps } from "@mui/material";

export const CheckBoxIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect width="17" height="17" rx="2" fill="#FF4A01" />
      <path d="M4 8L7 11L13 5" stroke="white" strokeWidth="1.4" />
    </SvgIcon>
  );
};
