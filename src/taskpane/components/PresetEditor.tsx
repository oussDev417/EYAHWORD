import React, { useState } from "react";
import {
  Input,
  Label,
  Select,
  SpinButton,
  Button,
  Divider,
  Text,
  makeStyles,
  tokens,
  MessageBar,
  MessageBarBody,
  Textarea,
} from "@fluentui/react-components";
import { SaveRegular, DismissRegular } from "@fluentui/react-icons";
import { FormattingPreset, FontPreset, ParagraphPreset, HeadingPreset, PagePreset } from "../../presets/types";
import { academicPreset } from "../../presets/defaults";
import { validatePreset, ValidationError } from "../../presets/validation";
import { cmToPoints, pointsToCm } from "../../utils/units";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    gap: "8px",
    alignItems: "end",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
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
});

interface PresetEditorProps {
  preset?: FormattingPreset;
  onSave: (preset: FormattingPreset) => void;
  onCancel: () => void;
}

export const PresetEditor: React.FC<PresetEditorProps> = ({ preset, onSave, onCancel }) => {
  const styles = useStyles();
  const isEditing = !!preset;
  const base = preset || academicPreset;

  const [name, setName] = useState(isEditing ? base.name : "");
  const [description, setDescription] = useState(base.description);
  const [body, setBody] = useState<FontPreset>({ ...base.body });
  const [paragraph, setParagraph] = useState<ParagraphPreset>({ ...base.paragraph });
  const [h1, setH1] = useState<HeadingPreset>({ ...base.headings.h1 });
  const [h2, setH2] = useState<HeadingPreset>({ ...base.headings.h2 });
  const [h3, setH3] = useState<HeadingPreset>({ ...base.headings.h3 });
  const [page, setPage] = useState<PagePreset>({ ...base.page });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSave = () => {
    const newPreset: FormattingPreset = {
      id: isEditing ? base.id : `custom_${Date.now()}`,
      name: name.trim(),
      description,
      isBuiltIn: false,
      body,
      paragraph,
      headings: { h1, h2, h3 },
      page,
    };

    const validationErrors = validatePreset(newPreset);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(newPreset);
  };

  return (
    <div className={styles.form}>
      <Text className={styles.sectionTitle}>
        {isEditing ? "Modifier le preset" : "Nouveau preset"}
      </Text>

      <div className={styles.field}>
        <Label required>Nom</Label>
        <Input value={name} onChange={(_, d) => setName(d.value)} placeholder="Mon preset" />
      </div>

      <div className={styles.field}>
        <Label>Description</Label>
        <Textarea value={description} onChange={(_, d) => setDescription(d.value)} resize="vertical" />
      </div>

      <Divider />
      <Text className={styles.sectionTitle}>Police du corps</Text>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Police</Label>
          <Input value={body.name} onChange={(_, d) => setBody({ ...body, name: d.value })} />
        </div>
        <div className={styles.field}>
          <Label>Taille (pt)</Label>
          <SpinButton
            value={body.size}
            min={6}
            max={72}
            onChange={(_, d) => setBody({ ...body, size: d.value ?? body.size })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Couleur</Label>
          <input type="color" value={body.color} onChange={(e) => setBody({ ...body, color: e.target.value })} />
        </div>
      </div>

      <Divider />
      <Text className={styles.sectionTitle}>Paragraphe</Text>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Alignement</Label>
          <Select
            value={paragraph.alignment}
            onChange={(_, d) => setParagraph({ ...paragraph, alignment: d.value as ParagraphPreset["alignment"] })}
          >
            <option value="left">Gauche</option>
            <option value="center">Centré</option>
            <option value="right">Droite</option>
            <option value="justified">Justifié</option>
          </Select>
        </div>
        <div className={styles.field}>
          <Label>Interligne</Label>
          <SpinButton
            value={paragraph.lineSpacing}
            min={0.5}
            max={5}
            step={0.05}
            onChange={(_, d) => setParagraph({ ...paragraph, lineSpacing: d.value ?? paragraph.lineSpacing })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Espace avant (pt)</Label>
          <SpinButton
            value={paragraph.spaceBefore}
            min={0}
            max={100}
            onChange={(_, d) => setParagraph({ ...paragraph, spaceBefore: d.value ?? paragraph.spaceBefore })}
          />
        </div>
        <div className={styles.field}>
          <Label>Espace après (pt)</Label>
          <SpinButton
            value={paragraph.spaceAfter}
            min={0}
            max={100}
            onChange={(_, d) => setParagraph({ ...paragraph, spaceAfter: d.value ?? paragraph.spaceAfter })}
          />
        </div>
      </div>

      <Divider />
      <Text className={styles.sectionTitle}>Marges (cm)</Text>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Haut</Label>
          <SpinButton
            value={pointsToCm(page.topMargin)}
            min={0}
            max={7}
            step={0.1}
            onChange={(_, d) => setPage({ ...page, topMargin: cmToPoints(d.value ?? pointsToCm(page.topMargin)) })}
          />
        </div>
        <div className={styles.field}>
          <Label>Bas</Label>
          <SpinButton
            value={pointsToCm(page.bottomMargin)}
            min={0}
            max={7}
            step={0.1}
            onChange={(_, d) => setPage({ ...page, bottomMargin: cmToPoints(d.value ?? pointsToCm(page.bottomMargin)) })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Gauche</Label>
          <SpinButton
            value={pointsToCm(page.leftMargin)}
            min={0}
            max={7}
            step={0.1}
            onChange={(_, d) => setPage({ ...page, leftMargin: cmToPoints(d.value ?? pointsToCm(page.leftMargin)) })}
          />
        </div>
        <div className={styles.field}>
          <Label>Droite</Label>
          <SpinButton
            value={pointsToCm(page.rightMargin)}
            min={0}
            max={7}
            step={0.1}
            onChange={(_, d) => setPage({ ...page, rightMargin: cmToPoints(d.value ?? pointsToCm(page.rightMargin)) })}
          />
        </div>
      </div>

      {errors.length > 0 && (
        <MessageBar intent="error">
          <MessageBarBody>
            {errors.map((e) => e.message).join(" ")}
          </MessageBarBody>
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
