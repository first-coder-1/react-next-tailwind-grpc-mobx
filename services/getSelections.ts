import Cookies from "js-cookie";
import { BASE_URL, PATH } from "components/constants";
import { SelectionsItem } from "types/selections";

export const getSelections = async () => {
  const sessionToken = Cookies.get("idToken");
  if (!sessionToken) {
    console.error("No session token found");
    return [];
  }

  if (!BASE_URL) {
    throw new Error("API URL is not defined");
  }

  const url = new URL(BASE_URL);

  url.pathname = PATH.selections;
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API test failed: ${response.statusText}`);
  }

  const { items } = await response.json();

  return items as SelectionsItem[];
};
