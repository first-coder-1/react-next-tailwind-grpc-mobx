import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/RootStore";
import { formatDate } from "utils/common";
import Layout from "components/Layout";
import Card from "components/Card";
import { CardGroupLayout } from "components/CardsGroupLayout";
import { GetServerSideProps } from "next";

import Cookies from "cookie";

export const runtime = "experimental-edge";

const Selections: React.FC = observer(() => {
  const [numItemsToShow, setNumItemsToShow] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const translations = useTranslations("selections");

  const {
    selectionsStore: {
      init,
      filteredSelectionsList,
      scheduledSelectionsList,
      historicalSelectionsList,
      dispose,
    },
  } = useStore();

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

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const childWidth = 196; // Width of each child element + gap
      const numVisibleChildren = Math.floor(containerWidth / childWidth);
      setNumItemsToShow(numVisibleChildren);
    };

    handleResize(); // Initial layout setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    init();
    return () => dispose();
  }, []);

  const handleToggleClick = () => {
    if (filteredSelectionsList.length > numItemsToShow) {
      setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    }
  };
  const filteredDataLength = filteredSelectionsList.length;

  return (
    <Layout>
      <>
        <div className="pl-1 mb-[-8px] text-left text-[0.63rem] text-gray-100 font-archivo-expanded flex gap-2 items-center">
          <div className="">HOME</div>
          <img
            className="h-2 object-cover"
            alt=""
            src="/assets/icons/icon-arrow-orange-screen-title.svg"
          />
          <div className="">{translations("path")}</div>
        </div>
        <div
          className="flex-1 flex flex-col items-stretch gap-8 overflow-y-auto scroll"
          ref={contentRef}
          style={{ marginRight: isScrollable ? "-16px" : "0" }}
        >
          <div className="relative h-fit text-left text-[1rem] text-white font-archivo-expanded p-8 grid grid-rows-[28px_auto] gap-4 bg-gray-200 rounded-mini">
            <div className="h-7 flex items-center gap-1 leading-[135%]">
              <span className="font-semibold">{translations("active")}</span>
              <span className="text-selections-length">
                ({filteredDataLength})
              </span>
            </div>
            <div
              className={`flex-1 cards-container grid gap-3 grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))]`}
              ref={containerRef}
            >
              {filteredSelectionsList ? (
                (isExpanded
                  ? filteredSelectionsList
                  : filteredSelectionsList.slice(0, numItemsToShow)
                ).map((item) => (
                  <Card
                    key={item.id} // Adicionando propriedade key aqui
                    iconUrl={item.team.icon}
                    beginAt={formatDate(item.beginAt)}
                    endAt={formatDate(item.endAt)}
                    teamName={item.team.name}
                    id={item.id}
                    ageGroups={item.ageGroups}
                    positions={item.positions}
                    numPassedPlayers={item.numPassedPlayers}
                    numParticipants={item.numParticipants}
                    // days="2 DIAS"        // TODO - Implement days calc
                  />
                ))
              ) : (
                <div>Carregando...</div>
              )}
            </div>
            {filteredSelectionsList.length > numItemsToShow && (
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
          <CardGroupLayout
            label={translations("programmed")}
            selectionsList={scheduledSelectionsList}
          />
          <CardGroupLayout
            label={translations("historical")}
            selectionsList={historicalSelectionsList}
          />
        </div>
      </>
    </Layout>
  );
});

export default Selections;

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
