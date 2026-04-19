import React, { useState, useCallback } from "react";
import {
  Button,
  Text,
  Textarea,
  RadioGroup,
  Radio,
  Spinner,
  MessageBar,
  MessageBarBody,
  makeStyles,
  tokens,
  Divider,
} from "@fluentui/react-components";
import {
  ArrowSyncRegular,
  CheckmarkRegular,
  ArrowDownRegular,
  TextGrammarCheckmarkRegular,
} from "@fluentui/react-icons";
import { AI_TASKS, AITask } from "../../ai/types";
import { useAI } from "../hooks/useAI";
import { useSettingsContext } from "../context/SettingsContext";

const useStyles = makeStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  taskGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4px",
  },
  taskButton: {
    justifyContent: "flex-start",
    fontSize: tokens.fontSizeBase200,
  },
  selectedText: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "8px",
    borderRadius: "4px",
    fontSize: tokens.fontSizeBase200,
    maxHeight: "120px",
    overflow: "auto",
  },
  resultArea: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  resultText: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "8px",
    borderRadius: "4px",
    fontSize: tokens.fontSizeBase200,
    maxHeight: "200px",
    overflow: "auto",
    whiteSpace: "pre-wrap",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const AIPanel: React.FC = () => {
  const styles = useStyles();
  const { settings, currentApiKey } = useSettingsContext();
  const { isProcessing, response, error, process, clear } = useAI();
  const [selectedText, setSelectedText] = useState("");
  const [selectedTask, setSelectedTask] = useState<AITask>("reformulate");

  const getSelectedText = useCallback(async () => {
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.load("text");
        await context.sync();
        setSelectedText(selection.text);
      });
    } catch {
      setSelectedText("");
    }
  }, []);

  const handleProcess = useCallback(async () => {
    if (!selectedText.trim()) {
      await getSelectedText();
      return;
    }
    await process(selectedText, selectedTask);
  }, [selectedText, selectedTask, process, getSelectedText]);

  const replaceSelection = useCallback(async () => {
    if (!response) return;
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.insertText(response.result, "Replace");
        await context.sync();
      });
      clear();
      setSelectedText("");
    } catch (err) {
      // Silently handle
    }
  }, [response, clear]);

  const insertBelow = useCallback(async () => {
    if (!response) return;
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.insertText("\n" + response.result, "After");
        await context.sync();
      });
      clear();
      setSelectedText("");
    } catch (err) {
      // Silently handle
    }
  }, [response, clear]);

  if (!currentApiKey) {
    return (
      <MessageBar intent="warning">
        <MessageBarBody>
          Configurez votre clé API dans l'onglet Réglages pour utiliser les fonctionnalités IA.
        </MessageBarBody>
      </MessageBar>
    );
  }

  return (
    <div className={styles.panel}>
      {/* Step 1: Get selected text */}
      <Text className={styles.sectionTitle}>1. Texte sélectionné</Text>
      <Button
        appearance="secondary"
        size="small"
        icon={<TextGrammarCheckmarkRegular />}
        onClick={getSelectedText}
      >
        Récupérer la sélection
      </Button>

      {selectedText && (
        <div className={styles.selectedText}>
          {selectedText.length > 500 ? selectedText.slice(0, 500) + "..." : selectedText}
        </div>
      )}

      <Divider />

      {/* Step 2: Choose task */}
      <Text className={styles.sectionTitle}>2. Choisir une action</Text>
      <div className={styles.taskGrid}>
        {AI_TASKS.map((task) => (
          <Button
            key={task.id}
            className={styles.taskButton}
            appearance={selectedTask === task.id ? "primary" : "secondary"}
            size="small"
            onClick={() => setSelectedTask(task.id)}
          >
            {task.label}
          </Button>
        ))}
      </div>

      <Divider />

      {/* Step 3: Process */}
      <Button
        appearance="primary"
        icon={isProcessing ? <Spinner size="tiny" /> : <ArrowSyncRegular />}
        onClick={handleProcess}
        disabled={isProcessing || !selectedText.trim()}
      >
        {isProcessing ? "Traitement..." : "Traiter"}
      </Button>

      {/* Result */}
      {response && (
        <div className={styles.resultArea}>
          <Text className={styles.sectionTitle}>Résultat</Text>
          <div className={styles.resultText}>{response.result}</div>
          <div className={styles.actions}>
            <Button
              appearance="primary"
              size="small"
              icon={<CheckmarkRegular />}
              onClick={replaceSelection}
            >
              Remplacer
            </Button>
            <Button
              appearance="secondary"
              size="small"
              icon={<ArrowDownRegular />}
              onClick={insertBelow}
            >
              Insérer en-dessous
            </Button>
          </div>
        </div>
      )}

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}
    </div>
  );
};
