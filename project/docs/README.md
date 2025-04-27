# Hôpital Askamoul - Documentation

## Vue d'ensemble

Hôpital Askamoul est une application web moderne de gestion hospitalière qui intègre l'intelligence artificielle pour optimiser les opérations quotidiennes et améliorer la qualité des soins. L'application est développée avec React, TypeScript et Tailwind CSS.

## Fonctionnalités principales

### 1. Tableau de bord
- Vue d'ensemble des statistiques clés
- Indicateurs en temps réel
- Accès rapide aux fonctionnalités principales

### 2. Gestion des patients
- Liste complète des patients
- Filtrage par service
- Ajout, modification et suppression de dossiers patients
- Suivi du statut des patients

### 3. Gestion du personnel
- Répertoire du personnel médical et administratif
- Filtrage par rôle
- Gestion des affectations aux services
- Profils détaillés du personnel

### 4. Gestion des rendez-vous
- Calendrier interactif
- Planification simplifiée
- Vue par jour/semaine/mois
- Notifications et rappels

### 5. Gestion des services
- Vue d'ensemble des services hospitaliers
- Statistiques par service
- Gestion des équipements
- Suivi de la capacité

### 6. Analyse IA
- Prédictions de risques
- Optimisation des ressources
- Aide au diagnostic
- Planification intelligente

### 7. Assistant IA
- Interface conversationnelle
- Réponses contextuelles
- Aide à la décision
- Support multilingue

## Architecture technique

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icônes)

### État de l'application
- React Hooks pour la gestion d'état locale
- Context API pour l'état global

### Interface utilisateur
- Design responsive
- Thème personnalisé
- Composants réutilisables
- Modales et formulaires interactifs

## Guide d'installation

1. Cloner le repository
```bash
git clone [url-du-repo]
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer l'application en développement
```bash
npm run dev
```

4. Construire pour la production
```bash
npm run build
```

## Structure du projet

```
src/
├── components/
│   ├── sections/
│   │   ├── Dashboard.tsx
│   │   ├── Patients.tsx
│   │   ├── Staff.tsx
│   │   ├── Appointments.tsx
│   │   ├── Services.tsx
│   │   ├── AIAnalysis.tsx
│   │   └── Contact.tsx
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── AIAssistantModal.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Bonnes pratiques

### Code
- TypeScript strict mode
- ESLint pour la qualité du code
- Composants fonctionnels et hooks
- Props typées
- Gestion des erreurs

### UI/UX
- Design cohérent
- Feedback utilisateur
- Accessibilité
- Responsive design
- Performances optimisées

### Sécurité
- Validation des entrées
- Protection CSRF
- Authentification sécurisée
- Autorisations par rôle

## Déploiement

1. Construire l'application
```bash
npm run build
```

2. Tester la version de production
```bash
npm run preview
```

3. Déployer sur le serveur de production

## Maintenance

### Mises à jour
- Dépendances npm
- Correctifs de sécurité
- Nouvelles fonctionnalités
- Optimisations

### Monitoring
- Logs d'erreurs
- Métriques de performance
- Utilisation des ressources
- Satisfaction utilisateur

## Support

Pour toute question ou assistance :
- Email : support@hopital-askamoul.fr
- Documentation : [lien]
- Issues : [lien-github-issues]