import { useRouter } from "next/router";

import { ExpandMore } from "@mui/icons-material";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface LocaleSwitcherProps {
  className?: string;
}
export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  className,
}) => {
  const router = useRouter();

  const {
    query: { locale },
  } = router;

  const switchLocale = (e: SelectChangeEvent) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, locale: e.target.value },
    });
  };
  return (
    <Select
      className={className}
      classes={{
        root: "bg-selections-header rounded-3xs h-[50px] w-[68px] text-white",
        icon: "text-[#9A9A9A]",
        select: "flex justify-center items-center",
      }}
      MenuProps={{
        classes: {
          paper: "bg-menu-background",
        },
      }}
      IconComponent={(props) => <ExpandMore {...props} />}
      value={locale as string}
      onChange={switchLocale}
    >
      <MenuItem value="pt">
        <img
          loading="lazy"
          className=" rounded-full w-5 h-5 object-cover"
          srcSet={`https://flagcdn.com/w40/br.png 2x`}
          src={`https://flagcdn.com/w20/br.png`}
          alt=""
        />
      </MenuItem>
      <MenuItem value="es">
        <img
          loading="lazy"
          className=" rounded-full w-5 h-5 object-cover"
          srcSet={`https://flagcdn.com/w40/es.png 2x`}
          src={`https://flagcdn.com/w20/es.png`}
          alt=""
        />
      </MenuItem>
    </Select>
  );
};
