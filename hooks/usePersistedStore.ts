"use client";
import { useEffect } from "react";
import { getDeepProperty } from "@/utils/helper";
import { useState } from "react";
import { StoreApi, UseBoundStore } from "zustand";
import { PersistOptions } from "zustand/middleware";

type PersistListener<S> = (state: S) => void;
type StorePersist<S, Ps> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: PersistListener<S>) => () => void;
    onFinishHydration: (fn: PersistListener<S>) => () => void;
    getOptions: () => Partial<PersistOptions<S, Ps>>;
  };
};
type Write<T, U> = Omit<T, keyof U> & U;

type StoreState = {
  value: number;
  setValue: (newValue: number) => void;
};

export default function usePersistedStore<S extends StoreState>({
  useStore,
  key,
  defaultValue,
}: {
  useStore: UseBoundStore<Write<StoreApi<S>, StorePersist<S, S>>>;
  key: string;
  defaultValue: number;
}) {
  const immediateValue =
    getDeepProperty(
      JSON.parse(localStorage.getItem(key) || "{}"),
      "state.value",
    ) || defaultValue;

  const zustandValue = useStore((state) => state.value);
  const setValue = useStore((state) => state.setValue);

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    useStore.persist.rehydrate();
    return () => {
      unsubFinishHydration();
    };
  }, []);

  const currentValue = hasHydrated ? zustandValue : immediateValue;

  return [currentValue, setValue, hasHydrated];
}
