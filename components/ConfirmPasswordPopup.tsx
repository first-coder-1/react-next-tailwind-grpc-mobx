import * as React from "react";

import { Button, Dialog, IconButton, Typography } from "@mui/material";

import { Close } from "@mui/icons-material";

import { TextInput } from "./TextInput";

import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "notistack";
import { validatePassword } from "utils/password";

const CODE_NUMS = [0, 1, 2, 3, 4, 5];

interface ConfirmPasswordPopupProps {
  onClose: () => void;
  email: string;
  openFinishChangePassword: () => void;
}
export const ConfirmPasswordPopup = ({
  onClose,
  email,
  openFinishChangePassword,
}: ConfirmPasswordPopupProps) => {
  const [code, setCode] = React.useState<Record<number, string>>({});
  const [firstPassword, setFirstPassword] = React.useState<string>("");
  const [secondPassword, setSecondPassword] = React.useState<string>("");

  const ref = CODE_NUMS.reduce(
    (memo, num) => ({
      ...memo,
      [num]: React.useRef<HTMLInputElement | null>(null),
    }),
    {} as Record<number, React.MutableRefObject<HTMLInputElement | null>>
  );

  const { enqueueSnackbar } = useSnackbar();

  const { confirmPassword } = useAuth();

  const handleShowError = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  const handleChangeCode: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { name, value } = e?.target ?? {};
    let num = Number(name);

    if (value.length > 1) {
      num = num + 1;
    }
    if (num < 6) {
      setCode({ ...code, [num]: value[value.length - 1] });
    }
    if (ref[num + 1]?.current) {
      ref[num + 1]?.current?.focus();
    }
  };

  const handleChangeFirstEmail: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setFirstPassword(e?.target?.value ?? "");
  };

  const handleChangeSecondEmail: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setSecondPassword(e?.target?.value ?? "");
  };

  const digits = Object.values(code);

  const handleConfirmClick = async () => {
    const firstPasswordValidationResult = validatePassword(firstPassword);
    const secondPasswordValidationResult = validatePassword(secondPassword);
    const allFilled = digits.every((digit) => digit.length > 0);
    if (!allFilled) {
      handleShowError("Preencha todos os campos do código.");
      return;
    }

    if (firstPasswordValidationResult) {
      handleShowError(firstPasswordValidationResult);
      return; // If first password is invalid
    }

    if (secondPassword !== firstPassword) {
      handleShowError("As senhas não são idênticas.");
      return; // If passwords are not identical
    }

    if (secondPasswordValidationResult) {
      handleShowError(secondPasswordValidationResult);
      return; // If second password is invalid
    }

    if (typeof email === "string") {
      try {
        await confirmPassword(email, digits.join(""), firstPassword);
        openFinishChangePassword();
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          // Handle all errors here
          console.error("Erro ao confirmar senha: ", error.message);
          handleShowError(error.message);
        } else {
          // If it's an unrecognized type of error, log and display a generic message
          console.error("Erro ao confirmar senha: ", error);
          handleShowError("Erro desconhecido ao confirmar senha.");
        }
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
        <p className="m-0">Por favor insira o código enviado para</p>
        <p className="m-0">seu email e redefina sua senha.</p>
      </div>
      <div className="flex flex-col justify-stretch">
        <Typography className="text-[#B0B0B0] font-semibold text-[14px]">
          CÓDIGO
        </Typography>
        <div className="flex gap-[12px]">
          {CODE_NUMS.map((num) => (
            <TextInput
              key={num}
              ref={ref[num]}
              name={num}
              value={code[num]}
              onChange={(e) => handleChangeCode(e)}
              className="w-full"
              type="string"
              align="center"
            />
          ))}
        </div>
      </div>
      <TextInput
        value={firstPassword}
        label="NOVA SENHA"
        onChange={handleChangeFirstEmail}
        className="w-full"
        type="password"
        placeholder="Digite aqui sua nova senha"
      />
      <TextInput
        value={secondPassword}
        label="REPETIR NOVA SENHA"
        onChange={handleChangeSecondEmail}
        className="w-full"
        type="password"
        placeholder="Digite novamente sua nova senha"
      />
      <Button
        variant="contained"
        className="h-[50px] bg-[#FF4A01] hover:bg-[#FF5A01] rounded-[10px]"
        onClick={handleConfirmClick}
      >
        ENTRAR
      </Button>
    </Dialog>
  );
};
