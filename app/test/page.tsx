"use client";

import { useStore } from "@/stores/useStore";
import usePersistedStore from "@/hooks/usePersistedStore";

interface StoreState {
  value: number;
  setValue: (newValue: number) => void;
}

// Example usage in a component
function ExampleComponent() {
  const [value, setValue, isHydrated] = usePersistedStore<StoreState>({
    defaultValue: 0,
    key: "my-app-storage1",
    useStore: useStore,
  });

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
      <div>{isHydrated ? "(Hydrated)" : "(Using localStorage)"}</div>
    </div>
  );
}

export default ExampleComponent;
