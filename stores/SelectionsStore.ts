import { FiltersStore } from "./FiltersStore";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import { getSelections } from "services";
import { SelectionsItem } from "types/selections";
import { extractDate, getCurrentDate, isServer } from "utils/common";

export class SelectionsStore {
  selectionsList = [] as SelectionsItem[];
  fetchedTime: Date = getCurrentDate();
  //   private disposeFetch: () => void;

  constructor(private filtersStore: FiltersStore) {
    makeObservable(this, {
      selectionsList: observable,
      fetchedTime: observable,
      init: action.bound,

      filteredSelectionsList: computed,
      scheduledSelectionsList: computed,
      historicalSelectionsList: computed,
    });
  }

  async init() {
    try {
      const result = await getSelections();
      runInAction(() => {
        this.selectionsList = result;
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

  private filterPosition(list: SelectionsItem[]): SelectionsItem[] {
    return list.filter((item) =>
      item.positions.some((position) =>
        this.filtersStore.filterSettings.positions.includes(position)
      )
    );
  }

  private filterAgeGroup(list: SelectionsItem[]): SelectionsItem[] {
    return list.filter((item) =>
      item.ageGroups.some((ageGroup) =>
        this.filtersStore.filterSettings.ageGroups.some((age) =>
          ageGroup.includes(age)
        )
      )
    );
  }

  private filterToDate(list: SelectionsItem[]): SelectionsItem[] {
    const toDate = this.filtersStore.selectedToDate;
    if (toDate) {
      return list.filter((item) => {
        const beginDate = new Date(item.beginAt);
        return beginDate < toDate;
      });
    }
    return list;
  }

  private filterFromDate(list: SelectionsItem[]): SelectionsItem[] {
    const fromDate = this.filtersStore.selectedFromDate;
    if (fromDate) {
      return list.filter((item) => {
        const endDate = new Date(item.endAt);
        return fromDate < endDate;
      });
    }
    return list;
  }

  private filterAll(list: SelectionsItem[]): SelectionsItem[] {
    let filteredList = [...list];
    if (this.filtersStore.filterSettings.positions.length > 0) {
      filteredList = this.filterPosition(filteredList);
    }
    if (this.filtersStore.filterSettings.ageGroups.length > 0) {
      filteredList = this.filterAgeGroup(filteredList);
    }

    filteredList = this.filterFromDate(filteredList);
    filteredList = this.filterToDate(filteredList);

    return filteredList;
  }

  get filteredSelectionsList(): SelectionsItem[] {
    const list = this.selectionsList.filter(
      (item: SelectionsItem) =>
        extractDate(item.beginAt) <= this.fetchedTime &&
        extractDate(item.endAt) >= this.fetchedTime
    );
    return this.filterAll(list);
  }

  get scheduledSelectionsList(): SelectionsItem[] {
    const list = this.selectionsList.filter(
      (item: SelectionsItem) => extractDate(item.beginAt) > this.fetchedTime
      // extractDate(item.beginAt) <= currentDate // For debbuging purposes only
    );
    return this.filterAll(list);
  }

  get historicalSelectionsList() {
    const list = this.selectionsList.filter(
      (item: SelectionsItem) => extractDate(item.endAt) < this.fetchedTime
    );
    return this.filterAll(list);
  }

  dispose(): void {
    // this.dispose();
  }
}
