import React from "react";
import { Text, MessageBar, MessageBarBody, makeStyles, tokens } from "@fluentui/react-components";
import { PresetCard } from "../components/PresetCard";
import { ProgressBar } from "../components/ProgressBar";
import { useWordFormatting } from "../hooks/useWordFormatting";
import { usePresets } from "../hooks/usePresets";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  section: {
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
    display: "block",
  },
});

export const FormattingPage: React.FC = () => {
  const styles = useStyles();
  const { isFormatting, progress, result, error, format } = useWordFormatting();
  const { builtInPresets, customPresets } = usePresets();

  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Presets intégrés</Text>
        {builtInPresets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onApply={format}
            isApplying={isFormatting}
          />
        ))}
      </div>

      {customPresets.length > 0 && (
        <div className={styles.section}>
          <Text className={styles.sectionTitle}>Presets personnalisés</Text>
          {customPresets.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              onApply={format}
              isApplying={isFormatting}
            />
          ))}
        </div>
      )}

      {isFormatting && progress && <ProgressBar progress={progress} />}

      {result && (
        <MessageBar intent="success">
          <MessageBarBody>
            {result.paragraphsFormatted} paragraphes formatés.
            {result.pageSetupResult.message && ` ${result.pageSetupResult.message}`}
          </MessageBarBody>
        </MessageBar>
      )}

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}
    </div>
  );
};
