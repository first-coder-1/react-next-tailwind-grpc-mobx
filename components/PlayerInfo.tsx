import { Typography } from "@mui/material";
import React from "react";

type PlayerInfoProps = {
  iconUrl: string;
  firstName: string;
  lastName: string;
  ageGroups: string[];
  positions: string[];
  className?: string;
};

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

  // If it doesn't match any of the above rules, returns empty
  return "";
}

function mapPositionsToPosition(positions: string[]): string {
  const positionsKey = positions.join(",");

  const multiMappings: { [key: string]: string } = {
    "CB,LSB,RSB": "DEFENSORES",
    "DMF,OMF": "MEIO CAMPO",
    "CF,LWG,RWG": "ATACANTES",
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

  // Checks multiple combinations first
  if (multiMappings[positionsKey]) {
    return multiMappings[positionsKey];
  }

  // If it's not a multiple combination, checks if it's a single value
  if (singleMappings[positionsKey]) {
    return singleMappings[positionsKey];
  }

  return "";
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  iconUrl,
  firstName,
  lastName,
  positions,
  ageGroups,
  className,
}) => {
  // Extracting ageGroups from the item and passing to the function
  const category = mapAgeGroupsToCategory(ageGroups);
  const position = mapPositionsToPosition(positions);

  const fullAthleteName = `${firstName} ${lastName}`;
  const displayName =
    firstName.length + lastName.length + 1 > 20 ? lastName : fullAthleteName;

  // Rendering area
  return (
    <div
      className={`w-[200px] h-[54px] flex gap-2 items-center text-center text-[0.63rem] text-neutrals-color-neutral-100 font-archivo ${className}`}
    >
      <img
        className="w-[54px] min-w-[54px] h-[54px] object-cover"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: "50%",
        }}
        alt={`${displayName} Nome do Atleta`}
        src={iconUrl || "assets/icons/icon-generic-avatar.svg"}
      />
      <div className="flex flex-col gap-1">
        <div
          className="leading-[1.5rem] uppercase font-semibold font-mango-grotesque text-left inline-block "
          style={{ fontSize: "26px" }}
        >
          {displayName}
        </div>
        <div className="flex gap-2 text-gainsboro uppercase leading-[0.63rem] whitespace-nowrap">
          <div className="h-[20px] min-w-[44px] px-2 flex justify-center items-center rounded border-solid border-[1px] border-athleteCard-gray-100 ">
            <span className="pt-[1px]">{category}</span>
          </div>
          <div className="h-[20px] min-w-[44px] px-2 flex justify-center items-center rounded border-solid border-[1px] border-athleteCard-gray-100 ">
            <span className="pt-[1px]">{position}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
