import { SvgIcon, SvgIconProps } from "@mui/material";

export const RemoveIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#848484" />
      <path d="M14.375 10.0001H9.99978H5.625" stroke="white" strokeWidth="2" />
    </SvgIcon>
  );
};
