export type FilterOptionWithArray = { value: string[]; label: string };
export type FilterOptionWithoutArray = { value: string; label: string };
export type FilterOption = FilterOptionWithArray | FilterOptionWithoutArray;
