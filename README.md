<p align="center">
  <img src="assets/icon-128.png" alt="EYAHWORD" width="80" />
</p>

<h1 align="center">EYAHWORD</h1>

<p align="center">
  <strong>Formatez vos documents Word en 1 clic.</strong><br/>
  Extension Microsoft Word avec presets de formatage, presets personnalisables et IA intégrée.
</p>

<p align="center">
  <a href="#installation">Installation</a> &nbsp;&bull;&nbsp;
  <a href="#fonctionnalités">Fonctionnalités</a> &nbsp;&bull;&nbsp;
  <a href="#développement">Développement</a> &nbsp;&bull;&nbsp;
  <a href="#déploiement">Déploiement</a>
</p>

---

## Pourquoi EYAHWORD ?

Formater un document Word manuellement (police, taille, interlignes, marges, titres...) prend du temps et génère des incohérences. EYAHWORD applique un formatage complet et homogène sur tout votre document **en un seul clic**.

## Installation

### Word Online (recommandé)

1. Ouvrez un document sur [office.com](https://www.office.com)
2. Allez dans **Insertion** > **Compléments** > **Charger mon complément**
3. Collez l'URL du manifest :
   ```
   https://oussdev417.github.io/EYAHWORD/manifest.xml
   ```
4. Cliquez **Charger** — le bouton **EYAHWORD** apparaît dans l'onglet Accueil

### Word Desktop (Windows / Mac)

1. Allez dans **Insertion** > **Compléments** > **Mes compléments**
2. Cliquez **Charger mon complément** et sélectionnez le fichier `manifest.xml`

## Fonctionnalités

### Format — Presets intégrés

Deux presets prêts à l'emploi :

| Preset | Police | Taille | Interligne | Marges | Usage |
|--------|--------|--------|------------|--------|-------|
| **Académique** | Times New Roman | 12pt | 1.5 | 2.5cm | Mémoires, thèses, rapports |
| **Moderne** | Calibri | 11pt | 1.15 | 2cm | Documents professionnels |

Chaque preset formate automatiquement :
- Le corps de texte (police, taille, couleur, alignement)
- Les titres H1, H2, H3 (détectés via les styles Word natifs)
- Les paragraphes (interligne, espacement, retrait)
- Les marges de page (Word Desktop uniquement)

### Custom — Presets personnalisés

Créez vos propres presets en ajustant chaque paramètre :
- Police, taille, couleur du corps
- Alignement et interligne
- Espacement avant/après les paragraphes
- Marges de page (haut, bas, gauche, droite)

Les presets sont sauvegardés localement et peuvent être dupliqués, modifiés ou supprimés.

### IA — Transformation de texte

Sélectionnez du texte dans votre document et appliquez une transformation IA :

| Action | Description |
|--------|-------------|
| **Reformuler** | Réécrire avec d'autres mots en gardant le même sens |
| **Corriger** | Corriger orthographe, grammaire et ponctuation |
| **Résumer** | Produire un résumé concis |
| **Développer** | Enrichir avec détails et exemples |
| **Simplifier** | Vocabulaire plus accessible, phrases plus courtes |
| **Formaliser** | Registre soutenu et professionnel |
| **Traduire** | Français ↔ Anglais automatique |

Après traitement, vous pouvez **remplacer** le texte sélectionné ou **insérer** le résultat en-dessous.

**Fournisseurs supportés :** Anthropic (Claude) et OpenAI (GPT). Configurez votre clé API dans l'onglet Réglages.

### Réglages

- Choix du fournisseur IA (Anthropic / OpenAI)
- Sélection du modèle (Claude Sonnet 4, Claude Haiku 4.5, GPT-4o, GPT-4o Mini)
- Saisie sécurisée des clés API
- Test de connexion intégré
- Détection automatique de la plateforme

## Stack technique

| Couche | Technologie |
|--------|-------------|
| UI | React 18 + TypeScript + Fluent UI v9 |
| Build | Webpack 5 |
| API Office | Office.js Word API |
| IA | Anthropic API + OpenAI API (fetch navigateur) |
| Stockage | localStorage |
| Tests | Jest + ts-jest |
| Déploiement | GitHub Pages |

## Structure du projet

```
src/
├── taskpane/              # Interface utilisateur
│   ├── components/        # PresetCard, PresetEditor, AIPanel, SettingsPanel...
│   ├── pages/             # FormattingPage, CustomPresetsPage, AIFeaturesPage, SettingsPage
│   ├── hooks/             # useWordFormatting, usePresets, useAI, useSettings, usePlatform
│   └── context/           # PresetContext, SettingsContext
├── engine/                # Moteur de formatage Word API
│   ├── formatting.ts      # Orchestrateur (batching par 100 paragraphes)
│   ├── fontFormatter.ts   # Application des polices
│   ├── paragraphFormatter.ts
│   ├── headingFormatter.ts  # Détection H1/H2/H3 via styleBuiltIn
│   └── pageSetupFormatter.ts  # Marges (desktop uniquement)
├── presets/                # Système de presets
│   ├── types.ts           # Interfaces TypeScript
│   ├── defaults.ts        # Académique + Moderne
│   ├── storage.ts         # CRUD localStorage
│   └── validation.ts      # Validation des presets
├── ai/                    # Intégration IA
│   ├── anthropicClient.ts # Client Anthropic (fetch direct)
│   ├── openaiClient.ts    # Client OpenAI (fetch direct)
│   ├── prompts.ts         # Prompts système par tâche
│   └── aiService.ts       # Façade unifiée
└── utils/                 # Utilitaires
```

## Développement

### Prérequis

- Node.js 18+
- npm

### Installation locale

```bash
git clone https://github.com/oussDev417/EYAHWORD.git
cd EYAHWORD
npm install
```

### Lancer le serveur de développement

```bash
npm run dev-server
```

Le serveur démarre sur `https://localhost:3000`. Sideloadez le `manifest.xml` dans Word pour tester.

### Lancer les tests

```bash
npm test
```

### Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`.

## Déploiement

Le projet est déployé sur GitHub Pages. Pour redéployer après des modifications :

```bash
npm run build
npx gh-pages -d dist
```

L'add-in est alors accessible via :
- **App :** `https://oussdev417.github.io/EYAHWORD/taskpane.html`
- **Manifest :** `https://oussdev417.github.io/EYAHWORD/manifest.xml`

## Notes techniques

- **Marges de page :** L'API `PageSetup` n'est disponible que sur Word Desktop (Windows/Mac). Sur Word Online, les marges ne sont pas modifiées et une notification informe l'utilisateur.
- **CORS Anthropic :** Le header `anthropic-dangerous-direct-browser-access: true` est requis pour les appels directs depuis le navigateur.
- **Performances :** Les paragraphes sont traités par lots de 100 avec `context.sync()` entre chaque lot pour éviter les timeouts sur les grands documents.
- **Détection des titres :** Via `paragraph.styleBuiltIn` (fonctionne quelle que soit la langue de Word).

## Licence

MIT

---

<p align="center">
  Fait avec React, Fluent UI et l'API Office.js
</p>

Option B — Commande automatique (recommandée)

npx office-addin-debugging start manifest.dev.xml desktop

Cette commande démarre le serveur dev, sideloade automatiquement et ouvre Word avec l'add‑in chargé. Pour arrêter :

npx office-addin-debugging stop manifest.dev.xml

Note : le script npm start du package.json utilise manifest.xml (prod). Utilise directement la commande ci‑dessus avec manifest.dev.xml, ou modifie le script.