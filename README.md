# MyApp - Petites Annonces

## 🚀 Comment lancer le projet

### Installation des dépendances
```bash
npm install
```

### Lancer le backend (API)
```bash
npx nx serve backend
```
Le serveur API démarre sur `http://localhost:3000`

### Lancer le frontend (Interface)
```bash
npx nx serve frontend
```
L'interface web démarre sur `http://localhost:4200`

---

## 🏗️ Architecture choisie

### Structure Monorepo (Nx)
```
myApp/
├── apps/
│   ├── backend/          # API Express + TypeORM
│   └── frontend/         # React + Vite
└── libs/
    ├── types/            # Types TypeScript partagés
    ├── schema/           # Schémas Zod (validation)
    ├── components/       # Composants React réutilisables
    └── hooks/            # Hooks React personnalisés
```

### Stack Technique
**Backend:**
- Express.js (serveur API REST)
- TypeORM + SQLite (persistance)
- Zod (validation des données)
- Morgan (logs HTTP)
- Helmet (sécurité headers)

**Frontend:**
- React 19 + TypeScript
- Tailwind CSS v4 (styling moderne)
- React Hook Form + Zod (formulaires)
- Leaflet (sélecteur de carte interactive)
- Vite (dev server rapide)

**Libs partagées:**
- `@myApp/types` : Interfaces communes backend/frontend
- `@myApp/schema` : Validation Zod avec messages français
- `@myApp/components` : Composants UI réutilisables
- `@myApp/hooks` : Logique métier côté client

---

## 💡 Pourquoi cette architecture ?

### 1. **Monorepo Nx**
- **Partage de code** : Types et schémas Zod partagés entre backend/frontend → cohérence garantie
- **Évolutivité** : Facile d'ajouter de nouveaux modules (apps/libs) sans dupliquer le code
- **Gestion des dépendances** : Un seul `package.json` à la racine simplifie les mises à jour

### 2. **TypeScript End-to-End**
- **Sécurité** : Erreurs détectées avant l'exécution
- **Maintenance** : Refactoring facilité avec IDE (auto-completion, navigation)
- **Documentation** : Les types servent de documentation vivante

### 3. **Zod pour la validation**
- **Source unique de vérité** : Les schémas Zod génèrent automatiquement les types TypeScript
- **Messages personnalisés** : Validation côté serveur ET client avec messages en français
- **React Hook Form** : Intégration native avec `zodResolver`

### 4. **Tailwind CSS v4**
- **Productivité** : Classes utilitaires → pas besoin d'écrire de CSS custom
- **Cohérence** : Design system intégré (espacements, couleurs, bordures)
- **Performance** : Génère uniquement les classes utilisées

### 5. **Leaflet au lieu d'inputs manuels**
- **UX améliorée** : Cliquer sur la carte est plus intuitif que taper des coordonnées
- **Prévention d'erreurs** : Impossible de saisir des coordonnées invalides
- **Visualisation** : L'utilisateur voit directement la localisation

---

## 🔮 Améliorations futures (si plus de temps)

### Court terme
- [ ] **Tests automatisés** : Jest/Vitest pour backend + frontend
- [ ] **Upload d'images** : Multer + stockage cloud (S3/Cloudinary)
- [ ] **Authentification** : JWT + session utilisateur
- [ ] **Pagination** : Limite de 20 annonces par page côté API

### Moyen terme
- [ ] **Recherche avancée** : Filtres par catégorie, prix, localisation
- [ ] **Geocoding** : Convertir adresses → coordonnées (API Nominatim)
- [ ] **Notifications** : WebSockets pour alertes en temps réel
- [ ] **CI/CD** : GitHub Actions pour déploiement automatique

### Long terme
- [ ] **Microservices** : Séparer auth, annonces, paiements en services indépendants
- [ ] **GraphQL** : Remplacer REST par Apollo pour requêtes flexibles
- [ ] **Internationalisation** : Support multi-langues (i18next)
- [ ] **Progressive Web App** : Mode hors ligne + installation mobile

---

## 📦 Commandes utiles

```bash
# Construire tous les projets
npx nx run-many -t build

# Lancer les tests (si configurés)
npx nx test backend
npx nx test frontend

# Générer un graphe de dépendances
npx nx graph

# Linter + formatter
npx nx lint backend
npx nx format:write
```

---

## 🔒 Sécurité

- **Helmet** : Protection contre XSS, clickjacking, MIME sniffing
- **CORS** : Configuration stricte des origines autorisées
- **Validation** : Toutes les entrées utilisateur sont validées avec Zod
- **TypeORM** : Requêtes paramétrées pour prévenir les injections SQL

---

**Développé avec Nx + React + Express + TypeScript 🚀**
