import { observer } from "mobx-react-lite";
import { Typography, Box, Autocomplete, TextField, Paper } from "@mui/material";
import React from "react";
import { useStore } from "stores/RootStore";
import { Country } from "types/selections";
import { ExpandMore } from "@mui/icons-material";

import styles from "./NationalBlock.module.css";
import { useTranslations } from "next-intl";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface LabelProps {
  option: Country;
}

const Label = ({ option }: LabelProps) => (
  <>
    <Typography className="text-[#E0E0E0]">{option.name}</Typography>
    <Typography className="text-neutral-500">({option.code})</Typography>
  </>
);

export const NationalBlock = observer(() => {
  const {
    athletesSelectionsStore: { countriesList },
    filtersStore: { setCountry },
  } = useStore();
  const translations = useTranslations("filters");

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: Country | null
  ) => {
    setCountry(value);
  };

  return (
    <div className="flex flex-col items-stretch gap-3 px-[22px] mb-1 ">
      <Typography className="text-neutral-100 font-archivoRegular text-[14px] leading-[26px] flex justify-between items-center">
        {translations("nationality")}
      </Typography>
      <Autocomplete
        id="country-select-demo"
        onChange={handleChange}
        classes={{
          root: "flex-1 mt-[-8px]",
          clearIndicator: "text-[#FF4A01]",
          popupIndicator: "text-[#FF4A01]",
        }}
        popupIcon={<ExpandMore />}
        options={countriesList}
        autoHighlight
        getOptionLabel={(option) => `${option.name} (${option.code})`}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 1, flexShrink: 0 }, fontSize: "14px" }}
            {...props}
          >
            <img
              loading="lazy"
              width="24"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            <Label option={option} />
          </Box>
        )}
        PaperComponent={({ children }) => (
          <Paper className="bg-[#101010] max-h-44 overflow-hidden flex items-stretch rounded-md border-2 border-neutral-700 border-solid">
            <div className={styles.container}>{children}</div>
          </Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={translations("selectNationality")}
            inputProps={{
              ...params.inputProps,
              className: "text-[#E0E0E0] px-1 py-0 text-[14px]",
            }}
            classes={{
              root: "bg-[#101010] rounded-md border-2 border-neutral-700 border-solid ",
            }}
          />
        )}
      />
    </div>
  );
});
