import React from "react";
import { Text, makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    gap: "8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
  },
  version: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export const Header: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.header}>
      <Text className={styles.title}>EYAHWORD</Text>
      <Text className={styles.version}>v1.0</Text>
    </div>
  );
};
