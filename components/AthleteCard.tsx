import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import Toast from "./Toast";

import * as Constants from "../constants";
import { useStore } from "stores/RootStore";
import { VideoPopup } from "./VideoPopup";
import { Entry, Country } from "types/selections";
import { PlayerInfo } from "./PlayerInfo";

type AthleteCardProps = {
  // Json Props
  id: number;
  iconUrl: string;
  firstName: string;
  lastName: string;
  ageGroups: string[];
  positions: string[];
  entries: Entry[];
  dominantBodyPart: string; // RightFoot, LeftFood & Head
  height: number;
  birthday: string;
  report: string;
  // days: string;
  cardType: "INDICADO" | "INSCRITO" | "REPROVADO";
  country: Country;
};

function mapDominantBodyPart(dominantBodyPart: string | null | undefined) {
  if (!dominantBodyPart) {
    // Returns an empty string or some default value if there's no value
    return "";
  }

  switch (dominantBodyPart.toLowerCase()) {
    case "leftfoot":
      return "PÉ D.";
    case "rightfoot":
      return "PÉ E.";
    case "both":
      return "AMBOS";
    case "head":
      return "AMBIDESTRO";
    default:
      return "";
  }
}

const AthleteCard: React.FC<AthleteCardProps> = ({
  id,
  iconUrl,
  firstName,
  lastName,
  positions,
  ageGroups,
  dominantBodyPart,
  height,
  birthday,
  entries,
  report,
  cardType,
  country,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    message: "",
    icon: "",
    action: () => {},
  });

  const [toastConfig, setToastConfig] = useState({
    borderColor: "",
    icon: "",
    message: "",
    secondaryMessage: "",
    isVisible: false,
  });

  const [openVideo, setOpenVideo] = useState(false);

  const fullAthleteName = `${firstName} ${lastName}`;
  const displayName =
    firstName.length + lastName.length + 1 > 20 ? lastName : fullAthleteName;
  const fontNameSize = displayName.length <= 20 ? "1.43rem" : "1.63rem";
  const flag = (
    <img
      loading="lazy"
      className="rounded-full w-[15px] h-[15px] object-cover"
      srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
      alt=""
    />
  );

  const handleOpenVideoModal = () => setOpenVideo(true);
  const handleCloseVideoModal = () => setOpenVideo(false);

  const dominantFoot = mapDominantBodyPart(dominantBodyPart);

  const displayDetails =
    country.code.toUpperCase() +
    " | " +
    dominantFoot +
    " | " +
    height +
    "M" +
    " | " +
    birthday;

  const fontDetailsSize = displayDetails.length <= 30 ? "0.75rem" : "0.72rem";

  //   if (
  //     filterValue &&
  //     !displayName.toLowerCase().includes(filterValue.toLowerCase())
  //   ) {
  //     return null; // Does not render the card if it does not match the filter
  //   }

  const cardStyle: React.CSSProperties = {
    width: "14.63rem",
    height: "11.56rem",
    position: "relative",
    // cursor: 'pointer', // Athlete Card is not interactive for while
    // transition: 'transform 0.3s ease',
  };

  const openDialog = (message: string, icon: string, action: () => void) => {
    setDialogConfig({ message, icon, action });
    setIsDialogOpen(true);
  };

  // Functions for confirm dialogs
  const handleConfirm = () => {
    setIsDialogOpen(false);
    dialogConfig.action();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  // Functions for after confirmation
  const approveAthlete = () => {
    console.log("Ação de APROVAR confirmada");
    // TODO: Actions for Approve Athelete
    // ...
    setToastConfig({
      borderColor: Constants.APPROVED_COLOR_GREEN,
      icon: "/assets/icons/icon-confirmation-dialog-green.svg",
      message: "ATLETA APROVADO",
      secondaryMessage: "O atleta aparecerá na sua lista de aprovados.",
      isVisible: true,
    });
  };

  // Functions for after confirmation
  const reproveAthlete = () => {
    console.log("Ação de REPROVAR confirmada");
    // TODO: Actions for Reprove Athelete
    // ...
    setToastConfig({
      borderColor: Constants.REPROVED_COLOR_RED,
      icon: "/assets/icons/icon-confirmation-dialog-red.svg",
      message: "ATLETA REPROVADO",
      secondaryMessage: "O atleta aparecerá na sua lista de reprovados.",
      isVisible: true,
    });
  };

  // Functions for after confirmation
  const saveAthlete = () => {
    console.log("Ação de SALVAR confirmada");
    // TODO: Actions for Save Athelete
    // ...
    setToastConfig({
      borderColor: Constants.SAVED_COLOR_YELLOW,
      icon: "/assets/icons/icon-confirmation-dialog-yellow.svg",
      message: "ATLETA SALVO",
      secondaryMessage: "O atleta aparecerá na sua lista de aprovados.",
      isVisible: true,
    });
  };

  const reactivateAthlete = () => {
    console.log("Ação de REATIVAR confirmada");
    // TODO: Actions for Approve Athelete
    // ...
    setToastConfig({
      borderColor: Constants.REACTIVATE_COLOR_GRAY,
      icon: "/assets/icons/icon-confirmation-dialog-gray.svg",
      message: "ATLETA REATIVADO",
      secondaryMessage: "O atleta reaparecerá na sua lista de aprovados.",
      isVisible: true,
    });
  };

  // Rendering area
  return (
    <div
      style={cardStyle}
      className="relative text-center text-[0.56rem] text-selections-teamName font-archivo"
    >
      <div className="relative w-full h-[11.56rem] text-center text-[0.63rem] text-neutrals-color-neutral-100 font-archivo">
        {/* Rejected Card has border */}
        {cardType === "REPROVADO" ? (
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl box-border border-[1px] border-solid border-athleteCard-gray-300" />
        ) : (
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl bg-athleteCard-gray-200" />
        )}

        <div
          className="absolute h-[7.03%] w-[77.78%] top-[42.16%] left-[7.26%] text-[0.75rem] tracking-[-0.1px] leading-[0.81rem] uppercase text-gainsboro text-left flex items-center gap-1"
          style={{ fontSize: fontDetailsSize }}
        >
          {flag}
          {displayDetails}
        </div>

        {/* Rejected Card has different buttons */}
        {cardType !== "REPROVADO" ? (
          <>
            {/*  Confirm Button */}
            <button
              onClick={() =>
                openDialog(
                  "DESEJA APROVAR O ATLETA?",
                  "/assets/icons/icon-confirmation-dialog-green.svg",
                  approveAthlete
                )
              }
              className="absolute bottom-[0.94rem] left-[calc(50%_-_100px)] rounded-md bg-forestgreen w-[4.69rem] h-[1.44rem] text-[0.63rem] text-neutrals-color-neutral-100 font-archivo cursor-pointer"
            >
              <div className="absolute h-[68%] w-[77.78%] top-[13.04%] left-[10%] leading-[1.13rem] uppercase font-semibold inline-block">
                APROVAR
              </div>
            </button>

            {/* Reprove Button */}
            <button
              onClick={() =>
                openDialog(
                  "DESEJA REPROVAR O ATLETA?",
                  "/assets/icons/icon-confirmation-dialog-red.svg",
                  reproveAthlete
                )
              }
              className="absolute bottom-[0.94rem] left-[calc(50%_-_16px)] rounded-md bg-crimson w-[5.13rem] h-[1.44rem] text-[0.63rem] text-neutrals-color-neutral-100 font-archivo cursor-pointer"
            >
              <div className="absolute h-[68%] w-[83.58%] top-[13.04%] left-[7.67%] leading-[1.13rem] uppercase font-semibold inline-block">
                REPROVAR
              </div>
            </button>

            {/* Save button */}
            <button
              onClick={() =>
                openDialog(
                  "DESEJA MONITORAR O ATLETA?",
                  "/assets/icons/icon-confirmation-dialog-yellow.svg",
                  saveAthlete
                )
              }
              className="absolute bottom-[0.94rem] left-[calc(50%_+_75px)] rounded-md w-[1.5rem] h-[1.44rem] flex justify-center items-center p-0 cursor-pointer"
            >
              <img
                alt="Descrição do botão"
                src="/assets/images/button-save-athlete.svg"
              />
            </button>
          </>
        ) : (
          <>
            <div className="absolute bottom-[0.94rem] left-[calc(50%_-_100px)] rounded-md bg-transparent w-full h-[1.44rem] text-[0.63rem] text-neutrals-color-neutral-100 font-archivo flex items-center justify-between">
              <div className="text-[0.63rem] leading-[1.13rem] uppercase font-medium font-archivo text-neutrals-color-neutral-100 w-[5.17rem] h-[0.98rem]">
                REPROVADO
              </div>
            </div>

            <button
              onClick={() =>
                openDialog(
                  "DESEJA REATIVAR O ATLETA?",
                  "/assets/icons/icon-confirmation-dialog-gray.svg",
                  reactivateAthlete
                )
              }
              className="absolute bottom-[0.94rem] left-[calc(50%_-_0px)] rounded-md bg-dimgray w-[6.19rem] h-[1.44rem] text-[0.63rem] text-neutrals-color-neutral-100 font-archivo cursor-pointer"
            >
              <div className="absolute h-[68%] w-[83.58%] top-[13.04%] left-[7.67%] leading-[1.13rem] uppercase font-medium inline-block">
                REATIVAR
              </div>
            </button>
          </>
        )}

        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancel}
          icon={dialogConfig.icon}
          message={dialogConfig.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />

        <Toast
          borderColor={toastConfig.borderColor}
          icon={toastConfig.icon}
          message={toastConfig.message}
          secondaryMessage={toastConfig.secondaryMessage}
          isVisible={toastConfig.isVisible}
          onClose={() => setToastConfig({ ...toastConfig, isVisible: false })}
        />
        <PlayerInfo
          className="absolute left-4 top-4"
          iconUrl={iconUrl}
          firstName={firstName}
          lastName={lastName}
          ageGroups={ageGroups}
          positions={positions}
        />

        <div className="absolute w-full top-[74.05%] right-[0%] left-[0%] h-[0rem]" />
        <div className="absolute h-[12.43%] w-[38.46%] top-[55.14%] right-[54.27%] bottom-[32.43%] left-[7.26%] rounded-md bg-darkslategray-50 text-left">
          <div
            className="absolute h-[69.57%] w-[60.64%] top-[13.04%] left-[27.61%] leading-[1.13rem] uppercase font-medium inline-block cursor-pointer"
            onClick={handleOpenVideoModal}
          >
            VER VÍDEO
          </div>
          <img
            className="absolute h-[38.64%] w-[7.95%] top-[31.62%] right-[79.15%] bottom-[29.74%] left-[12.9%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/assets/icons/icon-arrow-white-screen-title.svg"
          />
        </div>

        {cardType !== "REPROVADO" && (
          <div className="absolute h-[12.43%] w-[42.31%] top-[55.14%] right-[7.69%] bottom-[32.43%] left-[50%] rounded-md bg-darkslategray-50 text-left">
            <div className="absolute h-[69.57%] w-[65.91%] top-[13.04%] left-[30.18%] leading-[1.13rem] uppercase font-medium inline-block">
              RELATÓRIO
            </div>
            <img
              className="absolute h-[49.16%] w-[10.1%] top-[23.91%] right-[77.27%] bottom-[26.92%] left-[12.63%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/assets/icons/icon-athletes-report.svg"
            />
          </div>
        )}

        {/* TODO: Indication Time */}
        {/* <div className="absolute bottom-[10.25rem] left-[calc(50%_+_70px)] rounded-xl bg-crimson w-[2.56rem] h-[1rem]">
                    <div className="absolute h-full w-[84.62%] top-[-6.25%] left-[7.14%] tracking-[-0.2px] leading-[1.13rem] uppercase inline-block">2 dias</div>
                </div> */}
      </div>
      {openVideo && (
        <VideoPopup
          onClose={handleCloseVideoModal}
          entries={entries}
          iconUrl={iconUrl}
          firstName={firstName}
          lastName={lastName}
          ageGroups={ageGroups}
          positions={positions}
        />
      )}
    </div>
  );
};

export default AthleteCard;
