import React from "react";
import {
  Card,
  CardHeader,
  Button,
  Text,
  makeStyles,
  tokens,
  Badge,
} from "@fluentui/react-components";
import { PlayRegular } from "@fluentui/react-icons";
import { FormattingPreset } from "../../presets/types";

const useStyles = makeStyles({
  card: {
    marginBottom: "8px",
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: "4px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "8px",
  },
  details: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
  },
});

interface PresetCardProps {
  preset: FormattingPreset;
  onApply: (preset: FormattingPreset) => void;
  isApplying: boolean;
}

export const PresetCard: React.FC<PresetCardProps> = ({ preset, onApply, isApplying }) => {
  const styles = useStyles();

  return (
    <Card className={styles.card} size="small">
      <CardHeader
        header={
          <Text weight="semibold">
            {preset.name}
            {preset.isBuiltIn && (
              <Badge appearance="outline" size="small" style={{ marginLeft: 8 }}>
                Intégré
              </Badge>
            )}
          </Text>
        }
      />
      <Text className={styles.description}>{preset.description}</Text>
      <div className={styles.footer}>
        <Text className={styles.details}>
          {preset.body.name} {preset.body.size}pt — Interligne {preset.paragraph.lineSpacing}
        </Text>
        <Button
          appearance="primary"
          size="small"
          icon={<PlayRegular />}
          onClick={() => onApply(preset)}
          disabled={isApplying}
        >
          Appliquer
        </Button>
      </div>
    </Card>
  );
};
