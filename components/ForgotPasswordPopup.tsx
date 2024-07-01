import * as React from "react";

import { Button, Dialog, IconButton } from "@mui/material";
import MuiDivider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Close } from "@mui/icons-material";

import Hls from "hls.js";

import { Entry } from "types/selections";

import { PlayerInfo } from "./PlayerInfo";
import { formatDate } from "utils";
import { TextInput } from "./TextInput";
import { validatePassword } from "utils/password";
import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "notistack";
import { validateEmail } from "utils/email";

interface ForgotPasswordPopupProps {
  onClose: () => void;
  openConfirmPassword: () => void;
}
export const ForgotPasswordPopup = ({
  onClose,
  openConfirmPassword,
}: ForgotPasswordPopupProps) => {
  const [email, setEmail] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

  const { forgotPassword } = useAuth();

  const handleShowError = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  const handleChangeEmail: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setEmail(e?.target?.value ?? "");
  };

  const handleForgotPassword = async () => {
    // Check if email is not empty
    if (!email) {
      handleShowError("Campo de email não pode estar vazio.");
      return;
    }

    if (!validateEmail(email)) {
      handleShowError("Formato de email inválido.");
      return;
    }

    try {
      // Call the Cognito function directly
      await forgotPassword(email);
      openConfirmPassword();
      onClose();
    } catch (error) {
      console.error("Erro ao processar o esquecimento de senha:", error);

      // Specific Errors
      if (error === "EXPIRED") {
        handleShowError("Seu link de redefinição de senha expirou.");
      } else if (error === 9) {
        handleShowError("E-mail não encontrado.");
      } else {
        handleShowError(
          "Ocorreu um erro ao processar a solicitação.Tente mais tarde."
        );
      }
    }
  };

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
        ESQUECI MINHA SENHA
      </div>
      <div className="mt-[-8px] leading-[1.06rem] font-archivo text-silver-200 text-center">
        <p className="m-0">Enviaremos um link para recadastramento de senha.</p>
        <p className="m-0">Por favor insira seu email cadastrado abaixo.</p>
      </div>
      <TextInput
        value={email}
        label="EMAIL"
        onChange={handleChangeEmail}
        className="w-full"
        type="email"
      />
      <Button
        variant="contained"
        className="h-[50px] bg-[#FF4A01] hover:bg-[#FF5A01] rounded-[10px]"
        onClick={handleForgotPassword}
      >
        ENTRAR
      </Button>
    </Dialog>
  );
};
