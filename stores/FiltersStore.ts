import { makeObservable, observable, action, computed } from "mobx";
import { DayRange, DayValue } from "react-modern-calendar-datepicker";

import { Country, Position } from "types/selections";

const INIT_FILTERS_SETTINGS = {
  search: "",
  positions: [] as Position[],
  ageGroups: [] as string[],
  from: null as DayValue,
  to: null as DayValue,
  pending: false,
  country: null as Country | null,
  poolLevel: true,
};

const MAPPING = {
  search: "search",
  positions: "positions",
  ageGroups: "ageGroups",
  from: "from",
  to: "to",
  pending: "pending",
  country: "country",
  poolLevel: "poolLevel",
};

export class FiltersStore {
  showFilters = false;

  filterSettings = INIT_FILTERS_SETTINGS;

  constructor() {
    makeObservable(this, {
      showFilters: observable,
      toggleFilters: action.bound,

      filterSettings: observable,
      resetFilterSettings: action,
      setFilterSettings: action,

      setPositions: action.bound,
      setAgeGroup: action.bound,
      setDate: action.bound,

      selectedFromDate: computed,
      selectedToDate: computed,

      setCountry: action.bound,
      setPoolLevel: action.bound,
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  resetFilterSettings() {
    this.filterSettings = INIT_FILTERS_SETTINGS;
  }

  setFilterSettings(key: string, value: any) {
    this.filterSettings = { ...this.filterSettings, [key]: value };
  }

  setPositions(selectedValue: Position[]): void {
    const { positions } = this.filterSettings;

    if (positions.includes(selectedValue[0])) {
      this.setFilterSettings(
        MAPPING.positions,
        positions.filter((value) => !selectedValue.includes(value))
      );
    } else {
      this.setFilterSettings(MAPPING.positions, [
        ...positions,
        ...selectedValue,
      ]);
    }
  }

  setAgeGroup(selectedValue: string[]): void {
    const { ageGroups } = this.filterSettings;

    if (ageGroups.includes(selectedValue[0])) {
      this.setFilterSettings(
        MAPPING.ageGroups,
        ageGroups.filter((value) => !selectedValue.includes(value))
      );
    } else {
      this.setFilterSettings(MAPPING.ageGroups, [
        ...ageGroups,
        ...selectedValue,
      ]);
    }
  }

  setDate(dayRange: DayRange): void {
    const { from, to } = dayRange;

    this.setFilterSettings(MAPPING.from, from);
    this.setFilterSettings(MAPPING.to, to);
  }

  get selectedFromDate(): Date | null {
    const { from } = this.filterSettings;
    return from ? new Date(from.year, from.month - 1, from.day) : null;
  }

  get selectedToDate(): Date | null {
    const { to } = this.filterSettings;
    return to ? new Date(to.year, to.month - 1, to.day) : null;
  }

  setCountry(country: Country | null) {
    this.setFilterSettings(MAPPING.country, country);
  }

  setPoolLevel(checked: boolean) {
    this.setFilterSettings(MAPPING.poolLevel, checked);
  }

  dispose(): void {
    // TBD
  }
}
