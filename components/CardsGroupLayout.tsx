import { useEffect, useRef, useState } from "react";
import { SelectionsItem } from "types/selections";
import { formatDate } from "utils";
import Card from "components/Card";

interface CardsGroupLayoutProps {
  label: string;
  selectionsList: SelectionsItem[];
}

const CHILD_WIDTH = 196; // Width of each child element + gap

export const CardGroupLayout = ({
  label,
  selectionsList,
}: CardsGroupLayoutProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numItemsToShow, setNumItemsToShow] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const listLength = selectionsList.length;

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const numVisibleChildren = Math.floor(containerWidth / CHILD_WIDTH);
      setNumItemsToShow(numVisibleChildren);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectionsList]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + numItemsToShow;
      return newIndex >= listLength ? prevIndex : newIndex;
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - numItemsToShow;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  return (
    <div className="h-fit relative text-left text-[1rem] text-white font-archivo-expanded p-8 grid grid-rows-[28px_184px] gap-4 bg-gray-200 rounded-mini">
      <div className="h-7 leading-[135%] items-center flex justify-between w-full">
        <span className="[line-break:anywhere] w-full flex items-center gap-1">
          <span className="font-semibold">{label}</span>
          <span className="text-selections-length">({listLength})</span>
        </span>
        <div className="flex items-center space-x-2 ">
          {/* Previous Card Screen */}
          <button
            onClick={handlePrevClick}
            className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-[2.03rem] h-[1.88rem]"
            disabled={currentIndex === 0}
          >
            <img
              src={
                currentIndex === 0
                  ? "/assets/icons/icon-left-arrow-off.svg"
                  : "/assets/icons/icon-left-arrow-on.svg"
              }
              alt={
                currentIndex === 0
                  ? "Botão esquerda desativado"
                  : "Botão esquerda ativado"
              }
            />
          </button>
          <button
            onClick={handleNextClick}
            className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-[2.03rem] h-[1.88rem]"
            disabled={currentIndex + numItemsToShow >= listLength}
          >
            <img
              src={
                currentIndex + numItemsToShow >= listLength
                  ? "/assets/icons/icon-right-arrow-off.svg"
                  : "/assets/icons/icon-right-arrow-on.svg"
              }
              alt={
                currentIndex + numItemsToShow >= listLength
                  ? "Botão direita desativado"
                  : "Botão direita ativado"
              }
            />
          </button>
        </div>
      </div>
      <div
        className={`flex-1 grid gap-3 grid-cols-[repeat(auto-fill,_minmax(192px,_1fr))]`}
        ref={containerRef}
      >
        {selectionsList
          .slice(currentIndex, currentIndex + numItemsToShow)
          .map((item) => (
            <Card
              key={item.id}
              iconUrl={item.team.icon}
              beginAt={formatDate(item.beginAt)}
              endAt={formatDate(item.endAt)}
              teamName={item.team.name}
              id={item.id}
              ageGroups={item.ageGroups}
              positions={item.positions}
              numPassedPlayers={item.numPassedPlayers}
              numParticipants={item.numParticipants}
            />
          ))}
      </div>
    </div>
  );
};