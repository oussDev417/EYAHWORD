import React from "react";
import {
  Card,
  CardHeader,
  Button,
  Text,
  Badge,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItem,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { PlayRegular, MoreHorizontalRegular } from "@fluentui/react-icons";
import { TablePreset } from "../../presets/tableTypes";

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
    gap: "8px",
  },
  details: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
  },
  actions: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
});

interface TablePresetCardProps {
  preset: TablePreset;
  onApply: (preset: TablePreset) => void;
  onEdit?: (preset: TablePreset) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
  isApplying: boolean;
}

export const TablePresetCard: React.FC<TablePresetCardProps> = ({
  preset,
  onApply,
  onEdit,
  onDuplicate,
  onDelete,
  isApplying,
}) => {
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
          En-tête : {preset.headerEnabled ? "oui" : "non"} — Alternance : {preset.bandedRows ? "oui" : "non"}
        </Text>
        <div className={styles.actions}>
          <Button
            appearance="primary"
            size="small"
            icon={<PlayRegular />}
            onClick={() => onApply(preset)}
            disabled={isApplying}
          >
            Appliquer
          </Button>
          {(onEdit || onDuplicate || onDelete) && (
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton size="small" appearance="subtle" icon={<MoreHorizontalRegular />} />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  {onDuplicate && <MenuItem onClick={() => onDuplicate(preset.id)}>Dupliquer</MenuItem>}
                  {onEdit && !preset.isBuiltIn && (
                    <MenuItem onClick={() => onEdit(preset)}>Modifier</MenuItem>
                  )}
                  {onDelete && !preset.isBuiltIn && (
                    <MenuItem onClick={() => onDelete(preset.id)}>Supprimer</MenuItem>
                  )}
                </MenuList>
              </MenuPopover>
            </Menu>
          )}
        </div>
      </div>
    </Card>
  );
};
