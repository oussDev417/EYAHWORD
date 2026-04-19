import React, { createContext, useContext } from "react";
import { useSettings, UseSettingsReturn } from "../hooks/useSettings";

const SettingsContext = createContext<UseSettingsReturn | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const settings = useSettings();

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettingsContext(): UseSettingsReturn {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within a SettingsProvider");
  }
  return context;
}
