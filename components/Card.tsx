import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/RootStore";

interface CardProps {
  // Json Props
  iconUrl: string;
  beginAt: string;
  endAt: string;
  teamName: string;
  id: number;
  ageGroups: string[];
  positions: string[];
  numPassedPlayers: string;
  numParticipants: string;

  // days: string;
  // Render Props
}

function mapAgeGroupsToCategory(ageGroups: string[]): string {
  const ageGroupKey = ageGroups.join(",");

  // Mappings for specific combinations
  const multiMappings: { [key: string]: string } = {
    "U10,U11": "SUB 11",
    "U12,U13": "SUB 13",
    "U14,U15": "SUB 15",
    "U16,U17": "SUB 17",
    "U18,U19,U20": "SUB 20",
    // Include other necessary mappings here
  };

  // Mappings for a single value
  const singleMappings: { [key: string]: string } = {
    U9: "SUB 9",
    U10: "SUB 10",
    U11: "SUB 11",
    U12: "SUB 12",
    U13: "SUB 13",
    U14: "SUB 14",
    U15: "SUB 15",
    U16: "SUB 16",
    U17: "SUB 17",
    U18: "SUB 18",
    U19: "SUB 19",
    U20: "SUB 20",
    OVER20: "MAIS DE 20",
    // Include other necessary mappings here
  };

  // First checks the multiple combinations mappings
  if (multiMappings[ageGroupKey]) {
    return multiMappings[ageGroupKey];
  }

  // If it's not a multiple combination, checks if it's a single value
  if (singleMappings[ageGroupKey]) {
    return singleMappings[ageGroupKey];
  }

  // Se não corresponder a nenhuma das regras acima, retorna empty
  return "";
}

function mapPositionsToPosition(positions: string[]): string {
  const positionsKey = positions.join(",");

  const multiMappings: { [key: string]: string } = {
    "CB,DF,LSB,RSB": "DEFENSORES",
    "DMF,MF,OMF": "MEIO CAMPO",
    "CF,FW,LWG,RWG": "ATACANTES",
    "DF,LSB": "LE",
    "CB,DF": "ZAG",
    "DF,RSB": "LD",
    "DMF,MF": "VOL",
    "MF,OMF": "MEI",
    "FW,RWG": "PD",
    "FW,LWG": "PE",
    "CF,FW": "ATA",
    "LMF,MF": "PE",
    "MF,RMF": "PD",
    "LWG,RWG": "PONTA",
  };

  const singleMappings: { [key: string]: string } = {
    GK: "GOL",
    LSB: "LE",
    CB: "ZAG",
    RSB: "LD",
    DMF: "VOL",
    OMF: "MEI",
    RWG: "PD",
    LWG: "PE",
    CF: "ATA",
  };

  // First checks the multiple combinations mappings
  if (multiMappings[positionsKey]) {
    return multiMappings[positionsKey];
  }

  // If it's not a multiple combination, checks if it's a single value
  if (singleMappings[positionsKey]) {
    return singleMappings[positionsKey];
  }

  return "";
}

const Card = observer<CardProps>(
  ({
    iconUrl,
    beginAt,
    endAt,
    teamName,
    id,
    ageGroups,
    positions,
    numPassedPlayers,
    numParticipants,
  }) => {
    const {
      filtersStore: { showFilters },
      athletesSelectionsStore: { init },
    } = useStore();
    // Extraindo ageGroups do item e passando para a função
    const category = mapAgeGroupsToCategory(ageGroups);
    const position = mapPositionsToPosition(positions);
    const displaySelection =
      category === "" && position === ""
        ? "SELETIVA"
        : category === "" || position === ""
        ? `${category}${position}`
        : `${category}/${position}`;
    //   if (
    //     filterValue &&
    //     !displaySelection.toLowerCase().includes(filterValue.toLowerCase())
    //   ) {
    //     return null; // Does not render the card if it does not match the filter
    //   }
    const displaySelectionFontSize =
      displaySelection.length > 15 ? "1.13rem" : "1.63rem";

    const truncatedTeamName =
      teamName.length > 24 ? `${teamName.substring(0, 22)}...` : teamName;
    const teamNameFontSize = teamName.length > 20 ? "0.52rem" : "0.69rem";

    const handleCardClick = () => {
      window.location.href = `/athletes-selections?id=${id}&displaySelection=${displaySelection}&beginAt=${beginAt}&endAt=${endAt}`;
    };

    const cardStyle: React.CSSProperties = {
      width: "184px",
      height: "184px",
      position: "relative",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    };

    // Rendering area
    return (
      <div
        onClick={handleCardClick}
        style={cardStyle}
        className="relative text-center text-[0.56rem] text-selections-teamName font-archivo"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} // Aumenta ligeiramente o tamanho no hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Retorna ao tamanho original
      >
        <fieldset className="absolute w-full top-0 right-0 bottom-0 left-0 rounded-xl bg-selections-card" />
        <div className="absolute h-[11.89%] w-[83.59%] top-[77.84%] right-[8.21%] bottom-[10.27%] left-[8.21%] text-[0.75rem]">
          <div className="absolute h-[130%] w-[46.01%] top-[0%] right-[53.99%] bottom-[0%] left-[0%] rounded-md bg-selections-date" />
          <div className="absolute h-[130%] w-[46.01%] top-[0%] right-[0%] bottom-[0%] left-[63.99%] rounded-md bg-selections-date" />
          <div className="absolute h-[68.18%] w-[36.2%] top-[34.64%] left-[4.91%] tracking-[-0.01em] leading-[120%] flex items-center justify-center">
            {beginAt}
          </div>
          <div className="absolute h-[68.18%] w-[37.42%] top-[34.64%] left-[67.67%] tracking-[-0.01em] leading-[120%] flex items-center justify-center">
            {endAt}
          </div>
          <div className="absolute h-[57.14%] w-[3.68%] top-[34.81%] left-[53.47%] text-[0.63rem] tracking-[-0.01em] leading-[120%] text-left flex items-center">
            -
          </div>
        </div>
        <div className="absolute h-[21.62%] w-[77.44%] top-[9.19%] right-[14.36%] bottom-[69.19%] left-[8.21%] text-left text-[0.69rem]">
          <div
            className="absolute top-[2.5%] left-[33.84%] tracking-[-0.01em] leading-[120%] w-[100%]"
            style={{
              maxWidth: "calc(100% - 23.84%)",
              fontSize: teamNameFontSize,
            }}
          >
            {truncatedTeamName}
          </div>

          <img
            className="absolute top-[0%] left-[0%] w-[2.68rem] h-[2.68rem] object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "50%",
            }}
            alt={`${teamName} Ícone do time`}
            src={iconUrl}
          />

          <div
            className="absolute w-[76.16%] top-[47.5%] left-[33.84%] leading-[81.25%] font-medium font-mango-grotesque text-neutrals-color-neutral-100 flex items-center"
            style={{
              maxWidth: "calc(100% - 23.84%)",
              fontSize: displaySelectionFontSize,
            }}
          >
            {displaySelection}
          </div>
        </div>

        <div className="absolute h-[35.14%] w-[38.46%] top-[37.3%] right-[8.21%] bottom-[27.57%] left-[53.33%]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[20%] rounded-3xs box-border border-[1px] border-solid border-crimson" />
          <div className="absolute w-[68.49%] top-[66.15%] left-[36.44%] tracking-[-0.01em] leading-[120%] flex items-center justify-center">
            INDICADOS
          </div>
          <div className="absolute w-[50.68%] top-[21.54%] left-[44.66%] text-[2rem] leading-[81.25%] font-semibold font-mango-grotesque text-neutrals-color-neutral-100 flex items-center justify-center">
            {numPassedPlayers}
          </div>
        </div>
        <div className="absolute h-[35.14%] w-[38.46%] top-[37.3%] right-[53.33%] bottom-[27.57%] left-[8.21%]">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs box-border border-[1px] border-solid border-selections-border" />
          <div className="absolute w-[67.12%] top-[66.15%] left-[16.44%] tracking-[-0.01em] leading-[120%] flex items-center justify-center">
            INSCRITOS
          </div>
          <div className="absolute w-[52.05%] top-[21.54%] left-[23.29%] text-[2rem] leading-[81.25%] font-semibold font-mango-grotesque text-neutrals-color-neutral-100 flex items-center justify-center">
            {numParticipants}
          </div>
        </div>
        {/* TODO: Indication Time */}
        {/* <div className="absolute bottom-[6.63rem] left-[calc(52%_-_2.5px)] rounded-xl bg-crimson w-[2.56rem] h-[1rem] text-[0.63rem] text-neutrals-color-neutral-100">
                <div className="absolute h-full w-[84.62%] top-[-6.25%] left-[9.14%] tracking-[-0.2px] leading-[1.13rem] uppercase inline-block">{days}</div>
            </div> */}
      </div>
    );
  }
);

export default Card;
