import React, { useState } from "react";
import {
  Button,
  Text,
  Card,
  CardHeader,
  makeStyles,
  tokens,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from "@fluentui/react-components";
import {
  AddRegular,
  EditRegular,
  CopyRegular,
  DeleteRegular,
  MoreVerticalRegular,
  PlayRegular,
} from "@fluentui/react-icons";
import { FormattingPreset } from "../../presets/types";
import { PresetEditor } from "../components/PresetEditor";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { usePresetContext } from "../context/PresetContext";
import { useWordFormatting } from "../hooks/useWordFormatting";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  card: {
    marginBottom: "8px",
  },
  cardActions: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  empty: {
    textAlign: "center" as const,
    padding: "24px",
    color: tokens.colorNeutralForeground3,
  },
});

export const CustomPresetsPage: React.FC = () => {
  const styles = useStyles();
  const { customPresets, addPreset, updatePreset, removePreset, duplicatePreset } = usePresetContext();
  const { format, isFormatting } = useWordFormatting();
  const [editingPreset, setEditingPreset] = useState<FormattingPreset | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSave = (preset: FormattingPreset) => {
    if (editingPreset) {
      updatePreset(preset);
      setEditingPreset(null);
    } else {
      addPreset(preset);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setEditingPreset(null);
    setIsCreating(false);
  };

  if (isCreating || editingPreset) {
    return (
      <PresetEditor
        preset={editingPreset ?? undefined}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Text weight="semibold">Presets personnalisés</Text>
        <Button
          appearance="primary"
          size="small"
          icon={<AddRegular />}
          onClick={() => setIsCreating(true)}
        >
          Nouveau
        </Button>
      </div>

      {customPresets.length === 0 ? (
        <Text className={styles.empty}>
          Aucun preset personnalisé. Cliquez sur "Nouveau" pour en créer un.
        </Text>
      ) : (
        customPresets.map((preset) => (
          <Card key={preset.id} className={styles.card} size="small">
            <CardHeader
              header={<Text weight="semibold">{preset.name}</Text>}
              action={
                <div className={styles.cardActions}>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<PlayRegular />}
                    onClick={() => format(preset)}
                    disabled={isFormatting}
                  />
                  <Menu>
                    <MenuTrigger>
                      <Button appearance="subtle" size="small" icon={<MoreVerticalRegular />} />
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem icon={<EditRegular />} onClick={() => setEditingPreset(preset)}>
                          Modifier
                        </MenuItem>
                        <MenuItem icon={<CopyRegular />} onClick={() => duplicatePreset(preset.id)}>
                          Dupliquer
                        </MenuItem>
                        <MenuItem icon={<DeleteRegular />} onClick={() => setDeleteTarget(preset.id)}>
                          Supprimer
                        </MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </div>
              }
            />
            <Text style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>
              {preset.description}
            </Text>
          </Card>
        ))
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Supprimer le preset"
        message="Voulez-vous vraiment supprimer ce preset ? Cette action est irréversible."
        onConfirm={() => {
          if (deleteTarget) removePreset(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
