# Monorepo Turborepo + Tailwind (base de projet)

Ce dépôt fournit une base prête à l’emploi pour démarrer une application moderne en monorepo avec Turborepo, Next.js, Tailwind CSS et TypeScript. La structure est pensée pour partager du code UI, des configs et des utilitaires entre plusieurs apps.

## Contenu du monorepo

### Apps

- `apps/web`: application [Next.js](https://nextjs.org/) (front principal)
- `apps/docs`: application [Next.js](https://nextjs.org/) (documentation)
- `apps/api`: API Express + auth (backend)
- `apps/mobile`: app React Native / Expo

### Packages partagés

- `packages/ui`: bibliothèque de composants React partagée
- `packages/database`: Prisma + client partagé
- `packages/tailwind-config`: config Tailwind partagée
- `packages/typescript-config`: `tsconfig` partagés
- `packages/biome-config`: configuration [Biome](https://biomejs.dev/) (lint + format)

Chaque app/package est en TypeScript.

## Lint & format : Biome (remplace ESLint/Prettier)

Ce monorepo utilise **Biome** pour le linting et le formatage. Les anciennes références ESLint/Prettier du template ont été remplacées par la configuration Biome.

- Config partagée : [packages/biome-config/biome.json](packages/biome-config/biome.json)
- Config par app : voir `apps/*/biome.json`

## UI package (packages/ui)

Le package `ui` expose des composants consommés par les apps Next.js via `transpilePackages` (dans `next.config.ts`).

Si tu préfères consommer `packages/ui` **sans build**, assure‑toi que le `tailwind.config.ts` des apps inclut le chemin vers les fichiers du package. Exemple :

```js
content: [
  "src/**/*.{js,ts,jsx,tsx}",
  "../../packages/ui/*.{js,ts,jsx,tsx}",
]
```

## Variables d’environnement

Des fichiers `.env.sample` sont fournis pour chaque app. Copie‑les en `.env` et renseigne les valeurs selon ton environnement.

- Web : [apps/web/.env.sample](apps/web/.env.sample)
- API : [apps/api/.env.sample](apps/api/.env.sample)

### Où obtenir les variables ?

- `DATABASE_URL` : ton fournisseur Postgres (Render, Neon, Supabase, Railway, etc.)
- `RESEND_API_KEY` : tableau de bord Resend
- `OAUTH_GOOGLE_CLIENT_ID` / `OAUTH_GOOGLE_CLIENT_SECRET` : console Google Cloud OAuth
- `APP_SECRET` / `BETTER_AUTH_SECRET` : à générer (ex. `openssl rand -hex 32`)
- `APP_URL`, `CLIENT_URL`, `NEXT_PUBLIC_*` : URLs publiques de l’API et du web

> Ne commit jamais les `.env` réels en production. Utilise le gestionnaire de secrets de ta plateforme de déploiement.

## Outils inclus

- [Turborepo](https://turbo.build/) pour l’orchestration des builds
- [Next.js](https://nextjs.org/) pour les apps web/docs
- [Tailwind CSS](https://tailwindcss.com/) pour le style
- [TypeScript](https://www.typescriptlang.org/) pour le typage
- [Biome](https://biomejs.dev/) pour lint + format
- [Prisma](https://www.prisma.io/) pour gérer la base de données
- [Better-Auth](https://www.better-auth.com/) pour l'authentification
- [Express.js](https://expressjs.com/) pour le backend
- [Expo/React-Native](https://expo.dev/) pour l'application mobile
- [EAS Build](https://docs.expo.dev/build/introduction/) pour les builds mobiles

## Application Mobile (Expo)

### Prérequis

1. **Compte Expo** : Crée un compte sur [expo.dev](https://expo.dev/signup)
2. **Connexion EAS** : Connecte-toi via le terminal :
   ```bash
   pnpm exec eas login
   ```

### Qu'est-ce qu'un Development Build ?

Un **development build** est une version personnalisée de ton app qui inclut :
- Le **dev-client** Expo (remplace Expo Go)
- Toutes les librairies natives de ton projet
- Le support du **Fast Refresh** (hot reload)

> **Important** : Contrairement à Expo Go, un development build te permet d'utiliser n'importe quelle librairie native.

### Workflow de développement mobile

#### 1. Créer le development build (une seule fois)

Depuis `apps/mobile` :

```bash
# Build pour Android + iOS
pnpm build:dev

# Ou par plateforme
pnpm build:dev:android
pnpm build:dev:ios
```

Le build se fait dans le cloud Expo. Une fois terminé, télécharge et installe l'APK (Android) ou l'app (iOS) sur ton appareil/émulateur.

#### 2. Lancer le serveur de développement

Depuis la **racine du monorepo** :

```bash
pnpm dev
```

Ou depuis `apps/mobile` :

```bash
pnpm dev
```

#### 3. Connecter ton appareil

- Ouvre l'app installée sur ton appareil
- Scanne le QR code affiché dans le terminal
- Les modifications de code sont reflétées **instantanément** (Fast Refresh)

### Quand rebuilder ?

Tu dois recréer un build uniquement si :
- Tu ajoutes une **nouvelle dépendance native**
- Tu modifies les **plugins Expo** dans `app.json`
- Tu changes la configuration native (permissions, icônes, etc.)

> Les modifications de code JS/TS ne nécessitent **jamais** de rebuild.

### Scripts disponibles (apps/mobile)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Démarre le serveur Metro avec dev-client |
| `pnpm build:dev` | Build de développement (Android + iOS) |
| `pnpm build:dev:android` | Build de développement Android uniquement |
| `pnpm build:dev:ios` | Build de développement iOS uniquement |
| `pnpm build:preview` | Build de preview (test interne) |
| `pnpm build:production` | Build de production |
