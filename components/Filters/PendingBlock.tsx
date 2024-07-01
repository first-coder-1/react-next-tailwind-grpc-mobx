import { observer } from "mobx-react-lite";
import { Checkbox } from "./Checkbox";
import { useTranslations } from "next-intl";

export const PendingBlock = observer(() => {
  const translations = useTranslations("filters");

  return <Checkbox label={translations("pending")} />;
});
