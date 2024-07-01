import { getCookie } from "cookies-next";
import type { ServerResponse, IncomingMessage } from "http";
import { isServer } from "./common";

export const parseCookie = (data: string | boolean | undefined | null) => {
  return typeof data === "string" ? JSON.parse(data) : {};
};

export const retrieveInitialStoreFromCookies = (
  req?: IncomingMessage,
  res?: ServerResponse
) => {
  if (!isServer) return undefined;
  const serializedSettings = getCookie("settings", { req, res });
  const serializedFavorites = getCookie("favorites", { req, res });
  const serializedUser = getCookie("user", { req, res });
  const serializedIntermediate = getCookie("intermediate", { req, res });

  return {
    settings: parseCookie(serializedSettings),
    favorites: parseCookie(serializedFavorites),
    user: parseCookie(serializedUser),
    intermediate: parseCookie(serializedIntermediate),
  };
};

const isEmptyCookie = (cookieStr: string | boolean | undefined | null) =>
  cookieStr ? cookieStr === "{}" || cookieStr === "true" : false;

export const getStoreInitialData = (
  initialData: any,
  name: string,
  initDataOverCookies?: boolean
) => {
  if (isServer) {
    return initialData || {};
  } else {
    // if it's client try to get it from initialData that comes also from getSSP
    const serializedData = getCookie(name);
    // sometimes we don't need to get persisted data from cookies but more from server side
    if (initDataOverCookies) {
      return initialData || parseCookie(serializedData) || {};
    }
    return !isEmptyCookie(serializedData)
      ? parseCookie(serializedData)
      : initialData || {};
  }
};
