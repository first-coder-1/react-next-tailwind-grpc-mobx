import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { GetServerSideProps } from "next";
import Cookies from "cookie";
import { ChangePasswordPopup } from "components/ChangePasswordPopup";
import { useSnackbar } from "notistack";
import { validateEmail } from "utils/email";
import { ForgotPasswordPopup } from "components/ForgotPasswordPopup";
import { ConfirmPasswordPopup } from "components/ConfirmPasswordPopup";
import { FinishChangePasswordPopup } from "components/FinishChangePasswordPopup";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import { LocaleSwitcher } from "components/LocaleSwitcher";

export const runtime = "experimental-edge";

const login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [isOpenConfirmPassword, setIsOpenConfirmPassword] = useState(false);
  const [isOpenFinishChangePassword, setIsOpenFinishChangePassword] =
    useState(false);

  const translations = useTranslations("login");

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();

  const handleShowError = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
    });
  };

  useEffect(() => {
    // When the component mounts, check localStorage
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (isChecked) {
      if (email.trim() === "") {
        handleShowError("O campo email não pode estar vazio.");
        return;
      }

      if (!validateEmail(email)) {
        handleShowError("Digite um e-mail válido.");
        return;
      }

      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  const handleOpenChangePassword = () => {
    setIsOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setIsOpenChangePassword(false);
  };

  const handleOpenForgotPassword = () => {
    setIsOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setIsOpenForgotPassword(false);
  };

  const handleOpenConfirmPassword = () => {
    setIsOpenConfirmPassword(true);
  };

  const handleCloseConfirmPassword = () => {
    setIsOpenConfirmPassword(false);
  };

  const handleOpenFinishChangePassword = () => {
    setIsOpenFinishChangePassword(true);
  };

  const handleCloseFinishChangePassword = () => {
    setIsOpenFinishChangePassword(false);
  };

  const handleLogin = async () => {
    // Check for empty fields
    if (!email.trim()) {
      handleShowError("O campo de e-mail é obrigatório.");
      return;
    } else {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
      if (!email.match(emailPattern)) {
        handleShowError("Formato de email inválido.");
        return;
      }
    }

    if (!password.trim()) {
      handleShowError("O campo de senha é obrigatório.");
      return;
    }

    try {
      const success = await login(email, password);

      if (success) {
        router.push("/selections");
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "User does not exist.":
            handleShowError("Esse email não existe ou não está cadastrado.");
            break;
          case "Incorrect username or password.":
            handleShowError("Senha incorreta.");
            break;
          case "New password required":
            localStorage.setItem("rememberedNewUser", email);
            handleOpenChangePassword();
            break;
          default:
            handleShowError("Ocorreu um erro desconhecido ao fazer login.");
        }
      } else {
        handleShowError("Ocorreu um erro desconhecido ao fazer login.");
      }
    }
  };

  // Rendering area
  return (
    <div className="relative bg-darkslategray w-[100vw] h-[100vh] overflow-hidden text-left text-[1rem] text-neutrals-color-neutral-100 font-archivo">
      <LocaleSwitcher className="absolute right-[20px] top-[20px] z-30" />
      <img
        className="absolute top-0 left-0 right-0 bottom-0 object-cover"
        alt=""
        src="/assets/backgrounds/background-mask-pattern.png"
      />
      <div className="absolute h-[54.69%] w-[32.01%] top-[22.72%] right-[55.83%] bottom-[22.59%] left-[12.15%]">
        <div className="absolute h-[11.51%] w-[99.78%] top-[88.49%] left-[0.22%] leading-[140%] inline-block opacity-[0.8]">
          {translations("description")}
        </div>
        <div className="absolute top-[25.51%] left-[0%] text-[6.25rem] leading-[5.31rem] font-semibold font-mango-grotesque">
          <p className="m-0">{translations("title1")}</p>
          <p className="m-0">{translations("title2")}</p>
          <p className="m-0">{translations("title3")}</p>
        </div>
        <img
          className="absolute h-[16.18%] w-[30.31%] top-[0%] right-[69.69%] bottom-[83.82%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/assets/images/logo-dsscout.svg"
        />
      </div>
      <div className="absolute h-[53.58%] w-[23.89%] top-[22.72%] right-[12.29%] bottom-[23.7%] left-[63.82%] text-[0.88rem] text-darkgray">
        <div className="absolute top-[0%] left-[0.29%] text-[2.38rem] font-semibold font-mango-grotesque text-neutrals-color-neutral-100">
          {translations("subtitle")}
        </div>
        <div className="absolute top-[26.19rem] left-[2.31rem] w-[16.94rem] h-[0.94rem] text-silver-300">
          <button
            className={`cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[0rem] left-[10rem] text-[0.88rem] [text-decoration:underline] font-archivo text-neutrals-color-neutral-100 text-left inline-block whitespace-nowrap`}
          >
            {translations("contactUs")}
          </button>
          <div className={`absolute top-[0rem] left-[0rem]`}>
            {translations("haveAccount")}
          </div>
        </div>
        <button
          className={`cursor-pointer [border:none] p-0 bg-[transparent] absolute top-[17.69rem] left-[13.06rem] text-[0.88rem] [text-decoration:underline] font-archivo text-silver-100 text-left inline-block whitespace-nowrap`}
          onClick={handleOpenForgotPassword}
        >
          {translations("forgotPassword")}
        </button>
        <div className="absolute top-[2.94rem] left-[0rem] text-silver-200">
          {translations("subDescription")}
        </div>

        <div className="absolute top-[6.13rem] left-[0.06rem] w-[21.44rem] h-auto font-buttons-b4">
          <div className="absolute top-auto left-[0%] font-semibold">LOGIN</div>

          <input
            className="[border:none] block font-archivo text-[0.88rem] bg-neutrals-color-neutral-100 absolute top-[1.31rem] left-[0rem] rounded-3xs w-[21.44rem] h-[3.13rem] pl-4"
            value={email}
            placeholder="Digite seu email cadastrado"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div
          className={`absolute top-[12.5rem] left-[0.06rem] w-[21.44rem] h-auto font-buttons-b4`}
          style={{}}
        >
          <div className="absolute top-auto left-[0%] font-semibold">SENHA</div>

          <input
            className="[border:none] block font-archivo text-[0.88rem] bg-neutrals-color-neutral-100 absolute top-[1.31rem] left-[0rem] rounded-3xs w-[21.44rem] h-[3.13rem] pl-4"
            value={password}
            placeholder="Digite sua senha"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className={`cursor-pointer border-none p-0 bg-brand-color-brand-orange-high absolute left-[0.06rem] rounded-md w-[21.44rem] h-[3.13rem] text-white transition-colors hover:bg-white hover:text-red-500 active:bg-white active:text-red-500 bottom-[2.5rem]`}
          onClick={handleLogin}
        >
          <div className="flex items-center justify-center h-full">
            <b className="text-[0.88rem] tracking-[-0.2px] leading-[1.13rem] uppercase font-buttons-b4">
              ENTRAR
            </b>
            <img
              className="w-[2.5rem] h-[2.5rem] overflow-hidden shrink-0 hidden"
              alt=""
              src="/assets/icons/icon-arrow-right.svg"
            />
          </div>
        </button>

        <div
          className={`absolute top-[17.56rem] left-[0.06rem] w-[7.88rem] h-[1.06rem] text-silver-100 `}
        >
          <div className="absolute top-[0.13rem] left-[1.56rem]">
            {translations("rememberMe")}
          </div>
          <input
            className="absolute top-[0rem] left-[0rem] w-[1.06rem] h-[1.06rem]"
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </div>
      </div>
      {isOpenChangePassword && (
        <ChangePasswordPopup onClose={handleCloseChangePassword} />
      )}
      {isOpenForgotPassword && (
        <ForgotPasswordPopup
          onClose={handleCloseForgotPassword}
          openConfirmPassword={handleOpenConfirmPassword}
        />
      )}
      {isOpenConfirmPassword && (
        <ConfirmPasswordPopup
          onClose={handleCloseConfirmPassword}
          email={email}
          openFinishChangePassword={handleOpenFinishChangePassword}
        />
      )}
      {isOpenFinishChangePassword && (
        <FinishChangePasswordPopup onClose={handleCloseFinishChangePassword} />
      )}
    </div>
  );
});

export default login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get cookies of context requisiton
  const cookies = context.req.headers.cookie
    ? Cookies.parse(context.req.headers.cookie)
    : {};

  // Verify that the cookie exist
  const authToken = cookies.idToken;

  if (authToken) {
    // If cookie exists, we assume that user is logged
    // and redirect for `selections`
    return {
      redirect: {
        destination: "/selections",
        permanent: false,
      },
    };
  }

  // If the user is not authenticaed, return pattern props
  return {
    props: {
      messages: (
        await import(`components/locales/${cookies?.NEXT_LOCALE}.json`)
      ).default,
    },
  };
};
