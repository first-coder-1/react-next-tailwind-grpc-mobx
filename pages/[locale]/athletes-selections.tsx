import { observer } from "mobx-react-lite";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import Cookies from "cookie";

import { useStore } from "stores/RootStore";

import { AthletesSelectionsItem } from "types/selections";
import { capitalizeFirstLetter, formatDate } from "utils/common";
import AthleteCard from "components/AthleteCard";
import Layout from "components/Layout";
import { AthleteCardGroupLayout } from "components/AthleteCardsGroupLayout";

export const runtime = "experimental-edge";

const CHILD_WIDTH = 248;

const AthletesSelections = observer(() => {
  const [numItemsToShow, setNumItemsToShow] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const translations = useTranslations("athletes");

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const {
    athletesSelectionsStore: {
      setId,
      init,
      passedSelectionsList,
      nonPassedSelectionsList,
      dismissedSelectionsList,
    },
  } = useStore();

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const numVisibleChildren = Math.floor(containerWidth / CHILD_WIDTH);
      setNumItemsToShow(numVisibleChildren);
    };

    handleResize(); // Initial layout setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef.current?.offsetWidth]);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const onResize = () => {
      const { scrollHeight = 0, clientHeight = 0 } = contentRef.current ?? {};
      setIsScrollable(scrollHeight > clientHeight);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(contentRef.current);
  }, []);

  const router = useRouter();
  const id = Number(router.query.id); // This can be string, string[], or undefined

  useEffect(() => {
    setId(id);
    init(id);
  }, [id]);

  const selectionName = router.query.displaySelection;
  const startDate = router.query.beginAt;
  const endDate = router.query.endAt;

  const handleSelectionDetails = () => {
    alert(`Esta funcionalidade está em construção.`);
  };

  const handleToggleClick = () => {
    if (nonPassedSelectionsList.length > numItemsToShow) {
      setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    }
  };

  const nonPassedFilteredDataLength = nonPassedSelectionsList.length;

  return (
    <Layout>
      <>
        <div className="pl-1 mb-[-8px] flex flex-col gap-2">
          <div className=" text-left text-[0.63rem] text-gray-100 font-archivo-expanded flex gap-2 items-center">
            <div className="">HOME</div>
            <img
              className="h-2 object-cover"
              alt=""
              src="/assets/icons/icon-arrow-orange-screen-title.svg"
            />
            <div className="">{translations("path")}</div>
            <img
              className="h-2 object-cover"
              alt=""
              src="/assets/icons/icon-arrow-orange-screen-title.svg"
            />
            <div className="">{selectionName}</div>
          </div>
          <div className="flex items-end gap-8 border-none">
            <div>
              <div className="text-[2.88rem] text-white font-mango-grotesque font-semibold">
                {selectionName}
              </div>
              <div className="text-[1rem] font-archivo text-darkgray-200">
                {`${startDate} ${translations("and")} ${endDate}`}
              </div>
            </div>

            <button
              className="flex flex-col items-center justify-center text-[0.75rem] text-brand-color-brand-orange-high font-archivo-expanded"
              onClick={handleSelectionDetails}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                height: "100%",
              }}
            >
              <div>{translations("seeDetails")}</div>
              <img
                className="w-[5.54rem] h-[1.06rem]"
                alt=""
                src="/assets/images/athletes-details-underscore.svg"
              />
            </button>
          </div>
        </div>
        <div
          className="flex-1 flex flex-col items-stretch gap-8 overflow-y-auto scroll"
          ref={contentRef}
          style={{ marginRight: isScrollable ? "-16px" : "0" }}
        >
          <AthleteCardGroupLayout
            label={translations("advised")}
            selectionsList={passedSelectionsList}
          />

          {/* End Of Passed Athletes Selecions Container Cards */}
          <div className="relative h-fit text-left text-[1rem] text-white font-archivo-expanded p-8 grid grid-rows-[28px_auto] gap-4 bg-gray-200 rounded-mini">
            <div className="h-7 flex items-center gap-1 leading-[135%]">
              <span className="font-semibold">
                {translations("registered")}
              </span>
              <span className="text-selections-length">
                ({nonPassedFilteredDataLength})
              </span>
            </div>
            <div
              className={`flex-1 cards-container grid gap-3 grid-cols-[repeat(auto-fill,_minmax(234px,_1fr))]`}
              ref={containerRef}
            >
              {/* <div className={`cards-container grid ${showFilters ? `grid-cols-${Constants.ATHLETES_GRID_COLUMNS_WITH_FILTERS}` : `grid-cols-${Constants.ATHLETES_GRID_COLUMNS_WITHOUT_FILTERS}`} gap-x-2 gap-y-10 w-full`}> */}
              {nonPassedSelectionsList ? (
                (isExpanded
                  ? nonPassedSelectionsList
                  : nonPassedSelectionsList.slice(0, numItemsToShow)
                ).map((item: AthletesSelectionsItem) => (
                  <AthleteCard
                    key={item.id}
                    id={item.id}
                    iconUrl={item.icon}
                    firstName={`${capitalizeFirstLetter(item.firstName)}`}
                    lastName={`${capitalizeFirstLetter(item.lastName)}`}
                    positions={item.positions}
                    ageGroups={item.ageGroups}
                    dominantBodyPart={item.dominantBodyPart}
                    height={item.height}
                    birthday={formatDate(item.birthday)}
                    entries={item.entries}
                    report={item.report}
                    // days="2 DIAS"    // TODO - Implement days calc
                    cardType="INSCRITO"
                    country={item.country}
                  />
                ))
              ) : (
                <div>Carregando...</div>
              )}
            </div>
            {nonPassedFilteredDataLength > numItemsToShow && (
              <button
                className={`absolute bottom-[-14px] bg-transparent left-[calc(50%-14px)]`}
                onClick={handleToggleClick}
              >
                <img
                  className="w-7 cursor-pointer"
                  src={
                    isExpanded
                      ? "/assets/icons/icon-up-arrow.svg"
                      : "/assets/icons/icon-down-arrow.svg"
                  }
                  alt={isExpanded ? "Collapse Arrow" : "Expand Arrow"}
                />
              </button>
            )}
          </div>
          <AthleteCardGroupLayout
            label={translations("dismissed")}
            selectionsList={dismissedSelectionsList}
          />
        </div>
      </>
    </Layout>
  );
});

export default AthletesSelections;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie
    ? Cookies.parse(context.req.headers.cookie)
    : {};

  const authToken = cookies.idToken;

  if (!authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      messages: (
        await import(`components/locales/${cookies?.NEXT_LOCALE}.json`)
      ).default,
    },
  };
};
