import Cookies from "js-cookie";
import { BASE_URL, PATH } from "components/constants";
import { AthletesSelectionsItem } from "types/selections";

export const getSelectionsById = async (id: number) => {
  const sessionToken = Cookies.get("idToken");
  if (!sessionToken) {
    console.error("No session token found");
    return [];
  }

  if (!BASE_URL) {
    throw new Error("API URL is not defined");
  }

  const url = new URL(BASE_URL);
  url.pathname = `${PATH.selections}/${id}/players`;
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

  return items as AthletesSelectionsItem[];
};
