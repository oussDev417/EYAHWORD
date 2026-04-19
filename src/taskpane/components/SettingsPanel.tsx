import React, { useState } from "react";
import {
  Input,
  Label,
  Select,
  Button,
  Text,
  Divider,
  MessageBar,
  MessageBarBody,
  Spinner,
  Badge,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { PlugConnectedRegular } from "@fluentui/react-icons";
import { AIProvider, ANTHROPIC_MODELS, OPENAI_MODELS } from "../../ai/types";
import { testConnection } from "../../ai/aiService";
import { useSettingsContext } from "../context/SettingsContext";
import { usePlatform } from "../hooks/usePlatform";

const useStyles = makeStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  row: {
    display: "flex",
    gap: "8px",
    alignItems: "end",
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "4px",
  },
  platformInfo: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export const SettingsPanel: React.FC = () => {
  const styles = useStyles();
  const { settings, updateSettings, currentApiKey, currentModel } = useSettingsContext();
  const { platform, canSetMargins } = usePlatform();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    const success = await testConnection(settings.aiProvider, currentApiKey, currentModel);
    setTestResult(success);
    setTesting(false);
  };

  const models = settings.aiProvider === "anthropic" ? ANTHROPIC_MODELS : OPENAI_MODELS;

  return (
    <div className={styles.panel}>
      <Text className={styles.sectionTitle}>Fournisseur IA</Text>

      <div className={styles.field}>
        <Label>Fournisseur</Label>
        <Select
          value={settings.aiProvider}
          onChange={(_, d) => updateSettings({ aiProvider: d.value as AIProvider })}
        >
          <option value="anthropic">Anthropic (Claude)</option>
          <option value="openai">OpenAI (GPT)</option>
        </Select>
      </div>

      <div className={styles.field}>
        <Label>Modèle</Label>
        <Select
          value={currentModel}
          onChange={(_, d) => {
            if (settings.aiProvider === "anthropic") {
              updateSettings({ anthropicModel: d.value });
            } else {
              updateSettings({ openaiModel: d.value });
            }
          }}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </Select>
      </div>

      <Divider />
      <Text className={styles.sectionTitle}>Clés API</Text>

      <div className={styles.field}>
        <Label>Clé API Anthropic</Label>
        <Input
          type="password"
          value={settings.anthropicApiKey}
          onChange={(_, d) => updateSettings({ anthropicApiKey: d.value })}
          placeholder="sk-ant-..."
        />
      </div>

      <div className={styles.field}>
        <Label>Clé API OpenAI</Label>
        <Input
          type="password"
          value={settings.openaiApiKey}
          onChange={(_, d) => updateSettings({ openaiApiKey: d.value })}
          placeholder="sk-..."
        />
      </div>

      <div className={styles.row}>
        <Button
          appearance="secondary"
          size="small"
          icon={testing ? <Spinner size="tiny" /> : <PlugConnectedRegular />}
          onClick={handleTestConnection}
          disabled={testing || !currentApiKey}
        >
          Tester la connexion
        </Button>
        {testResult === true && <Badge appearance="filled" color="success">OK</Badge>}
        {testResult === false && <Badge appearance="filled" color="danger">Échec</Badge>}
      </div>

      <Divider />
      <Text className={styles.sectionTitle}>Plateforme</Text>

      <Text className={styles.platformInfo}>
        Plateforme détectée : <strong>{platform}</strong>
      </Text>
      <Text className={styles.platformInfo}>
        Marges de page : {canSetMargins ? "Supporté" : "Non supporté (Word Online)"}
      </Text>
    </div>
  );
};
