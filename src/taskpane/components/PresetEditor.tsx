import React, { useState } from "react";
import {
  Input,
  Label,
  Select,
  SpinButton,
  Button,
  Divider,
  Text,
  Switch,
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
import { FormattingPreset, FontPreset, ParagraphPreset, HeadingPreset, PagePreset, BulletPreset, CaptionPreset } from "../../presets/types";
import { academicPreset } from "../../presets/defaults";
import { validatePreset, ValidationError } from "../../presets/validation";
import { cmToPoints, pointsToCm } from "../../utils/units";
import { FontPicker } from "./FontPicker";

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
  headingBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "8px 0",
  },
});

interface PresetEditorProps {
  preset?: FormattingPreset;
  onSave: (preset: FormattingPreset) => void;
  onCancel: () => void;
}

interface HeadingSectionProps {
  label: string;
  value: HeadingPreset;
  onChange: (v: HeadingPreset) => void;
}

const HeadingSection: React.FC<HeadingSectionProps> = ({ label, value, onChange }) => {
  const styles = useStyles();
  return (
    <div className={styles.headingBlock}>
      <div className={styles.field}>
        <Label>Police ({label})</Label>
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
          <Label>Couleur</Label>
          <input
            type="color"
            value={value.color}
            onChange={(e) => onChange({ ...value, color: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Alignement</Label>
          <Select
            value={value.alignment}
            onChange={(_, d) => onChange({ ...value, alignment: d.value as HeadingPreset["alignment"] })}
          >
            <option value="left">Gauche</option>
            <option value="center">Centré</option>
            <option value="right">Droite</option>
            <option value="justified">Justifié</option>
          </Select>
        </div>
        <div className={styles.field}>
          <Label>Gras</Label>
          <Switch checked={value.bold} onChange={(_, d) => onChange({ ...value, bold: d.checked })} />
        </div>
      </div>

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
  const [bullet, setBullet] = useState<BulletPreset>({ ...base.bullet });
  const [caption, setCaption] = useState<CaptionPreset>({ ...base.caption });
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
      bullet,
      caption,
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

      <div className={styles.field}>
        <Label>Police</Label>
        <FontPicker value={body.name} onChange={(v) => setBody({ ...body, name: v })} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Taille (pt)</Label>
          <SpinButton
            value={body.size}
            min={6}
            max={72}
            onChange={(_, d) => setBody({ ...body, size: d.value ?? body.size })}
          />
        </div>
        <div className={styles.field}>
          <Label>Couleur</Label>
          <input type="color" value={body.color} onChange={(e) => setBody({ ...body, color: e.target.value })} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Gras</Label>
          <Switch checked={body.bold} onChange={(_, d) => setBody({ ...body, bold: d.checked })} />
        </div>
        <div className={styles.field}>
          <Label>Italique</Label>
          <Switch checked={body.italic} onChange={(_, d) => setBody({ ...body, italic: d.checked })} />
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
      <Text className={styles.sectionTitle}>Titres</Text>

      <Accordion multiple collapsible>
        <AccordionItem value="h1">
          <AccordionHeader>Titre 1 (H1)</AccordionHeader>
          <AccordionPanel>
            <HeadingSection label="H1" value={h1} onChange={setH1} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="h2">
          <AccordionHeader>Titre 2 (H2)</AccordionHeader>
          <AccordionPanel>
            <HeadingSection label="H2" value={h2} onChange={setH2} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="h3">
          <AccordionHeader>Titre 3 (H3)</AccordionHeader>
          <AccordionPanel>
            <HeadingSection label="H3" value={h3} onChange={setH3} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Divider />
      <Text className={styles.sectionTitle}>Puces &amp; listes</Text>

      <div className={styles.field}>
        <Label>Police</Label>
        <FontPicker value={bullet.fontName} onChange={(v) => setBullet({ ...bullet, fontName: v })} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Taille (pt)</Label>
          <SpinButton
            value={bullet.fontSize}
            min={6}
            max={72}
            onChange={(_, d) => setBullet({ ...bullet, fontSize: d.value ?? bullet.fontSize })}
          />
        </div>
        <div className={styles.field}>
          <Label>Couleur</Label>
          <input
            type="color"
            value={bullet.color}
            onChange={(e) => setBullet({ ...bullet, color: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Gras</Label>
          <Switch checked={bullet.bold} onChange={(_, d) => setBullet({ ...bullet, bold: d.checked })} />
        </div>
        <div className={styles.field}>
          <Label>Italique</Label>
          <Switch checked={bullet.italic} onChange={(_, d) => setBullet({ ...bullet, italic: d.checked })} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Alignement</Label>
          <Select
            value={bullet.alignment}
            onChange={(_, d) => setBullet({ ...bullet, alignment: d.value as BulletPreset["alignment"] })}
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
            value={bullet.lineSpacing}
            min={0.5}
            max={5}
            step={0.05}
            onChange={(_, d) => setBullet({ ...bullet, lineSpacing: d.value ?? bullet.lineSpacing })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Espace avant (pt)</Label>
          <SpinButton
            value={bullet.spaceBefore}
            min={0}
            max={100}
            onChange={(_, d) => setBullet({ ...bullet, spaceBefore: d.value ?? bullet.spaceBefore })}
          />
        </div>
        <div className={styles.field}>
          <Label>Espace après (pt)</Label>
          <SpinButton
            value={bullet.spaceAfter}
            min={0}
            max={100}
            onChange={(_, d) => setBullet({ ...bullet, spaceAfter: d.value ?? bullet.spaceAfter })}
          />
        </div>
      </div>

      <div className={styles.field}>
        <Label>Retrait gauche (pt)</Label>
        <SpinButton
          value={bullet.leftIndent}
          min={0}
          max={200}
          step={2}
          onChange={(_, d) => setBullet({ ...bullet, leftIndent: d.value ?? bullet.leftIndent })}
        />
      </div>

      <Divider />
      <Text className={styles.sectionTitle}>Légende de figure (Caption)</Text>

      <div className={styles.field}>
        <Label>Police</Label>
        <FontPicker value={caption.fontName} onChange={(v) => setCaption({ ...caption, fontName: v })} />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Taille (pt)</Label>
          <SpinButton
            value={caption.fontSize}
            min={6}
            max={72}
            onChange={(_, d) => setCaption({ ...caption, fontSize: d.value ?? caption.fontSize })}
          />
        </div>
        <div className={styles.field}>
          <Label>Couleur</Label>
          <input
            type="color"
            value={caption.color}
            onChange={(e) => setCaption({ ...caption, color: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Gras</Label>
          <Switch checked={caption.bold} onChange={(_, d) => setCaption({ ...caption, bold: d.checked })} />
        </div>
        <div className={styles.field}>
          <Label>Italique</Label>
          <Switch checked={caption.italic} onChange={(_, d) => setCaption({ ...caption, italic: d.checked })} />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Alignement</Label>
          <Select
            value={caption.alignment}
            onChange={(_, d) => setCaption({ ...caption, alignment: d.value as CaptionPreset["alignment"] })}
          >
            <option value="left">Gauche</option>
            <option value="center">Centré</option>
            <option value="right">Droite</option>
            <option value="justified">Justifié</option>
          </Select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <Label>Espace avant (pt)</Label>
          <SpinButton
            value={caption.spaceBefore}
            min={0}
            max={100}
            onChange={(_, d) => setCaption({ ...caption, spaceBefore: d.value ?? caption.spaceBefore })}
          />
        </div>
        <div className={styles.field}>
          <Label>Espace après (pt)</Label>
          <SpinButton
            value={caption.spaceAfter}
            min={0}
            max={100}
            onChange={(_, d) => setCaption({ ...caption, spaceAfter: d.value ?? caption.spaceAfter })}
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
