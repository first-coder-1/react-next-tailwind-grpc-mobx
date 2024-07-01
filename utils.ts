export const extractDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getCurrentDate = () => extractDate(new Date().toISOString());

export const isBrowser = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

// Function to format the date in the extensive Brazilian format
export const formatDate = (dateString: string) => {
  if (!dateString) {
    return "";
  }
  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months in Javascript starts with 0 (zero)
  const day = parseInt(parts[2], 10);

  const date = new Date(year, month, day); // Brazilian format date
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString("pt-BR", options);
};

export function capitalizeFirstLetter(string: string): string {
  const words = string.split(" ");
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word[0].toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(" ");
}
