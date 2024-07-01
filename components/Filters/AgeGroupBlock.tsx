import { observer } from "mobx-react-lite";
import { Typography } from "@mui/material";

import { useStore } from "stores/RootStore";
import { AGE_GROUP_OPTIONS } from "components/constants/filters";

import { SelectButtons } from "./SelectButtons";

export const AgeGroupBlock = observer(() => {
  const {
    filtersStore: {
      filterSettings: { ageGroups },
      setAgeGroup,
    },
  } = useStore();
  return (
    <div className="flex flex-col gap-2 px-[22px]">
      <Typography className="text-neutral-100 font-archivoRegular text-[14px] leading-[26px]">
        Categorias
      </Typography>
      <SelectButtons
        options={AGE_GROUP_OPTIONS}
        onChange={setAgeGroup}
        value={ageGroups}
        className="grid grid-cols-3 gap-2 "
        buttonClassName="rounded-[6px] w-[72px] h-[32px]"
        labelClassName="text-[11px] tracking-[-0.11px] normal-case"
      />
    </div>
  );
});
