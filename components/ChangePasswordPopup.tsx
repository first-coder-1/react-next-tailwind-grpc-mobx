import * as React from "react";

import { Button, Dialog, IconButton } from "@mui/material";

import { Close } from "@mui/icons-material";

import { TextInput } from "./TextInput";
import { validatePassword } from "utils/password";
import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "notistack";

interface ChangePasswordPopupProps {
  onClose: () => void;
}
export const ChangePasswordPopup = ({ onClose }: ChangePasswordPopupProps) => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

  const { setDefinitivePassword } = useAuth();

  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Code executed only in client side after component is loaded
    const storedUsername = localStorage.getItem("rememberedNewUser");
    if (storedUsername !== null) {
      //
      setUsername(storedUsername); // Updates username
    }
  }, []); // Executed onde after component is mounted

  const handleChangeNewPassword: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setNewPassword(e?.target?.value ?? "");
  };
  const handleConfirmNewPassword: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setConfirmPassword(e?.target?.value ?? "");
  };

  const handleSendPassword = async () => {
    const newPasswordValidationResult = validatePassword(newPassword);
    const confirmPasswordValidationResult = validatePassword(confirmPassword);

    if (newPasswordValidationResult) {
      enqueueSnackbar(newPasswordValidationResult, { variant: "error" });
      return; // If first password is invalid
    }

    if (newPassword !== confirmPassword) {
      enqueueSnackbar("As senhas não são idênticas.", { variant: "error" });
      return; // If passwords are not identical
    }

    if (confirmPasswordValidationResult) {
      enqueueSnackbar(confirmPasswordValidationResult, { variant: "error" });
      return; // If second password is invalid
    }

    if (!username) {
      enqueueSnackbar("Nome do usuário não encontrado", { variant: "error" });
      return; // If username is not defined
    }

    try {
      await setDefinitivePassword(username, newPassword);
      onClose();
    } catch (error) {
      enqueueSnackbar("Erro ao definir a senha. Favor efetuar um novo login", {
        variant: "error",
      });
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
        SEJA BEM-VINDO MATHEUS!
      </div>
      <div className="mt-[-8px] leading-[1.06rem] font-archivo text-silver-200 text-center">
        <p className="m-0">Por favor crie uma senha pessoal para</p>
        <p className="m-0">acessar a plataforma a partir de agora.</p>
      </div>
      <TextInput
        value={newPassword}
        label="SENHA"
        onChange={handleChangeNewPassword}
        className="w-full"
        type="password"
      />
      <TextInput
        value={confirmPassword}
        label="REPETIR SENHA"
        onChange={handleConfirmNewPassword}
        className="mt-[-8px] w-full"
        type="password"
      />
      <Button
        variant="contained"
        className="h-[50px] bg-[#FF4A01] hover:bg-[#FF5A01] rounded-[10px]"
        onClick={handleSendPassword}
      >
        ENTRAR
      </Button>
    </Dialog>
  );
};
