import { observer } from "mobx-react-lite";
import { Checkbox } from "./Checkbox";
import { useStore } from "stores/RootStore";
import { useTranslations } from "next-intl";

export const LevelBlock = observer(() => {
  const {
    filtersStore: {
      setPoolLevel,
      filterSettings: { poolLevel },
    },
  } = useStore();
  const translations = useTranslations("filters");
  return (
    <Checkbox
      label={translations("level")}
      onChange={setPoolLevel}
      checked={poolLevel}
    />
  );
});
