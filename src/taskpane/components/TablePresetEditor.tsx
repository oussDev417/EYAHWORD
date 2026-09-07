import React, { useState } from "react";
import {
  Input,
  Label,
  Select,
  SpinButton,
  Switch,
  Button,
  Divider,
  Text,
  makeStyles,
  tokens,
  MessageBar,
  MessageBarBody,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";
import { SaveRegular, DismissRegular } from "@fluentui/react-icons";
import { TablePreset, TableCellPreset, TableBorderPreset, TableBulletPreset } from "../../presets/tableTypes";
import { modernTablePreset } from "../../presets/tableDefaults";
import { validateTablePreset } from "../../presets/tableValidation";
import { ValidationError } from "../../presets/validation";
import { FontPicker } from "./FontPicker";

const useStyles = makeStyles({
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  row: { display: "flex", gap: "8px", alignItems: "end" },
  field: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "8px",
  },
  actions: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
    marginTop: "8px",
  },
  block: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "8px 0",
  },
});

interface CellEditorProps {
  value: TableCellPreset;
  onChange: (v: TableCellPreset) => void;
  showShading?: boolean;
  shadingLabel?: string;
}

const CellEditor: React.FC<CellEditorProps> = ({ value, onChange, showShading = true, shadingLabel = "Fond" }) => {
  const styles = useStyles();
  return (
    <div className={styles.block}>
      <div className={styles.field}>
        <Label>Police</Label>
        <FontPicker value={value.fontName} onChange={(v) => onChange({ ...value, fontName: v })} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Taille (pt)</Label>
          <SpinButton
            value={value.fontSize}
            min={6}
            max={72}
            onChange={(_, d) => onChange({ ...value, fontSize: d.value ?? value.fontSize })}
          />
        </div>
        <div className={styles.field}>
          <Label>Couleur texte</Label>
          <input type="color" value={value.color} onChange={(e) => onChange({ ...value, color: e.target.value })} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Gras</Label>
          <Switch checked={value.bold} onChange={(_, d) => onChange({ ...value, bold: d.checked })} />
        </div>
        <div className={styles.field}>
          <Label>Italique</Label>
          <Switch checked={value.italic} onChange={(_, d) => onChange({ ...value, italic: d.checked })} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Alignement H.</Label>
          <Select
            value={value.horizontalAlignment}
            onChange={(_, d) => onChange({ ...value, horizontalAlignment: d.value as TableCellPreset["horizontalAlignment"] })}
          >
            <option value="left">Gauche</option>
            <option value="center">Centré</option>
            <option value="right">Droite</option>
            <option value="justified">Justifié</option>
          </Select>
        </div>
        <div className={styles.field}>
          <Label>Alignement V.</Label>
          <Select
            value={value.verticalAlignment}
            onChange={(_, d) => onChange({ ...value, verticalAlignment: d.value as TableCellPreset["verticalAlignment"] })}
          >
            <option value="top">Haut</option>
            <option value="center">Centré</option>
            <option value="bottom">Bas</option>
          </Select>
        </div>
      </div>

      {showShading && (
        <div className={styles.row}>
          <div className={styles.field}>
            <Label>{shadingLabel}</Label>
            <input
              type="color"
              value={value.shadingColor || "#ffffff"}
              onChange={(e) => onChange({ ...value, shadingColor: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <Label>Aucun fond</Label>
            <Switch
              checked={value.shadingColor === ""}
              onChange={(_, d) => onChange({ ...value, shadingColor: d.checked ? "" : "#FFFFFF" })}
            />
          </div>
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Espace avant (pt)</Label>
          <SpinButton
            value={value.spaceBefore}
            min={0}
            max={100}
            onChange={(_, d) => onChange({ ...value, spaceBefore: d.value ?? value.spaceBefore })}
          />
        </div>
        <div className={styles.field}>
          <Label>Espace après (pt)</Label>
          <SpinButton
            value={value.spaceAfter}
            min={0}
            max={100}
            onChange={(_, d) => onChange({ ...value, spaceAfter: d.value ?? value.spaceAfter })}
          />
        </div>
      </div>
    </div>
  );
};

interface BorderEditorProps {
  label: string;
  value: TableBorderPreset;
  onChange: (v: TableBorderPreset) => void;
}

const BorderEditor: React.FC<BorderEditorProps> = ({ label, value, onChange }) => {
  const styles = useStyles();
  return (
    <div className={styles.block}>
      <Text weight="semibold">{label}</Text>
      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Style</Label>
          <Select
            value={value.style}
            onChange={(_, d) => onChange({ ...value, style: d.value as TableBorderPreset["style"] })}
          >
            <option value="none">Aucune</option>
            <option value="single">Simple</option>
            <option value="double">Double</option>
            <option value="dashed">Tirets</option>
            <option value="dotted">Pointillés</option>
            <option value="thick">Épais</option>
          </Select>
        </div>
        <div className={styles.field}>
          <Label>Épaisseur (pt)</Label>
          <SpinButton
            value={value.width}
            min={0}
            max={6}
            step={0.25}
            onChange={(_, d) => onChange({ ...value, width: d.value ?? value.width })}
          />
        </div>
        <div className={styles.field}>
          <Label>Couleur</Label>
          <input type="color" value={value.color} onChange={(e) => onChange({ ...value, color: e.target.value })} />
        </div>
      </div>
    </div>
  );
};

interface TablePresetEditorProps {
  preset?: TablePreset;
  onSave: (preset: TablePreset) => void;
  onCancel: () => void;
}

export const TablePresetEditor: React.FC<TablePresetEditorProps> = ({ preset, onSave, onCancel }) => {
  const styles = useStyles();
  const isEditing = !!preset;
  const base = preset || modernTablePreset;

  const [name, setName] = useState(isEditing ? base.name : "");
  const [description, setDescription] = useState(base.description);
  const [headerEnabled, setHeaderEnabled] = useState(base.headerEnabled);
  const [header, setHeader] = useState<TableCellPreset>({ ...base.header });
  const [cells, setCells] = useState<TableCellPreset>({ ...base.cells });
  const [bandedRows, setBandedRows] = useState(base.bandedRows);
  const [bandedShadingColor, setBandedShadingColor] = useState(base.bandedShadingColor);
  const [outsideBorder, setOutsideBorder] = useState<TableBorderPreset>({ ...base.borders.outside });
  const [insideBorder, setInsideBorder] = useState<TableBorderPreset>({ ...base.borders.inside });
  const [cellBulletsEnabled, setCellBulletsEnabled] = useState(!!base.cellBullets);
  const [cellBullets, setCellBullets] = useState<TableBulletPreset>(
    base.cellBullets ?? {
      fontName: base.cells.fontName,
      fontSize: base.cells.fontSize,
      color: base.cells.color,
      bold: false,
      italic: false,
      spaceBefore: 0,
      spaceAfter: 2,
      leftIndent: 12,
    }
  );
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSave = () => {
    const newPreset: TablePreset = {
      id: isEditing ? base.id : `custom_table_${Date.now()}`,
      name: name.trim(),
      description,
      isBuiltIn: false,
      headerEnabled,
      header,
      cells,
      bandedRows,
      bandedShadingColor,
      borders: { outside: outsideBorder, inside: insideBorder },
      cellBullets: cellBulletsEnabled ? cellBullets : null,
    };
    const validationErrors = validateTablePreset(newPreset);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(newPreset);
  };

  return (
    <div className={styles.form}>
      <Text className={styles.sectionTitle}>
        {isEditing ? "Modifier le format de tableau" : "Nouveau format de tableau"}
      </Text>

      <div className={styles.field}>
        <Label required>Nom</Label>
        <Input value={name} onChange={(_, d) => setName(d.value)} placeholder="Mon format" />
      </div>

      <div className={styles.field}>
        <Label>Description</Label>
        <Textarea value={description} onChange={(_, d) => setDescription(d.value)} resize="vertical" />
      </div>

      <Divider />

      <Accordion multiple collapsible defaultOpenItems={["header", "cells"]}>
        <AccordionItem value="header">
          <AccordionHeader>Ligne d'en-tête</AccordionHeader>
          <AccordionPanel>
            <div className={styles.field}>
              <Label>Activer la ligne d'en-tête</Label>
              <Switch checked={headerEnabled} onChange={(_, d) => setHeaderEnabled(d.checked)} />
            </div>
            {headerEnabled && (
              <CellEditor value={header} onChange={setHeader} shadingLabel="Couleur de fond en-tête" />
            )}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="cells">
          <AccordionHeader>Cellules</AccordionHeader>
          <AccordionPanel>
            <CellEditor value={cells} onChange={setCells} shadingLabel="Couleur de fond cellule" />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="banding">
          <AccordionHeader>Lignes alternées</AccordionHeader>
          <AccordionPanel>
            <div className={styles.block}>
              <div className={styles.field}>
                <Label>Activer</Label>
                <Switch checked={bandedRows} onChange={(_, d) => setBandedRows(d.checked)} />
              </div>
              {bandedRows && (
                <div className={styles.field}>
                  <Label>Couleur des lignes paires</Label>
                  <input
                    type="color"
                    value={bandedShadingColor}
                    onChange={(e) => setBandedShadingColor(e.target.value)}
                  />
                </div>
              )}
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="cellBullets">
          <AccordionHeader>Puces dans les cellules</AccordionHeader>
          <AccordionPanel>
            <div className={styles.block}>
              <div className={styles.field}>
                <Label>Activer</Label>
                <Switch checked={cellBulletsEnabled} onChange={(_, d) => setCellBulletsEnabled(d.checked)} />
              </div>
              {cellBulletsEnabled && (
                <>
                  <div className={styles.field}>
                    <Label>Police</Label>
                    <FontPicker
                      value={cellBullets.fontName}
                      onChange={(v) => setCellBullets({ ...cellBullets, fontName: v })}
                    />
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <Label>Taille (pt)</Label>
                      <SpinButton
                        value={cellBullets.fontSize}
                        min={6}
                        max={72}
                        onChange={(_, d) =>
                          setCellBullets({ ...cellBullets, fontSize: d.value ?? cellBullets.fontSize })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <Label>Couleur</Label>
                      <input
                        type="color"
                        value={cellBullets.color}
                        onChange={(e) => setCellBullets({ ...cellBullets, color: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <Label>Gras</Label>
                      <Switch
                        checked={cellBullets.bold}
                        onChange={(_, d) => setCellBullets({ ...cellBullets, bold: d.checked })}
                      />
                    </div>
                    <div className={styles.field}>
                      <Label>Italique</Label>
                      <Switch
                        checked={cellBullets.italic}
                        onChange={(_, d) => setCellBullets({ ...cellBullets, italic: d.checked })}
                      />
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <Label>Espace avant (pt)</Label>
                      <SpinButton
                        value={cellBullets.spaceBefore}
                        min={0}
                        max={100}
                        onChange={(_, d) =>
                          setCellBullets({ ...cellBullets, spaceBefore: d.value ?? cellBullets.spaceBefore })
                        }
                      />
                    </div>
                    <div className={styles.field}>
                      <Label>Espace après (pt)</Label>
                      <SpinButton
                        value={cellBullets.spaceAfter}
                        min={0}
                        max={100}
                        onChange={(_, d) =>
                          setCellBullets({ ...cellBullets, spaceAfter: d.value ?? cellBullets.spaceAfter })
                        }
                      />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <Label>Retrait gauche (pt)</Label>
                    <SpinButton
                      value={cellBullets.leftIndent}
                      min={0}
                      max={200}
                      step={2}
                      onChange={(_, d) =>
                        setCellBullets({ ...cellBullets, leftIndent: d.value ?? cellBullets.leftIndent })
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="borders">
          <AccordionHeader>Bordures</AccordionHeader>
          <AccordionPanel>
            <BorderEditor label="Bordures extérieures" value={outsideBorder} onChange={setOutsideBorder} />
            <BorderEditor label="Bordures intérieures" value={insideBorder} onChange={setInsideBorder} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {errors.length > 0 && (
        <MessageBar intent="error">
          <MessageBarBody>{errors.map((e) => e.message).join(" ")}</MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.actions}>
        <Button appearance="secondary" icon={<DismissRegular />} onClick={onCancel}>
          Annuler
        </Button>
        <Button appearance="primary" icon={<SaveRegular />} onClick={handleSave}>
          {isEditing ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </div>
  );
};
