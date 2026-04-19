import React, { createContext, useContext } from "react";
import { usePresets, UsePresetsReturn } from "../hooks/usePresets";

const PresetContext = createContext<UsePresetsReturn | null>(null);

export const PresetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const presets = usePresets();

  return (
    <PresetContext.Provider value={presets}>
      {children}
    </PresetContext.Provider>
  );
};

export function usePresetContext(): UsePresetsReturn {
  const context = useContext(PresetContext);
  if (!context) {
    throw new Error("usePresetContext must be used within a PresetProvider");
  }
  return context;
}
