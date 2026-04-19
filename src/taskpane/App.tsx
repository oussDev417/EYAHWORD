import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Tab,
  TabList,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  DocumentTextRegular,
  EditRegular,
  BrainCircuitRegular,
  SettingsRegular,
} from "@fluentui/react-icons";
import { Header } from "./components/Header";
import { FormattingPage } from "./pages/FormattingPage";
import { CustomPresetsPage } from "./pages/CustomPresetsPage";
import { AIFeaturesPage } from "./pages/AIFeaturesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PresetProvider } from "./context/PresetContext";
import { SettingsProvider } from "./context/SettingsContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  tabList: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  content: {
    flex: 1,
    overflow: "auto",
    padding: "12px",
  },
});

type TabId = "format" | "custom" | "ai" | "settings";

export const App: React.FC = () => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState<TabId>("format");

  return (
    <FluentProvider theme={webLightTheme}>
      <SettingsProvider>
        <PresetProvider>
          <div className={styles.root}>
            <Header />
            <TabList
              className={styles.tabList}
              selectedValue={selectedTab}
              onTabSelect={(_, data) => setSelectedTab(data.value as TabId)}
              size="small"
            >
              <Tab value="format" icon={<DocumentTextRegular />}>
                Format
              </Tab>
              <Tab value="custom" icon={<EditRegular />}>
                Custom
              </Tab>
              <Tab value="ai" icon={<BrainCircuitRegular />}>
                IA
              </Tab>
              <Tab value="settings" icon={<SettingsRegular />}>
                Réglages
              </Tab>
            </TabList>
            <div className={styles.content}>
              {selectedTab === "format" && <FormattingPage />}
              {selectedTab === "custom" && <CustomPresetsPage />}
              {selectedTab === "ai" && <AIFeaturesPage />}
              {selectedTab === "settings" && <SettingsPage />}
            </div>
          </div>
        </PresetProvider>
      </SettingsProvider>
    </FluentProvider>
  );
};
