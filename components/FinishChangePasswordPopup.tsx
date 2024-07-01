import * as React from "react";

import { Button, Dialog, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface FinishChangePasswordPopupProps {
  onClose: () => void;
}
export const FinishChangePasswordPopup = ({
  onClose,
}: FinishChangePasswordPopupProps) => {
  return (
    <Dialog
      open
      onClose={onClose}
      classes={{
        paper:
          "w-[352px] p-[32px] bg-[#1E1D1D] rounded-2xl flex flex-col justify-between items-stretch gap-[20px]",
      }}
    >
      <IconButton
        onClick={onClose}
        classes={{
          root: "absolute right-2 top-2 w-10 h-10 hover:bg-[#1E1D1D]",
        }}
      >
        <Close htmlColor="#B6B6B6" />
      </IconButton>

      <div className="mt-[12px] text-[38px] font-semibold font-mango-grotesque text-neutrals-color-neutral-100 text-center whitespace-nowrap">
        SENHA ALTERADA
      </div>
      <div className="mt-[-8px] leading-[1.06rem] font-archivo text-silver-200 text-center">
        <p className="m-0">Você será redirecionado à tela de login.</p>
      </div>

      <Button
        variant="contained"
        className="h-[50px] bg-[#FF4A01] hover:bg-[#FF5A01] rounded-[10px]"
        onClick={onClose}
      >
        RETORNAR
      </Button>
    </Dialog>
  );
};
