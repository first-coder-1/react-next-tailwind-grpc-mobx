import { createContext, useContext, useMemo } from "react";
import { makeObservable, observable, action } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

import { SelectionsStore } from "./SelectionsStore";
import { FiltersStore } from "./FiltersStore";

import { isServer } from "utils/common";

import { AthletesSelectionsStore } from "./AthletesSelectionsStore";

enableStaticRendering(isServer);

export class RootStore {
  static instance?: RootStore;
  maintenance = false;

  selectionsStore: SelectionsStore;
  athletesSelectionsStore: AthletesSelectionsStore;
  filtersStore: FiltersStore;

  static getInstance(initialData?: object): RootStore {
    RootStore.instance = new RootStore(initialData);

    return RootStore.instance;
  }

  constructor(initialData: any) {
    makeObservable(this, {
      maintenance: observable,
      maintenanceOn: action,
    });

    this.filtersStore = new FiltersStore();
    this.athletesSelectionsStore = new AthletesSelectionsStore(
      this.filtersStore
    );
    this.selectionsStore = new SelectionsStore(this.filtersStore);

    const { user, settings, favorites, intermediate } = initialData || {};
  }

  maintenanceOn() {
    this.maintenance = true;
  }

  dispose(): void {
    this.selectionsStore.dispose();
    this.athletesSelectionsStore.dispose();
    this.filtersStore.dispose();
  }
}

const RootStoreContext = createContext(
  {} as ReturnType<typeof RootStore.getInstance>
);

function initializeStore(pageData = {}) {
  const _store = RootStore.getInstance({
    ...pageData,
  });
  return { store: _store };
}

export const StoreProvider: React.FC<
  React.PropsWithChildren<Record<string, any>>
> = ({ children, initialStoreFromPage }) => {
  const { store } = useMemo(() => initializeStore(initialStoreFromPage), []);

  return (
    <>
      <RootStoreContext.Provider value={store}>
        {children}
      </RootStoreContext.Provider>
    </>
  );
};

export function useStore(): RootStore {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
