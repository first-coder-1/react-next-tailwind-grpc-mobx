export interface SelectionsItem {
  status: string;
  id: number;
  name: string;
  ageGroups: string[];
  team: {
    name: string;
    icon: string;
    // ... other properties
  };
  positions: Position[];
  numParticipants: string;
  numPassedPlayers: string;
  beginAt: string;
  endAt: string;
  // ... other properties
}

export interface Entry {
  contentCategory: string;
  uuid: string;
  video: string;
  title: string;
  postedAt: string;
  // ... other properties
}

export type Country = {
  code: string;
  name: string;
};

export interface AthletesSelectionsItem {
  id: number;
  icon: string;
  firstName: string;
  lastName: string;
  ageGroups: string[];
  positions: Position[];
  entries: Entry[];
  dominantBodyPart: string; // RightFoot, LeftFood & Head
  height: number;
  birthday: string;
  report: string;
  isPassed: boolean;
  isDismissed: boolean;
  country: Country;
  level: number;
}

export enum Position {
  CF = "CF", // Centre Forward
  LWG = "LWG", // Left Wing
  RWG = "RWG", // Right Wing
  OMF = "OMF", // Offensive Midfielder
  DMF = "DMF", // Defensive Midfielder
  MF = "MF", // Midfielder
  LSB = "LSB", // Left Side Back
  RSB = "RSB", // Right Side Back
  CB = "CB", // Centre Back
  DF = "DF", // Defender
  GK = "GK", // Goal Keeper

  //   FW = 4, // Forward

  //   LMF = 10, // Left Midfielder
  //   RMF = 11, // Right Midfielder

  //   CMF = 15, // Centre Midfielder
}

export const POSITION_FILTER_OPTIONS = [
  { value: [Position.CF], label: "ATA" },
  { value: [Position.LWG], label: "PE" },
  { value: [Position.RWG], label: "PD" },
  { value: [Position.OMF], label: "MEI" },
  { value: [Position.DMF, Position.MF], label: "VOL" },
  { value: [Position.LSB], label: "LE" },
  { value: [Position.RSB], label: "LD" },
  { value: [Position.CB, Position.DF], label: "ZAG" },
  { value: [Position.GK], label: "GOL" },
];
