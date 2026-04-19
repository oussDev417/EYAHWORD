import React from "react";
import { ProgressBar as FluentProgressBar, Text, makeStyles, tokens } from "@fluentui/react-components";
import { FormatProgress } from "../../engine/formatting";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "8px 0",
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

interface ProgressBarProps {
  progress: FormatProgress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const styles = useStyles();
  const value = progress.total > 0 ? progress.current / progress.total : 0;

  return (
    <div className={styles.container}>
      <FluentProgressBar value={value} />
      <Text className={styles.label}>
        {progress.phase} ({progress.current}/{progress.total})
      </Text>
    </div>
  );
};
