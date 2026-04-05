# OpenClaw Agent Router

**Système de Routage Intelligent des Agents** - Permettre à OpenClaw d'appeler automatiquement l'Agent le plus approprié

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-green.svg)](https://github.com/openclaw/openclaw)

---

## 🌍 Documentation Multi-langue

| Langue | Documentation |
|--------|---------------|
| 🇨🇳 中文 | [README.md](README.md) |
| 🇬🇧 English | [README.en.md](README.en.md) |
| 🇯🇵 日本語 | [README.ja.md](README.ja.md) |
| 🇰🇷 한국어 | [README.ko.md](README.ko.md) |
| 🇫🇷 Français | [README.fr.md](README.fr.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

---

## 🎯 Fonctionnalités Principales

### 1. Routage Automatique
Appelle automatiquement l'Agent le plus approprié en fonction du type de tâche：
- Conception de Jeu → Équipe de Planificateurs IA
- Analyse de Données → Analyste de Données IA
- Rédaction d'Articles → Équipe Éditoriale
- Problèmes de Code → Équipe de Développeurs IA

### 2. Recommandations Intelligentes
Lorsque les conditions d'appel automatique ne sont pas remplies, recommande activement les Agents pertinents.

### 3. Analyse en Temps Réel
Analyse en temps réel le dossier `agents/` et obtient dynamiquement la liste des Agents disponibles.

### 4. Collaboration Multi-Agents
Décompose automatiquement les tâches complexes et appelle plusieurs Agents pour collaborer.

---

## 🚀 Démarrage Rapide

### Installation Zéro Configuration (Recommandé)

```bash
# Cloner le dépôt
git clone https://github.com/JingWang-Star996/openclaw-agent-router.git

# Exécuter le script d'installation zéro configuration
cd openclaw-agent-router
chmod +x scripts/install.sh
./scripts/install.sh
```

**Le script d'installation termine automatiquement**：
1. ✅ Copie les Skills dans l'espace de travail
2. ✅ Injection automatique dans SOUL.md (ajoute les règles d'appel automatique, conserve le contenu existant)
3. ✅ Vérifie l'installation

**Aucune configuration manuelle nécessaire!** Après installation, l'IA principale appelle automatiquement les Agents.

---

## 🔒 Garantie de Sécurité

**Méthode de traitement de SOUL.md**：
- **N'existe pas** → Crée un fichier complet (avec règles)
- **Existe mais sans règles** → Injection incrémentale (insère au début du fichier, conserve tout le contenu existant)
- **Déjà des règles** → Ignore (évite les doublons)

---

## 📊 Indicateurs de Performance

| Indicateur | Valeur |
|------------|--------|
| Vitesse d'analyse | ~0.5 seconde (100 Agents) |
| Vitesse de correspondance | <100ms |
| Taux de succès du cache | 85%+ (même conversation) |
| Précision du routage | 90%+ (basé sur les tests) |

---

## 📋 Règles de Routage

| Type de Tâche | Appel Automatique |
|---------------|-------------------|
| Conception de Jeu/Numérique/Système | AI Planificateur en Chef → Distribue aux planificateurs spécialisés |
| Rétention/Paiement/Analyse de Données | AI Analyste de Données + AI Planificateur Numérique |
| Gestion de Projet/Planning/Ressources | PMO Chef de Projet |
| Rédaction d'Articles/Rapport Hebdomadaire | Équipe Éditoriale/AI Rapport Hebdomadaire |
| Code/Technique | AI Développeur en Chef |
| Art/UX | AI Directeur Artistique + UX Designer |
| Ressources Humaines | AI Département RH |
| Gestion de la Qualité | AI Département Qualité |
| Opérations/Événements | AI Directeur des Opérations + Opérations Utilisateurs |

---

## 🏗️ Structure du Projet

```
openclaw-agent-router/
├── README.md                 # Ce document
├── LICENSE                   # Licence MIT
├── package.json              # Configuration du projet
├── src/                      # Code source
│   ├── scanner.js            # Analyseur d'Agents en temps réel
│   ├── router.js             # Logique centrale de routage
│   └── matcher.js            # Moteur de correspondance intelligent
├── docs/                     # Documentation
│   ├── ARCHITECTURE.md       # Conception de l'architecture
│   ├── QUICKSTART.md         # Guide de démarrage rapide
│   └── RELEASE.md            # Guide de publication
└── skills/                   # Skills OpenClaw
    ├── auto-agent-router/    # Skill de routage automatique
    └── agent-scanner/        # Skill d'analyse en temps réel
```

---

## 🤝 Contribution

Les Issues et Pull Requests sont les bienvenues!

---

## 📄 Licence

Licence MIT

---

## 🙏 Remerciements

- **Inspiration**: Besoin de collaboration multi-Agents OpenClaw
- **Support de Plateforme**: [OpenClaw](https://github.com/openclaw/openclaw)
- **Validation en Conditions Réelles**: Équipe AI de l'Agence de Design ZVP (100+ Agents)

---

**Made with ❤️ for OpenClaw Community**

**Dernière Mise à Jour**: 2026-04-05
