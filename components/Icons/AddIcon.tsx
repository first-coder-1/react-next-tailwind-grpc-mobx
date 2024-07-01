import { SvgIcon, SvgIconProps } from "@mui/material";

export const AddIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#FF4A01" />
      <path
        d="M9.99978 5.625V10.0001M9.99978 10.0001V14.375M9.99978 10.0001H14.375M9.99978 10.0001H5.625"
        stroke="white"
        strokeWidth="2"
      />
    </SvgIcon>
  );
};
