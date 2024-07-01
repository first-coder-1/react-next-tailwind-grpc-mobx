import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import { getSelectionsById } from "services";
import { AthletesSelectionsItem, Country } from "types/selections";
import { extractDate, getCurrentDate } from "utils/common";
import { FiltersStore } from "./FiltersStore";

const POOL_LEVEL_LIST = [4, 6, 7, 8, 9];

export class AthletesSelectionsStore {
  id: number | null = null;
  athletesSelectionsList = [] as AthletesSelectionsItem[];
  fetchedTime: Date = getCurrentDate();

  constructor(private filtersStore: FiltersStore) {
    makeObservable(this, {
      id: observable,
      setId: action.bound,

      athletesSelectionsList: observable,
      fetchedTime: observable,
      init: action.bound,

      passedSelectionsList: computed,
      nonPassedSelectionsList: computed,
      dismissedSelectionsList: computed,

      countriesList: computed,
    });
  }

  async init(id: number) {
    if (!id) {
      return;
    }
    try {
      const result = await getSelectionsById(id);
      runInAction(() => {
        this.athletesSelectionsList = result;
        this.fetchedTime = getCurrentDate();
      });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        //   setErrorMessage(error.message);
      } else {
        //   setErrorMessage(String(error));
      }
    }
  }

  setId(id: number) {
    this.id = id;
  }

  private filterPosition(
    list: AthletesSelectionsItem[]
  ): AthletesSelectionsItem[] {
    return list.filter((item) =>
      item.positions.some((position) =>
        this.filtersStore.filterSettings.positions.includes(position)
      )
    );
  }

  private filterAgeGroup(
    list: AthletesSelectionsItem[]
  ): AthletesSelectionsItem[] {
    return list.filter((item) =>
      item.ageGroups.some((ageGroup) =>
        this.filtersStore.filterSettings.ageGroups.some((age) =>
          ageGroup.includes(age)
        )
      )
    );
  }

  private filterCountry(
    list: AthletesSelectionsItem[]
  ): AthletesSelectionsItem[] {
    const selectedCountry = this.filtersStore.filterSettings.country;
    return selectedCountry
      ? list.filter((item) => item.country.code === selectedCountry.code)
      : list;
  }

  private filterPoolLevel(
    list: AthletesSelectionsItem[]
  ): AthletesSelectionsItem[] {
    return this.filtersStore.filterSettings.poolLevel
      ? list.filter((item) => POOL_LEVEL_LIST.includes(item.level))
      : list;
  }

  private filterAll(list: AthletesSelectionsItem[]): AthletesSelectionsItem[] {
    let filteredList = [...list];
    if (this.filtersStore.filterSettings.positions.length > 0) {
      filteredList = this.filterPosition(filteredList);
    }
    if (this.filtersStore.filterSettings.ageGroups.length > 0) {
      filteredList = this.filterAgeGroup(filteredList);
    }
    filteredList = this.filterCountry(filteredList);
    filteredList = this.filterPoolLevel(filteredList);
    return filteredList;
  }

  get passedSelectionsList(): AthletesSelectionsItem[] {
    const list = this.athletesSelectionsList.filter(
      (item: AthletesSelectionsItem) => item.isPassed
    );
    return this.filterAll(list);
  }

  get nonPassedSelectionsList(): AthletesSelectionsItem[] {
    const list = this.athletesSelectionsList.filter(
      (item: AthletesSelectionsItem) => !item.isPassed
    );
    return this.filterAll(list);
  }

  get dismissedSelectionsList() {
    const list = this.athletesSelectionsList.filter(
      (item: AthletesSelectionsItem) => item.isDismissed === true
    );
    return this.filterAll(list);
  }

  get countriesList(): Country[] {
    let countryMap = this.athletesSelectionsList.reduce(
      (memo, { country }) => ({ ...memo, [country.code]: country }),
      {}
    );
    return Object.values(countryMap);
  }

  dispose(): void {
    // TBD
  }
}
