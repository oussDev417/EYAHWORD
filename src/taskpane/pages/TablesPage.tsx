import React, { useState } from "react";
import {
  Button,
  Text,
  MessageBar,
  MessageBarBody,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { AddRegular } from "@fluentui/react-icons";
import { TablePreset } from "../../presets/tableTypes";
import { TablePresetCard } from "../components/TablePresetCard";
import { TablePresetEditor } from "../components/TablePresetEditor";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useTablePresets } from "../hooks/useTablePresets";
import { useTableFormatting } from "../hooks/useTableFormatting";

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
    marginTop: "8px",
    display: "block",
  },
});

export const TablesPage: React.FC = () => {
  const styles = useStyles();
  const { builtInPresets, customPresets, addPreset, updatePreset, removePreset, duplicatePreset } =
    useTablePresets();
  const { format, isFormatting, result, error } = useTableFormatting();

  const [editingPreset, setEditingPreset] = useState<TablePreset | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleSave = (preset: TablePreset) => {
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
      <TablePresetEditor
        preset={editingPreset ?? undefined}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <Text weight="semibold">Formats de tableaux</Text>
        <Button
          appearance="primary"
          size="small"
          icon={<AddRegular />}
          onClick={() => setIsCreating(true)}
        >
          Nouveau
        </Button>
      </div>

      <Text className={styles.sectionTitle}>Formats intégrés</Text>
      {builtInPresets.map((preset) => (
        <TablePresetCard
          key={preset.id}
          preset={preset}
          onApply={format}
          onDuplicate={duplicatePreset}
          isApplying={isFormatting}
        />
      ))}

      {customPresets.length > 0 && (
        <>
          <Text className={styles.sectionTitle}>Formats personnalisés</Text>
          {customPresets.map((preset) => (
            <TablePresetCard
              key={preset.id}
              preset={preset}
              onApply={format}
              onEdit={setEditingPreset}
              onDuplicate={duplicatePreset}
              onDelete={setDeleteTarget}
              isApplying={isFormatting}
            />
          ))}
        </>
      )}

      {result && (
        <MessageBar intent={result.tablesFormatted > 0 ? "success" : "info"}>
          <MessageBarBody>
            {result.tablesFormatted === 0
              ? "Aucun tableau trouvé dans le document."
              : `${result.tablesFormatted} tableau(x) formaté(s).`}
          </MessageBarBody>
        </MessageBar>
      )}

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Supprimer le format"
        message="Voulez-vous vraiment supprimer ce format de tableau ?"
        onConfirm={() => {
          if (deleteTarget) removePreset(deleteTarget);
          setDeleteTarget(null);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
