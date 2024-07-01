import * as React from "react";

import { Dialog, IconButton } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";

import Hls from "hls.js";

import { Entry } from "types/selections";

import { PlayerInfo } from "./PlayerInfo";
import { formatDate } from "utils";

const Divider = function Divider() {
  return (
    <MuiDivider className="w-[2px] bg-gradient-to-b from-[0%] from-transparent via-[50%] via-[#494949] to-[100%]" />
  );
};

interface VideoModalProps {
  entries: Entry[];
  onClose: () => void;
  iconUrl: string;
  firstName: string;
  lastName: string;
  ageGroups: string[];
  positions: string[];
}
export const VideoPopup = ({
  entries,
  onClose,
  iconUrl,
  firstName,
  lastName,
  positions,
  ageGroups,
}: VideoModalProps) => {
  const [tab, setTab] = React.useState(1);
  const videoEl = React.useRef(null);
  React.useEffect(() => {
    const hls = new Hls();

    if (videoEl.current) {
      hls.attachMedia(videoEl.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(entries[tab]?.video);
      });
    } else {
      setTab(0);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [tab, entries]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Dialog
      open
      onClose={onClose}
      classes={{ paper: " bg-gray-300 rounded-2xl" }}
    >
      <div className="flex justify-between items-center pr-2">
        <Box sx={{ flex: 1, borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={Math.max(tab, entries.length - 1)}
            onChange={handleChangeTab}
            scrollButtons
            aria-label="basic tabs example"
            classes={{
              root: "h-[60px]",
              indicator: "bg-[#FF4A01]",
              flexContainer: "h-[60px]",
            }}
          >
            {entries.map((entry, index) => (
              <Tab
                key={entry.uuid}
                label={`Video ${index + 1} (${entry.contentCategory})`}
                {...a11yProps(0)}
                classes={{
                  root: `max-w-[208px] min-w-[100px] flex-1 ${
                    index === tab ? "text-white" : "text-[#9D9D9D]"
                  }
                  }`,
                }}
              />
            ))}
          </Tabs>
        </Box>
        <IconButton
          onClick={onClose}
          classes={{ root: "w-10 h-10 hover:bg-[#333]" }}
        >
          <Close htmlColor="#B6B6B6" />
        </IconButton>
      </div>
      <video ref={videoEl} controls width={600} />
      <div className="h-[54px] flex items-stretch gap-4 mt-4 mb-6 mx-5">
        <PlayerInfo
          iconUrl={iconUrl}
          firstName={firstName}
          lastName={lastName}
          ageGroups={ageGroups}
          positions={positions}
        />
        <Divider />
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-[#fff] font-archivo text-[18px]">
              {entries[tab]?.contentCategory}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#AAA]"></span>
            <span className="text-[#9D9D9D] font-archivo text-[14px]">
              {formatDate(entries[tab]?.postedAt)}
            </span>
          </div>
          <div className="text-[#9D9D9D] font-archivo">
            {entries[tab]?.title}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
