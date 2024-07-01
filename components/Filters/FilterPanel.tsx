import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import MuiDivider from "@mui/material/Divider";
import { PositionBlock } from "./PositionBlock";
import { AgeGroupBlock } from "./AgeGroupBlock";
import { PendingBlock } from "./PendingBlock";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import { IdadeBlock } from "./IdadeBlock";
import { NationalBlock } from "./NationalBlock";
import { LevelBlock } from "./LevelBlock";
import { useStore } from "stores/RootStore";

const DateBlock = dynamic(() => import("./DateBlock"), {
  ssr: false,
});

const Divider = function Divider() {
  return (
    <MuiDivider className="h-[1px] bg-gradient-to-r from-[0%] from-transparent via-[50%] via-[#494949] to-[100%]" />
  );
};

const FilterPanel = observer(({}) => {
  const {
    filtersStore: { showFilters, toggleFilters },
  } = useStore();
  const translations = useTranslations("filters");
  const { pathname } = useRouter();

  const isSelectionsPage = pathname.includes("/selections");
  const isAthletesSelectionsPage = pathname.includes("/athletes-selections");

  return (
    <div
      className="relative w-[275px] pt-[24px] flex flex-col gap-5 bg-gray-200 z-10"
      style={{
        marginLeft: !showFilters ? "-290px" : "0",
        transition: "margin 0.3s", // Suaviza a transição
      }}
    >
      <button
        onClick={toggleFilters}
        className="absolute cursor-pointer [border:none] p-0 bg-[transparent] top-[56px] right-[-40px] w-[1.75rem] h-[1.81rem] [transform:_rotate(-180deg)] [transform-origin:0_0] z-20"
      >
        <img
          alt={showFilters ? "Esconder Filtros" : "Mostrar Filtros"}
          src={
            showFilters
              ? "/assets/images/button-expand-filter.svg"
              : "/assets/images/button-collapse-filter.svg"
          }
        />
      </button>
      <div className="pl-6 font-semibold text-left text-[2.38rem] text-white font-mango-grotesque z-10 uppercase">
        {translations("title")}
      </div>
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
        {(isSelectionsPage || isAthletesSelectionsPage) && (
          <>
            <PositionBlock />
            <Divider />
            <AgeGroupBlock />
            <Divider />
          </>
        )}
        {isSelectionsPage && (
          <>
            <DateBlock />
            <Divider />
            <PendingBlock />
          </>
        )}
        {isAthletesSelectionsPage && (
          <>
            <IdadeBlock />
            <Divider />
            <NationalBlock />
            <Divider />
            <LevelBlock />
          </>
        )}
      </div>
    </div>
  );
});

export default FilterPanel;
